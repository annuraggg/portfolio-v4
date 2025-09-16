"use client";
import { Project } from "@/data/projects";
import Link from "next/link";
import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

const Links = ({ project }: { project: Project }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex mt-12 font-semibold gap-5">
        {project?.links?.demo && (
          <Link
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="hover:underline hover:text-accent cursor-pointer transition-all">
              Live Demo
            </p>
          </Link>
        )}

        {project.links?.github?.map((link, index) => (
          <Link
            key={index}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="hover:underline hover:text-accent cursor-pointer transition-all">
              Github Link {index + 1}
            </p>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default Links;
