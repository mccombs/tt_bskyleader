CREATE TABLE `profile` (
	`did` text PRIMARY KEY NOT NULL,
	`handle` text NOT NULL,
	`description` text,
	`avatar` text,
	`followers_count` integer
);
