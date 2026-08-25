-- Freedom Policy Center — core schema (PostgreSQL 15+ / Supabase)
-- Apply order matters: reference data -> people -> files -> documents -> assignment -> evidence.
-- Every controlled document is immutable once published: publishing writes a new
-- *_version row plus a new storage_object; nothing is ever updated in place.

create extension if not exists pg_trgm;      -- fuzzy policy-number / title search
create extension if not exists citext;       -- case-insensitive email

-- ---------------------------------------------------------------- reference

create table facility (
  id            uuid primary key default gen_random_uuid(),
  code          text not null unique,                    -- 'LKC', 'MON'
  name          text not null,
  state_code    char(2) not null,                        -- drives state regulatory crosswalk
  is_active     boolean not null default true,
  created_at    timestamptz not null default now()
);

create table department (
  id            uuid primary key default gen_random_uuid(),
  name          text not null unique,
  is_active     boolean not null default true
);

create table hospital_role (
  id            uuid primary key default gen_random_uuid(),
  name          text not null unique,
  is_active     boolean not null default true
);

create table toc_section (
  id            uuid primary key default gen_random_uuid(),
  name          text not null unique,
  sort_order    int  not null,
  is_active     boolean not null default true
);

-- ------------------------------------------------------------------ people

create table app_user (
  id                  uuid primary key default gen_random_uuid(),
  auth_user_id        uuid unique,                       -- maps to auth.users(id) on Supabase
  -- Freedom signs in with Microsoft 365. The Entra object id is the stable
  -- join key: it survives name changes, email changes, and re-licensing,
  -- which a UPN does not.
  entra_object_id     uuid unique,
  upn                 citext unique,                     -- user principal name in the tenant
  directory_source    text not null default 'entra'
                       check (directory_source in ('entra','manual')),
  directory_synced_at timestamptz,
  employee_no         text unique,
  first_name          text not null,
  last_name           text not null,
  email               citext not null unique,
  phone               text,
  primary_facility_id uuid references facility(id),
  status              text not null default 'active'
                       check (status in ('active','inactive','terminated')),
  hired_on            date,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create table user_role (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references app_user(id) on delete cascade,
  role_id     uuid not null references hospital_role(id) on delete cascade,
  facility_id uuid references facility(id)               -- null = role applies enterprise-wide
);

-- one row per user/role/facility; the sentinel lets "enterprise-wide" (null) dedupe too
create unique index user_role_uniq on user_role
  (user_id, role_id, coalesce(facility_id, '00000000-0000-0000-0000-000000000000'::uuid));

create table user_department (
  user_id       uuid not null references app_user(id) on delete cascade,
  department_id uuid not null references department(id) on delete cascade,
  primary key (user_id, department_id)
);

-- ------------------------------------------------------------------- files
-- One row per physical object in storage. Content-addressed: the same bytes
-- uploaded twice reuse one row. Rows are never mutated except by the scanner.

create table storage_object (
  id                uuid primary key default gen_random_uuid(),
  bucket            text not null,                       -- policy-source | policy-rendered | form-template | ...
  object_key        text not null,                       -- {bucket}/{entity}/{version_id}/{sha256}.{ext}
  sha256            char(64) not null,
  byte_size         bigint not null check (byte_size > 0),
  mime_type         text not null,                       -- from magic-byte sniff, not the extension
  file_extension    text not null,
  original_filename text not null,
  page_count        int,
  scan_status       text not null default 'pending'
                     check (scan_status in ('pending','clean','infected','failed','quarantined')),
  scan_engine       text,
  scanned_at        timestamptz,
  text_extracted    boolean not null default false,
  ocr_applied       boolean not null default false,
  uploaded_by       uuid references app_user(id),
  created_at        timestamptz not null default now(),
  unique (bucket, sha256),
  unique (bucket, object_key)
);

-- ---------------------------------------------------------------- policies

create table policy (
  id                    uuid primary key default gen_random_uuid(),
  section_id            uuid not null references toc_section(id),
  policy_number         text not null,
  title                 text not null,
  risk_level            smallint not null check (risk_level between 1 and 5),
  risk_basis            text,
  regulatory_driver     text,
  owner_role_id         uuid references hospital_role(id),
  owner_user_id         uuid references app_user(id),
  review_interval_months int not null default 12,
  next_review_on        date,
  status                text not null default 'draft'
                         check (status in ('draft','active','retired')),
  current_version_id    uuid,                             -- FK added after policy_version exists
  applies_to_states     char(2)[] not null default '{}',  -- empty = all states
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),
  search_tsv tsvector generated always as (
    to_tsvector('english', coalesce(policy_number,'') || ' ' || coalesce(title,''))
  ) stored,
  unique (section_id, policy_number, title)
);

