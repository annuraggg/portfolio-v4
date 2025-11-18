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
      <div className="px-50">
        <div className="flex justify-between items-center">
          <IconCloud images={images} />

          <div>
            <h2 className="text-6xl font-semibold text-accent mb-7">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-7 items-center">
              {project.technologies.map((tech, index) => (
                <div
                  key={index}
                  className="text-xl font-medium hover:text-accent transition-all"
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
