-- Storage buckets for controlled documents. Run once, after the schema.
-- All four are PRIVATE: nothing is served by a public URL, only by a
-- short-lived signed URL issued after an authorization check.
--
-- Size limits mirror docs/file-uploads.md: 50 MB for ordinary documents,
-- 250 MB for scanned PDF/TIFF batches.

begin;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('policy-source', 'policy-source', false, 262144000, array[
     'application/pdf',
     'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
     'application/msword',
     'image/tiff']),
  ('policy-rendered', 'policy-rendered', false, 262144000, array['application/pdf','image/png']),
  ('form-template', 'form-template', false, 52428800, array[
     'application/pdf',
     'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
     'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
     'application/msword',
     'text/csv']),
  ('quarantine', 'quarantine', false, 52428800, null)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

commit;
