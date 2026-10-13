-- Roster sync: pulls people from the external MySQL directory into app_user.
--
-- What it does and does not control
-- ---------------------------------
-- The directory owns the ROSTER: who exists, their name, email, employee
-- number, phone, home facility and hire date.
--
-- It does NOT own security_role. Roles stay in User Management, and the
-- upsert below has no security_role clause at all, so whoever can write to
-- the MySQL database still cannot grant themselves admin here.
--
-- It does NOT own sign-in. Microsoft 365 proves identity (docs/sign-in-setup.md);
-- this only decides whose name is on the roster. No password ever crosses over.
--
-- It never DELETEs. Sixteen foreign keys point at app_user, and deleting a
-- person goes wrong in two different ways depending on what they have done:
--
--   * assignment, user_role, user_department and notification_recipient
--     cascade, so the delete SUCCEEDS and silently takes their open policy
--     assignments with it.
--   * acknowledgement and audit_event are NO ACTION, so once somebody has
--     acknowledged anything the delete is REFUSED outright by a foreign key.
--
-- Neither is a good outcome for a nightly job, so a departure is marked
-- status='inactive' and the row stays. Measured on PostgreSQL 16, not assumed.
--
-- Run order: db/migrations/003_directory_source.sql first (adds the
-- 'directory' value this file writes).

create extension if not exists wrappers with schema extensions;
create extension if not exists pg_cron;
create schema if not exists ext_directory;

do $$
begin
  if not exists (select 1 from pg_foreign_data_wrapper where fdwname = 'mysql_wrapper') then
    create foreign data wrapper mysql_wrapper
      handler mysql_fdw_handler validator mysql_fdw_validator;
  end if;
end $$;


-- ===================================================================== 1/4
-- The connection. Store the credential in Vault, never in this file --
-- anything committed here is on GitHub, and this repo is where config.js
-- already leaks the publishable key.
--
--   select vault.create_secret(
--     'mysql://fpc_readonly:THE-PASSWORD@db.example.com:3306/theschema?require_ssl=true',
--     'fpc_directory_mysql');
--
-- Use a MySQL account with SELECT on the users table and nothing else. The
-- Policy Center never writes to your database, so read-only costs nothing
-- and means a mistake here cannot damage the source system.

