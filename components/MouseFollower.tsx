"use client";
import { useEffect, useRef, useState } from "react";
import { useFeatureFlag } from "configcat-react";

export default function MouseFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [hidden, setHidden] = useState(false);

  const { value: isFeatureEnabled, loading: isLoadingFlag } = useFeatureFlag(
    "enablemousefollower",
    true
  );

  useEffect(() => {
    if (!isFeatureEnabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      pos.current.targetX = e.clientX;
      pos.current.targetY = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button")) {
        setHidden(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button")) {
        setHidden(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    let frame: number;
    const animate = () => {
      pos.current.x += (pos.current.targetX - pos.current.x) * 0.15;
      pos.current.y += (pos.current.targetY - pos.current.y) * 0.15;

      if (dotRef.current) {
        const dotSize = 12;
        dotRef.current.style.transform = `translate(${
          pos.current.x - dotSize / 2
        }px, ${pos.current.y - dotSize / 2}px)`;
      }
      frame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(frame);
    };
  }, [isFeatureEnabled]);

  if (isLoadingFlag || !isFeatureEnabled) {
    return null;
  }

  return (
    <div
      ref={dotRef}
      className={`fixed top-0 left-0 w-3 h-3 bg-blue-500 rounded-full pointer-events-none z-[9999] transition-opacity duration-200 ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
      style={{ transform: "translate(-100px, -100px)" }}
    />
  );
}
