"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";
import { ExternalLink } from "lucide-react";
import { useFeatureFlag } from "configcat-react";

const Navbar = () => {
  const SCROLL_THRESHOLD = 100;
  const [showBorder, setShowBorder] = useState(false);
  const [showText, setShowText] = useState(false);

  const borderTimer = useRef<NodeJS.Timeout | null>(null);
  const textTimer = useRef<NodeJS.Timeout | null>(null);

  const { value: isExperienceEnabled, loading: isExperienceLoading } =
    useFeatureFlag("enableexperience", true);

  const { value: isProjectsEnabled, loading: isProjectsLoading } =
    useFeatureFlag("enableprojects", true);

  const navItems = [
    { name: "Home", path: "/", enabled: true },
    {
      name: "Projects",
      path: "/projects",
      enabled: isProjectsEnabled && !isProjectsLoading,
    },
    {
      name: "Experience",
      path: "/experience",
      enabled: isExperienceEnabled && !isExperienceLoading,
    },
    { name: "Contact", path: "/contact", enabled: true },
    {
      name: "Blog",
      path: "https://blog.anuragsawant.in",
      external: true,
      enabled: true,
    },
    {
      name: "Resume",
      path: "/documents/resume.pdf",
      external: true,
      enabled: true,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > SCROLL_THRESHOLD;

      if (isScrolled) {
        if (textTimer.current) clearTimeout(textTimer.current);
        setShowText(true);

        if (!showBorder && !borderTimer.current) {
          borderTimer.current = setTimeout(() => {
            setShowBorder(true);
            borderTimer.current = null;
          }, 200);
        }
      } else {
        if (borderTimer.current) {
          clearTimeout(borderTimer.current);
          borderTimer.current = null;
        }
        setShowBorder(false);

        if (textTimer.current) clearTimeout(textTimer.current);
        textTimer.current = setTimeout(() => {
          setShowText(false);
        }, 500);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (borderTimer.current) clearTimeout(borderTimer.current);
      if (textTimer.current) clearTimeout(textTimer.current);
    };
  }, [showBorder]);

  return (
    <div
      className={`flex p-5 px-10 justify-between items-center h-28 fixed w-full bg-background/50 backdrop-blur transition-normal z-100 ${
        showBorder ? "border-b border-white/20" : ""
      }`}
    >
      {/* Logo / Text */}
      <div className="relative w-48 h-10">
        {/* Logo (show when !showText) */}
        <div
          className={`absolute top-0 left-0 transition-all duration-500 ${
            showText ? "opacity-0 translate-x-5" : "opacity-100 translate-x-0"
          }`}
        >
          <Image
            src="/logo.png"
            width={100}
            height={100}
            alt="Logo"
            className="ml-5 dark:invert-0 invert"
          />
        </div>

        {/* Text (show when showText) */}
        <div
          className={`absolute top-0 left-0 transition-all duration-500 ${
            showText ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"
          }`}
        >
          <div className="text-2xl font-bold mt-2">Anurag Sawant</div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-10">
        <div className="flex gap-14">
          {navItems
            .filter((item) => item.enabled)
            .map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="text-md font-semibold hover:text-accent transition-colors duration-500"
              >
                {item.external && (
                  <ExternalLink className="inline-block mb-1 mr-2" size={14} />
                )}
                {item.name}
              </Link>
            ))}

          <AnimatedThemeToggler />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
