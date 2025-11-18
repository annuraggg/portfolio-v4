import { IconCloud } from "@/components/ui/icon-cloud";
import { getAllSkills } from "@/lib/db/skills";
import React from "react";
import { SkillItem } from "./SkillItem";

const Skills = async () => {
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

  const skillsData = await getAllSkills();
  const images = await getValidImages(skillsData.map((skill) => skill.title));

  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 2xl:px-64 py-12 sm:py-16 md:py-20">
      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-accent font-medium text-center">
        Skills
      </h2>
      <p className="dark:text-zinc-400 text-sm text-center mt-2 mb-6 sm:mb-8 md:mb-10">
        Green items include proficiency. Click to see
      </p>
      <div className="flex flex-col lg:flex-row justify-start items-center lg:items-start gap-8">
        <div className="w-full lg:w-auto flex justify-center -mt-0 lg:-mt-14">
          <IconCloud images={images} />
        </div>

        <div className="flex flex-wrap justify-center lg:justify-start w-full lg:flex-1">
          {skillsData.map((skill, index) => (
            <div key={index} className="p-1 sm:p-2">
              <SkillItem
                title={skill.title}
                progress={skill.progress}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
