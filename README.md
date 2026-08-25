# Freedom Policy Center

Front-end prototype of the Freedom Behavioral enterprise policy governance portal.

## Scope

Six primary menu options are built out. **Non-administrators see only the first three** — Dashboard, Policy & Form Library, and Table of Contents; the rest are administrator-only, as is every action that changes controlled content (upload, publish, assign, manage forms and users). Staff keep full read access to policies and to every form attached to them — openable from the library table, the policy record, and the TOC panel. Use the **Preview as** control in the top bar to see the portal as any security role.

1. **Dashboard** — enterprise KPIs, risk 1–5 distribution (touch a risk level to filter the library), and recent policy activity.
2. **Policy & Form Library** — searchable/filterable table of the 379 controlled policy records, with regulatory driver, associated forms, control status, and a controlled-policy record modal. Includes **bulk upload**: drag a folder or select many files, per-file validation and fingerprint dedupe, automatic matching to a policy by filename, and a staged ingest with per-file progress.
3. **Forms Management** — create or revise a controlled form, link it to many policies, and assign it to hospital roles, departments, and facilities. A form uploaded with its tracker number in the filename is catalogued automatically and linked to every policy the mapping lists; only unnumbered forms land here as drafts.
4. **Table of Contents** — the 17 enterprise TOC sections as clickable cards plus a Quick TOC in the sidebar; selecting a section opens the full list of its policies (with an in-section filter), and selecting a policy shows its current information and every linked form.
5. **Assign Policies** — the admin side writes assignment rules (a policy, a TOC section, a risk band, or a form → facilities / departments / roles, with a due window and delivery rule) and each rule materializes one assignment per matching employee; the staff side is *My Assigned Policies*, where required reading is acknowledged with a timestamp.

6. **User Management** (Security & Administration) — the directory of everyone with access: add and edit users, set the security role that governs system permissions, and set the hospital role, department, and facility that drive policy assignment. Roster changes re-run the assignment rules, so a new hire picks up what they are owed and a departing one stops owing anything outstanding.

Other modules from the original concept (Notification Center, Review Analytics, AI Regulatory Watch, Audit Trail) are intentionally not part of this build.

## Files

- `index.html` — markup and styles for all five views.
- `app.js` — policy dataset (379 records / 17 sections), controlled forms, assignments, upload pipeline, and view logic.
- `data/policy-form-map.json` — the tracker export mapping policies to their form numbers (source of truth for form links).
- `data/policy-form-map.js` — generated browser build of that mapping; rebuild with `node scripts/build-form-map.js`.

## Running

Static, no build step and no dependencies. Open `index.html` in a browser, or serve the folder:

```
npx http-server .
```

## Saving

The app loads its working set from Supabase at startup and writes changes back —
forms, users, and uploaded documents. The chip in the top bar says which mode you are in:
**Saving to Supabase**, or **Not saving** when the database is unreachable, in which case
the app still runs on seeded data and every save warns that it is session-only. A failed
write is reported in the toast and on the chip; it is never swallowed.

Serve the page over http (`npx serve .`) rather than opening the file directly — a
`file://` origin can be rejected by the API.

> **Access is temporarily open.** Until Microsoft sign-in is wired up, `db/dev-open-access.sql`
> grants the anonymous role full read and write. Anyone with the project URL and the
> publishable key can read and change everything, and no acknowledgement recorded in this
> window identifies a person. Keep the URL private, keep confidential content out, and run
> `db/dev-open-access-revert.sql` as soon as sign-in works.

## Seeded accounts

- Corporate administrators (`@freedomhc.com`) — System Administrator.
- Thirteen facility accounts (`@freedombehavioral.com`, one per hospital) — seeded as
  **Manager**, which under the access rules above means the three reading views. Raise them
  to **Policy Administrator** in User Management if they should upload and publish for their
  own site.

## Backend plan

The prototype is front-end only; the backing platform is planned in:

- [`docs/data-model.md`](docs/data-model.md) — recommended stack, table map, scale math, search, security, retention, build phases.
- [`docs/file-uploads.md`](docs/file-uploads.md) — accepted file types, ingestion pipeline, storage layout, versioning, PHI boundary.
- [`db/schema.sql`](db/schema.sql) — Postgres DDL (verified against PostgreSQL 16).
- [`docs/sign-in-setup.md`](docs/sign-in-setup.md) — what Freedom IT and the build each have to do before anyone can log in.

## Notes

- Dashboard counts, TOC section counts, and form-link counts are computed from the dataset, so they stay accurate as records change.
- Acknowledgement rate, past-due reviews, and the activity feed are illustrative sample values.
- Controlled forms are read-only reference data here; uploading and assigning forms belongs to the Forms Management module, which is out of scope for this build.
