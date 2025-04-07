
-- Alter the user tables to add columns 

ALTER TABLE users add role_id int unsigned NOT NULL;
ALTER TABLE users  add matric_number varchar(110) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL;

ALTER TABLE users ADD COLUMN faculty_id BIGINT UNSIGNED NULL;
ALTER TABLE users ADD COLUMN department_id BIGINT UNSIGNED NULL;
ALTER TABLE users ADD COLUMN level_id BIGINT UNSIGNED NULL;

ALTER TABLE users MODIFY COLUMN id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE users 
MODIFY COLUMN role_id BIGINT UNSIGNED NULL;

ALTER TABLE users 
MODIFY COLUMN school_id BIGINT UNSIGNED NULL;

-- FOREIGN KEYS


-- ALter the students tables to add columns 

ALTER TABLE students  add role_id int unsigned NOT NULL;
ALTER TABLE students  add matric_number varchar(41) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL;

-- Creating User Category

CREATE TABLE `user_categories` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_by` varchar(391) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `students_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



ALTER TABLE users 
ADD COLUMN user_category INT UNSIGNED NULL,
ADD CONSTRAINT fk_user_user_category
FOREIGN KEY (user_category) REFERENCES user_categories(id);

ALTER TABLE users ADD CONSTRAINT fk_user_faculties FOREIGN KEY (faculty_id) REFERENCES faculties(id);
ALTER TABLE users ADD CONSTRAINT fk_user_department FOREIGN KEY (department_id) REFERENCES departments(id);
ALTER TABLE users ADD CONSTRAINT fk_user_level FOREIGN KEY (level_id) REFERENCES levels(id);
ALTER TABLE users ADD CONSTRAINT fk_user_role FOREIGN KEY (role_id) REFERENCES roles(id);
ALTER TABLE users ADD CONSTRAINT fk_user_schools FOREIGN KEY (school_id) REFERENCES schools(id);


-- Changes to the news table

ALTER TABLE news ADD COLUMN user_id BIGINT UNSIGNED NULL, ADD CONSTRAINT fk_news_user FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE news ADD CONSTRAINT fk_news_schools FOREIGN KEY (school_id) REFERENCES schools(id);
ALTER TABLE news ADD CONSTRAINT fk_news_news_category FOREIGN KEY (news_category_id) REFERENCES news_categories(id);

ALTER TABLE news 
MODIFY COLUMN school_id BIGINT UNSIGNED NULL;
ALTER TABLE news 
MODIFY COLUMN news_category_id BIGINT UNSIGNED NULL;

-- Changes to the news_category table

ALTER TABLE news_categories MODIFY COLUMN school_id BIGINT UNSIGNED NULL;

ALTER TABLE news_categories ADD CONSTRAINT fk_news_category_schools FOREIGN KEY (school_id) REFERENCES schools(id);

-- Changes to the news_comment_reactions table

ALTER TABLE news_comment_reactions 
MODIFY COLUMN school_id BIGINT UNSIGNED NOT NULL;

ALTER TABLE news_comment_reactions 
MODIFY COLUMN news_id BIGINT UNSIGNED NOT NULL;

ALTER TABLE news_comment_reactions 
MODIFY COLUMN news_comment_id BIGINT UNSIGNED NULL;

ALTER TABLE news_comment_reactions 
MODIFY COLUMN news_comment_reply_id BIGINT UNSIGNED NULL;

ALTER TABLE news_comment_reactions 
MODIFY COLUMN user_id BIGINT UNSIGNED NOT NULL;

ALTER TABLE news_comment_reactions ADD CONSTRAINT fk_news_comment_reactions_schools FOREIGN KEY (school_id) REFERENCES schools(id);
ALTER TABLE news_comment_reactions ADD CONSTRAINT fk_news_comment_reactions_news FOREIGN KEY (news_id) REFERENCES news(id);
ALTER TABLE news_comment_reactions ADD CONSTRAINT fk_news_comment_reactions_news_comment FOREIGN KEY (news_comment_id) REFERENCES news_comments(id);
ALTER TABLE news_comment_reactions ADD CONSTRAINT fk_news_comment_reactions_news_comment_reply FOREIGN KEY (news_comment_reply_id) REFERENCES news_comment_replies(id);
ALTER TABLE news_comment_reactions ADD CONSTRAINT fk_news_comment_reactions_users FOREIGN KEY (user_id) REFERENCES users(id);


