-- RUN SECTION A ON POP (project zztbyviidzicarftmbdo), SECTION B ON THE
-- POLICY CENTER. Both are PostgreSQL; POP is a Supabase project too, so the
-- link is postgres_fdw rather than the MySQL wrapper used for RAP.
--
-- This is the POP alternative to db/rap-source.sql. Pick one source, not
-- both -- two writers racing on app_user.email would fight over the same
-- rows every night.
--
-- Read docs/directory-sync.md first. In short: POP has no employee number,
-- no phone and no hire date, and its full_name is a single column that has
-- to be split, so it is a thinner roster than RAP. What POP does have, and
-- RAP does not, is a trustworthy active/inactive signal -- a view running
-- inside POP can read auth.users directly.
--
-- POP holds patient data, which must not become reachable from the Policy
-- Center while its own access is open, so the role in A2 gets SELECT on one
-- export view and nothing else.
--
-- Section A2 is written as instructions, not as runnable SQL: creating a
-- login on POP and granting it privileges is a deliberate act, not something
-- this file should do as a side effect of being run.


-- ####################################################################### A
-- ### ON POP #############################################################

-- ------------------------------------------------------------------ A1
-- The view. Lives in its own schema so it is not served by PostgREST and
-- cannot be reached with POP's publishable key.

create schema if not exists fpc_export;

create or replace view fpc_export.fpc_user_roster as
with primary_facility as (
  -- POP allows several facilities per person; the Policy Center stores one.
  -- Claim a facility only when the answer is unambiguous. Anyone with two
  -- or none comes across with no facility, and preview_directory_users()
  -- lists them so they can be set by hand rather than guessed at here.
  select ufa.user_id, min(f.code) as code
    from public.user_facility_assignments ufa
    join public.facilities f on f.id = ufa.facility_id
   where f.is_active
   group by ufa.user_id
  having count(*) = 1
)
select
  lower(trim(p.email))                                   as email,
  -- full_name is one column, so the split is a guess. First token is the
  -- forename, everything after it the surname: right for "Jane Smith" and
  -- for "Mary Van Der Berg", wrong for anyone recorded surname-first. The
  -- Policy Center shows both parts, so an error here is visible and
  -- correctable, not silent.
  case when position(' ' in btrim(p.full_name)) > 0
       then split_part(btrim(p.full_name), ' ', 1)
       else btrim(p.full_name) end                       as first_name,
  case when position(' ' in btrim(p.full_name)) > 0
       then btrim(substr(btrim(p.full_name),
                         position(' ' in btrim(p.full_name)) + 1))
       else null end                                     as last_name,
  null::text                                             as employee_no,
  null::text                                             as phone,
  pf.code                                                as facility_code,
  null::date                                             as hired_on,
  -- the signal RAP cannot give: POP knows whether the login still works
  (u.deleted_at is null
   and (u.banned_until is null or u.banned_until < now()))as is_active
from public.profiles p
join auth.users u on u.id = p.id
left join primary_facility pf on pf.user_id = p.id
where p.email is not null
  and position('@' in p.email) > 1;

-- ------------------------------------------------------------------ A2
-- The role, as instructions rather than as SQL this file will run.

-- These four statements are NOT executable in this file, on purpose. They
-- create a login on a production clinical database and hand it privileges,
-- which is not something a file in a prototype's repository should be able
-- to do by being run. Read them, choose the password, and run them yourself
-- against POP.
--
--   create role fpc_readonly login password '<a long random password>';
--
--   -- deliberately narrow: usage on the export schema, select on the one
--   -- view, and nothing in public -- so profiles, iop_patients,
--   -- iop_attendance and auth.users are all out of reach
--   grant usage  on schema fpc_export          to fpc_readonly;
--   grant select on fpc_export.fpc_user_roster to fpc_readonly;
--
--   revoke all on schema public               from fpc_readonly;
--   revoke all on all tables in schema public from fpc_readonly;
--
-- The view above is security_invoker = off (the default), so it reads with
-- its owner's rights. That is what lets fpc_readonly see the roster with no
-- grant at all on profiles or auth.users -- and why that select grant must
-- stay limited to this one view.
--
-- Put the same password in the Policy Center's Vault (section B1). It is
-- deliberately not recorded anywhere in this repository.

-- ------------------------------------------------------------------ A3
-- Prove the limit. Connect as fpc_readonly and expect exactly this:
--
--   select count(*) from fpc_export.fpc_user_roster;  -- a number
--   select * from public.profiles limit 1;            -- permission denied
--   select * from public.iop_patients limit 1;        -- permission denied
--   select * from auth.users limit 1;                 -- permission denied
--
-- If any of the last three returns rows, stop and fix the grants before
-- connecting the Policy Center.


-- ####################################################################### B
-- ### ON THE POLICY CENTER ###############################################
-- Replaces sections 1 and 2 of db/directory-sync.sql. Sections 3 and 4 of
-- that file (the sync, the schedule) are unchanged and work as they are.

-- ------------------------------------------------------------------ B1
-- Store POP's connection string in Vault:
--
--   select vault.create_secret(
--     'postgresql://fpc_readonly:THE-PASSWORD@db.zztbyviidzicarftmbdo.supabase.co:5432/postgres?sslmode=require',
--     'fpc_directory_pop');

create extension if not exists postgres_fdw;
create schema if not exists ext_directory;

do $$
declare v_secret text;
begin
  select decrypted_secret into v_secret
    from vault.decrypted_secrets where name = 'fpc_directory_pop';
  if v_secret is null then
    raise exception 'create the vault secret fpc_directory_pop first';
  end if;

  if not exists (select 1 from pg_foreign_server where srvname = 'fpc_directory') then
    create server fpc_directory foreign data wrapper postgres_fdw
      options (host 'db.zztbyviidzicarftmbdo.supabase.co', port '5432',
               dbname 'postgres', sslmode 'require');
  end if;

  if not exists (select 1 from pg_user_mappings
                  where srvname = 'fpc_directory' and usename = current_user) then
    execute format(
      'create user mapping for current_user server fpc_directory
         options (user %L, password %L)',
      'fpc_readonly',
      split_part(split_part(v_secret, '://fpc_readonly:', 2), '@', 1));
  end if;
end $$;

-- ------------------------------------------------------------------ B2
-- The foreign table and the view the sync reads. Column names match what
-- section 3 of db/directory-sync.sql expects, so nothing downstream changes.

create foreign table if not exists ext_directory.pop_user (
  email         text,
  first_name    text,
  last_name     text,
  employee_no   text,
  phone         text,
  facility_code text,
  hired_on      date,
  is_active     boolean
)
server fpc_directory
options (schema_name 'fpc_export', table_name 'fpc_user_roster');

create or replace view ext_directory.directory_user as
select u.email, u.employee_no,
       u.first_name,
       -- app_user.last_name is NOT NULL; a one-word full_name in POP gives
       -- no surname, so mark it rather than fail the row
       coalesce(u.last_name, '—') as last_name,
       u.phone, u.facility_code, u.hired_on
from ext_directory.pop_user u
where coalesce(u.is_active, true);

revoke all on schema ext_directory from anon, authenticated;
revoke all on all tables in schema ext_directory from anon, authenticated;
