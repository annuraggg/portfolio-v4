"use client";
import React, { useRef, useState } from "react";
import { useMotionValueEvent, useScroll, motion } from "motion/react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type ContentItem = {
  title: string;
  description: string;
  content?: React.ReactNode;
};

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: ContentItem[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });

  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const p = Number.isFinite(latest) ? latest : 0;
    setScrollProgress(p);

    // Adjusted threshold to account for bigger gaps
    const threshold = 0.15; // Reduced threshold since we have bigger gaps
    const adjustedProgress = Math.max(0, p - threshold / cardLength);

    const cardsBreakpoints = content.map((_, i) => i / cardLength);
    const closestIndex = cardsBreakpoints.reduce(
      (acc, bp, i) =>
        Math.abs(adjustedProgress - bp) <
        Math.abs(adjustedProgress - cardsBreakpoints[acc])
          ? i
          : acc,
      0
    );
    setActiveCard(closestIndex);
  });

  const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));

  // Enhanced U-shaped reveal animation with adjusted timing for bigger gaps
  const getClipForIndex = (index: number) => {
    if (index === 0) return "none";

    const start = (index - 1) / cardLength;
    const end = index / cardLength;

    // Reduced offset to match the new gap timing
    const offset = 0.05; // Smaller offset for better sync with bigger gaps
    const adjustedStart = start + offset;
    const adjustedEnd = end + offset;

    const raw =
      (scrollProgress - adjustedStart) / (adjustedEnd - adjustedStart);
    const norm = clamp(raw, 0, 1);

    // Smooth easing that matches text animation
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

    const easedProgress = easeInOutCubic(norm);

    // Start tiny, end very large
    const minRadius = 0;
    const maxRadius = 200;
    const radius = minRadius + (maxRadius - minRadius) * easedProgress;

    // U-shape movement
    const centerY = 100 - 50 * easedProgress;
    const centerX = 50;

    return `circle(${radius}% at ${centerX}% ${centerY}%)`;
  };

  const linearGradients = [
    "linear-gradient(to bottom right, #06b6d4, #10b981)",
    "linear-gradient(to bottom right, #ec4899, #6366f1)",
    "linear-gradient(to bottom right, #f97316, #eab308)",
    "linear-gradient(to bottom right, #8b5cf6, #06b6d4)",
    "linear-gradient(to bottom right, #f59e0b, #ef4444)",
  ];

  const backgroundGradient =
    linearGradients[activeCard % linearGradients.length];

  return (
    <motion.div
      animate={{ backgroundColor: "#03020e" }}
      className="relative flex h-[30rem] justify-center space-x-10 rounded-md p-10"
    >
      {/* Left text column with scroll */}
      <div
        ref={ref}
        className="relative flex-1 min-w-0 max-w-xl overflow-y-auto px-4 scrollbar-hide"
      >
        {content.map((item, index) => (
          <div key={item.title + index} className=" mb-96">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{
                opacity: activeCard === index ? 1 : 0.3,
                scale: activeCard === index ? 1 : 0.95,
              }}
              // Match the clip-path animation timing
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-3xl font-bold text-slate-100"
            >
              {item.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{
                opacity: activeCard === index ? 1 : 0.3,
                y: activeCard === index ? 0 : 10,
              }}
              // Match the clip-path animation timing with slight delay
              transition={{
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.05,
              }}
              className="text-lg font-medium mt-5 text-zinc-400"
            >
              {item.description}
            </motion.p>

            <Link
              href={`/projects/${item.title
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
            >
              <button className="bg-slate-800 mt-10  no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
                <span className="absolute inset-0 overflow-hidden rounded-full">
                  <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                </span>
                <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-3 px-7 ring-1 text-sm ring-white/10 ">
                  <span>{`Learn More`}</span>
                </div>
                <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
              </button>
            </Link>
          </div>
        ))}
        <div className="h-40" />
      </div>

      {/* Right sticky preview */}
      <motion.div
        style={{ background: backgroundGradient }}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 0.5 }}
        className={cn(
          "sticky top-10 hidden w-[40vw] overflow-hidden rounded-xl bg-white lg:block shadow-2xl",
          contentClassName
        )}
      >
        {/* Base layer: first card always visible */}
        <div className="absolute inset-0 z-0">
          {content[0]?.content ?? null}
        </div>

        {/* Overlay layers: revealed with enhanced U-mask */}
        {content.slice(1).map((item, idx) => {
          const index = idx + 1;
          const clip = getClipForIndex(index);
          return (
            <motion.div
              key={index}
              style={{
                clipPath: clip,
                WebkitClipPath: clip,
                zIndex: 10 + index,
              }}
              className="absolute inset-0"
              transition={{
                clipPath: {
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              }}
            >
              {item.content ?? null}
            </motion.div>
          );
        })}

        <div className="absolute inset-0 rounded-xl border border-white/10 pointer-events-none z-50" />
      </motion.div>
    </motion.div>
  );
};
