"use client";

import React, { useState } from "react";
import { ArrowLeft, Save, XCircle } from "lucide-react";
import Link from "next/link";

const submissionYears = [2029, 2028, 2027, 2026, 2025, 2024, 2023];
const projectTypes = ["Final year project", "Mini Project", "Research project", "Personal project", "Others"];
const departments = ["CSE", "IT", "ECE", "EEE", "MECH", "CIVIL", "Other"];
const availableDomains = [
  "Other",
  "Web Development",
  "Mobile App Development (Android & iOS)",
  "Artificial Intelligence (AI) & Machine Learning (ML)",
  "Data Science & Big Data Analytics",
  "Cybersecurity & Ethical Hacking",
  "Blockchain & Cryptocurrency",
  "Cloud Computing & DevOps",
  "Game Development & AR/VR",
  "Internet of Things (IoT)",
  "Natural Language Processing (NLP)",
  "Database Management & Data Warehousing",
  "Quantum Computing",
  "Software Testing & Automation",
  "Full Stack Development (MERN, MEAN, etc.)",
  "UI/UX & Human-Computer Interaction",
  "Computer Networks & Network Security",
  "Augmented Reality (AR) & Virtual Reality (VR)",
  "E-commerce & CMS Development",
  "No-Code & Low-Code Development",
  "Cloud Security & Serverless Computing",
  "DevOps & Site Reliability Engineering (SRE)",
  "Edge Computing & Distributed Systems",
  "IT Infrastructure & System Administration",
  "Data Engineering & Business Intelligence",
  "IT Governance & Compliance",
  "Structural Engineering & Earthquake-Resistant Design",
  "Transportation & Highway Engineering",
  "Geotechnical Engineering & Soil Mechanics",
  "Smart Cities & Urban Planning",
  "Sustainable & Green Building Technology",
  "Hydraulics & Water Resource Engineering",
  "Construction Management & Project Planning",
  "Environmental Engineering & Waste Management",
  "Building Information Modeling (BIM)",
  "Disaster Management & Risk Analysis",
  "Bridge & Tunnel Engineering",
  "Surveying & Remote Sensing (GIS & GPS)",
  "VLSI & Chip Design",
  "Embedded Systems & Microcontrollers",
  "Wireless Communication (5G, LTE, Satellite)",
  "Signal & Image Processing",
  "Optical Fiber & Photonics",
  "Digital & Analog Circuit Design",
  "Antenna & RF Engineering",
  "Smart Sensors & Wearable Technology",
  "Audio & Speech Processing",
  "Biomedical Electronics & Bionics",
  "MEMS & Nanoelectronics",
  "Power Systems & Smart Grids",
  "Renewable Energy (Solar, Wind, Hydro)",
  "Control Systems & Automation",
  "Robotics & Mechatronics",
  "Electric Vehicles (EV) & Battery Technologies",
  "High Voltage Engineering",
  "Energy Management & Conservation",
  "Industrial Instrumentation & Process Control",
  "Electrical Machines & Drives",
  "Smart Home & Building Automation",
  "CAD, CAM & 3D Printing",
  "Automotive & Aerospace Engineering",
  "Thermodynamics & Fluid Mechanics",
  "Mechatronics & Smart Manufacturing",
  "HVAC & Refrigeration Systems",
  "Material Science & Composites",
  "Renewable Energy in Mechanical Systems",
  "Computational Fluid Dynamics (CFD)",
  "Finite Element Analysis (FEA)"
];

