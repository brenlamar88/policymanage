-- Row Level Security for the Freedom Policy Center.
-- Apply AFTER schema.sql and seed.sql. Safe to re-run.
--
-- Two helpers do the work: who is signed in, and are they an administrator.
-- Everything else reads as a sentence. Tables with no write policy are
-- read-only to every client; only the service role bypasses RLS.

begin;

create or replace function public.app_user_id() returns uuid
language sql stable security definer set search_path = public as $$
  select id from app_user where auth_user_id = auth.uid() and status = 'active'
$$;

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from app_user
    where auth_user_id = auth.uid()
      and status = 'active'
      and security_role in ('System Administrator','Policy Administrator')
  )
$$;

do $$
declare t text;
begin
  foreach t in array array[
    'facility','department','hospital_role','toc_section','app_user','user_role',
    'user_department','storage_object','policy','policy_version','form','form_version',
    'policy_form_link','policy_expected_form','document_attachment','assignment_rule',
    'assignment','acknowledgement','notification','notification_recipient','audit_event'
  ] loop
    -- enable, not force: the service role and migrations still need a way in
    execute format('alter table %I enable row level security', t);
  end loop;
end $$;

-- Reference data: everyone signed in reads it, administrators maintain it.
do $$
declare t text;
begin
  foreach t in array array['facility','department','hospital_role','toc_section',
                           'policy','form','policy_form_link','policy_expected_form',
                           'document_attachment','storage_object'] loop
    execute format($f$create policy %1$s_read on %1$I for select to authenticated using (true)$f$, t);
    execute format($f$create policy %1$s_write on %1$I for all to authenticated
                      using (public.is_admin()) with check (public.is_admin())$f$, t);
  end loop;
end $$;

-- Versions: staff read what is or was in force; drafts are for administrators.
create policy policy_version_read on policy_version for select to authenticated
  using (status in ('published','superseded') or public.is_admin());
create policy policy_version_write on policy_version for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy form_version_read on form_version for select to authenticated
  using (status in ('published','superseded') or public.is_admin());
create policy form_version_write on form_version for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- Directory: you can see yourself; administrators see and maintain everyone.
create policy app_user_read on app_user for select to authenticated
  using (auth_user_id = auth.uid() or public.is_admin());
create policy app_user_write on app_user for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy user_role_read on user_role for select to authenticated
  using (user_id = public.app_user_id() or public.is_admin());
create policy user_role_write on user_role for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy user_department_read on user_department for select to authenticated
  using (user_id = public.app_user_id() or public.is_admin());
create policy user_department_write on user_department for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- Assignments: mine, or everyone's if I administer the system.
create policy assignment_rule_read on assignment_rule for select to authenticated using (true);
create policy assignment_rule_write on assignment_rule for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy assignment_read on assignment for select to authenticated
  using (user_id = public.app_user_id() or public.is_admin());
create policy assignment_write on assignment for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- Acknowledgement: you may record your own and never anyone else's, and no
-- one may edit or delete one once it exists.
create policy acknowledgement_read on acknowledgement for select to authenticated
  using (user_id = public.app_user_id() or public.is_admin());
create policy acknowledgement_insert on acknowledgement for insert to authenticated
  with check (
    user_id = public.app_user_id()
    and exists (select 1 from assignment a
                where a.id = assignment_id and a.user_id = public.app_user_id())
  );

create policy notification_read on notification for select to authenticated using (true);
create policy notification_write on notification for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy notification_recipient_read on notification_recipient for select to authenticated
  using (user_id = public.app_user_id() or public.is_admin());
create policy notification_recipient_write on notification_recipient for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- Audit trail: administrators read it, the service role writes it, nobody
-- updates or deletes it — belt and braces, since a missing policy only makes
-- an UPDATE match no rows, while a revoked grant refuses it outright.
create policy audit_event_read on audit_event for select to authenticated
  using (public.is_admin());
revoke insert, update, delete on audit_event from authenticated;
revoke update, delete on acknowledgement from authenticated;

commit;