-- Changes to news_comments Replies table

ALTER TABLE news_comment_replies 
MODIFY COLUMN school_id BIGINT UNSIGNED NOT NULL;

ALTER TABLE news_comment_replies 
MODIFY COLUMN news_id BIGINT UNSIGNED NOT NULL;

ALTER TABLE news_comment_replies 
MODIFY COLUMN news_comment_id BIGINT UNSIGNED NOT NULL;

ALTER TABLE news_comment_replies 
MODIFY COLUMN user_id BIGINT UNSIGNED NOT NULL;

ALTER TABLE news_comment_replies ADD CONSTRAINT fk_news_comment_replies_schools FOREIGN KEY (school_id) REFERENCES schools(id);
ALTER TABLE news_comment_replies ADD CONSTRAINT fk_news_comment_replies_news FOREIGN KEY (news_id) REFERENCES news(id);
ALTER TABLE news_comment_replies ADD CONSTRAINT fk_news_comment_replies_news_comment FOREIGN KEY (news_comment_id) REFERENCES news_comments(id);
ALTER TABLE news_comment_replies ADD CONSTRAINT fk_news_comment_replies_users FOREIGN KEY (user_id) REFERENCES users(id);


-- changes to news_comments table

ALTER TABLE news_comments 
MODIFY COLUMN school_id BIGINT UNSIGNED NOT NULL;

ALTER TABLE news_comments 
MODIFY COLUMN news_id BIGINT UNSIGNED NOT NULL;

ALTER TABLE news_comments 
MODIFY COLUMN user_id BIGINT UNSIGNED NOT NULL;


ALTER TABLE news_comments ADD CONSTRAINT fk_news_comments_schools FOREIGN KEY (school_id) REFERENCES schools(id);
ALTER TABLE news_comments ADD CONSTRAINT fk_news_comments_news FOREIGN KEY (news_id) REFERENCES news(id);
ALTER TABLE news_comments ADD CONSTRAINT fk_news_comments_users FOREIGN KEY (user_id) REFERENCES users(id);


-- Changes tp the market place table

ALTER TABLE market_products 
MODIFY COLUMN school_id BIGINT UNSIGNED NOT NULL;

ALTER TABLE market_products 
MODIFY COLUMN market_product_tag_id BIGINT UNSIGNED NULL;

ALTER TABLE market_products 
MODIFY COLUMN user_id BIGINT UNSIGNED NULL;

ALTER TABLE market_products ADD CONSTRAINT fk_market_products_schools FOREIGN KEY (school_id) REFERENCES schools(id);
ALTER TABLE market_products ADD CONSTRAINT fk_market_products_market_product_tag_id FOREIGN KEY (market_product_tag_id) REFERENCES market_product_tags(id);
ALTER TABLE market_products ADD CONSTRAINT fk_market_products_market_users FOREIGN KEY (user_id) REFERENCES users(id);


-- Changes to the market_product_tags table

ALTER TABLE market_product_tags 
MODIFY COLUMN school_id BIGINT UNSIGNED NOT NULL;

ALTER TABLE market_product_tags ADD CONSTRAINT fk_market_product_tags_schools FOREIGN KEY (school_id) REFERENCES schools(id);

-- Changes to the market_products_comments table

ALTER TABLE market_product_comments 
MODIFY COLUMN school_id BIGINT UNSIGNED NOT NULL;

ALTER TABLE market_product_comments 
MODIFY COLUMN market_product_id BIGINT UNSIGNED NOT NULL;

ALTER TABLE market_product_comments 
MODIFY COLUMN user_id BIGINT UNSIGNED NULL;

ALTER TABLE market_product_comments ADD CONSTRAINT fk_market_product_comments_schools FOREIGN KEY (school_id) REFERENCES schools(id);
ALTER TABLE market_product_comments ADD CONSTRAINT fk_market_product_comments_market_products FOREIGN KEY (market_product_id) REFERENCES market_products(id);
ALTER TABLE market_product_comments ADD CONSTRAINT fk_market_product_comments_user FOREIGN KEY (user_id) REFERENCES users(id);


