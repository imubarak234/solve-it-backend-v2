-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 24, 2025 at 12:55 PM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `solveit_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
CREATE TABLE IF NOT EXISTS `admins` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `balance` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `admins_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `admins_permissions`
--

DROP TABLE IF EXISTS `admins_permissions`;
CREATE TABLE IF NOT EXISTS `admins_permissions` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `admin_id` int UNSIGNED NOT NULL,
  `permission_id` int UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `admins_roles`
--

DROP TABLE IF EXISTS `admins_roles`;
CREATE TABLE IF NOT EXISTS `admins_roles` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `admin_id` int UNSIGNED NOT NULL,
  `role_id` int UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `admin_password_resets`
--

DROP TABLE IF EXISTS `admin_password_resets`;
CREATE TABLE IF NOT EXISTS `admin_password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `admin_password_resets_email_index` (`email`),
  KEY `admin_password_resets_token_index` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `admin_transactions`
--

DROP TABLE IF EXISTS `admin_transactions`;
CREATE TABLE IF NOT EXISTS `admin_transactions` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `provider_id` int UNSIGNED DEFAULT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `source` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `details` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `reference` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `admin_transactions_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bank_accounts`
--

DROP TABLE IF EXISTS `bank_accounts`;
CREATE TABLE IF NOT EXISTS `bank_accounts` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `bank` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `number` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `bank_accounts_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `censored_words`
--

DROP TABLE IF EXISTS `censored_words`;
CREATE TABLE IF NOT EXISTS `censored_words` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `words` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `behaviour` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `censored_words_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chat_messages`
--

DROP TABLE IF EXISTS `chat_messages`;
CREATE TABLE IF NOT EXISTS `chat_messages` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `user_chat_id` int UNSIGNED NOT NULL,
  `sender_id` int UNSIGNED NOT NULL,
  `sender_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci,
  `media` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `documents` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `videos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `voice_note` text COLLATE utf8mb4_unicode_ci,
  `sender_reaction` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `receiver_reaction` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `read` tinyint(1) NOT NULL DEFAULT '0',
  `reply` tinyint(1) NOT NULL DEFAULT '0',
  `market` tinyint(1) NOT NULL DEFAULT '0',
  `market_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `chat_message_id` int UNSIGNED DEFAULT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `chat_messages_code_unique` (`code`)
) ;

-- --------------------------------------------------------

--
-- Table structure for table `controls`
--

DROP TABLE IF EXISTS `controls`;
CREATE TABLE IF NOT EXISTS `controls` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `school_id` int UNSIGNED DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `controls_email_unique` (`email`),
  UNIQUE KEY `controls_phone_unique` (`phone`),
  UNIQUE KEY `controls_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `control_schools`
--

DROP TABLE IF EXISTS `control_schools`;
CREATE TABLE IF NOT EXISTS `control_schools` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `control_id` int UNSIGNED NOT NULL,
  `school_id` int UNSIGNED NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `control_schools_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `core_services`
--

DROP TABLE IF EXISTS `core_services`;
CREATE TABLE IF NOT EXISTS `core_services` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `provider_id` int UNSIGNED NOT NULL,
  `core_service_category_id` int UNSIGNED NOT NULL,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `availability` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `core_services_code_unique` (`code`)
) ;

-- --------------------------------------------------------

--
-- Table structure for table `core_service_bookings`
--

DROP TABLE IF EXISTS `core_service_bookings`;
CREATE TABLE IF NOT EXISTS `core_service_bookings` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `provider_id` int UNSIGNED NOT NULL,
  `core_service_id` int UNSIGNED NOT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `core_service_escrow_id` int UNSIGNED DEFAULT NULL,
  `core_service_payment_id` int UNSIGNED DEFAULT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT '0',
  `completed_at` datetime DEFAULT NULL,
  `delivered` tinyint(1) NOT NULL DEFAULT '0',
  `delivered_at` datetime DEFAULT NULL,
  `cancelled` tinyint(1) NOT NULL DEFAULT '0',
  `cancelled_at` datetime DEFAULT NULL,
  `accepted` tinyint(1) NOT NULL DEFAULT '0',
  `accepted_at` datetime DEFAULT NULL,
  `amount` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'enquiry',
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `core_service_bookings_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `core_service_booking_messages`
--

