-- ⚠️ TEMPORARY — DEVELOPMENT ONLY. Remove before real staff use.
--
-- The app is being connected to the database before Microsoft sign-in exists,
-- so there is no `authenticated` user yet. This grants the anonymous role the
-- same access an administrator would have, which means ANYONE WITH THE PROJECT
-- URL AND PUBLISHABLE KEY CAN READ AND WRITE EVERYTHING.
--
-- While this is applied:
--   • do not load real patient-adjacent or confidential content
--   • do not treat any acknowledgement recorded here as evidence — nothing
--     identifies a person
--   • keep the app URL private
--
-- Undo with db/dev-open-access-revert.sql the moment sign-in works.

begin;

do $$
declare t text;
begin
  foreach t in array array[
    'facility','department','hospital_role','toc_section','app_user','user_role',
    'user_department','storage_object','policy','policy_version','form','form_version',
    'policy_form_link','policy_expected_form','document_attachment','assignment_rule',
    'assignment','acknowledgement','notification','notification_recipient'
  ] loop
    execute format('grant select, insert, update, delete on %I to anon', t);
    execute format($p$drop policy if exists %1$s_dev_open on %1$I$p$, t);
    execute format($p$create policy %1$s_dev_open on %1$I for all to anon
                      using (true) with check (true)$p$, t);
  end loop;
end $$;

-- the audit trail stays append-only even in development
grant select, insert on audit_event to anon;
revoke update, delete on audit_event from anon;
drop policy if exists audit_event_dev_open on audit_event;
create policy audit_event_dev_open on audit_event for select to anon using (true);
create policy audit_event_dev_insert on audit_event for insert to anon with check (true);

commit;
