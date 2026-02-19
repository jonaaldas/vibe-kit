CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`googleid` text,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`given_name` text NOT NULL,
	`family_name` text NOT NULL,
	`picture` text NOT NULL,
	`verified_email` integer,
	`stripe_customer_id` text,
	`subscription_id` text,
	`subscription_status` text,
	`price_id` text,
	`current_period_end` integer,
	`updated_at` integer,
	`created_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_stripe_customer_id_unique` ON `users` (`stripe_customer_id`);