DROP TABLE IF EXISTS `core_service_booking_messages`;
CREATE TABLE IF NOT EXISTS `core_service_booking_messages` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `provider_id` int UNSIGNED DEFAULT NULL,
  `core_service_id` int UNSIGNED NOT NULL,
  `core_service_booking_id` int UNSIGNED NOT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `media` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `videos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `documents` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `voice_note` text COLLATE utf8mb4_unicode_ci,
  `invoice` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `sender` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `read` tinyint(1) NOT NULL DEFAULT '0',
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `core_service_booking_messages_code_unique` (`code`)
) ;

-- --------------------------------------------------------

--
-- Table structure for table `core_service_categories`
--

DROP TABLE IF EXISTS `core_service_categories`;
CREATE TABLE IF NOT EXISTS `core_service_categories` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `core_service_categories_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `core_service_escrows`
--

DROP TABLE IF EXISTS `core_service_escrows`;
CREATE TABLE IF NOT EXISTS `core_service_escrows` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `provider_id` int UNSIGNED NOT NULL,
  `core_service_id` int UNSIGNED NOT NULL,
  `core_service_booking_id` int UNSIGNED NOT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `core_service_payment_id` int UNSIGNED DEFAULT NULL,
  `amount` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ongoing',
  `completed` tinyint(1) NOT NULL DEFAULT '0',
  `completed_at` datetime DEFAULT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `core_service_escrows_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `core_service_payments`
--

DROP TABLE IF EXISTS `core_service_payments`;
CREATE TABLE IF NOT EXISTS `core_service_payments` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `provider_id` int UNSIGNED NOT NULL,
  `core_service_id` int UNSIGNED NOT NULL,
  `core_service_booking_id` int UNSIGNED NOT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `core_service_escrow_id` int UNSIGNED DEFAULT NULL,
  `amount` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reference` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `core_service_payments_reference_unique` (`reference`),
  UNIQUE KEY `core_service_payments_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `core_service_ratings`
--

DROP TABLE IF EXISTS `core_service_ratings`;
CREATE TABLE IF NOT EXISTS `core_service_ratings` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `provider_id` int UNSIGNED DEFAULT NULL,
  `core_service_id` int UNSIGNED NOT NULL,
  `core_service_booking_id` int UNSIGNED NOT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `rating` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `body` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `core_service_ratings_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `core_service_rating_replies`
--

DROP TABLE IF EXISTS `core_service_rating_replies`;
CREATE TABLE IF NOT EXISTS `core_service_rating_replies` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `provider_id` int UNSIGNED DEFAULT NULL,
  `core_service_id` int UNSIGNED NOT NULL,
  `core_service_rating_id` int UNSIGNED NOT NULL,
  `core_service_booking_id` int UNSIGNED NOT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `body` text COLLATE utf8mb4_unicode_ci,
  `media` text COLLATE utf8mb4_unicode_ci,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `core_service_rating_replies_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `core_service_rating_reply_reports`
--

DROP TABLE IF EXISTS `core_service_rating_reply_reports`;
CREATE TABLE IF NOT EXISTS `core_service_rating_reply_reports` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `core_service_id` int UNSIGNED NOT NULL,
  `core_service_booking_id` int UNSIGNED NOT NULL,
  `core_service_reply_id` int UNSIGNED NOT NULL,
  `core_service_report_reason_id` int UNSIGNED DEFAULT NULL,
  `provider_id` int UNSIGNED DEFAULT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `body` text COLLATE utf8mb4_unicode_ci,
  `reply` text COLLATE utf8mb4_unicode_ci,
  `media` text COLLATE utf8mb4_unicode_ci,
  `resolved` tinyint(1) NOT NULL DEFAULT '0',
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `core_service_rating_reply_reports_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `core_service_report_reasons`
--

DROP TABLE IF EXISTS `core_service_report_reasons`;
CREATE TABLE IF NOT EXISTS `core_service_report_reasons` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `reason` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `core_service_report_reasons_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `deleted_accounts`
--

DROP TABLE IF EXISTS `deleted_accounts`;
CREATE TABLE IF NOT EXISTS `deleted_accounts` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT '0',
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `deleted_accounts_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
CREATE TABLE IF NOT EXISTS `departments` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `school_id` int UNSIGNED NOT NULL,
  `faculty_id` int UNSIGNED NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `departments_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faculties`
