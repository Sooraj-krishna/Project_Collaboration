// components/projectcard.tsx

import { useState } from "react";
import { CalendarDays, WalletCards, Users, ChevronDown, ChevronUp, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform ${expanded ? "scale-105" : "hover:-translate-y-1"}`}
      onClick={toggleExpand}
    >
      <div className="md:flex">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 md:w-1/3">
          <h2 className="text-white text-xl font-semibold mb-2">
            {project.projectName}
          </h2>
          {!expanded && <p className="text-gray-200 text-sm">{project.projectDescription.slice(0, 100) + "..."}</p>}
          {expanded && project.members && (
            <div className="flex flex-wrap gap-2 mt-4">
              {project.members.map((member, index) => (
                <div key={index} className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  <span>{member.name}</span>
                  <Link href={member.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 text-blue-500 hover:text-blue-700">
                    <img src="/linkedin.svg" alt="LinkedIn" className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 space-y-4 md:w-2/3 md:flex md:flex-col md:justify-between">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 group">
              <CalendarDays className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-gray-500 text-xs">Year</p>
                <p className="text-gray-800 font-medium">{project.yearOfSubmission}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 group">
              <WalletCards className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-gray-500 text-xs">Project Type</p>
                <p className="text-gray-800 font-medium">{project.projectType}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 group">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-gray-500 text-xs">Domain</p>
                <p className="text-gray-800 font-medium">{project.customDomain || project.domain}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-start">
            <Link href={project.projectLink} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-all duration-300 hover:shadow-lg">
              <LinkIcon className="w-4 h-4 group-hover:animate-bounce" />
              <span>View Project</span>
            </Link>
          </div>
          
          {expanded && (
            <p className="text-gray-800 text-sm mt-4">{project.projectDescription}</p>
          )}

          <div className="mt-4 flex justify-between items-center">
            <button className="text-blue-600 hover:text-blue-800" onClick={toggleExpand}>
              {expanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
