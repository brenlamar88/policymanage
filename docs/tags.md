# Tags

Tags make the library searchable across the grain of the numbering. The
policy number tells you which section a policy lives in; a tag tells you
things the number cannot — `survey-ready`, `IOP`, `state-LA`,
`needs-review`, `Joint Commission` — and one policy can carry several.

## Who can do what

| | Administrators | Everyone else |
|---|---|---|
| Add a tag to a policy | yes | no |
| Remove a tag | yes | no |
| See tags on a policy | yes | yes |
| Search and filter by tag | yes | yes |

Adding and removing is restricted; **reading and searching is not**. A search
aid only half the staff can use is not much of a search aid, and the staff
views (Dashboard, Library, Table of Contents) are exactly where finding the
right policy quickly matters. If tags should be hidden from non-administrators
entirely, that is a one-line change — say so.

"Administrator" means System Administrator or Policy Administrator, the same
test (`isAdmin()`) that governs which views a person can reach.

## This is an interface control, not a security boundary

Right now the gate is enforced in the browser only. There is no sign-in, RLS
is off, and the publishable key ships in `config.js`, so anyone with the app
URL can write to `policy_tag` directly whatever the interface shows them.

That is not specific to tags — it is true of every table while access is open
— but it is worth being plain about, because "admins only" in a compliance
system usually implies something stronger. It becomes a real boundary when
Microsoft sign-in is live and `db/rls.sql` is re-applied; the RLS policies for
`tag` and `policy_tag` already exist and restrict writes to administrators.

## How it behaves

- **Tag names are case-insensitive.** The column is `citext` and unique, so
  typing `iop` where `IOP` already exists reuses the existing tag rather than
  creating a near-duplicate. The first spelling wins and is shown everywhere.
- **Colours belong to the tag, not the policy.** Pick a colour when the tag is
  new; tagging a second policy with an existing tag inherits its colour, so
  `IOP` looks the same everywhere it appears.
- **One search box.** Tags join number, title and section in the free-text
  search, so there is no mode to pick. The separate **All tags** dropdown
  appears only once at least one tag is in use, and clicking a chip anywhere
  filters the library to it.
- **A chip that failed to save disappears.** Tagging updates the screen
  immediately, then writes; if the write fails the chip is rolled back rather
  than left showing a tag the database does not hold.
- **Tagging twice is a no-op, not an error** — `policy_tag` is keyed on
  (policy, tag) and the write upserts against that key.
- **Removing a tag from a policy does not delete the tag.** It stays available
  for other policies. An unused tag drops out of the filter dropdown on its
  own, since that list is built from tags actually in use.

Every tag change writes to `audit_event` — `tag.created`, `policy.tagged`,
`policy.untagged` — so the trail shows who classified what, once sign-in makes
"who" meaningful.

## Suggested starting set

Tags earn their keep when they are few and consistently applied. Worth
considering, given what is already in the library:

- `IOP` — the 47 intensive outpatient policies, which currently sit in the
  wrong section and are hard to find as a set
- `survey-ready` / `needs-review` — audit preparation
- `state-LA`, `state-MS`, `state-TX` — the three states in `facility`
- `Joint Commission`, `CMS` — mirroring `regulatory_driver` for policies where
  the driver matters more than the section

A tag per policy is a filing system nobody maintains; a dozen tags across 379
policies is a search aid.
