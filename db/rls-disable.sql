-- Lifts the access restriction: drops every Row Level Security policy this
-- project created and turns RLS off, so the app can read and write freely
-- with the publishable key while sign-in does not exist yet.
--
-- This is the undo of db/rls.sql, with one deliberate exception: audit_event
-- keeps select and insert only. The app never edits or deletes audit rows, so
-- holding that line costs nothing and keeps the evidence trail trustworthy.
--
-- Covers every table in the public schema, including any added later.
-- Idempotent; re-running is safe. Re-apply db/rls.sql to restore the
-- restriction once Microsoft sign-in is live.
--
-- WARNING: while this is applied, anyone with the project URL and the
-- publishable key (which ships in config.js) can read and change every
-- record. Keep the app URL private and keep confidential content out.

begin;

do $$
declare
  r record;
  p record;
begin
  -- discover the tables rather than listing them, so tables added later
  -- (tag, policy_tag, and anything after) are covered too
  for r in select tablename from pg_tables where schemaname = 'public' loop
    for p in select policyname from pg_policies
              where schemaname = 'public' and tablename = r.tablename loop
      execute format('drop policy if exists %I on public.%I', p.policyname, r.tablename);
    end loop;

    execute format('alter table public.%I disable row level security', r.tablename);

    if r.tablename like 'audit_event%' then
      execute format('grant select, insert on public.%I to anon, authenticated', r.tablename);
    else
      execute format('grant select, insert, update, delete on public.%I to anon, authenticated', r.tablename);
    end if;
  end loop;
end $$;

drop function if exists public.is_admin();
drop function if exists public.app_user_id();

commit;
