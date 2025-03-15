
-- Alter the user tables to add columns 

ALTER TABLE users add role_id int unsigned NOT NULL;


-- ALter the students tables to add columns 

ALTER TABLE students  add role_id int unsigned NOT NULL;