create table policy_version (
  id                   uuid primary key default gen_random_uuid(),
  policy_id            uuid not null references policy(id) on delete restrict,
  version_no           int  not null,
  version_label        text not null,                    -- 'v4.2'
  status               text not null default 'draft'
                        check (status in ('draft','in_review','approved','published','superseded')),
  summary_of_changes   text,
  source_object_id     uuid references storage_object(id),   -- what was uploaded (.docx/.pdf)
  rendered_pdf_object_id uuid references storage_object(id), -- what staff are shown
  extracted_text       text,
  content_hash         char(64),                          -- evidence: hash of the published bytes
  effective_on         date,
  retired_on           date,
  created_by           uuid references app_user(id),
  approved_by          uuid references app_user(id),
  approved_at          timestamptz,
  published_at         timestamptz,
  created_at           timestamptz not null default now(),
  unique (policy_id, version_no),
  body_tsv tsvector generated always as (to_tsvector('english', coalesce(extracted_text,''))) stored
);

alter table policy
  add constraint policy_current_version_fk
  foreign key (current_version_id) references policy_version(id);

-- ------------------------------------------------------------------- forms

create table form (
  id                   uuid primary key default gen_random_uuid(),
  form_code            text not null unique,             -- 'FRM-15008-A'
  name                 text not null,
  owner_department_id  uuid references department(id),
  risk_level           smallint not null default 3 check (risk_level between 1 and 5),
  status               text not null default 'draft'
                        check (status in ('draft','active','retired')),
  current_version_id   uuid,
  created_at           timestamptz not null default now(),
  search_tsv tsvector generated always as (
    to_tsvector('english', coalesce(form_code,'') || ' ' || coalesce(name,''))
  ) stored
);

create table form_version (
  id                     uuid primary key default gen_random_uuid(),
  form_id                uuid not null references form(id) on delete restrict,
  version_no             int not null,
  version_label          text not null,
  status                 text not null default 'draft'
                          check (status in ('draft','in_review','approved','published','superseded')),
  source_object_id       uuid references storage_object(id),
  rendered_pdf_object_id uuid references storage_object(id),
  is_fillable            boolean not null default false,  -- PDF AcroForm / XFA detected
  content_hash           char(64),
  effective_on           date,
  retired_on             date,
  created_by             uuid references app_user(id),
  approved_by            uuid references app_user(id),
  approved_at            timestamptz,
  published_at           timestamptz,
  created_at             timestamptz not null default now(),
  unique (form_id, version_no)
);

alter table form
  add constraint form_current_version_fk
  foreign key (current_version_id) references form_version(id);

-- one form can serve many policies, and one policy can require many forms
create table policy_form_link (
  policy_id    uuid not null references policy(id) on delete cascade,
  form_id      uuid not null references form(id) on delete cascade,
  is_required  boolean not null default false,
  note         text,
  created_at   timestamptz not null default now(),
  primary key (policy_id, form_id)
);

-- ------------------------------------------------------- attachments / aids

create table document_attachment (
  id           uuid primary key default gen_random_uuid(),
  policy_id    uuid references policy(id) on delete cascade,
  form_id      uuid references form(id) on delete cascade,
  object_id    uuid not null references storage_object(id),
  kind         text not null check (kind in ('job_aid','evidence','source_regulation','other')),
  label        text,
  created_at   timestamptz not null default now(),
  check (num_nonnulls(policy_id, form_id) = 1)
);

-- -------------------------------------------------------------- assignment
-- Rules describe the audience; assignments are the materialized per-user rows
-- that acknowledgement evidence hangs off.

create table assignment_rule (
  id                      uuid primary key default gen_random_uuid(),
  -- what is assigned: one policy, one form, a whole TOC section, or a risk band.
  -- section and risk rules expand to policies at materialization time.
  subject_type            text not null check (subject_type in ('policy','form','section','risk')),
  policy_id               uuid references policy(id) on delete cascade,
  form_id                 uuid references form(id) on delete cascade,
  section_id              uuid references toc_section(id) on delete cascade,
  risk_level              smallint check (risk_level between 1 and 5),
  facility_id             uuid references facility(id),   -- null = all facilities
  department_id           uuid references department(id), -- null = all departments
  role_id                 uuid references hospital_role(id), -- null = all roles
  requires_acknowledgement boolean not null default true,
  due_days                int not null default 3,
  delivery                text not null default 'portal_email_ack'
                           check (delivery in ('portal','portal_email','portal_email_ack','email_manager_escalation')),
  is_active               boolean not null default true,
  created_by              uuid references app_user(id),
  created_at              timestamptz not null default now(),
  constraint assignment_rule_subject_ck check (
    (subject_type = 'policy'  and policy_id  is not null and form_id is null and section_id is null and risk_level is null) or
    (subject_type = 'form'    and form_id    is not null and policy_id is null and section_id is null and risk_level is null) or
    (subject_type = 'section' and section_id is not null and policy_id is null and form_id is null and risk_level is null) or
    (subject_type = 'risk'    and risk_level is not null and policy_id is null and form_id is null and section_id is null)
  )
);

