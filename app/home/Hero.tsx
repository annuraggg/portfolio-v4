"use client"
import ScrollIndicator from "@/components/ScrollIndicator";
import React, { useState } from "react";

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="">
      <div className="flex flex-col items-center justify-center h-[85vh] gap-10 relative">
        <h2 className="text-7xl inline-block pb-3 font-semibold bg-[repeating-linear-gradient(to_right,#3f3f46_0,#3f3f46_12px,transparent_4px,transparent_20px)] bg-[length:auto_2px] bg-no-repeat bg-bottom">
          I craft digital experiences that
        </h2>
        <h2 className="relative p-0 group text-7xl inline-block pb-4 font-semibold text-white transition-colors duration-1000">
          <span
            className="relative z-10"
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
          >
            people love.
          </span>
          <span
            className={`absolute left-0 bottom-0 w-full h-[12px] bg-[url('/wave.svg')] bg-[length:28px_12px] bg-repeat-x bg-bottom ${
              isHovered ? "animate-wave" : ""
            }`}
          />
        </h2>
      </div>
      <div className="flex justify-end w-[calc(100%-50px)]">
        <ScrollIndicator />
      </div>
    </div>
  );
};

export default Hero;
