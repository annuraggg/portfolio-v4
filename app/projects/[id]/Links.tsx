import { Project } from "@/data/projects";
import Link from "next/link";
import React from "react";

const Links = ({ project }: { project: Project }) => {
  return (
    <div className="flex mt-12 font-semibold gap-5">
      {project?.links?.demo && (
        <Link
          href={project.links.demo}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="hover:underline hover:text-accent cursor-pointer transition-all">
            Live Demo
          </p>
        </Link>
      )}

      {project.links?.github?.map((link, index) => (
        <Link key={index} href={link} target="_blank" rel="noopener noreferrer">
          <p className="hover:underline hover:text-accent cursor-pointer transition-all">
            Github Link {index + 1}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default Links;
