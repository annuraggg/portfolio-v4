"use client";

import { motion, useAnimation } from "motion/react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function RouteProgress({ className }: { className?: string }) {
  const controls = useAnimation();
  const pathname = usePathname();

  useEffect(() => {
    // Start loader
    controls.set({ scaleX: 0, opacity: 1 });
    controls.start({
      scaleX: [0, 0.4, 0.6, 0.8], // intermediate progress
      transition: { duration: 0.8, ease: "easeOut" },
    });

    // Complete loader
    const timer = setTimeout(() => {
      controls.start({
        scaleX: 1,
        opacity: 0, // fade out after reaching 100%
        transition: { duration: 0.3, ease: "easeIn" },
      });
    }, 800);

    return () => clearTimeout(timer);
  }, [pathname, controls]);

  return (
    <motion.div
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-px origin-left bg-gradient-to-r from-[#A97CF8] via-[#F38CB8] to-[#FDCC92]",
        className
      )}
      animate={controls}
    />
  );
}
