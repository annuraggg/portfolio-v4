import React from "react";
import projects from "@/data/projects";
import ProjectCard from "./ProjectCard";

const page = () => {
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

export default page;
