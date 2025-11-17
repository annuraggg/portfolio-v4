"use client";
import { Project } from "@/data/projects";
import React from "react";
import Links from "./Links";
import { Safari } from "@/components/ui/safari";
import Rating from "./Rating";

interface Props {
  project: Project;
}

const Hero = ({ project }: Props) => {
  return (
    <div className="px-48 flex gap-20 relative">
      <div className="flex-1 max-w-[30vw]">
        <p className="dark:0text-zinc-300 text-sm mb-2">{project.date}</p>
        <h1 className="text-5xl font-semibold">{project.title}</h1>
        <p className="mt-4">{project.summary}</p>
        <Links project={project} />
        <Rating avgRating={4.3} totalRatings={100} onSubmitRating={() => {}} />
      </div>

      <div className="absolute -right-60 top-8 translate-x-20 w-[70vw]">
        <Safari imageSrc={project.cover!} url={project.links?.demo} />
      </div>
    </div>
  );
};

export default Hero;
