CREATE TABLE `analytics_visits` (
	`id` text PRIMARY KEY NOT NULL,
	`visitor_id` text NOT NULL,
	`visited_at` integer NOT NULL,
	`path` text NOT NULL,
	`referrer_origin` text,
	`language` text,
	`device_type` text,
	`timezone` text,
	`consent_version` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_analytics_visits_visited_at` ON `analytics_visits` (`visited_at`);--> statement-breakpoint
CREATE INDEX `idx_analytics_visits_visitor_id` ON `analytics_visits` (`visitor_id`);--> statement-breakpoint
PRAGMA optimize;
