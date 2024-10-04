DROP TABLE "reports";--> statement-breakpoint
DROP TABLE "users";--> statement-breakpoint
ALTER TABLE "tickets" DROP COLUMN IF EXISTS "read_counts";--> statement-breakpoint
ALTER TABLE "tickets" DROP COLUMN IF EXISTS "send_date";