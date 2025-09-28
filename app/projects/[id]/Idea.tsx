"use client";
import { Project } from "@/data/projects";
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
      className="px-64 pt-72 mt-32 overflow-hidden"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex gap-20">
        <div>
          <h1 className="text-9xl font-bold opacity-50 dark:opacity-20">01</h1>
          <h2 className="text-5xl font-semibold text-accent">Project idea</h2>
        </div>
        <p className="flex-1 text-lg font-semibold ">{project.description}</p>
      </div>

      <div className="flex gap-20 mt-32 flex-row-reverse">
        <div>
          <h1 className="text-9xl font-bold opacity-50 dark:opacity-20">02</h1>
          <h2 className="text-5xl font-semibold text-accent">The Problem</h2>
        </div>
        <p className="flex-1 text-lg font-semibold">
          {project.problem}
        </p>
      </div>

      <div className="flex gap-20 mt-32">
        <div>
          <h1 className="text-9xl font-bold opacity-50 dark:opacity-20">03</h1>
          <h2 className="text-5xl font-semibold text-right text-accent">
            The Solution
          </h2>
        </div>
        <p className="flex-1 text-lg font-semibold">
          {project.solution}
        </p>
      </div>
    </motion.div>
  );
};

export default Idea;
