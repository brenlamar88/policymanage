# What the Policy Center needs from the roster source

For the team that owns the source application. The Policy Center syncs its
user roster from your `users` table so the list is not maintained twice.

Two corrections to earlier assumptions on this side first:

- **It is not MySQL.** That came from a multiple-choice question answered here,
  not from your system. `db/rap-source.sql` does not apply; the Postgres path
  in `db/pop-source.sql` is the closer starting point.
- **The transport is not a direct database connection.** Lovable Cloud does
  not expose one, so this goes over the web API.

## Answer to "marker, function, or both": both

They solve different problems and neither covers the other.

### 1. The active/inactive marker is not optional

Without it the sync can never deactivate anyone. "Treat every row as current
staff" means a departure is invisible, so the person stays on the policy
roster permanently, keeps their open acknowledgement assignments, and keeps
counting against the outstanding-acknowledgement figures that this system
exists to produce. The number on the dashboard would drift further from the
truth every time somebody leaves, and nothing would ever flag it.

The sync is built to refuse to guess: it only ever marks somebody inactive on
evidence, and never deletes, because deleting would take their acknowledgement
history with it. With no marker there is no evidence, so leavers accumulate.

One caution worth settling before you build it: **a marker nobody maintains is
worse than none**, because it looks authoritative. If people today are removed
from the app or blocked at sign-in, say which of those events will set the
flag, and whether anything backfills the people already gone.

### 2. The function is the right transport

The publishable key plus RLS is the wrong basis for a roster, for two reasons.
The roster would depend on whatever RLS happens to say that week, and the
alternative you floated — signing in as a real user — means storing a person's
credentials in another system, which is worse than the problem it solves.

A purpose-built function fixes both: one narrow surface, nothing else
reachable through it, and no dependence on the surrounding policies.

**It must not be callable with the publishable key.** That key ships inside a
browser bundle, and this function returns staff names, email addresses and job
titles. Make it `security definer`, `revoke execute` from `anon` and
`authenticated`, and grant it to a dedicated credential.

## The contract

```sql
-- security definer; execute revoked from anon and authenticated
create function fpc_user_roster()
returns table (
  email        text,        -- the join key; lowercased, never null
  full_name    text,        -- as held, ALL CAPS is fine
  job_title    text,        -- nullable
  department   text,        -- department name, nullable
  facility     text,        -- see the open question below
  is_active    boolean,     -- the new marker; true = current staff
  updated_at   timestamptz  -- lets a later version sync incrementally
)
```

One row per person. Rows with no email, or an email without an `@`, should be
left out rather than returned empty — this side drops them anyway and a
preview full of blanks hides the real problems.

What this side does with it:

- **`full_name` is split** into first and last: first token is the forename,
  the rest the surname. Correct for a multi-word surname, wrong for a
  surname-first record. A single-word name gets an em dash for the surname,
  because `app_user.last_name` is `NOT NULL`. Both parts are displayed, so an
  error is visible rather than silent.
- **No employee number and no hire date** is fine. `employee_no` and
  `hired_on` stay empty; email is the identity.
- **`role` is deliberately not in the contract.** Security roles in the Policy
  Center are set by hand in User Management. If your `role` column drove them,
  anyone who can edit a user there could grant themselves administrator here.

## The one open question

`facility` has to match `facility.code` on this side, which is six letters:

```
MONROE  LAKECH  LEESVI  PLAINV  VILLEP  DEQUIN  MINDEN
BASTRO  BUNKIE  FERRID  MAGNOL  GREENV  WESTMO
```

Tell us what `companies` actually holds — a code, a full name, something else
— and the translation goes in a view on this side rather than asking you to
change your data. A facility that does not match is not fatal: the person
syncs without one, and `preview_directory_users()` lists them.

## How the call will be made

From inside the Policy Center's own database, not from the browser. A static
client cannot hold a secret, so `pg_cron` runs a nightly job that calls your
endpoint with `pg_net`, using a credential kept in Supabase Vault. The key
never reaches anyone's browser. `pg_cron` is already installed here and
`pg_net` is available.

So what is needed from you, once the function exists: the endpoint URL and a
credential that can call it — sent to whoever administers the Policy Center's
Vault, not pasted into a chat.
