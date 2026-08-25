-- Removes the temporary anonymous storage access. Run when sign-in is live.
begin;
drop policy if exists fpc_dev_storage_read on storage.objects;
drop policy if exists fpc_dev_storage_write on storage.objects;
drop policy if exists fpc_dev_storage_update on storage.objects;
drop policy if exists fpc_dev_storage_delete on storage.objects;
commit;
