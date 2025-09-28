import { Project } from "@/data/projects";
import Image from "next/image";
import React from "react";

const Screenshots = ({ project }: { project: Project }) => {
  return (
    <div className="mt-48 px-32">
      {project.screenshots?.length && (
        <h2 className="text-5xl font-semibold text-accent text-center mb-20">
          Screenshots
        </h2>
      )}

      <div className="flex flex-wrap gap-7 items-center justify-center">
        {project.screenshots?.map((screenshot, index) => (
          <div key={index}>
            <Image
              src={screenshot}
              alt={`Screenshot ${index + 1}`}
              className="w-[500px] h-full"
              width={1000}
              height={1000}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Screenshots;
