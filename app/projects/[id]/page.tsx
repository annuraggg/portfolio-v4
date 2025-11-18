import React from "react";
import { notFound } from "next/navigation";
import Hero from "./Hero";
import Idea from "./Idea";
import Stats from "./Stats";
import Highlights from "./Highlights";
import TechStack from "./TechStack";
import Screenshots from "./Screenshots";
import { getProjectById } from "@/lib/db/projects";

interface ProjectProps {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: ProjectProps) => {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-28 sm:pt-32 md:pt-40 pb-12 sm:pb-16 md:pb-20 overflow-hidden px-4 sm:px-6 md:px-8">
      <Hero project={project} />
      <Idea project={project} />
      <TechStack project={project} />
      <Stats project={project} />
      <Highlights project={project} />
      <Screenshots project={project} />
    </div>
  );
};

export default page;
