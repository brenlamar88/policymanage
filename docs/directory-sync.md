# Connecting users from your MySQL database

The Policy Center can take its roster from a MySQL/MariaDB database you
already own, instead of you maintaining the user list twice. The sync runs
*inside* Supabase on a nightly schedule — there is nothing to install or keep
running on your own network.

## What the directory controls, and what it does not

| | Source of truth |
|---|---|
| Name, email, employee number, phone, home facility, hire date | **Your MySQL database** |
| Security role (System Administrator, Manager, …) | **User Management**, by hand |
| Who can actually sign in | **Microsoft 365** |

The split is deliberate. The upsert has no `security_role` clause at all, so
whoever can write to the MySQL database still cannot grant themselves admin
in the Policy Center. And no password ever crosses over — Entra proves
identity, the directory only decides whose name is on the roster. The two meet
on email address.

## What I need from you

Four facts, and **not the password** — see below:

1. Host and port of the MySQL server.
2. Database (schema) name.
3. The table holding the users.
4. The column names for: email, first name, last name, employee number,
   phone, facility, hire date, and whatever marks a leaver.

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
  'mysql://fpc_readonly:THE-PASSWORD@your-host:3306/your_schema?require_ssl=true',
  'fpc_directory_mysql');
```

`db/directory-sync.sql` reads it back by that name and never stores the string
itself. Two things worth doing while you are there:

- Create a **read-only** MySQL account for this. The Policy Center never
  writes to your database, so read-only costs you nothing and means a mistake
  on this side cannot damage the source system.
- Keep `require_ssl=true`. The connection crosses the public internet.

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
- **The MySQL mirror is not exposed through the API.** It lives in the
  `ext_directory` schema, which PostgREST does not serve, with privileges
  revoked from `anon` as well.

## Known rough edge, unrelated to the sync

Deleting a user from User Management will fail with a foreign-key error for
anyone who has acknowledged a policy or appears in the audit trail. That is
the database protecting the evidence trail, and it is the right instinct, but
the app reports it as a generic save failure. Deactivating works correctly.
Worth fixing separately so the message explains itself.
