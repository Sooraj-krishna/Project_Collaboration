-- Migration: Add contact fields for project collaboration
ALTER TABLE projects ADD COLUMN contact_instagram VARCHAR(255);
ALTER TABLE projects ADD COLUMN contact_linkedin VARCHAR(255);
ALTER TABLE projects ADD COLUMN contact_email VARCHAR(255);
ALTER TABLE projects ADD COLUMN contact_whatsapp VARCHAR(255); 