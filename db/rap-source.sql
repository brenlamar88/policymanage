-- RUN THIS ON THE RAP SERVER, NOT ON SUPABASE. This file is MySQL dialect.
--
-- RAP (rap.freedomhc.com) is a live clinical-adjacent system. The Policy
-- Center needs exactly seven columns about staff from it and nothing else,
-- so rather than grant Supabase a look at the RAP database and trust it to
-- only read the users table, this creates a view holding just those columns
-- and grants an account access to that view alone.
--
-- Why it is done this way round: the Policy Center database currently has
-- open access -- RLS off, the anonymous role able to read and write, and the
-- publishable key committed in config.js. A credential that can see only
-- seven columns of staff contact detail cannot expose anything worse than
-- that, no matter what happens on the Supabase side or who gets the key.
-- A credential that can see the whole RAP schema could expose patient data.
-- The limit belongs here, on the RAP side, where nothing in the Policy
-- Center can widen it.
--
-- Nothing in the Policy Center ever writes to RAP. SELECT is the only
-- privilege granted, and only on the view.


-- ------------------------------------------------------------------ step 1
-- Find the real column names. Run this first and send the output back;
-- the view below is written against placeholder names.

-- show tables like '%user%';
-- show columns from users;


-- ------------------------------------------------------------------ step 2
-- The view. EDIT the right-hand side of each line to RAP's real columns.
-- Keep the left-hand names exactly as they are: the Supabase side matches
-- on them.
--
-- Deliberately absent: password hashes, session tokens, security questions,
-- anything clinical, anything about patients. If a column is not one of the
-- seven below, it does not belong in this view.

create or replace view fpc_user_roster as
select
  u.email                       as email,
  u.employee_id                 as employee_no,
  u.first_name                  as first_name,
  u.last_name                   as last_name,
  u.phone                       as phone,
  u.facility                    as facility_code,
  u.hire_date                   as hired_on,
  -- MySQL has no boolean type, so this arrives as int(1) and the Policy
  -- Center declares the column smallint to match. EDIT this expression to
  -- whatever RAP actually uses -- a status string, a disabled flag, a
  -- termination date -- as long as it yields 1 for current staff and 0 for
  -- everyone else.
  (u.active = 1)                as is_active
from users u
where u.email is not null
  and u.email <> '';


-- ------------------------------------------------------------------ step 3
-- The account. Replace the password with a long random one and put the same
-- value in the Supabase Vault secret (see docs/directory-sync.md) -- it is
-- not recorded anywhere in this repository.
--
-- Restrict the host if you can: '%' allows connections from anywhere, and
-- Supabase publishes its egress addresses. Narrowing it to those is a
-- worthwhile second lock.

create user if not exists 'fpc_readonly'@'%' identified by 'REPLACE-WITH-A-LONG-RANDOM-PASSWORD';

-- The grant is on the view and nothing else. No database-wide SELECT, no
-- access to the users table itself.
grant select on fpc_user_roster to 'fpc_readonly'@'%';
flush privileges;


-- ------------------------------------------------------------------ step 4
-- Prove the limit is real. The first should return rows; every other one
-- should be refused. If any of the others succeeds, the grant is too wide --
-- stop and fix it before pointing Supabase at this.
--
--   mysql -u fpc_readonly -p
--   select count(*) from fpc_user_roster;      -- expect: a number
--   select * from users limit 1;               -- expect: SELECT denied
--   select * from <any clinical table> limit 1;-- expect: SELECT denied
--   show tables;                               -- expect: only the view
--
-- The view reads with its definer's rights, which is what lets this account
-- see the roster while holding no grant at all on the users table. That is
-- also why the grant must stay on this one view: widen it and the limit goes.
--
-- Two results that look like failure but are not about the grant:
--
--   ERROR 1045 Access denied ... (using password: YES)
--     Host matching, not privileges. An anonymous ''@'localhost' account --
--     present on a default MySQL install -- shadows 'fpc_readonly'@'%' for
--     connections from the server itself. Supabase connects remotely so it
--     is unaffected, but a test run on the box will fail this way. Test from
--     elsewhere, or check: select user, host from mysql.user where user = ''.
--
--   ERROR 1142 SELECT command denied ... for table `users`
--     This is the grant working. Expected, and what you want to see.
--
-- Verified end to end against MariaDB 10.11: the account read the view,
-- was refused on the users table and on a clinical table, and `show tables`
-- listed nothing but the view.
