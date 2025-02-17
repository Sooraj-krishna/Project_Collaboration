"use client";

import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import projectsData from "@/data/projects.json";
import { Project } from "@/types/project";
import { p } from "framer-motion/client";

interface ProjectGridProps {
  activeTab: string;
  filters: Record<string, string[]>; // Accept selected filters
}

const ProjectGrid = ({ activeTab, filters }: ProjectGridProps) => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    let filteredProjects: Project[] = projectsData.map((p) => ({
      ...p,
      createdAt: p.createdAt ?? new Date().toISOString(), // Ensure createdAt exists
      department: Array.isArray(p.department) ? p.department.join(", ") : p.department // Convert array to string
    }));

    // Apply Tab Filters
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    switch (activeTab) {
      case "All":
        // No filtering, show all projects
        break;

      case "Latest":
        filteredProjects = filteredProjects
          .filter((p) => new Date(p.createdAt) >= oneMonthAgo)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;

      case "Oldest":
        filteredProjects = filteredProjects.sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;

      case "This Week":
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        filteredProjects = filteredProjects.filter(
          (p) => new Date(p.createdAt) >= oneWeekAgo
        );
        break;
    }

    // Apply Other Filters
    Object.entries(filters).forEach(([key, values]) => {
      if (values.length > 0) {
        if (key === "Domain") {
          // Special case: Handle "Others" for custom domain projects
          filteredProjects = filteredProjects.filter((p) =>
            values.includes(p.domain) || values.includes("Others")
            // values.includes("Others")
            //   ? p.customDomain && !values.includes(p.domain) // Show projects with a custom domain
            //   : values.includes(p.domain) 
          );
        } else if(key ==="Department"){
          filteredProjects = filteredProjects.filter((p)=>
          values.includes(p.department)
         );
        }

        else if(key ==="Year of Submission"){
          filteredProjects = filteredProjects.filter((p)=>
          values.includes(p.yearOfSubmission)
         );
        }
        else if(key ==="Project Type"){
          filteredProjects = filteredProjects.filter((p)=>
            values.includes(p.projectType));
        }
        else {
          // General filtering for other categories
          filteredProjects = filteredProjects.filter((p) => {
            const projectValue = p[key as keyof Project];

            // Ensure that projectValue is a string before filtering
            if (typeof projectValue === "string") {
              return values.includes(projectValue);
            }

            return false;
          });
        }
      }
    });

    setProjects(filteredProjects);
  }, [activeTab, filters]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6 animate-fadeIn">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <div
              key={index}
              className="opacity-0 animate-slideUp"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
            >
              <ProjectCard project={project} />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No projects available.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectGrid;
