"use client";
import ScrollIndicator from "@/components/ScrollIndicator";
import React from "react";
import { motion } from "motion/react";
import DockComponent from "./Socials";
import { Spotlight } from "@/components/ui/spotlight";
import AnimatedWaveText from "./AnimatedWaveText";

const Hero = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between pb-10 px-4 sm:px-6 md:px-8">
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />
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
          <AnimatedWaveText />
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
