-- Adds 'directory' to app_user.directory_source, for people whose roster
-- record comes from the external MySQL directory (db/directory-sync.sql).
--
-- The value matters beyond bookkeeping: the sync deactivates only rows it
-- marked 'directory', so it can never touch a hand-made account.

alter table app_user drop constraint if exists app_user_directory_source_check;
alter table app_user add constraint app_user_directory_source_check
  check (directory_source in ('entra','manual','directory'));
