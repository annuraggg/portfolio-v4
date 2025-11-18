import DirectionAwareButton from "@/components/DirectionAwareButton";
import { Safari } from "@/components/ui/safari";
import { Project } from "@/lib/db/projects";
import Link from "next/link";
import React from "react";

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="flex flex-col lg:flex-row py-12 sm:py-16 md:py-20 gap-8 sm:gap-12 md:gap-16 lg:gap-20">
      <div className="w-full lg:min-w-[30vw] lg:max-w-[30vw]">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold">{project.title}</h3>
        <p className="text-zinc-400 mt-2 sm:mt-3 text-xs sm:text-sm font-semibold">
          {project.technologies.map((tech) => tech).join(", ")}
        </p>
        <p className="mt-4 sm:mt-5 md:mt-7 text-sm sm:text-base">{project.summary}</p>
        <Link href={`/projects/${project.id}`}>
          <DirectionAwareButton className="mt-4 sm:mt-5 md:mt-7">
            See Project Case
          </DirectionAwareButton>
        </Link>
      </div>

      <div className="w-full lg:w-[50vw] h-full">
        <Safari url={project.links?.demo} imageSrc={process.env.NEXT_PUBLIC_R2_PUBLIC_URL! + project.cover} />
      </div>
    </div>
  );
};

export default ProjectCard;
