"use client"
import { Project } from "@/data/projects";
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
      <div className="px-64">
        <h2 className="text-5xl font-semibold text-accent mb-20">Highlights</h2>
        <div className="mt-5 space-y-3 flex flex-wrap gap-20">
          {project.highlights.map((highlight, index) => (
            <div
              key={index}
              className="text-lg font-semibold text-zinc-300 w-[28%]"
            >
              <h3 className="text-xl font-bold">{highlight.title}</h3>
              <p className="mt-5 text font-normal">{highlight.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Highlights;
