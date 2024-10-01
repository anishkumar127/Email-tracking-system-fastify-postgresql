CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"fullName" varchar(255) DEFAULT '' NOT NULL,
	"adminId" uuid,
	"role" varchar DEFAULT 'user' NOT NULL,
	"subRole" varchar DEFAULT 'unit',
	"avatar" text DEFAULT '',
	"coverImage" text DEFAULT '',
	"password" varchar(255) NOT NULL,
	"refreshToken" text DEFAULT '',
	"userLimit" integer DEFAULT 0,
	"isActive" boolean DEFAULT true NOT NULL,
	"location" text DEFAULT '',
	"isVerified" boolean DEFAULT false NOT NULL,
	"OTP" varchar(6) DEFAULT '' NOT NULL,
	"verifiedDate" timestamp,
	"otpExpireTime" timestamp DEFAULT now() NOT NULL,
	"fingerprint_img" text DEFAULT '',
	"fingerprint_key" text DEFAULT '',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_adminId_users_id_fk" FOREIGN KEY ("adminId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
