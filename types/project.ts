export interface Project {
  projectName: string;
  projectDescription: string;
  yearOfSubmission: string;
  department: string; // Ensure this is a string, not an array
  projectType: string;
  domain: string;
  customDomain?: string;
  projectLink: string;
  members?: { name: string; linkedin: string }[];
  createdAt: string; // Ensure createdAt exists as a string (ISO format)
}
