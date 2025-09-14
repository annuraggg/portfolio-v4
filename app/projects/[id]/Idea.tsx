"use client"
import { Project } from "@/data/projects";
import { useInView } from "motion/react";
import React, { useRef } from "react";
import { motion } from "framer-motion";

interface Props {
  project: Project;
}

const Idea = ({ project }: Props) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.2 });

  return (
    <motion.div
      className="px-64 pt-72 overflow-hidden"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div>
        <h2 className="text-5xl font-semibold text-accent">Project idea</h2>
        <p className="mt-7 text-lg">{project.description}</p>
      </div>

      <div className="flex gap-20 mt-32">
        <h2 className="text-5xl font-semibold flex-1 text-accent">The Problem</h2>
        <p className="flex-1 text-lg font-semibold text-zinc-300">
          {project.problem}
        </p>
      </div>

      <div className="flex gap-20 mt-32">
        <p className="flex-1 text-lg font-semibold text-zinc-300">
          {project.solution}
        </p>
        <h2 className="text-5xl font-semibold flex-1 text-right  text-accent">
          The Solution
        </h2>
      </div>
    </motion.div>
  );
};

export default Idea;
