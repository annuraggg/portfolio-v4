"use client";
import { useState, useRef, useCallback } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

function DirectionHoverButton({
  children,
  className = "",
  ...props
}: ButtonProps) {
  const [bubbleStyle, setBubbleStyle] = useState({});
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = useCallback(
    (e: { clientX: number; clientY: number }) => {
      if (!buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.sqrt(
        rect.width * rect.width + rect.height * rect.height
      );

      setBubbleStyle({
        left: `${x}px`,
        top: `${y}px`,
        transform: `translate(-50%, -50%) scale(0)`,
        width: `${maxDistance * 2}px`,
        height: `${maxDistance * 2}px`,
      });

      requestAnimationFrame(() => {
        setBubbleStyle((prev) => ({
          ...prev,
          transform: `translate(-50%, -50%) scale(1)`,
        }));
      });
    },
    []
  );

  const handleMouseLeave = useCallback(
    (e: { clientX: number; clientY: number }) => {
      if (!buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setBubbleStyle((prev) => ({
        ...prev,
        left: `${x}px`,
        top: `${y}px`,
        transform: `translate(-50%, -50%) scale(0)`,
      }));
    },
    []
  );

  return (
    <button
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={` px-12 py-4 border border-gray-600 rounded-full text-white font-medium relative overflow-hidden transition-colors duration-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${className}`}
      {...props}
    >
      <div
        className="absolute bg-accent rounded-full pointer-events-none transition-transform duration-300 ease-out"
        style={{
          ...bubbleStyle,
          zIndex: 0,
        }}
      />

      <span className="relative z-10">{children}</span>
    </button>
  );
}

export default DirectionHoverButton;