--

DROP TABLE IF EXISTS `faculties`;
CREATE TABLE IF NOT EXISTS `faculties` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `school_id` int UNSIGNED NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `faculties_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faqs`
--

DROP TABLE IF EXISTS `faqs`;
CREATE TABLE IF NOT EXISTS `faqs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `question` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `answer` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `faqs_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `forums`
--

DROP TABLE IF EXISTS `forums`;
CREATE TABLE IF NOT EXISTS `forums` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `forum_category_id` int UNSIGNED NOT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `photo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `participants` bigint UNSIGNED DEFAULT NULL,
  `students` tinyint(1) NOT NULL DEFAULT '0',
  `students_faculties` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `students_departments` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `students_levels` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `lecturers` tinyint(1) NOT NULL DEFAULT '0',
  `lecturers_faculties` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `lecturers_departments` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `admin_only_message` tinyint(1) NOT NULL DEFAULT '0',
  `staffs` tinyint(1) NOT NULL DEFAULT '0',
  `users` tinyint(1) NOT NULL DEFAULT '0',
  `private` tinyint(1) NOT NULL DEFAULT '0',
  `closed` tinyint(1) NOT NULL DEFAULT '0',
  `enable_comments` tinyint(1) NOT NULL DEFAULT '1',
  `enable_join` tinyint(1) NOT NULL DEFAULT '1',
  `comment` text COLLATE utf8mb4_unicode_ci,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `forums_code_unique` (`code`)
) ;

-- --------------------------------------------------------

--
-- Table structure for table `forum_categories`
--

DROP TABLE IF EXISTS `forum_categories`;
CREATE TABLE IF NOT EXISTS `forum_categories` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `forum_categories_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `forum_join_requests`
--

DROP TABLE IF EXISTS `forum_join_requests`;
CREATE TABLE IF NOT EXISTS `forum_join_requests` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `forum_id` int UNSIGNED NOT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `accepted` tinyint(1) NOT NULL DEFAULT '0',
  `accepted_at` datetime DEFAULT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `forum_join_requests_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `forum_messages`
--

DROP TABLE IF EXISTS `forum_messages`;
CREATE TABLE IF NOT EXISTS `forum_messages` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `forum_id` int UNSIGNED DEFAULT NULL,
  `forum_message_id` int UNSIGNED DEFAULT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `body` longtext COLLATE utf8mb4_unicode_ci,
  `media` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `gifs` longtext COLLATE utf8mb4_unicode_ci,
  `documents` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `videos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `voice_note` longtext COLLATE utf8mb4_unicode_ci,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_pinned` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `forum_messages_code_unique` (`code`)
) ;

-- --------------------------------------------------------

--
-- Table structure for table `forum_message_reactions`
--

DROP TABLE IF EXISTS `forum_message_reactions`;
CREATE TABLE IF NOT EXISTS `forum_message_reactions` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `forum_id` int UNSIGNED NOT NULL,
  `forum_message_id` int UNSIGNED NOT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `reaction` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `forum_message_reactions_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `forum_message_reads`
--

DROP TABLE IF EXISTS `forum_message_reads`;
CREATE TABLE IF NOT EXISTS `forum_message_reads` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `forum_id` int UNSIGNED NOT NULL,
  `forum_message_id` int UNSIGNED NOT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `read` tinyint(1) NOT NULL DEFAULT '0',
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `forum_message_reads_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `forum_message_reports`
--

DROP TABLE IF EXISTS `forum_message_reports`;
CREATE TABLE IF NOT EXISTS `forum_message_reports` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `forum_id` int UNSIGNED NOT NULL,
  `forum_message_id` int UNSIGNED NOT NULL,
  `forum_report_reason_id` int UNSIGNED DEFAULT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `body` text COLLATE utf8mb4_unicode_ci,
  `message` text COLLATE utf8mb4_unicode_ci,
  `media` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `resolved` tinyint(1) NOT NULL DEFAULT '0',
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `forum_message_reports_code_unique` (`code`)
) ;

-- --------------------------------------------------------

--
-- Table structure for table `forum_reports`
--

DROP TABLE IF EXISTS `forum_reports`;
CREATE TABLE IF NOT EXISTS `forum_reports` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `forum_id` int UNSIGNED DEFAULT NULL,
  `forum_report_reason_id` int UNSIGNED DEFAULT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `body` text COLLATE utf8mb4_unicode_ci,
  `resolved` tinyint(1) NOT NULL DEFAULT '0',
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `forum_reports_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `forum_report_reasons`
--

