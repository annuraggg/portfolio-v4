"use client";
import { Project } from "@/lib/db/projects";
import { useInView } from "motion/react";
import React, { useRef } from "react";
import { motion } from "framer-motion";

interface Props {
  project: Project;
}

const Idea = ({ project }: Props) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.1 });

  return (
    <motion.div
      className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 pt-48 sm:pt-56 md:pt-64 lg:pt-72 sm:mt-24 md:mt-28 mt-0 lg:mt-32 overflow-hidden"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex flex-col md:flex-row gap-8 sm:gap-12 md:gap-16 lg:gap-20">
        <div className="md:min-w-[200px] lg:min-w-[250px]">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold opacity-50 dark:opacity-20">01</h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-accent">Project idea</h2>
        </div>
        <p className="flex-1 text-base sm:text-lg font-semibold">{project.description}</p>
      </div>

      <div className="flex flex-col md:flex-row-reverse gap-8 sm:gap-12 md:gap-16 lg:gap-20 mt-20 sm:mt-24 md:mt-28 lg:mt-32">
        <div className="md:min-w-[200px] lg:min-w-[250px]">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold opacity-50 dark:opacity-20">02</h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-accent">The Problem</h2>
        </div>
        <p className="flex-1 text-base sm:text-lg font-semibold">
          {project.problem}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 sm:gap-12 md:gap-16 lg:gap-20 mt-20 sm:mt-24 md:mt-28 lg:mt-32">
        <div className="md:min-w-[200px] lg:min-w-[250px]">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold opacity-50 dark:opacity-20">03</h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold md:text-right text-accent">
            The Solution
          </h2>
        </div>
        <p className="flex-1 text-base sm:text-lg font-semibold">
          {project.solution}
        </p>
      </div>
    </motion.div>
  );
};

export default Idea;
