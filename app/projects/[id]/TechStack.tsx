import { Project } from "@/data/projects";
import React from "react";

const TechStack = ({ project }: { project: Project }) => {
  return (
    <div className="px-64 mt-20">
      <h2 className="text-5xl font-semibold text-accent mb-7">Tech Stack</h2>
      <div className="flex flex-wrap gap-7">
        {project.technologies.map((tech, index) => (
          <div key={index} className="text-lg font-normal hover:text-accent transition-all">
            {tech}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
