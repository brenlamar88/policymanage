-- Brings a database created from an earlier schema.sql up to the current one.
-- Run this if seed.sql failed with "relation policy_expected_form does not
-- exist" or "column security_role does not exist". Idempotent, and harmless on
-- a database that is already current.

begin;

-- 1. Microsoft 365 identity columns (added when sign-in was settled on Entra)
alter table app_user add column if not exists entra_object_id     uuid;
alter table app_user add column if not exists upn                 citext;
alter table app_user add column if not exists directory_source    text not null default 'entra';
alter table app_user add column if not exists directory_synced_at timestamptz;

do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'app_user_entra_object_id_key') then
    alter table app_user add constraint app_user_entra_object_id_key unique (entra_object_id);
  end if;
  if not exists (select 1 from pg_constraint where conname = 'app_user_upn_key') then
    alter table app_user add constraint app_user_upn_key unique (upn);
  end if;
  if not exists (select 1 from pg_constraint where conname = 'app_user_directory_source_check') then
    alter table app_user add constraint app_user_directory_source_check
      check (directory_source in ('entra','manual'));
  end if;
end $$;

-- 2. What a person can do in the system, and whether the account is a person
alter table app_user add column if not exists security_role text not null default 'Employee';
alter table app_user add column if not exists is_shared_mailbox boolean not null default false;

do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'app_user_security_role_check') then
    alter table app_user add constraint app_user_security_role_check
      check (security_role in ('System Administrator','Policy Administrator','Policy Owner',
                               'Approver','Manager','Employee','Survey / Read-Only'));
  end if;
end $$;

-- 3. Forms the tracker expects before any document has been uploaded
create table if not exists policy_expected_form (
  policy_id    uuid not null references policy(id) on delete cascade,
  form_number  text not null,
  source       text not null default 'tracker',
  created_at   timestamptz not null default now(),
  primary key (policy_id, form_number)
);

-- 4. Assignment rules can target a section or a risk band, not just one policy
alter table assignment_rule add column if not exists subject_type text;
alter table assignment_rule add column if not exists section_id uuid references toc_section(id) on delete cascade;
alter table assignment_rule add column if not exists risk_level smallint;

update assignment_rule
   set subject_type = case when policy_id is not null then 'policy' else 'form' end
 where subject_type is null;

do $$
declare c text;
begin
  -- the original one-target check has to go before the four-way one can hold
  for c in select conname from pg_constraint
            where conrelid = 'assignment_rule'::regclass and contype = 'c'
              and pg_get_constraintdef(oid) like '%num_nonnulls(policy_id, form_id)%'
  loop
    execute format('alter table assignment_rule drop constraint %I', c);
  end loop;

  if not exists (select 1 from pg_constraint where conname = 'assignment_rule_subject_ck') then
    alter table assignment_rule
      add constraint assignment_rule_subject_ck check (
        (subject_type = 'policy'  and policy_id  is not null and form_id is null and section_id is null and risk_level is null) or
        (subject_type = 'form'    and form_id    is not null and policy_id is null and section_id is null and risk_level is null) or
        (subject_type = 'section' and section_id is not null and policy_id is null and form_id is null and risk_level is null) or
        (subject_type = 'risk'    and risk_level is not null and policy_id is null and form_id is null and section_id is null)
      );
  end if;
  if not exists (select 1 from pg_constraint where conname = 'assignment_rule_subject_type_check') then
    alter table assignment_rule add constraint assignment_rule_subject_type_check
      check (subject_type in ('policy','form','section','risk'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'assignment_rule_risk_level_check') then
    alter table assignment_rule add constraint assignment_rule_risk_level_check
      check (risk_level is null or risk_level between 1 and 5);
  end if;
end $$;

alter table assignment_rule alter column subject_type set not null;

-- 5. Indexes added alongside the columns above
create index if not exists app_user_entra_idx       on app_user (entra_object_id);
create index if not exists app_user_upn_idx         on app_user (upn);
create index if not exists app_user_role_idx        on app_user (security_role) where status = 'active';
create index if not exists expected_form_number_idx on policy_expected_form (form_number);
create index if not exists rule_active_idx          on assignment_rule (subject_type) where is_active;

commit;
