import projects, { Project } from "@/data/projects";
import React from "react";
import Hero from "./Hero";
import Idea from "./Idea";
import Stats from "./Stats";
import Highlights from "./Highlights";
import TechStack from "./TechStack";
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
      <Stats project={project} />
      <Highlights project={project} />
      <TechStack project={project} />
    </div>
  );
};

export default page;
