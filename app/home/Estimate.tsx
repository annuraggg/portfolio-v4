"use client";
import React from "react";
import { LightRays } from "@/components/ui/light-rays";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import Calculator from "./Calculator";

const Estimate = () => {
  return (
    <div className="relative h-[400px] sm:h-[500px] w-full overflow-hidden rounded-lg border mx-4 sm:mx-6 md:mx-8">
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 px-4 sm:px-6 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          Estimate Project Time
        </h1>
        <p className="max-w-md text-sm sm:text-base opacity-80 px-4">
          Get a precise estimate for your digital project and establish
          realistic budget expectations with our interactive calculator.
        </p>
        <InteractiveHoverButton
          className="mt-4 sm:mt-7"
          onClick={() =>
            (
              document.getElementById("my_modal_1") as HTMLDialogElement | null
            )?.showModal()
          }
        >
          {" "}
          Start Calculator
        </InteractiveHoverButton>
      </div>

      <LightRays />
      <Calculator />
    </div>
  );
};

export default Estimate;
