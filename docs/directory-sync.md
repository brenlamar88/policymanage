# Connecting users from RAP

The Policy Center takes its roster from RAP (`rap.freedomhc.com`), instead of
you maintaining the user list twice. The sync runs *inside* Supabase on a
nightly schedule — there is nothing to install or keep running on your own
network.

> **Superseded in part.** The source turned out to be a Lovable Cloud
> *PostgreSQL* app reached over its web API, not MySQL — the MySQL assumption
> came from a multiple-choice question answered here, not from the system. The
> MySQL half of this document and `db/rap-source.sql` do not apply. What the
> source needs to provide is in `docs/roster-source-contract.md`; the sync
> itself (sections 3 and 4 of `db/directory-sync.sql`) is unaffected, which
> was the point of putting the source behind a view.

**RAP is the chosen source.** POP was evaluated and is kept documented below
as the alternative, but nothing points at it. Microsoft Entra is deferred;
the caveat under "Does RAP know about everybody?" is the reason that decision
may want revisiting later, and the sync is built so changing source is a
change to one view.

Both halves have been exercised against real engines rather than reasoned
about: the RAP side against MariaDB 10.11, the Policy Center side against
PostgreSQL 16, with the MariaDB view's own output fed through the sync.

## Read this part first

RAP is a live clinical system. The Policy Center, right now, is the opposite:
RLS is off, the anonymous role can read and write every table, there is no
sign-in, and the publishable key is committed in `config.js`. Connecting the
two means a credential that reaches RAP exists in that environment.

So the credential is not given a view of the RAP database. `db/rap-source.sql`
creates a view in RAP called `fpc_user_roster` holding seven columns of staff
contact detail, and grants the account `SELECT` on **that view only** — not on
the `users` table, not on the schema. Nothing clinical, no patient data and no
password hash is reachable through it, whatever happens on the Supabase side
and whoever ends up with the key.

That limit lives on the RAP server, where nothing in the Policy Center can
widen it. Step 4 of `db/rap-source.sql` is a short test that proves it: log in
as the account and confirm that `select * from users` is refused.

## What the directory controls, and what it does not

| | Source of truth |
|---|---|
| Name, email, employee number, phone, home facility, hire date | **RAP** |
| Security role (System Administrator, Manager, …) | **User Management**, by hand |
| Who can actually sign in | **Microsoft 365** |

The split is deliberate. The upsert has no `security_role` clause at all, so
a RAP administrator cannot grant themselves admin in the Policy Center by
editing a RAP record. And no password ever crosses over — Entra proves
identity, the directory only decides whose name is on the roster. The two meet
on email address.

## POP as the source instead — not in use

Kept for the record; RAP is what's wired. POP (`zztbyviidzicarftmbdo`) is a
Supabase/Postgres project, so it links by `postgres_fdw` rather than the MySQL
wrapper. `db/pop-source.sql` has both halves: an export view to run on POP,
and a replacement for sections 1–2 of `db/directory-sync.sql` on this side.
Sections 3 and 4 — the sync and the schedule — are unchanged either way.

Whichever is used, use only one. Two writers racing on `app_user.email` would
fight over the same rows every night.

What POP gives you, measured against RAP:

| | RAP | POP |
|---|---|---|
| Email | yes | yes |
| First / last name | separate columns | one `full_name`, must be split |
| Employee number | likely | **none** |
| Phone | likely | **none** |
| Hire date | likely | **none** |
| Facility | one per person | many-to-many, needs a rule |
| Reliable active/inactive | unclear | **yes** — reads `auth.users` |

Two judgement calls are baked into `db/pop-source.sql`, both deliberately
visible rather than clever:

- **The name split.** First token is the forename, everything after it the
  surname. That is right for a plain two-word name and for a multi-word
  surname, and wrong for anyone recorded surname-first. A single-word
  `full_name` yields no surname at all and arrives as `—`, because
  `app_user.last_name` is `NOT NULL`. The Policy Center displays both parts,
  so a mistake here is visible and correctable, not silent.
- **The facility.** Claimed only when a person has exactly one active
  facility assignment. Two or none means no facility, and
  `preview_directory_users()` lists them so they can be set by hand instead
  of guessed at here.

POP's advantage is the active flag: the view runs inside POP, so it can read
`auth.users` and tell whether the login still works (`deleted_at is null`,
and `banned_until` either unset or in the past). RAP has no equivalent unless
its users table carries one.

## Why the publishable key is not enough

POP's `profiles` table has RLS on, with `FOR SELECT TO authenticated` and no
`anon` policy. POP's publishable key therefore returns **zero rows** — it is
not a way in, and neither is the Policy Center's own key.

A roster sync needs one of two things, and only one of them is safe:

- **A dedicated Postgres role** scoped to the export view, as in
  `db/pop-source.sql`. This is the right answer.
- **POP's `service_role` key**, which bypasses RLS entirely. Don't use it,
  don't paste it into a chat, and don't put it in this repo. It is a master
  key to all of POP, `iop_patients` and `iop_attendance` included, and the
  Policy Center is currently an open database — the two must not meet.

