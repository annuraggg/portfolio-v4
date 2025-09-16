"use client"
import { Project } from "@/data/projects";
import React from "react";
import { motion, useInView } from "motion/react";

const TechStack = ({ project }: { project: Project }) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="px-64 mt-20">
        <h2 className="text-5xl font-semibold text-accent mb-7">Tech Stack</h2>
        <div className="flex flex-wrap gap-7">
          {project.technologies.map((tech, index) => (
            <div
              key={index}
              className="text-lg font-normal hover:text-accent transition-all"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TechStack;