DROP TABLE IF EXISTS `forum_report_reasons`;
CREATE TABLE IF NOT EXISTS `forum_report_reasons` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `reason` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `school_id` int UNSIGNED NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `forum_report_reasons_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `interests`
--

DROP TABLE IF EXISTS `interests`;
CREATE TABLE IF NOT EXISTS `interests` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `interests_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lecturers`
--

DROP TABLE IF EXISTS `lecturers`;
CREATE TABLE IF NOT EXISTS `lecturers` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `phone` varchar(191) NOT NULL,
  `avatar` varchar(191) DEFAULT NULL,
  `interests` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `dob` date DEFAULT NULL,
  `gender` varchar(191) NOT NULL,
  `school_id` int UNSIGNED NOT NULL,
  `faculty_id` int UNSIGNED NOT NULL,
  `department_id` int UNSIGNED DEFAULT NULL,
  `balance` varchar(191) NOT NULL DEFAULT '0',
  `affiliate_balance` varchar(191) NOT NULL DEFAULT '0',
  `bank_information` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `permissions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `email_verified` varchar(191) DEFAULT NULL,
  `phone_verified` tinyint(1) NOT NULL DEFAULT '0',
  `face_id` varchar(191) DEFAULT NULL,
  `face_verified` tinyint(1) NOT NULL DEFAULT '0',
  `id_verification` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `id_verified` tinyint(1) NOT NULL DEFAULT '0',
  `user_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `send_next_otp_sms_after` datetime DEFAULT NULL,
  `next_school_data_update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `core_service_earning_times` int NOT NULL DEFAULT '0',
  `password_reset_code` varchar(191) DEFAULT NULL,
  `online` varchar(191) DEFAULT 'online',
  `type` varchar(191) NOT NULL DEFAULT 'lecturer',
  `code` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `dfsdasdeder` text,
  `remember_token` varchar(100) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lecturers_email_unique` (`email`),
  UNIQUE KEY `lecturers_phone_unique` (`phone`),
  UNIQUE KEY `lecturers_code_unique` (`code`)
) ;

-- --------------------------------------------------------

--
-- Table structure for table `lecturer_password_resets`
--

DROP TABLE IF EXISTS `lecturer_password_resets`;
CREATE TABLE IF NOT EXISTS `lecturer_password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `lecturer_password_resets_email_index` (`email`),
  KEY `lecturer_password_resets_token_index` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `legals`
--

DROP TABLE IF EXISTS `legals`;
CREATE TABLE IF NOT EXISTS `legals` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `terms` longtext COLLATE utf8mb4_unicode_ci,
  `privacy` longtext COLLATE utf8mb4_unicode_ci,
  `security` longtext COLLATE utf8mb4_unicode_ci,
  `cookie` longtext COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `levels`
--

DROP TABLE IF EXISTS `levels`;
CREATE TABLE IF NOT EXISTS `levels` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `school_id` int UNSIGNED NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `levels_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `market_products`
--

DROP TABLE IF EXISTS `market_products`;
CREATE TABLE IF NOT EXISTS `market_products` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `market_product_tag_id` int UNSIGNED NOT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `images` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cost` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `whatsapp` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `market_products_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `market_product_comments`
--

DROP TABLE IF EXISTS `market_product_comments`;
CREATE TABLE IF NOT EXISTS `market_product_comments` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `market_product_id` int UNSIGNED DEFAULT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `body` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `market_product_comments_code_unique` (`code`)
) ;

-- --------------------------------------------------------

--
-- Table structure for table `market_product_comment_reactions`
--

DROP TABLE IF EXISTS `market_product_comment_reactions`;
CREATE TABLE IF NOT EXISTS `market_product_comment_reactions` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `market_product_id` int UNSIGNED NOT NULL,
  `market_product_comment_id` int UNSIGNED DEFAULT NULL,
  `market_product_comment_reply_id` int UNSIGNED DEFAULT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `market_product_comment_reactions_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `market_product_comment_replies`
--