const AddProjectPage = () => {
  const initialFormState = {
    projectName: "",
    projectDescription: "",
    yearOfSubmission: "2025",
    projectType: "Personal project",
    department: "",
    domain: "Web Development",
    customDomain: "",
    projectLink: "",
    members: [{ name: "", linkedin: "" }],
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure at least one member has a name
    const hasValidMember = formData.members.some(member => member.name.trim() !== "");
    if (!hasValidMember) {
      alert("Please enter at least one member name.");
      return;
    }

    // Filter out empty members
    const filteredMembers = formData.members.filter(member => member.name.trim() !== "");

    const projectData = {
      ...formData,
      members: filteredMembers,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch("/api/saveProject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        alert("Project saved successfully!");
        setFormData(initialFormState);
      } else {
        alert("Failed to save project.");
      }
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMemberChange = (index: number, field: string, value: string) => {
    const updatedMembers = [...formData.members];
    updatedMembers[index][field as keyof typeof updatedMembers[0]] = value;
    setFormData({ ...formData, members: updatedMembers });
  };

  const addMember = () => {
    setFormData({ ...formData, members: [...formData.members, { name: "", linkedin: "" }] });
  };

  const removeMember = (index: number) => {
    const updatedMembers = formData.members.filter((_, i) => i !== index);
    setFormData({ ...formData, members: updatedMembers });
  };

  const clearForm = () => {
    setFormData(initialFormState);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center space-x-4">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Add New Project</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <input type="text" name="projectName" required className="w-full px-4 py-2 border rounded-lg" placeholder="Project Name" onChange={handleChange} value={formData.projectName} />
          <textarea name="projectDescription" required rows={4} className="w-full px-4 py-2 border rounded-lg" placeholder="Project Description" onChange={handleChange} value={formData.projectDescription} />
          <select name="yearOfSubmission" required className="w-full px-4 py-2 border rounded-lg" onChange={handleChange} value={formData.yearOfSubmission}>
            {submissionYears.map((year) => (<option key={year} value={year}>{year}</option>))}
          </select>
          <select name="projectType" required className="w-full px-4 py-2 border rounded-lg" onChange={handleChange} value={formData.projectType}>
            {projectTypes.map((type) => (<option key={type} value={type}>{type}</option>))}
          </select>
          <select name="department" required className="w-full px-4 py-2 border rounded-lg" onChange={handleChange} value={formData.department}>
            {departments.map((dept) => (<option key={dept} value={dept}>{dept}</option>))}
          </select>
          <select name="domain" required className="w-full px-4 py-2 border rounded-lg" onChange={handleChange} value={formData.domain}>
            {availableDomains.map((domain) => (<option key={domain} value={domain}>{domain}</option>))}
          </select>
          {formData.domain === "Other" && (
            <input type="text" name="customDomain" className="w-full px-4 py-2 border rounded-lg" placeholder="Enter custom domain" onChange={handleChange} value={formData.customDomain} />
          )}
          <input type="url" name="projectLink" required className="w-full px-4 py-2 border rounded-lg" placeholder="Project or Drive Link" onChange={handleChange} value={formData.projectLink} />

          {/* Members Section */}
          {formData.members.map((member, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                className="px-4 py-2 border rounded-lg w-1/2"
                placeholder="Member Name"
                value={member.name}
                onChange={(e) => handleMemberChange(index, "name", e.target.value)}
              />
              <input
                type="url"
                className="px-4 py-2 border rounded-lg w-1/2"
                placeholder="LinkedIn Profile"
                value={member.linkedin}
                onChange={(e) => handleMemberChange(index, "linkedin", e.target.value)}
                disabled={!member.name.trim()}
              />
              {formData.members.length > 1 && (
                <button type="button" className="text-red-500" onClick={() => removeMember(index)}>
                  <XCircle className="h-6 w-6" />
                </button>
              )}
            </div>
          ))}

          <button type="button" className="w-full bg-gray-200 px-4 py-2 rounded-lg" onClick={addMember}>Add Member</button>

          {/* Buttons Section */}
          <div className="flex gap-4">
            <button 
              type="submit" 
              className={`flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg flex items-center justify-center ${formData.members.every(m => m.name.trim() === "") ? "opacity-50 cursor-not-allowed" : ""}`} 
              disabled={formData.members.every(m => m.name.trim() === "")}
            >
              <Save className="h-5 w-5 mr-2" />
              <span>Save Project</span>
            </button>
            <button type="button" className="flex-1 bg-red-500 text-white px-4 py-3 rounded-lg flex items-center justify-center" onClick={clearForm}>
              <XCircle className="h-5 w-5 mr-2" />
              <span>Clear</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectPage;
