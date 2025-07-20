ALTER TABLE "category_option_values" ALTER COLUMN "category_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "project_options" ALTER COLUMN "project_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "project_options" ALTER COLUMN "category_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "project_options" ALTER COLUMN "option_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "created_by_uid" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "uid" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "contact_instagram" varchar(255);--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "contact_linkedin" varchar(255);--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "contact_email" varchar(255);--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "contact_whatsapp" varchar(255);