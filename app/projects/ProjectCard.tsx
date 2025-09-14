import DirectionAwareButton from "@/components/DirectionAwareButton";
import { Project } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="flex py-20 gap-20">
      <div className="min-w-[30vw]">
        <h3 className="text-4xl font-semibold">{project.title}</h3>
        <p className="text-zinc-400 mt-3 text-sm font-semibold">
          {project.technologies.map((tech) => tech).join(", ")}
        </p>
        <p className="mt-7">{project.summary}</p>
        <Link href={`/projects/${project.id}`}>
          <DirectionAwareButton className="mt-7">
            See Project Case
          </DirectionAwareButton>
        </Link>
      </div>

      <Image
        src={project.cover!}
        width={700}
        height={500}
        className="w-[50vw] h-full"
        alt={project.title}
      />
    </div>
  );
};

export default ProjectCard;