DROP TABLE IF EXISTS `market_product_comment_replies`;
CREATE TABLE IF NOT EXISTS `market_product_comment_replies` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `market_product_id` int UNSIGNED DEFAULT NULL,
  `market_product_comment_id` int UNSIGNED DEFAULT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `body` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `market_product_comment_replies_code_unique` (`code`)
) ;

-- --------------------------------------------------------

--
-- Table structure for table `market_product_reports`
--

DROP TABLE IF EXISTS `market_product_reports`;
CREATE TABLE IF NOT EXISTS `market_product_reports` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `market_product_id` int UNSIGNED NOT NULL,
  `market_report_reason_id` int UNSIGNED NOT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `body` text COLLATE utf8mb4_unicode_ci,
  `resolved` tinyint(1) NOT NULL DEFAULT '0',
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `market_product_reports_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `market_product_tags`
--

DROP TABLE IF EXISTS `market_product_tags`;
CREATE TABLE IF NOT EXISTS `market_product_tags` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `market_product_tags_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `market_report_reasons`
--

DROP TABLE IF EXISTS `market_report_reasons`;
CREATE TABLE IF NOT EXISTS `market_report_reasons` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `reason` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `market_report_reasons_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `market_services`
--

DROP TABLE IF EXISTS `market_services`;
CREATE TABLE IF NOT EXISTS `market_services` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `market_service_tag_id` int UNSIGNED NOT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `images` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cost` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `whatsapp` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `market_services_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `market_service_comments`
--

DROP TABLE IF EXISTS `market_service_comments`;
CREATE TABLE IF NOT EXISTS `market_service_comments` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `market_service_id` int UNSIGNED DEFAULT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `body` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `market_service_comments_code_unique` (`code`)
) ;

-- --------------------------------------------------------

--
-- Table structure for table `market_service_comment_reactions`
--

DROP TABLE IF EXISTS `market_service_comment_reactions`;
CREATE TABLE IF NOT EXISTS `market_service_comment_reactions` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `market_service_id` int UNSIGNED NOT NULL,
  `market_service_comment_id` int UNSIGNED DEFAULT NULL,
  `market_service_comment_reply_id` int UNSIGNED DEFAULT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `market_service_comment_reactions_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `market_service_comment_replies`
--

DROP TABLE IF EXISTS `market_service_comment_replies`;
CREATE TABLE IF NOT EXISTS `market_service_comment_replies` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `market_service_id` int UNSIGNED DEFAULT NULL,
  `market_service_comment_id` int UNSIGNED DEFAULT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `body` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `market_service_comment_replies_code_unique` (`code`)
) ;

-- --------------------------------------------------------

--
-- Table structure for table `market_service_reports`
--

DROP TABLE IF EXISTS `market_service_reports`;
CREATE TABLE IF NOT EXISTS `market_service_reports` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `market_service_id` int UNSIGNED NOT NULL,
  `market_report_reason_id` int UNSIGNED NOT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `body` text COLLATE utf8mb4_unicode_ci,
  `resolved` tinyint(1) NOT NULL DEFAULT '0',
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `market_service_reports_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `market_service_tags`
--

DROP TABLE IF EXISTS `market_service_tags`;
CREATE TABLE IF NOT EXISTS `market_service_tags` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `market_service_tags_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
CREATE TABLE IF NOT EXISTS `news` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED DEFAULT NULL,
  `news_category_id` int UNSIGNED DEFAULT NULL,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `excerpt` text COLLATE utf8mb4_unicode_ci,
  `body` longtext COLLATE utf8mb4_unicode_ci,
  `media` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `video` text COLLATE utf8mb4_unicode_ci,
  `tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `faculties` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `departments` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `levels` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `interests` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `students` tinyint(1) NOT NULL DEFAULT '1',
  `staffs` tinyint(1) NOT NULL DEFAULT '1',
  `lecturers` tinyint(1) NOT NULL DEFAULT '1',
  `users` tinyint(1) NOT NULL DEFAULT '1',
  `featured` tinyint(1) NOT NULL DEFAULT '0',
  `enable_comments` tinyint(1) NOT NULL DEFAULT '1',
  `enable_reactions` tinyint(1) NOT NULL DEFAULT '1',
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `news_code_unique` (`code`)
) ;

-- --------------------------------------------------------

--
-- Table structure for table `news_categories`
--

DROP TABLE IF EXISTS `news_categories`;
CREATE TABLE IF NOT EXISTS `news_categories` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `news_categories_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `news_comments`
--

