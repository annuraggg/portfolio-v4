"use client";
import React, { useState } from "react";
import { Highlighter } from "@/components/ui/highlighter";

const AnimatedWaveText = () => {
  const [isHovered, setIsHovered] = useState(false);
  const waveUrl = "/wave.svg";

  return (
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
          <span className="dark:text-black text-white">
            Full Stack Developer.
          </span>
        </Highlighter>
      </div>
      <span
        className={`absolute left-0 bottom-0 w-full h-[8px] sm:h-[10px] md:h-[12px] bg-repeat-x bg-bottom ${
          isHovered ? "animate-wave" : ""
        }`}
        style={{
          backgroundImage: `url('${waveUrl}')`,
          backgroundSize: "28px 12px",
        }}
      />
    </h2>
  );
};

export default AnimatedWaveText;
