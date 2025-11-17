"use client";

import React from "react";
import projects from "@/data/projects";
import ProjectCard from "./ProjectCard";
import { useFeatureFlag } from "configcat-react";

const ProjectsPage = () => {
  const { value: isFeatureEnabled, loading: isLoadingFlag } = useFeatureFlag(
    "enableProjects",
    true // Default to true for backward compatibility
  );

  if (isLoadingFlag) {
    return (
      <div className="pt-48 px-36 text-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!isFeatureEnabled) {
    return (
      <div className="pt-48 px-36 text-center">
        <h1 className="text-5xl font-bold">Projects</h1>
        <p className="mt-4 text-gray-500">
          Projects section is currently unavailable
        </p>
      </div>
    );
  }

  return (
    <div className="pt-48 px-36">
      <h1 className="text-5xl font-bold text-center">Projects</h1>
      <div>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
