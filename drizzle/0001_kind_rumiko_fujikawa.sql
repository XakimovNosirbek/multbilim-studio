CREATE TABLE `contact_briefs` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`company` text,
	`topic` text NOT NULL,
	`details` text NOT NULL,
	`status` text DEFAULT 'new' NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_contact_briefs_created_at` ON `contact_briefs` (`created_at`);--> statement-breakpoint
CREATE INDEX `idx_contact_briefs_status` ON `contact_briefs` (`status`);