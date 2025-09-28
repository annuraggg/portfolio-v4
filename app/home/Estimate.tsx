"use client";
import React from "react";
import { LightRays } from "@/components/ui/light-rays";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

const Estimate = () => {
  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-lg border">
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-4xl font-bold md:text-5xl">
          Estimate Project Time
        </h1>

        <p className="max-w-md text-sm opacity-80 md:text-base ">
          Get a precise estimate for your digital project and establish
          realistic budget expectations with our interactive calculator.
        </p>

        <InteractiveHoverButton className="mt-7">Start Calculator</InteractiveHoverButton>
      </div>
      <LightRays />
    </div>
  );
};

export default Estimate;
