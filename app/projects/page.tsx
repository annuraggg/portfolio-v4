"use client";

import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { useFeatureFlag } from "configcat-react";
import type { Project } from "@/lib/db/projects";
import Loader from "@/components/Loader";

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { value: isFeatureEnabled, loading: isLoadingFlag } = useFeatureFlag(
    "enableprojects",
    true
  );

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/projects");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load projects"
        );
      } finally {
        setLoading(false);
      }
    }

    if (isFeatureEnabled && !isLoadingFlag) {
      fetchProjects();
    }
  }, [isFeatureEnabled, isLoadingFlag]);

  if (isLoadingFlag || loading) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <Loader />
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

  if (error) {
    return (
      <div className="pt-48 px-36 text-center">
        <h1 className="text-5xl font-bold">Projects</h1>
        <p className="mt-4 text-red-500">{error}</p>
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
