"use client";
import type { Experience as ExperienceType } from "@/lib/db/experience";

const Experience = ({ experience }: { experience: ExperienceType[] }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {[...experience].reverse().map((exp) => (
        <div
          key={`${exp.title}-${exp.date}`}
          className="my-3 sm:my-4 md:my-5 flex flex-col md:flex-row justify-between w-full md:items-start items-center p-4 sm:p-6 md:p-8 lg:p-10 gap-3 sm:gap-4"
        >
          <h2 className="drop-shadow-glowLight text-xl sm:text-2xl md:text-3xl font-semibold text-center md:text-left">
            {exp.title}
          </h2>

          <div className="w-full md:w-[400px] text-center md:text-left">
            <p className="text-base sm:text-lg md:text-xl font-medium">{exp.role}</p>
            <p className="text-gray-500 text-xs md:text-sm">{exp.date}</p>
            <p className="text-gray-500 text-sm md:text-base mt-2">
              {exp.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Experience;
