CREATE TABLE IF NOT EXISTS "tickets" (
	"id" serial PRIMARY KEY NOT NULL,
	"email_id" varchar(255) NOT NULL,
	"user_id" varchar(300) NOT NULL,
	"is_read" boolean DEFAULT false,
	"read_at" timestamp,
	"last_ping_at" timestamp,
	"duration" integer DEFAULT 0 NOT NULL,
	"read_counts" integer DEFAULT 0 NOT NULL,
	"ip_address" varchar(100),
	"location" varchar(200),
	"browser" varchar(100),
	"device_info" varchar(300),
	"system" varchar(200),
	"send_date" timestamp DEFAULT CURRENT_TIMESTAMP,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "email_id_idx" ON "tickets" USING btree ("email_id");