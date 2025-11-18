import { Project } from "@/lib/db/projects";
import React from "react";
import { IconCloud } from "@/components/ui/icon-cloud";

const TechStack = async ({ project }: { project: Project }) => {
  async function getValidImages(slugs: string[]) {
    const checks = slugs.map(async (slug) => {
      const cleanSlug = slug.replace(/\s+/g, "").toLowerCase();
      const url = `https://cdn.simpleicons.org/${cleanSlug}/${cleanSlug}`;
      try {
        const res = await fetch(url, { method: "HEAD" });
        if (res.ok) {
          return url;
        }
      } catch {}
      return null;
    });

    const results = await Promise.all(checks);
    return results.filter((u): u is string => u !== null);
  }

  const images = await getValidImages(project.technologies);

  return (
    <div>
      <div className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-50">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-20">
          <div className="w-full lg:w-auto flex justify-center">
            <IconCloud images={images} />
          </div>

          <div className="w-full lg:w-auto">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-accent mb-5 sm:mb-7 text-center lg:text-left">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-4 sm:gap-5 md:gap-7 items-center justify-center lg:justify-start">
              {project.technologies.map((tech, index) => (
                <div
                  key={index}
                  className="text-base sm:text-lg md:text-xl font-medium hover:text-accent transition-all"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
