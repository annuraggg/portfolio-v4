"use client"
import { Project } from "@/lib/db/projects";
import { useInView, motion } from "motion/react";
import React, { useRef } from "react";

interface Props {
  project: Project;
}

const Stats = ({ project }: Props) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex gap-8 sm:gap-12 md:gap-16 lg:gap-20 flex-wrap items-center justify-center px-4 sm:px-8 md:px-16 lg:px-32">
        <StatCard stat={project.timeline} label="Timeline" />
        <StatCard stat={project.role} label="My Role" />
      </div>
    </motion.div>
  );
};

const StatCard = ({ stat, label }: { stat: string; label: string }) => {
  return (
    <div className="flex flex-col py-16 sm:py-20 md:py-24 lg:py-32 w-fit">
      <span className="text-2xl sm:text-3xl md:text-4xl font-semibold">{stat}</span>
      <span className="text-zinc-400 text-sm sm:text-base">{label}</span>
    </div>
  );
};

export default Stats;
