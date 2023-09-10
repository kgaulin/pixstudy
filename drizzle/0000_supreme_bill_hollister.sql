CREATE TABLE `WordlyGameSetting` (
	`id` varchar(191) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`userId` varchar(191) NOT NULL,
	`status` enum('started','finished') NOT NULL DEFAULT 'started',
	`settings` json NOT NULL,
	`wordListId` varchar(191) NOT NULL,
	CONSTRAINT `WordlyGameSetting_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `WordlyWord` (
	`id` varchar(191) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`name` varchar(256) NOT NULL,
	`userId` varchar(191) NOT NULL,
	`wordListId` varchar(191) NOT NULL,
	CONSTRAINT `WordlyWord_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `WordlyWordList` (
	`id` varchar(191) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`archivedAt` timestamp,
	`name` varchar(256) NOT NULL,
	`userId` varchar(191) NOT NULL,
	CONSTRAINT `WordlyWordList_id` PRIMARY KEY(`id`)
);
