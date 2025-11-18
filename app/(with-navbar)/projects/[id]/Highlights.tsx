"use client"
import { Project } from "@/lib/db/projects";
import { useRef } from "react";
import { motion, useInView } from "motion/react";

const Highlights = ({ project }: { project: Project }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-40">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-accent mb-12 sm:mb-16 md:mb-20">Highlights</h2>
        <div className="mt-5 space-y-3 flex flex-wrap gap-8 sm:gap-12 md:gap-16 lg:gap-20">
          {project.highlights.map((highlight, index) => (
            <div
              key={index}
              className="text-base sm:text-lg font-semibold w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] xl:w-[28%]"
            >
              <h3 className="text-lg sm:text-xl font-bold">{highlight.title}</h3>
              <p className="mt-3 sm:mt-5 text-sm sm:text-base font-normal">{highlight.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Highlights;
