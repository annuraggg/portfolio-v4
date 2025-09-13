"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React from "react";

export const HeroHighlight = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  function handleMouseMove({
    currentTarget,
  }: React.MouseEvent<HTMLDivElement>) {
    if (!currentTarget) return;
  }
  return (
    <div
      className={cn(
        "group relative flex h-[40rem] w-full items-center justify-center bg-white dark:bg-black",
        containerClassName
      )}
      onMouseMove={handleMouseMove}
    >
      <div className="pointer-events-none absolute inset-0 dark:hidden" />
      <div className={cn("relative z-20", className)}>{children}</div>
    </div>
  );
};

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.span
      initial={{
        backgroundSize: "0% 100%",
      }}
      animate={{
        backgroundSize: "100% 100%",
      }}
      transition={{
        duration: 2,
        ease: "linear",
        delay: 0.5,
      }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
      }}
      className={cn(
        `relative inline-block rounded-lg bg-gradient-to-r  px-1 pb-1 dark:from-accent/40 dark:to-accent/90`,
        className
      )}
    >
      {children}
    </motion.span>
  );
};
