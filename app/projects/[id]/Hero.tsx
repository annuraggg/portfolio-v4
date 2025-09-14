import BrowserMockup from "@/components/BrowserMockup";
import { Project } from "@/data/projects";
import React from "react";

interface Props {
  project: Project;
}

const Hero = ({ project }: Props) => {
  return (
    <div className="px-48 flex gap-20 relative">
      <div className="flex-1 max-w-[30vw]">
        <h1 className="text-5xl font-semibold">{project.title}</h1>
        <p className="mt-4">{project.summary}</p>

        <div className="flex flex-wrap mt-8">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="bg-foreground text-background py-3 px-7 rounded-full text-sm mr-2 mb-2"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute -right-60 top-8 translate-x-20 w-[70vw]">
        <BrowserMockup imageUrl={project.cover!} url={project.links?.demo} />
      </div>
    </div>
  );
};

export default Hero;
