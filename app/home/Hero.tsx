"use client";
import ScrollIndicator from "@/components/ScrollIndicator";
import React, { useState } from "react";
import { motion } from "motion/react";
import { Highlighter } from "@/components/ui/highlighter";
import DockComponent from "./Socials";

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-between pb-10 px-4 sm:px-6 md:px-8">
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="min-h-[80vh] flex flex-col items-center justify-end gap-6 sm:gap-8 md:gap-10"
      >
        <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl inline-block pb-3 font-semibold bg-[repeating-linear-gradient(to_right,#3f3f46_0,#3f3f46_12px,transparent_4px,transparent_20px)] bg-[length:auto_2px] bg-no-repeat bg-bottom text-center">
            Hello I am Anurag
          </h2>
          <h2 className="relative p-0 group text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl inline-block pb-8 font-semibold transition-colors duration-1000 text-center px-4">
            <div
              className="relative z-10"
              onMouseOver={() => setIsHovered(true)}
              onMouseOut={() => setIsHovered(false)}
            >
              A{" "}
              <Highlighter
                iterations={2}
                animationDuration={2000}
                action="highlight"
                color="var(--color-accent)"
              >
                Full Stack Developer.
              </Highlighter>
            </div>
            <span
              className={`absolute left-0 bottom-0 w-full h-[8px] sm:h-[10px] md:h-[12px] bg-[url('/wave.svg')] bg-[length:28px_12px] bg-repeat-x bg-bottom ${
                isHovered ? "animate-wave" : ""
              }`}
            />
          </h2>
        </div>
        <DockComponent />
      </motion.div>

      <div className="flex justify-end w-full pr-4 sm:pr-8">
        <ScrollIndicator />
      </div>
    </div>
  );
};

export default Hero;
