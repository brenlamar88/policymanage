-- Lifts the access restriction: drops every Row Level Security policy this
-- project created and turns RLS off, so the app can read and write freely
-- with the publishable key while sign-in does not exist yet.
--
-- This is the undo of db/rls.sql, with one deliberate exception: audit_event
-- keeps select and insert only. The app never edits or deletes audit rows, so
-- holding that line costs nothing and keeps the evidence trail trustworthy.
--
-- Idempotent; re-running is safe. Re-apply db/rls.sql to restore the
-- restriction once Microsoft sign-in is live.
--
-- WARNING: while this is applied, anyone with the project URL and the
-- publishable key (which ships in config.js) can read and change every
-- record. Keep the app URL private and keep confidential content out.

begin;

do $$
declare
  t text;
  p record;
  tables text[] := array[
    'facility','department','hospital_role','toc_section','app_user','user_role',
    'user_department','storage_object','policy','policy_version','form','form_version',
    'policy_form_link','policy_expected_form','document_attachment','assignment_rule',
    'assignment','acknowledgement','notification','notification_recipient','audit_event'
  ];
begin
  foreach t in array tables loop
    if to_regclass('public.' || quote_ident(t)) is null then
      continue;   -- table not in this database; nothing to undo
    end if;

    for p in select policyname from pg_policies
              where schemaname = 'public' and tablename = t loop
      execute format('drop policy if exists %I on public.%I', p.policyname, t);
    end loop;

    execute format('alter table public.%I disable row level security', t);

    if t = 'audit_event' then
      execute 'grant select, insert on public.audit_event to anon, authenticated';
    else
      execute format('grant select, insert, update, delete on public.%I to anon, authenticated', t);
    end if;
  end loop;
end $$;

drop function if exists public.is_admin();
drop function if exists public.app_user_id();

commit;
