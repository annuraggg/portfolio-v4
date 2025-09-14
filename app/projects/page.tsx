import React from "react";
import projects from "@/data/projects";
import ProjectCard from "./ProjectCard";

const page = () => {
  return (
    <div className="pt-48 px-36">
      <h2 className="text-3xl font-semibold text-center text-zinc-300">
        Coding to me, isn&apos;t just a skill; it&apos;s my language of
        expression, a medium to breathe life into ideas.
      </h2>

      <h1 className="text-5xl font-bold text-center mt-20">Projects</h1>
      <div>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default page;
