# Data Model & Scale Plan

## 1. Recommended stack

**Postgres for records, object storage for files.** Concretely: a dedicated Supabase
project (Postgres 17) in `us-east-2`, alongside the existing `freedomrap-staging` project,
with Supabase Storage for the document buckets.

Why this and not something else:

- The relational half is small and highly relational (policy → version → assignment →
  acknowledgement → audit). That is exactly what Postgres is good at, and it is what makes
  a survey question like *"show me who acknowledged v4.2 of 15008 and when"* a single join.
- Documents never belong in the database. Files go to object storage; the database holds
  the pointer, the checksum, and the metadata (`storage_object`).
- Supabase gives Row Level Security, auth, signed URLs, PITR backups, and Edge Functions
  for the ingestion pipeline without standing up separate infrastructure — and it is already
  in use here, so it is one vendor, not two.
- No document database, no search cluster. Postgres full-text search (`tsvector` + GIN)
  and trigram indexes cover policy-number, title, and full-document-body search at this
  volume. Reach for OpenSearch only if the corpus passes ~100k documents.

Schema: [`db/schema.sql`](../db/schema.sql) — applies clean on Postgres 16/17.

## 2. Table map

**Reference** — `facility`, `department`, `hospital_role`, `toc_section`

**People** — `app_user`, `user_role`, `user_department`
(`app_user.auth_user_id` links to Supabase auth; roles and departments are many-to-many
because staff genuinely hold more than one of each.)

**Files** — `storage_object`
One row per set of bytes: bucket, key, SHA-256, sniffed MIME, size, scan status, OCR flag.
Unique on `(bucket, sha256)`, so identical re-uploads dedupe instead of multiplying.

**Documents** — `policy` / `policy_version`, `form` / `form_version`, `policy_form_link`,
`document_attachment`
The parent row is the stable identity (policy number, title, risk level, owner, review
cadence). Every version is an immutable child row carrying its own file objects, effective
date, approver, and content hash. `current_version_id` on the parent is the pointer staff
read. `policy_form_link` is the many-to-many that lets one form serve many policies.

**Assignment** — `assignment_rule`, `assignment`
Rules express the audience the way the business talks about it ("Risk 5 policies → all
Nursing at all facilities"). A rule targets one policy, one form, a whole TOC section, or a
risk band — section and risk rules expand to their policies at materialization, which is
what makes "every Risk 5 policy to everyone" a single rule instead of 59. A rule with null
facility/department/role means "all". The
rule engine materializes per-user `assignment` rows on publish, on rule change, and on any
employee role/department change. Materializing matters: a nurse who transfers to Monroe
must not silently lose the evidence trail of what she was assigned at Lake Charles.

**Evidence** — `acknowledgement`, `notification`, `notification_recipient`, `audit_event`
`acknowledgement` stores user + version + timestamp + method + an `evidence_hash` binding
the acknowledgement to the exact published bytes. `audit_event` is append-only and
partitioned by year.

## 3. Scale math

Sizing against the real numbers (379 policies, 17 sections, 13 facilities):

| Thing | Year 1 | Year 10 | Verdict |
|---|---|---|---|
| Policies | ~400 | ~1,500 (state variants, new services) | trivial |
| Policy versions | ~800 | ~9,000 (≈6 revisions each) | trivial |
| Forms + versions | ~300 | ~3,000 | trivial |
| Stored objects | ~2,000 (source + rendered) | ~25,000 | ~40–60 GB |
| Employees | ~1,500–2,500 | ~4,000 | trivial |
| Live assignments | ~80,000 (2,000 staff × ~40 policies) | ~160,000 | trivial |
| Acknowledgements | ~80,000/yr | ~1M cumulative | fine; partition past ~5M |
| Audit events | ~1–3M/yr (reads logged) | ~20M+ | partitioned by year, fine |

The honest conclusion: **database horsepower is not the scaling risk.** A single small
Postgres instance handles a decade of this comfortably. The things that actually need
design attention are (a) object storage growth and immutability, (b) the assignment
fan-out job, and (c) audit retention. Those are addressed above.

Cost shape: dominated by storage (tens of GB) and egress, not compute.

## 4. Search

- `policy.search_tsv` — generated column over policy number + title, GIN indexed.
- `policy_version.body_tsv` — generated over extracted document text, GIN indexed. This is
  what makes "find every policy that mentions restraint documentation" work.
- Trigram indexes on `policy_number` and `title` for partial/fuzzy matching ("1500", typos).
- Later, for the AI regulatory work: add `pgvector` and an embedding column on
  `policy_version`, so a new CMS rule can be matched to affected policies by meaning rather
  than keyword. Same database, one extension — no separate vector store.

## 5. Security model

- **RLS on every table.** Staff read policies scoped to their facility and assignments
  scoped to themselves; Policy Admin and Compliance roles read enterprise-wide. The
  ingestion worker uses the service role and is the only writer to `storage_object`.
- **No public buckets.** Every download is a signed URL with a 5-minute TTL, issued only
  after an authorization check, and logged to `audit_event`.
- **Append-only audit.** Revoke UPDATE/DELETE on `audit_event` from all application roles.
- **Encryption at rest and in transit** by default on managed Postgres and Storage.
- **No PHI in scope.** The library holds blank policies and blank form templates only —
  see [`file-uploads.md`](file-uploads.md) §5. So the controls above exist for governance
  and survey defensibility, not HIPAA: standard managed hosting is sufficient, and no BAA
  or PHI-scoped bucket is required. The upload-time identifier warning keeps it that way.

## 6. Backup & retention

- PITR on the database (7–30 days depending on plan) plus nightly logical dumps to
  separate storage.
- Documents: bucket versioning + object lock; never hard-delete a published version.
- Retain policy versions and acknowledgement evidence for **at least 10 years** — long
  enough to answer "what was in force when this incident happened". Confirm the exact
  minimum against LA/TX/MS licensing rules before setting a purge job; default to keep.
- Quarterly restore drill, restoring into a scratch project and verifying a known
  acknowledgement record.

## 7. Build phases

| Phase | Scope | Unblocks |
|---|---|---|
| 0 | Apply schema; seed 17 sections, 379 policies, facilities/departments/roles; wire the existing Library + TOC screens to the database | the current prototype stops being static |
| 1 | Upload pipeline (§2 of the upload doc), version records, approve/publish flow | real documents in the system |
| 2 | Assignment rules + materialization + acknowledgement capture | "who has to read this" |
| 3 | Notifications, reminders, escalation, survey evidence exports | the compliance value |
| 4 | Regulatory intelligence: sources, findings, pgvector policy matching | the AI module |

## 8. Open questions

1. **Headcount** — how many active employees across the 13 facilities? Drives assignment
   and acknowledgement volume (the estimates above assume ~2,000).
2. **Identity** — is there an existing SSO (Entra ID / Google Workspace) to authenticate
   against, or do we manage credentials in-app?
3. **State variants** — one enterprise policy with state addenda, or separate policy
   records per state? The schema supports both (`policy.applies_to_states`); the operating
   preference decides which one Compliance actually maintains.
