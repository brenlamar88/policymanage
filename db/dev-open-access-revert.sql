-- Removes the temporary anonymous access granted by dev-open-access.sql.
-- Run this as soon as Microsoft sign-in is live.
begin;

do $$
declare t text;
begin
  foreach t in array array[
    'facility','department','hospital_role','toc_section','app_user','user_role',
    'user_department','storage_object','policy','policy_version','form','form_version',
    'policy_form_link','policy_expected_form','document_attachment','assignment_rule',
    'assignment','acknowledgement','notification','notification_recipient','audit_event'
  ] loop
    execute format($p$drop policy if exists %1$s_dev_open on %1$I$p$, t);
    execute format('revoke all on %I from anon', t);
  end loop;
end $$;
drop policy if exists audit_event_dev_insert on audit_event;

commit;