DROP TABLE IF EXISTS `news_comments`;
CREATE TABLE IF NOT EXISTS `news_comments` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `news_id` int UNSIGNED DEFAULT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `body` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `news_comments_code_unique` (`code`)
) ;

-- --------------------------------------------------------

--
-- Table structure for table `news_comment_reactions`
--

DROP TABLE IF EXISTS `news_comment_reactions`;
CREATE TABLE IF NOT EXISTS `news_comment_reactions` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `news_id` int UNSIGNED NOT NULL,
  `news_comment_id` int UNSIGNED DEFAULT NULL,
  `news_comment_reply_id` int UNSIGNED DEFAULT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `news_comment_reactions_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `news_comment_replies`
--

DROP TABLE IF EXISTS `news_comment_replies`;
CREATE TABLE IF NOT EXISTS `news_comment_replies` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `news_id` int UNSIGNED DEFAULT NULL,
  `news_comment_id` int UNSIGNED DEFAULT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `body` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `news_comment_replies_code_unique` (`code`)
) ;

-- --------------------------------------------------------

--
-- Table structure for table `news_reactions`
--

DROP TABLE IF EXISTS `news_reactions`;
CREATE TABLE IF NOT EXISTS `news_reactions` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `news_id` int UNSIGNED NOT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `news_reactions_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `provider_id` int UNSIGNED DEFAULT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `school_id` int UNSIGNED NOT NULL,
  `sender_id` int UNSIGNED NOT NULL,
  `sender_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtype` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `read` tinyint(1) NOT NULL DEFAULT '0',
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `notifications_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `otps`
--

DROP TABLE IF EXISTS `otps`;
CREATE TABLE IF NOT EXISTS `otps` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `pin` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pin_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `otps_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
CREATE TABLE IF NOT EXISTS `permissions` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `providers`
--

DROP TABLE IF EXISTS `providers`;
CREATE TABLE IF NOT EXISTS `providers` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dob` date DEFAULT NULL,
  `avatar` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_verified` tinyint(1) NOT NULL DEFAULT '0',
  `school_id` int UNSIGNED NOT NULL,
  `balance` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `percentage` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `withdrawal` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `permissions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `bank_information` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `id_verification` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `id_verified` tinyint(1) NOT NULL DEFAULT '0',
  `last_login` datetime DEFAULT NULL,
  `send_next_otp_sms_after` datetime DEFAULT NULL,
  `fcm_token` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password_reset_code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `online` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'online',
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dfsdasdeder` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `providers_email_unique` (`email`),
  UNIQUE KEY `providers_phone_unique` (`phone`),
  UNIQUE KEY `providers_code_unique` (`code`)
) ;

-- --------------------------------------------------------

--
-- Table structure for table `provider_transactions`
--

DROP TABLE IF EXISTS `provider_transactions`;
CREATE TABLE IF NOT EXISTS `provider_transactions` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `provider_id` int UNSIGNED NOT NULL,
  `amount` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `details` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `sender` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `receiver` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reference` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `admin_fee` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `provider_transactions_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `provider_withdrawals`
--

DROP TABLE IF EXISTS `provider_withdrawals`;
CREATE TABLE IF NOT EXISTS `provider_withdrawals` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `provider_id` int UNSIGNED NOT NULL,
  `amount` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `account` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `approved` tinyint(1) NOT NULL DEFAULT '0',
  `approved_at` datetime DEFAULT NULL,
  `reference` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `provider_withdrawals_reference_unique` (`reference`),
  UNIQUE KEY `provider_withdrawals_code_unique` (`code`)
) ;

-- --------------------------------------------------------

--
-- Table structure for table `referrals`
--

DROP TABLE IF EXISTS `referrals`;
CREATE TABLE IF NOT EXISTS `referrals` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `person_id` int UNSIGNED NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `referrals_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles_permissions`
--

DROP TABLE IF EXISTS `roles_permissions`;
CREATE TABLE IF NOT EXISTS `roles_permissions` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `role_id` int UNSIGNED NOT NULL,
  `permission_id` int UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `schools`
--

