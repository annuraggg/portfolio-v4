"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  bubbleClassName?: string;
  clickedBubbleClassName?: string;
  selected?: boolean;
}

export default function DirectionHoverButton({
  children,
  className = "",
  bubbleClassName = "bg-accent",
  clickedBubbleClassName = "bg-white",
  selected = false,
  ...props
}: ButtonProps) {
  const { onClick, ...rest } = props;
  const [bubbleStyle, setBubbleStyle] = useState<React.CSSProperties>({});
  const [bubbleClass, setBubbleClass] = useState<string>(bubbleClassName);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const lastPointer = useRef({ clientX: 0, clientY: 0 });
  const clickTimeout = useRef<number | null>(null);
  const prevSelected = useRef<boolean>(selected);

  const animateBubble = useCallback(
    (clientX: number, clientY: number, useClicked = false, hold = false) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const maxDistance = Math.sqrt(
        rect.width * rect.width + rect.height * rect.height
      );
      setBubbleClass(useClicked ? clickedBubbleClassName : bubbleClassName);
      setBubbleStyle({
        left: `${x}px`,
        top: `${y}px`,
        transform: "translate(-50%, -50%) scale(0)",
        width: `${maxDistance * 2}px`,
        height: `${maxDistance * 2}px`,
        transition: "transform 260ms ease-out",
      });
      requestAnimationFrame(() => {
        setBubbleStyle((prev) => ({
          ...prev,
          transform: "translate(-50%, -50%) scale(1)",
        }));
      });
      if (!hold) {
        if (clickTimeout.current) {
          window.clearTimeout(clickTimeout.current);
        }
        clickTimeout.current = window.setTimeout(() => {
          const stillHovered = buttonRef.current
            ? buttonRef.current.matches(":hover")
            : false;
          if (stillHovered) {
            const rect2 = buttonRef.current!.getBoundingClientRect();
            const lx = lastPointer.current.clientX - rect2.left;
            const ly = lastPointer.current.clientY - rect2.top;
            const maxDistance2 = Math.sqrt(
              rect2.width * rect2.width + rect2.height * rect2.height
            );
            setBubbleClass(bubbleClassName);
            setBubbleStyle({
              left: `${lx}px`,
              top: `${ly}px`,
              transform: "translate(-50%, -50%) scale(1)",
              width: `${maxDistance2 * 2}px`,
              height: `${maxDistance2 * 2}px`,
              transition: "transform 260ms ease-out",
            });
          } else {
            setBubbleStyle((prev) => ({
              ...prev,
              transform: "translate(-50%, -50%) scale(0)",
            }));
            setBubbleClass(bubbleClassName);
          }
          clickTimeout.current = null;
        }, 280);
      }
    },
    [bubbleClassName, clickedBubbleClassName]
  );

  useEffect(() => {
    if (prevSelected.current !== selected) {
      if (selected) {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        lastPointer.current = { clientX: cx, clientY: cy };
        animateBubble(cx, cy, false, false);
      } else {
        setBubbleStyle((prev) => ({
          ...prev,
          transform: "translate(-50%, -50%) scale(0)",
        }));
      }
      prevSelected.current = selected;
    }
  }, [selected, animateBubble]);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      lastPointer.current = { clientX: e.clientX, clientY: e.clientY };
      animateBubble(e.clientX, e.clientY, false, true);
    },
    [animateBubble]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      lastPointer.current = { clientX: e.clientX, clientY: e.clientY };
    },
    []
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setBubbleStyle((prev) => ({
        ...prev,
        left: `${x}px`,
        top: `${y}px`,
        transform: "translate(-50%, -50%) scale(0)",
      }));
      if (clickTimeout.current) {
        window.clearTimeout(clickTimeout.current);
        clickTimeout.current = null;
      }
      setBubbleClass(bubbleClassName);
    },
    [bubbleClassName]
  );

  const handlePointerClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      lastPointer.current = { clientX: e.clientX, clientY: e.clientY };
      animateBubble(e.clientX, e.clientY, true, false);
      onClick?.(e);
    },
    [animateBubble, onClick]
  );

  useEffect(() => {
    return () => {
      if (clickTimeout.current) window.clearTimeout(clickTimeout.current);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handlePointerClick}
      className={` px-12 py-4 border outline-none border-gray-600 rounded-full text-foreground font-medium relative overflow-hidden transition-colors duration-300 hover:text-background focus:outline-none  ${className}`}
      {...rest}
    >
      <div
        className={`absolute rounded-full pointer-events-none transition-transform duration-300 ease-out ${bubbleClass}`}
        style={{
          ...bubbleStyle,
          zIndex: 0,
        }}
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
}
