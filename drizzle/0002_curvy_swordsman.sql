CREATE TABLE IF NOT EXISTS "reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"report_name" text NOT NULL,
	"period_details" text NOT NULL,
	"created" timestamp NOT NULL,
	"report_key_name" text NOT NULL,
	"is_archive" boolean DEFAULT false,
	"period_one" text,
	"period_two" text,
	"period_three" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_adminId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "full_name" varchar(255) DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "admin_id" uuid;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "sub_role" varchar DEFAULT 'unit';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "cover_image" text DEFAULT '';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "refresh_token" text DEFAULT '';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "user_limit" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "is_active" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "is_verified" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "otp" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "verified_date" timestamp;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "otp_expire_time" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reports" ADD CONSTRAINT "reports_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_admin_id_users_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "fullName";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "adminId";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "subRole";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "coverImage";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "refreshToken";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "userLimit";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "isActive";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "isVerified";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "OTP";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "verifiedDate";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "otpExpireTime";