## Does RAP know about everybody?

Worth settling before this goes in. RAP's user table is everyone who uses
*RAP*, which may be narrower than everyone who has to acknowledge a policy. If
there are staff with no RAP login, they will not appear on the policy roster,
and the gap will be silent — nothing errors, they simply are not there.

Two ways to check: compare `select count(*) from fpc_user_roster` against your
headcount, and after the first sync look at how many `app_user` rows are still
`directory_source = 'entra'` or `'manual'`.

If RAP turns out to cover only part of the organisation, Microsoft 365 is the
better roster source — every employee has a mailbox — and RAP is better used
for the details Entra does not hold, like employee number and hire date. The
sync is built so that swap is a change to one view.

## What I need from you

Three facts, and **not the password** — see below:

1. Host and port of the RAP MySQL server, and the database name.
2. The output of `show columns from users;` on RAP (step 1 of
   `db/rap-source.sql`), so the view maps the right columns.
3. How RAP marks a disabled account — a flag, a status column, a date.

For facility, the sync joins on `facility.code`, which is a six-letter code:
`MONROE`, `LAKECH`, `LEESVI`, `PLAINV`, `VILLEP`, `DEQUIN`, `MINDEN`,
`BASTRO`, `BUNKIE`, `FERRID`, `MAGNOL`, `GREENV`, `WESTMO`. If your database
stores something else, say what, and the view in step 2 of
`db/directory-sync.sql` can translate it. A facility that does not match
leaves the person with no home facility rather than failing the row, and
`preview_directory_users()` shows you which ones did not match.

## The password goes in Vault, not in chat and not in the repo

Don't paste the password to me, and don't put it in a file in this repo —
`config.js` already shows how easily a key ends up on GitHub. Put it in
Supabase's Vault yourself, in the SQL editor:

```sql
select vault.create_secret(
  'mysql://fpc_readonly:THE-PASSWORD@rap-host:3306/rap_schema?require_ssl=true',
  'fpc_directory_mysql');
```

`db/directory-sync.sql` reads it back by that name and never stores the string
itself. Use the same password you set in step 3 of `db/rap-source.sql`, and
keep `require_ssl=true` — the connection crosses the public internet to reach
a clinical system.

## Running it

```sql
-- once, in order
\i db/migrations/003_directory_source.sql
\i db/directory-sync.sql

-- then look before you leap
select * from public.preview_directory_users();
```

`preview_directory_users()` writes nothing. It lists every row the sync would
insert, update or deactivate, with the facility it matched. Read it once
before the first real run — it is where a wrong column mapping shows up as
200 inserts that should have been 200 updates.

When it looks right:

```sql
select public.sync_directory_users();
-- {"source_rows": 412, "inserted": 383, "updated": 29, "deactivated": 0}
```

After that it runs itself at 07:20 UTC (about 02:20 Central) via `pg_cron`.
Every run writes a `directory.synced` row to `audit_event` with those same
counts, so there is a record of each night whether or not anyone was looking.

## Departures

People who disappear from the source are set to `status = 'inactive'`. The sync
never issues a `DELETE`, because deleting a person from `app_user` fails two
different ways depending on what they have done: their open policy assignments
cascade away silently, or — once they have acknowledged anything — a foreign
key refuses the delete outright. Marking them inactive keeps their
acknowledgement history, which is the compliance evidence the system exists to
produce.

Only rows the sync itself created (`directory_source = 'directory'`) can be
deactivated this way, so an account you add by hand in User Management is
never switched off by the directory.

## Safety rails worth knowing about

- **An empty read aborts the run.** A renamed table, a revoked grant or a
  dropped connection all return zero rows, which is indistinguishable from
  "everyone has left". Rather than deactivate the whole roster, the sync
  raises an error and changes nothing.
- **Manual accounts are not taken over.** A row marked `manual` keeps its
  status and stays `manual`; the directory may refresh its name and phone but
  cannot claim it.
- **Duplicate source rows do not break the run.** One row wins per email
  address, so a duplicate upstream cannot abort the night's sync.
- **A clashing employee number is dropped, not fatal.** If the source gives
  somebody an employee number another person already holds, that row syncs
  without the number instead of failing. It is picked up on a later run once
  the clash is gone.
- **The functions are not callable from the browser.** Both are
  `security definer`, and both have `EXECUTE` revoked from `anon` and
  `authenticated`, so the publishable key in `config.js` cannot trigger a sync.
- **The RAP mirror is not exposed through the API.** It lives in the
  `ext_directory` schema, which PostgREST does not serve, with privileges
  revoked from `anon` as well.
- **The connection is read-only at the RAP end.** `SELECT` on one view is the
  only privilege granted, so nothing here can modify RAP even by accident.

## Known rough edge, unrelated to the sync

Deleting a user from User Management will fail with a foreign-key error for
anyone who has acknowledged a policy or appears in the audit trail. That is
the database protecting the evidence trail, and it is the right instinct, but
the app reports it as a generic save failure. Deactivating works correctly.
Worth fixing separately so the message explains itself.
