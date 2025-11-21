"use client";

import { motion, useAnimation } from "motion/react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useNavStore } from "@/lib/stores/nav-store";

export function RouteProgress({ className }: { className?: string }) {
  const controls = useAnimation();
  const pathname = usePathname();
  const navigating = useNavStore((state) => state.navigating);
  const setNavigating = useNavStore((state) => state.setNavigating);

  useEffect(() => {
    setNavigating(false);
  }, [pathname, setNavigating]);

  useEffect(() => {
    if (!navigating) return;

    controls.set({ scaleX: 0, opacity: 1 });
    controls.start({
      scaleX: [0, 0.4, 0.6, 0.8],
      transition: { duration: 0.8, ease: "easeOut" },
    });

    const timer = setTimeout(() => {
      setNavigating(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, [pathname, navigating, controls, setNavigating]);

  if (!navigating) return null;

  return (
    <motion.div
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-[#A97CF8] via-[#F38CB8] to-accent",
        className
      )}
      animate={controls}
    />
  );
}
