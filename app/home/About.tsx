"use client";
import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.2 });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 py-12 md:py-0">
      <motion.h2
        className="w-full max-w-7xl"
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div>
          <p className="text-sm sm:text-base mb-4 sm:mb-6">ABOUT ME</p>
          <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 md:gap-16 lg:gap-20 mt-6 sm:mt-8 md:mt-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold flex-1">
              Coding to me, isnt just a skill; it is my language of expression,
              a medium to breathe life into ideas.
            </h2>
            <div className="flex-1">
              <p className="text-sm sm:text-base leading-relaxed">
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
