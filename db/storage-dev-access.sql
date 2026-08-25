-- ⚠️ TEMPORARY — DEVELOPMENT ONLY, the storage half of dev-open-access.sql.
-- Lets the app read and write documents before Microsoft sign-in exists.
-- Anyone with the project URL and publishable key can upload and download.
-- Undo with storage-dev-access-revert.sql when sign-in is live.

begin;

drop policy if exists fpc_dev_storage_read on storage.objects;
drop policy if exists fpc_dev_storage_write on storage.objects;
drop policy if exists fpc_dev_storage_update on storage.objects;
drop policy if exists fpc_dev_storage_delete on storage.objects;

create policy fpc_dev_storage_read on storage.objects for select to anon
  using (bucket_id in ('policy-source','policy-rendered','form-template','quarantine'));

create policy fpc_dev_storage_write on storage.objects for insert to anon
  with check (bucket_id in ('policy-source','policy-rendered','form-template','quarantine'));

create policy fpc_dev_storage_update on storage.objects for update to anon
  using (bucket_id in ('policy-source','policy-rendered','form-template','quarantine'))
  with check (bucket_id in ('policy-source','policy-rendered','form-template','quarantine'));

-- deliberately no delete policy: a controlled document is never removed by the app

commit;
