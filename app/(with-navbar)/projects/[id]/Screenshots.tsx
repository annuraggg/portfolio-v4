import { Project } from "@/lib/db/projects";
import Image from "next/image";
import React from "react";

const Screenshots = ({ project }: { project: Project }) => {
  return (
    <div className="mt-32 sm:mt-40 md:mt-48 px-4 sm:px-8 md:px-16 lg:px-32">
      {project.screenshots?.length && (
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-accent text-center mb-12 sm:mb-16 md:mb-20">
          Screenshots
        </h2>
      )}

      <div className="flex flex-wrap gap-4 sm:gap-5 md:gap-7 items-center justify-center">
        {project.screenshots?.map((screenshot, index) => (
          <div key={index} className="w-full sm:w-auto">
            <Image
              src={process.env.NEXT_PUBLIC_R2_PUBLIC_URL! + screenshot}
              alt={`Screenshot ${index + 1}`}
              className="w-full sm:w-[300px] md:w-[400px] lg:w-[500px] h-auto"
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
