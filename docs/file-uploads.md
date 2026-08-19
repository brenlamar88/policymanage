# Upload & Document Handling Plan

Covers what the system accepts, what it does to a file between "staff clicked upload"
and "staff can read it", and how versions stay defensible in a survey.

## 1. Accepted file types

Acceptance is decided by **magic bytes (content sniffing), not the file extension**.
The extension is checked first as a cheap filter, then the real MIME type must match.

### Accepted

| Purpose | Extensions | MIME | Notes |
|---|---|---|---|
| Policy source | `.pdf`, `.docx`, `.doc` | `application/pdf`, `…wordprocessingml.document`, `application/msword` | `.docx` preferred — text extraction is exact |
| Form template | `.pdf`, `.docx`, `.xlsx`, `.csv` | as above + `…spreadsheetml.sheet`, `text/csv` | fillable PDFs (AcroForm) flagged on `form_version.is_fillable` |
| Job aid / attachment | `.pptx`, `.png`, `.jpg`, `.txt`, `.md` | `…presentationml.presentation`, `image/png`, `image/jpeg`, `text/plain` | supporting material, not the controlled record |
| Scanned document | `.pdf`, `.tif`, `.tiff` | `application/pdf`, `image/tiff` | routed to OCR |

### Rejected outright

Executables and scripts (`.exe`, `.msi`, `.sh`, `.bat`, `.js`, `.jar`), `.html`/`.htm`,
archives (`.zip`, `.rar`, `.7z`), and anything whose sniffed type disagrees with its extension.

### Quarantined, admin release required

Macro-enabled Office files (`.docm`, `.xlsm`, `.pptm`). These are common in real hospital
form libraries, so they are not hard-blocked — they land in a quarantine bucket, an admin
is notified, and release requires converting to a macro-free equivalent.

### Limits

- 50 MB per file (standard), 250 MB for scanned TIFF/PDF batches.
- 1,000 pages per document.
- 25 files per upload batch.
- Storage quota alert at 80% of the plan allowance.

## 2. Ingestion pipeline

Each step writes its result to `storage_object`; a file is not visible to staff until it
reaches `ready`.

1. **Extension allowlist** — fast reject.
2. **Magic-byte sniff** (libmagic) — must match the declared type, else reject.
3. **Size / page-count check**.
4. **Virus scan** (ClamAV) — `scan_status` moves `pending → clean | infected | quarantined`.
   Infected files are deleted from the landing bucket; the attempt stays in `audit_event`.
5. **Checksum + dedupe** — SHA-256 becomes the object identity. Re-uploading identical
   bytes reuses the existing `storage_object` row (enforced by `unique (bucket, sha256)`).
6. **Text extraction** — `pdftotext` / DOCX XML parse into `policy_version.extracted_text`.
7. **OCR if needed** — under ~100 characters per page means it is a scan; run
   `ocrmypdf`/Tesseract and set `ocr_applied`.
8. **Render display PDF** — LibreOffice headless converts source to PDF and stores it as a
   second object. Staff always read the rendered PDF, so a Word original can never be
   edited in place by a reader.
9. **Thumbnail** — first page, for library cards.
10. **Index** — the generated `body_tsv` column picks up the extracted text automatically.
11. **Mark ready** — the version becomes eligible for approval and publishing.

Steps 6–9 run as background jobs (Supabase Edge Function or a small worker container);
1–5 run synchronously so the uploader gets an immediate accept/reject.

## 3. Storage layout

Four private buckets, no public access, all reads through short-TTL signed URLs (5 minutes):

| Bucket | Contents | Retention |
|---|---|---|
| `policy-source` | uploaded originals (`.docx`/`.pdf`) | permanent, immutable |
| `policy-rendered` | display PDFs, thumbnails | permanent, regenerable |
| `form-template` | blank controlled forms | permanent, immutable |
| `quarantine` | macro-enabled or failed-scan files | 90 days, then purge |

Object key: `{bucket}/{entity_id}/{version_id}/{sha256}.{ext}` — content-addressed, so a
key is never reused and an overwrite is impossible by construction.

## 4. Versioning and immutability

- Publishing **never** overwrites. It writes a new `policy_version` row + new object, sets
  the prior version to `superseded`, and repoints `policy.current_version_id`.
- `content_hash` on each version is the SHA-256 of the published bytes. Acknowledgement
  evidence stores that hash, so you can prove *which* text an employee acknowledged.
- Superseded versions stay readable to admins and surveyors, watermarked "SUPERSEDED",
  and are not assignable.
- Enable bucket versioning plus object-lock/WORM where the storage provider offers it.

## 5. Scope boundary — no PHI

Confirmed by Freedom: **nothing uploaded to this system contains PHI.** The library holds
blank policies and blank form templates only. Completed/filled forms with patient
information are not uploaded here — those stay in the EHR.

That classification is worth protecting, because it is what keeps this a
governance system rather than a clinical one: no BAA dependency, no PHI bucket, no
per-read disclosure accounting, and no restriction on where documents can be rendered or
indexed.

Two cheap guards keep the boundary from eroding by accident:

1. **Upload-time warning** — if a filename or first-page OCR text matches patient-identifier
   patterns (DOB, MRN, SSN, "patient name"), warn the uploader and require an explicit
   confirmation before the file is accepted.
2. **Stated policy on the upload screen** — "blank controlled documents only; do not upload
   completed patient forms."

If that decision is ever reversed, the changes are known and contained: a separate
PHI-scoped bucket with its own RLS, a signed BAA with the hosting vendor, and read-level
audit logging. Nothing in the current schema blocks it.
