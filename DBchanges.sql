
-- Alter the user tables to add columns 

ALTER TABLE users add role_id int unsigned NOT NULL;


-- ALter the students tables to add columns 

ALTER TABLE students  add role_id int unsigned NOT NULL;
ALTER TABLE students  add matric_number varchar(41) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL;