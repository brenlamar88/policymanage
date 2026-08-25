-- Forms carry their assigned audience (roles, departments, facilities) as
-- configured in Forms Management. Kept as jsonb because it is a display-level
-- audience; the authoritative targeting for assignment lives in assignment_rule.
begin;
alter table form add column if not exists audience jsonb not null default '{}'::jsonb;
alter table form add column if not exists notify text;
alter table form add column if not exists source_filename text;
commit;
