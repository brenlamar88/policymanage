-- Lifts the access restriction: turns Row Level Security off across the public
-- schema and grants the anonymous role full read and write, so the app works
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
-- Run the two parts separately. Part 1 is what actually opens access. Part 2
-- is housekeeping and can be slow enough to time out through a pooled
-- connection; a timeout there changes nothing, because policies on a table
-- with RLS disabled are never consulted.
--
-- WARNING: while this is applied, anyone with the project URL and the
-- publishable key (which ships in config.js) can read and change every
-- record. Keep the app URL private and keep confidential content out.


-- Part 1 — lift the restriction.
do $$
declare r record;
begin
  -- discover the tables rather than listing them, so tables added later
  -- (tag, policy_tag, and anything after) are covered too
  for r in select tablename from pg_tables where schemaname = 'public' loop
    execute format('alter table public.%I disable row level security', r.tablename);

    if r.tablename like 'audit_event%' then
      execute format('grant select, insert on public.%I to anon, authenticated', r.tablename);
    else
      execute format('grant select, insert, update, delete on public.%I to anon, authenticated', r.tablename);
    end if;
  end loop;
end $$;


-- Part 2 — optional tidy-up: clear the now-inert policies and their helpers.
-- Skipping this leaves access open just the same; it only keeps pg_policies
-- from showing rules that no longer apply.
do $$
declare p record;
begin
  for p in select tablename, policyname from pg_policies where schemaname = 'public' loop
    execute format('drop policy if exists %I on public.%I', p.policyname, p.tablename);
  end loop;
end $$;

drop function if exists public.is_admin();
drop function if exists public.app_user_id();