do $$
declare v_secret uuid;
begin
  select id into v_secret from vault.secrets where name = 'fpc_directory_mysql';
  if v_secret is null then
    raise exception 'create the vault secret fpc_directory_mysql first (see comment above)';
  end if;

  if not exists (select 1 from pg_foreign_server where srvname = 'fpc_directory') then
    execute format(
      'create server fpc_directory foreign data wrapper mysql_wrapper
         options (conn_string_id %L)', v_secret::text);
  end if;
end $$;


-- ===================================================================== 2/4
-- The seam. This is the ONLY part that depends on how your MySQL database
-- is laid out; everything after it is generic.
--
-- Point the foreign table at the real table and columns, then let the view
-- rename them to what the sync expects. Keeping the rename in a view means a
-- column added or renamed upstream is a one-line change here, not a rewrite.

create foreign table if not exists ext_directory.mysql_user (
  -- EDIT: left-hand names must match your MySQL columns exactly.
  id            bigint,
  employee_id   text,
  first_name    text,
  last_name     text,
  email         text,
  phone         text,
  facility      text,
  hire_date     date,
  active        boolean
)
server fpc_directory
options (table 'users');          -- EDIT: your table name

create or replace view ext_directory.directory_user as
select
  u.email,
  u.employee_id  as employee_no,
  u.first_name,
  u.last_name,
  u.phone,
  u.facility     as facility_code,
  u.hire_date    as hired_on
from ext_directory.mysql_user u
where coalesce(u.active, true);   -- EDIT: however your source marks leavers

-- The mirror is not part of the app's API surface. PostgREST only exposes
-- 'public', but revoke anyway: while access is open, anyone with the
-- publishable key would otherwise be one config change from reading your
-- other system's user table.
revoke all on schema ext_directory from anon, authenticated;
revoke all on all tables in schema ext_directory from anon, authenticated;


-- ===================================================================== 3/4
-- The sync.

create or replace function public.sync_directory_users()
returns jsonb
language plpgsql
security definer
set search_path = public, ext_directory, pg_temp
as $fn$
declare
  v_src  int;
  v_ins  int := 0;
  v_upd  int := 0;
  v_off  int := 0;
begin
  -- distinct on email: a duplicated source row would otherwise abort the
  -- whole run on app_user's unique index
  create temp table _src on commit drop as
  select distinct on (lower(trim(u.email)))
    lower(trim(u.email))::citext                    as email,
    nullif(trim(u.employee_no), '')                 as employee_no,
    coalesce(nullif(trim(u.first_name), ''), '—')   as first_name,
    coalesce(nullif(trim(u.last_name),  ''), '—')   as last_name,
    nullif(trim(u.phone), '')                       as phone,
    nullif(trim(u.facility_code), '')               as facility_code,
    u.hired_on
  from ext_directory.directory_user u
  where u.email is not null
    and position('@' in u.email) > 1
  order by lower(trim(u.email)), u.employee_no nulls last;

  select count(*) into v_src from _src;

  -- Refuse an empty read. A renamed table, a revoked grant or a dropped
  -- connection returns zero rows, which is indistinguishable from "everyone
  -- has left" -- and would deactivate the entire roster.
  if v_src = 0 then
    raise exception 'directory sync aborted: source returned 0 usable rows';
  end if;

  -- An employee_no already held by a different person would abort the run,
  -- so give up the number rather than the row.
  update _src s set employee_no = null
   where s.employee_no is not null
     and exists (select 1 from app_user a
                  where a.employee_no = s.employee_no and a.email <> s.email);

  with up as (
    insert into app_user (
      email, employee_no, first_name, last_name, phone,
      primary_facility_id, hired_on, status, directory_source, directory_synced_at
    )
    select s.email, s.employee_no, s.first_name, s.last_name, s.phone,
           f.id, s.hired_on, 'active', 'directory', now()
      from _src s
      left join facility f on upper(f.code) = upper(s.facility_code)
    on conflict (email) do update set
      employee_no         = coalesce(excluded.employee_no, app_user.employee_no),
      first_name          = excluded.first_name,
      last_name           = excluded.last_name,
      phone               = coalesce(excluded.phone, app_user.phone),
      primary_facility_id = coalesce(excluded.primary_facility_id, app_user.primary_facility_id),
      hired_on            = coalesce(excluded.hired_on, app_user.hired_on),
      -- a hand-made account keeps its own status and stays 'manual': the
      -- directory may refresh its details but can never take it over
      status              = case when app_user.directory_source = 'manual'
                                 then app_user.status else 'active' end,
      directory_source    = case when app_user.directory_source = 'manual'
                                 then 'manual' else 'directory' end,
      directory_synced_at = now(),
      updated_at          = now()
      -- security_role is absent on purpose. See the header.
    returning (xmax = 0) as was_insert
  )
  select count(*) filter (where was_insert),
         count(*) filter (where not was_insert)
    into v_ins, v_upd
    from up;

  -- Departures. Scoped to rows this sync created, so an account added by
  -- hand in User Management is never switched off by the directory.
  with gone as (
    update app_user a
       set status = 'inactive', directory_synced_at = now(), updated_at = now()
     where a.directory_source = 'directory'
       and a.status = 'active'
       and not exists (select 1 from _src s where s.email = a.email)
    returning 1
  )
  select count(*) into v_off from gone;

  insert into audit_event (action, entity_type, metadata)
  values ('directory.synced', 'app_user',
          jsonb_build_object('source_rows', v_src, 'inserted', v_ins,
                             'updated', v_upd, 'deactivated', v_off));

  return jsonb_build_object('source_rows', v_src, 'inserted', v_ins,
                            'updated', v_upd, 'deactivated', v_off);
end
$fn$;

-- What a run would do, without doing it. Worth reading before the first one.
create or replace function public.preview_directory_users()
returns table (change text, email citext, employee_no text, full_name text, facility text)
language sql
security definer
set search_path = public, ext_directory, pg_temp
as $fn$
  with src as (
    select distinct on (lower(trim(u.email)))
      lower(trim(u.email))::citext      as email,
      nullif(trim(u.employee_no), '')   as employee_no,
      trim(u.first_name)                as first_name,
      trim(u.last_name)                 as last_name,
      nullif(trim(u.facility_code), '') as facility_code
    from ext_directory.directory_user u
    where u.email is not null and position('@' in u.email) > 1
    order by lower(trim(u.email)), u.employee_no nulls last
  )
  select case when a.id is null then 'insert' else 'update' end,
         s.email, s.employee_no, s.first_name || ' ' || s.last_name,
         coalesce(f.name, '(no facility match: ' || coalesce(s.facility_code,'null') || ')')
    from src s
    left join app_user a on a.email = s.email
    left join facility f on upper(f.code) = upper(s.facility_code)
  union all
  select 'deactivate', a.email, a.employee_no,
         a.first_name || ' ' || a.last_name, '—'
    from app_user a
   where a.directory_source = 'directory' and a.status = 'active'
     and not exists (select 1 from src s where s.email = a.email)
  order by 1, 2;
$fn$;

-- Both are security definer, so they must not be callable with the
-- publishable key that ships in config.js.
revoke all on function public.sync_directory_users()    from public, anon, authenticated;
revoke all on function public.preview_directory_users() from public, anon, authenticated;


-- ===================================================================== 4/4
-- The schedule. 07:20 UTC is about 02:20 Central; off the hour, because
-- shared cron runners queue up at :00.

select cron.unschedule('fpc-directory-sync')
 where exists (select 1 from cron.job where jobname = 'fpc-directory-sync');

select cron.schedule('fpc-directory-sync', '20 7 * * *',
                     $job$select public.sync_directory_users()$job$);
