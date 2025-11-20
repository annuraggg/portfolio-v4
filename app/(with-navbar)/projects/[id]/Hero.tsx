import { Project } from "@/lib/db/projects";
import React from "react";
import Links from "./Links";
import { Safari } from "@/components/ui/safari";
import Rating from "./Rating";

interface Props {
  project: Project;
}

const Hero = ({ project }: Props) => {
  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 flex flex-col lg:flex-row gap-8 sm:gap-12 md:gap-16 lg:gap-20 relative">
      <div className="w-full lg:flex-1 lg:max-w-[30vw]">
        <p className="dark:text-zinc-300 text-xs sm:text-sm mb-2">
          {project.date}
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
          {project.title}
        </h1>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base">{project.summary}</p>
        <Links project={project} />
        <Rating project={project} />
      </div>

      <div className="w-full lg:absolute lg:-right-60 lg:top-8 lg:translate-x-20 lg:w-[70vw] mt-8 lg:mt-0">
        <Safari
          imageSrc={process.env.NEXT_PUBLIC_R2_PUBLIC_URL! + project.cover!}
          url={project.links?.demo}
          pixelImage
        />
      </div>
    </div>
  );
};

export default Hero;
