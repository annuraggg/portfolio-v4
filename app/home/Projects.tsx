"use client"
import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { StickyScroll } from "@/components/StickyScrollReveal";
import projects from "@/data/projects";
import Image from "next/image";

const Projects = () => {
  const ref2 = useRef(null);
  const inView2 = useInView(ref2, { amount: 0.2 });

  const content = projects
    .filter((project) => !!project.cover)
    .slice(0, 5)
    .map((project) => ({
      title: project.title,
      description: project.summary,
      content: (
        <Image
          src={project.cover!}
          width={500}
          height={300}
          className="min-w-[50vw]"
          alt={project.title}
        />
      ),
    }));

  return (
    <div className=" h-screen flex flex-col items-center justify-center">
      <motion.h2
        className="mt-20 w-full"
        ref={ref2}
        initial={{ opacity: 0, y: 50 }}
        animate={inView2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div>
          <div>
            <h2 className="text-5xl font-bold px-40">Explore My Projects</h2>
          </div>
          <StickyScroll content={content} />
        </div>
      </motion.h2>
    </div>
  );
};

export default Projects;
