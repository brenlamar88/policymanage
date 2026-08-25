# Getting people signed in

The prototype has no authentication and no server: it runs from a file, and every
record lives in the browser tab until it is refreshed. Sign-in needs three things
stood up — an Entra app registration, a Supabase project, and the app deployed at a
real URL. Roughly half the work belongs to Freedom IT, half to the build.

## A. Freedom IT — in Microsoft 365 (about 30 minutes)

1. **Confirm both domains are verified in the same Entra tenant** — `freedomhc.com`
   and `freedombehavioral.com`. If they are separate tenants, decide now whether
   facility staff sign in as guests of the corporate tenant or the app trusts both.
2. **Register the application.** Entra admin centre → App registrations → New:
   - Name: `Freedom Policy Center`
   - Account types: single tenant
   - Redirect URI (Web): `https://<project-ref>.supabase.co/auth/v1/callback`
   Record the **Application (client) ID** and **Directory (tenant) ID**.
3. **Create a client secret** and record the value at creation — it is not shown
   again. Note its expiry and put the renewal in a calendar; an expired secret locks
   everyone out.
4. **API permissions** (Microsoft Graph, delegated): `openid`, `profile`, `email`,
   `User.Read`. Grant admin consent so staff are not each prompted.
5. **Security groups** — create and populate:
   `FPC-System-Admins`, `FPC-Policy-Admins`, `FPC-Policy-Owners`, `FPC-Approvers`,
   `FPC-Managers`, `FPC-Survey-ReadOnly`. Anyone authenticated with no group is an
   Employee.
6. **Group claims.** Either add the groups claim under Token configuration, or grant
   `GroupMember.Read.All` (application) so the app reads membership from Graph. Graph
   is the safer default — tokens omit group claims once a user is in many groups.
7. **Resolve the shared mailboxes** — see the blocker below.
8. Confirm Conditional Access and MFA policies apply to the new app as intended.

## B. Build — Supabase

**Project:** `yphlmchwdabdbpmgpznd` — `https://yphlmchwdabdbpmgpznd.supabase.co`

**B0. Load the database (do this now — it does not wait on IT).** In the Supabase
SQL editor, run these three files in order. All three are idempotent, and all three
have been applied to a clean PostgreSQL 16 as a check.

| Order | File | What it does |
|---|---|---|
| 1 | [`db/schema.sql`](../db/schema.sql) | 22 tables, indexes, audit partitions |
| 1a | [`db/align.sql`](../db/align.sql) | **Only if the database was built from an earlier schema** — adds `policy_expected_form`, the security-role and Entra columns on `app_user`, and the section/risk targets on `assignment_rule`. A no-op on a current database, so running it is always safe |
| 2 | [`db/seed.sql`](../db/seed.sql) | 17 sections, 13 facilities, 26 departments, 44 hospital roles, 379 policies, 166 expected form links, 29 users |
| 3 | [`db/rls.sql`](../db/rls.sql) | Row Level Security — 41 policies |
| 4 | [`db/migrations/002_form_audience.sql`](../db/migrations/002_form_audience.sql) | Columns Forms Management writes back |
| 5 | [`db/dev-open-access.sql`](../db/dev-open-access.sql) | **Temporary** — lets the app read and write before sign-in exists. See the warning in the file, and undo it with `dev-open-access-revert.sql` the day sign-in works |

Regenerate the seed after changing the prototype's data or the tracker mapping:
`node scripts/build-seed-sql.js`.

Then create four private storage buckets: `policy-source`, `policy-rendered`,
`form-template`, `quarantine`.

1. Authentication → Providers → **Azure**: enable, paste client ID and secret, set
   Azure Tenant URL to `https://login.microsoftonline.com/<tenant-id>`.
3. Set Site URL and the redirect allow-list to the deployed app URL.
   The project URL and publishable key are already in [`config.js`](../config.js).
4. Add the first-sign-in hook: create or link the `app_user` row from the token claims
   (`entra_object_id`, `upn`, display name), defaulting to the Employee role.

## C. Build — the app itself

1. Add `supabase-js`, a sign-in screen with a single **Sign in with Microsoft** button,
   and a session guard in front of every view.
2. Read the security role from `app_user` / group membership. The access rules already
   in the prototype then work unchanged.
3. Replace the in-memory arrays with queries, and move the upload pipeline to an Edge
   Function writing to Storage.
4. Deploy to a real URL and point a custom domain at it (e.g.
   `policies.freedomhc.com`). That URL is what step A.2 registers.

## The blocker on the thirteen facility accounts

`monroeadmin@`, `dequincypa@`, and the rest look like **Exchange shared mailboxes**.
The Entra account behind a shared mailbox is normally **sign-in disabled and
unlicensed**, so as things stand those thirteen cannot log in at all — no app change
fixes that. One of these has to happen:

- **Give each a licensed, sign-in-enabled account** (simplest, thirteen licences), or
- **Have facility staff sign in as themselves** and grant the site's access through an
  Entra group — better evidence, no extra licences, and the option to prefer if
  acknowledgement matters, or
- **Keep the mailboxes for notification delivery only** and never as logins.

Acknowledgement is the reason to care: a record against a shared mailbox proves
someone with the password read the policy, not who.

## Two ways to sequence it

| | What you get | Effort |
|---|---|---|
| **Pilot** — A, B.1–B.3, C.1, C.4 | Real Microsoft sign-in in front of the prototype. Demo data, nothing persists, but people reach it with their own credentials | ~1 day after IT finishes A |
| **Production** — all of A, B, C | Real records, real documents, real acknowledgement evidence | Phases 0–1 in [`data-model.md`](data-model.md) §8 |

The pilot is worth it only to test appetite and navigation. Acknowledgement evidence
means the production path.
