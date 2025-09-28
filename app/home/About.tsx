"use client";
import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.2 });

  return (
    <div className=" h-screen flex flex-col items-center justify-center">
      <motion.h2
        className="mt-20 px-60"
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div>
          <p>ABOUT ME</p>
          <div className="flex gap-20 mt-10">
            <h2 className="text-5xl font-bold">
              Coding to me, isnt just a skill; it is my language of expression,
              a medium to breathe life into ideas.
            </h2>
            <div>
              <p>
                In July 2022, I completed my Diploma in Information Technology.
                From a young age, I have been captivated by the world of coding
                and have spent the past years honing my skills in web
                development. In 2025, I successfully completed my Bachelors
                degree in Information Technology.
              </p>
            </div>
          </div>
        </div>
      </motion.h2>
    </div>
  );
};

export default About;
