ALTER TABLE "tickets" RENAME COLUMN "email_id" TO "email_unique_id";--> statement-breakpoint
DROP INDEX IF EXISTS "email_id_idx";--> statement-breakpoint
ALTER TABLE "tickets" ALTER COLUMN "email_unique_id" SET DATA TYPE varchar(500);--> statement-breakpoint
ALTER TABLE "tickets" ADD COLUMN "email" varchar(300) DEFAULT '';--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "email_unique_id_idx" ON "tickets" USING btree ("email_unique_id");