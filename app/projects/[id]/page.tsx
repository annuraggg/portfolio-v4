import projects, { Project } from "@/data/projects";
import React from "react";
import Hero from "./Hero";
import Idea from "./Idea";

interface ProjectProps {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: ProjectProps) => {
  const { id } = await params;
  const project: Project | undefined = projects.find(
    (project) => project.id === id
  );

  if (!project) {
    return <div className="pt-40">Project not found</div>;
  }

  return (
    <div className="pt-40 pb-20 overflow-hidden">
      <Hero project={project} />
      <Idea project={project} />
    </div>
  );
};

export default page;