DROP TABLE IF EXISTS `schools`;
CREATE TABLE IF NOT EXISTS `schools` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `schools_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
CREATE TABLE IF NOT EXISTS `settings` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` varchar(191) DEFAULT NULL,
  `phone` varchar(191) DEFAULT NULL,
  `lecturers` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `students` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `staffs` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `users` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `controls` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `providers` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `affiliates` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `market_place` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `wallet` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `verification` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `withdrawal` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `forums` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `core_services` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `send_sms` tinyint(1) NOT NULL DEFAULT '0',
  `send_email` tinyint(1) NOT NULL DEFAULT '1',
  `facebook` varchar(191) DEFAULT NULL,
  `twitter` varchar(191) DEFAULT NULL,
  `tiktok` varchar(191) DEFAULT NULL,
  `instagram` varchar(191) DEFAULT NULL,
  `whatsapp` varchar(191) DEFAULT NULL,
  `youtube` varchar(191) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ;

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
CREATE TABLE IF NOT EXISTS `staff` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `phone` varchar(191) NOT NULL,
  `avatar` varchar(191) DEFAULT NULL,
  `interests` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `dob` date DEFAULT NULL,
  `gender` varchar(191) NOT NULL,
  `school_id` int UNSIGNED NOT NULL,
  `balance` varchar(191) NOT NULL DEFAULT '0',
  `affiliate_balance` varchar(191) NOT NULL DEFAULT '0',
  `bank_information` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `permissions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `email_verified` varchar(191) DEFAULT NULL,
  `phone_verified` tinyint(1) NOT NULL DEFAULT '0',
  `face_id` varchar(191) DEFAULT NULL,
  `face_verified` tinyint(1) NOT NULL DEFAULT '0',
  `id_verification` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `id_verified` tinyint(1) NOT NULL DEFAULT '0',
  `user_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `send_next_otp_sms_after` datetime DEFAULT NULL,
  `core_service_earning_times` int NOT NULL DEFAULT '0',
  `password_reset_code` varchar(191) DEFAULT NULL,
  `online` varchar(191) DEFAULT 'online',
  `type` varchar(191) NOT NULL DEFAULT 'staff',
  `code` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `dfsdasdeder` text,
  `remember_token` varchar(100) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `staff_email_unique` (`email`),
  UNIQUE KEY `staff_phone_unique` (`phone`),
  UNIQUE KEY `staff_code_unique` (`code`)
) ;

-- --------------------------------------------------------

--
-- Table structure for table `staff_password_resets`
--

DROP TABLE IF EXISTS `staff_password_resets`;
CREATE TABLE IF NOT EXISTS `staff_password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `staff_password_resets_email_index` (`email`),
  KEY `staff_password_resets_token_index` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
CREATE TABLE IF NOT EXISTS `students` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `interests` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `dob` date DEFAULT NULL,
  `gender` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `school_id` int UNSIGNED NOT NULL,
  `faculty_id` int UNSIGNED NOT NULL,
  `department_id` int UNSIGNED NOT NULL,
  `level_id` int UNSIGNED NOT NULL,
  `balance` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `affiliate_balance` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `bank_information` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `permissions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `email_verified` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_verified` tinyint(1) NOT NULL DEFAULT '1',
  `face_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `face_verified` tinyint(1) NOT NULL DEFAULT '0',
  `id_verification` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `id_verified` tinyint(1) NOT NULL DEFAULT '0',
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `send_next_otp_sms_after` datetime DEFAULT NULL,
  `next_school_data_update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `core_service_earning_times` int NOT NULL DEFAULT '0',
  `password_reset_code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `online` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'online',
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'student',
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dfsdasdeder` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `students_email_unique` (`email`),
  UNIQUE KEY `students_phone_unique` (`phone`),
  UNIQUE KEY `students_code_unique` (`code`)
) ;

-- --------------------------------------------------------

--
-- Table structure for table `student_password_resets`
--

DROP TABLE IF EXISTS `student_password_resets`;
CREATE TABLE IF NOT EXISTS `student_password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `student_password_resets_email_index` (`email`),
  KEY `student_password_resets_token_index` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `support_messages`
--

