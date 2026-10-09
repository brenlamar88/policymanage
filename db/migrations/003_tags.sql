-- Tags: administrator-defined labels (e.g. "Forensic Programming") that cut
-- across TOC sections, so staff can pull every policy on a theme at once.
-- Apply after rls.sql. Safe to re-run.
begin;

create table if not exists tag (
  id           uuid primary key default gen_random_uuid(),
  name         citext not null unique,
  color        text not null default 'blue'
                check (color in ('blue','green','amber','red','purple','slate')),
  description  text,
  created_by   uuid references app_user(id),
  created_at   timestamptz not null default now()
);

create table if not exists policy_tag (
  policy_id    uuid not null references policy(id) on delete cascade,
  tag_id       uuid not null references tag(id) on delete cascade,
  created_at   timestamptz not null default now(),
  primary key (policy_id, tag_id)
);

create index if not exists policy_tag_tag_idx on policy_tag (tag_id);

-- same rules as the rest of the reference data: everyone signed in reads,
-- administrators maintain
alter table tag enable row level security;
alter table policy_tag enable row level security;

do $$
declare t text;
begin
  foreach t in array array['tag','policy_tag'] loop
    execute format($p$drop policy if exists %1$s_read on %1$I$p$, t);
    execute format($p$drop policy if exists %1$s_write on %1$I$p$, t);
    execute format($f$create policy %1$s_read on %1$I for select to authenticated using (true)$f$, t);
    execute format($f$create policy %1$s_write on %1$I for all to authenticated
                      using (public.is_admin()) with check (public.is_admin())$f$, t);
  end loop;
end $$;

commit;