create table assignment (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid not null references app_user(id) on delete cascade,
  policy_version_id  uuid references policy_version(id) on delete cascade,
  form_version_id    uuid references form_version(id) on delete cascade,
  rule_id            uuid references assignment_rule(id) on delete set null,
  source             text not null default 'rule' check (source in ('rule','manual')),
  assigned_at        timestamptz not null default now(),
  due_on             date,
  status             text not null default 'open'
                      check (status in ('open','acknowledged','waived','expired')),
  check (num_nonnulls(policy_version_id, form_version_id) = 1),
  unique (user_id, policy_version_id),
  unique (user_id, form_version_id)
);

create table acknowledgement (
  id                uuid primary key default gen_random_uuid(),
  assignment_id     uuid not null unique references assignment(id) on delete cascade,
  user_id           uuid not null references app_user(id),
  policy_version_id uuid references policy_version(id),
  form_version_id   uuid references form_version(id),
  acknowledged_at   timestamptz not null default now(),
  method            text not null default 'portal_click'
                     check (method in ('portal_click','esignature','manager_attest','import')),
  ip_address        inet,
  user_agent        text,
  evidence_hash     char(64)                              -- hash of user + version + content_hash + timestamp
);

-- ----------------------------------------------------------- notifications

create table notification (
  id                uuid primary key default gen_random_uuid(),
  policy_version_id uuid references policy_version(id),
  form_version_id   uuid references form_version(id),
  subject           text not null,
  body              text,
  created_by        uuid references app_user(id),
  created_at        timestamptz not null default now()
);

create table notification_recipient (
  notification_id uuid not null references notification(id) on delete cascade,
  user_id         uuid not null references app_user(id) on delete cascade,
  channel         text not null check (channel in ('portal','email','sms')),
  sent_at         timestamptz,
  read_at         timestamptz,
  reminder_count  int not null default 0,
  primary key (notification_id, user_id, channel)
);

-- ------------------------------------------------------------- audit trail
-- Append-only, partitioned by year. Nothing in the app may UPDATE or DELETE here.

create table audit_event (
  id               bigint generated always as identity,
  occurred_at      timestamptz not null default now(),
  actor_user_id    uuid references app_user(id),
  action           text not null,                        -- 'policy.published', 'form.downloaded', ...
  entity_type      text not null,
  entity_id        uuid,
  entity_version_id uuid,
  ip_address       inet,
  metadata         jsonb not null default '{}'::jsonb,
  primary key (id, occurred_at)
) partition by range (occurred_at);

create table audit_event_2026 partition of audit_event
  for values from ('2026-01-01') to ('2027-01-01');
create table audit_event_2027 partition of audit_event
  for values from ('2027-01-01') to ('2028-01-01');

-- ----------------------------------------------------------------- indexes

create index policy_section_idx        on policy (section_id);
create index policy_risk_idx           on policy (risk_level);
create index policy_status_idx         on policy (status);
create index policy_search_idx         on policy using gin (search_tsv);
create index policy_number_trgm_idx    on policy using gin (policy_number gin_trgm_ops);
create index policy_title_trgm_idx     on policy using gin (title gin_trgm_ops);
create index policy_next_review_idx    on policy (next_review_on) where status = 'active';

create index policy_version_policy_idx on policy_version (policy_id, version_no desc);
create index policy_version_body_idx   on policy_version using gin (body_tsv);

create index form_search_idx           on form using gin (search_tsv);
create index form_version_form_idx     on form_version (form_id, version_no desc);

create index storage_object_sha_idx    on storage_object (sha256);
create index storage_object_scan_idx   on storage_object (scan_status) where scan_status <> 'clean';

create index assignment_user_open_idx  on assignment (user_id, status) where status = 'open';
create index assignment_due_idx        on assignment (due_on) where status = 'open';
create index assignment_pv_idx         on assignment (policy_version_id);
create index rule_active_idx           on assignment_rule (subject_type) where is_active;

create index ack_user_idx              on acknowledgement (user_id, acknowledged_at desc);
create index ack_policy_version_idx    on acknowledgement (policy_version_id);

create index audit_entity_idx          on audit_event (entity_type, entity_id, occurred_at desc);
create index audit_actor_idx           on audit_event (actor_user_id, occurred_at desc);

create index app_user_entra_idx        on app_user (entra_object_id);
create index app_user_upn_idx          on app_user (upn);
create index user_role_role_idx        on user_role (role_id);
create index user_dept_dept_idx        on user_department (department_id);
