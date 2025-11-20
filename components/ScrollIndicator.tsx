import React from "react";

export default function ScrollIndicator() {
  return (
    <div className="">
      <div className="relative h-14 w-px  bg-black/40 dark:bg-white/20">
        <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 border-3 border-black dark:border-white bg-background rounded-full animate-scrollLoop" />
      </div>
    </div>
  );
}