DROP TABLE IF EXISTS `support_messages`;
CREATE TABLE IF NOT EXISTS `support_messages` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `customer_support_id` int UNSIGNED DEFAULT NULL,
  `provider_id` int UNSIGNED DEFAULT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `sender` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `read` tinyint(1) NOT NULL DEFAULT '0',
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `support_messages_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `phone` varchar(191) NOT NULL,
  `avatar` varchar(191) DEFAULT NULL,
  `interests` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `dob` date DEFAULT NULL,
  `gender` varchar(191) NOT NULL,
  `school_id` int UNSIGNED NOT NULL,
  `balance` varchar(191) NOT NULL DEFAULT '0',
  `affiliate_balance` varchar(191) NOT NULL DEFAULT '0',
  `bank_information` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `permissions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `email_verified` varchar(191) DEFAULT NULL,
  `phone_verified` tinyint(1) NOT NULL DEFAULT '0',
  `face_id` varchar(191) DEFAULT NULL,
  `face_verified` tinyint(1) NOT NULL DEFAULT '0',
  `id_verification` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `id_verified` tinyint(1) NOT NULL DEFAULT '0',
  `user_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `send_next_otp_sms_after` datetime DEFAULT NULL,
  `core_service_earning_times` int NOT NULL DEFAULT '0',
  `password_reset_code` varchar(191) DEFAULT NULL,
  `online` varchar(191) DEFAULT 'online',
  `type` varchar(191) NOT NULL DEFAULT 'user',
  `code` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `dfsdasdeder` text,
  `remember_token` varchar(100) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_phone_unique` (`phone`),
  UNIQUE KEY `users_code_unique` (`code`)
) ;

-- --------------------------------------------------------

--
-- Table structure for table `user_chats`
--

DROP TABLE IF EXISTS `user_chats`;
CREATE TABLE IF NOT EXISTS `user_chats` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `user_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `person_id` int UNSIGNED NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_chats_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_forums`
--

DROP TABLE IF EXISTS `user_forums`;
CREATE TABLE IF NOT EXISTS `user_forums` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `forum_id` int UNSIGNED NOT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `level_id` int UNSIGNED DEFAULT NULL,
  `faculty_id` int UNSIGNED DEFAULT NULL,
  `department_id` int UNSIGNED DEFAULT NULL,
  `owner` tinyint(1) NOT NULL DEFAULT '0',
  `forum_join_request_id` int UNSIGNED DEFAULT NULL,
  `accepted` tinyint(1) NOT NULL DEFAULT '1',
  `accepted_at` datetime DEFAULT NULL,
  `kicked` tinyint(1) NOT NULL DEFAULT '0',
  `kicked_at` datetime DEFAULT NULL,
  `kicked_reason` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `left` tinyint(1) NOT NULL DEFAULT '0',
  `left_at` datetime DEFAULT NULL,
  `left_reason` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `comment` text COLLATE utf8mb4_unicode_ci,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_forums_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_password_resets`
--

DROP TABLE IF EXISTS `user_password_resets`;
CREATE TABLE IF NOT EXISTS `user_password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `user_password_resets_email_index` (`email`),
  KEY `user_password_resets_token_index` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_wallet_deposits`
--

DROP TABLE IF EXISTS `user_wallet_deposits`;
CREATE TABLE IF NOT EXISTS `user_wallet_deposits` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `bank_account_id` int UNSIGNED DEFAULT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `amount` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `receipt` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reference` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `approved` tinyint(1) NOT NULL DEFAULT '1',
  `approved_at` datetime NOT NULL DEFAULT '2024-06-02 06:04:19',
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_wallet_deposits_reference_unique` (`reference`),
  UNIQUE KEY `user_wallet_deposits_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_wallet_transactions`
--

DROP TABLE IF EXISTS `user_wallet_transactions`;
CREATE TABLE IF NOT EXISTS `user_wallet_transactions` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `amount` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `details` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `sender` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `receiver` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reference` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `admin_fee` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_wallet_transactions_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_wallet_withdrawals`
--

DROP TABLE IF EXISTS `user_wallet_withdrawals`;
CREATE TABLE IF NOT EXISTS `user_wallet_withdrawals` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` int UNSIGNED NOT NULL,
  `student_id` int UNSIGNED DEFAULT NULL,
  `staff_id` int UNSIGNED DEFAULT NULL,
  `lecturer_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `amount` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `source` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `account` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `approved` tinyint(1) NOT NULL DEFAULT '0',
  `approved_at` datetime DEFAULT NULL,
  `reference` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_wallet_withdrawals_reference_unique` (`reference`),
  UNIQUE KEY `user_wallet_withdrawals_code_unique` (`code`)
) ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