-- Changes to the market_product_comment_replies table

ALTER TABLE market_product_comment_replies 
MODIFY COLUMN school_id BIGINT UNSIGNED NOT NULL;

ALTER TABLE market_product_comment_replies 
MODIFY COLUMN market_product_id BIGINT UNSIGNED NOT NULL;

ALTER TABLE market_product_comment_replies 
MODIFY COLUMN market_product_comment_id BIGINT UNSIGNED NOT NULL;

ALTER TABLE market_product_comment_replies
MODIFY COLUMN user_id BIGINT UNSIGNED NOT NULL;


ALTER TABLE market_product_comment_replies ADD CONSTRAINT fk_market_product_comment_replies_schools FOREIGN KEY (school_id) REFERENCES schools(id);
ALTER TABLE market_product_comment_replies ADD CONSTRAINT fk_market_product_comment_replies_market_product FOREIGN KEY (market_product_id) REFERENCES market_products(id);
ALTER TABLE market_product_comment_replies ADD CONSTRAINT fk_market_product_comment_replies_market_product_comment FOREIGN KEY (market_product_comment_id) REFERENCES market_product_comments(id);
ALTER TABLE market_product_comment_replies ADD CONSTRAINT fk_market_product_comment_replies_users FOREIGN KEY (user_id) REFERENCES users(id);

-- Changes to the market_product_comment_reactions table


ALTER TABLE market_product_comment_reactions 
MODIFY COLUMN school_id BIGINT UNSIGNED NOT NULL;

ALTER TABLE market_product_comment_reactions 
MODIFY COLUMN market_product_id BIGINT UNSIGNED NOT NULL;

ALTER TABLE market_product_comment_reactions 
MODIFY COLUMN market_product_comment_id BIGINT UNSIGNED NULL;

ALTER TABLE market_product_comment_reactions 
MODIFY COLUMN market_product_comment_reply_id BIGINT UNSIGNED NULL;

ALTER TABLE market_product_comment_reactions
MODIFY COLUMN user_id BIGINT UNSIGNED NOT NULL;

ALTER TABLE market_product_comment_reactions ADD CONSTRAINT fk_market_product_comment_reactions_schools FOREIGN KEY (school_id) REFERENCES schools(id);
ALTER TABLE market_product_comment_reactions ADD CONSTRAINT fk_market_product_comment_reactions_market_product FOREIGN KEY (market_product_id) REFERENCES market_products(id);
ALTER TABLE market_product_comment_reactions ADD CONSTRAINT fk_market_product_comment_reactions_market_product_comment FOREIGN KEY (market_product_comment_id) REFERENCES market_product_comments(id);
ALTER TABLE market_product_comment_reactions ADD CONSTRAINT fk_market_product_comment_reactions_market_product_comment_reply FOREIGN KEY (market_product_comment_reply_id) REFERENCES market_product_comment_replies(id);
ALTER TABLE market_product_comment_reactions ADD CONSTRAINT fk_market_product_comment_reactions_users FOREIGN KEY (user_id) REFERENCES users(id);




-- Changes to the news_reactions table

ALTER TABLE news_reactions 
MODIFY COLUMN school_id BIGINT UNSIGNED NOT NULL;

ALTER TABLE news_reactions 
MODIFY COLUMN news_id BIGINT UNSIGNED NOT NULL;

ALTER TABLE news_reactions 
MODIFY COLUMN user_id BIGINT UNSIGNED NULL;

ALTER TABLE news_reactions ADD CONSTRAINT fk_news_reactions_schools FOREIGN KEY (school_id) REFERENCES schools(id);
ALTER TABLE news_reactions ADD CONSTRAINT fk_news_reactions_news FOREIGN KEY (news_id) REFERENCES news(id);
ALTER TABLE news_reactions ADD CONSTRAINT fk_news_reactions_users FOREIGN KEY (user_id) REFERENCES users(id);


-- Changes to the core services payments table


ALTER TABLE core_service_payments ADD COLUMN status varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Pending';




