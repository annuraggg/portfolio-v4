"use client";
import React, { useState } from "react";
import { BsInstagram } from "react-icons/bs";
import { FiLinkedin } from "react-icons/fi";
import { LuGithub } from "react-icons/lu";
import { RxDiscordLogo } from "react-icons/rx";
import { SiBuymeacoffee } from "react-icons/si";

const LeftFloatingMenu = () => {
  const links = [
    {
      name: "Github",
      icon: <LuGithub size={20} />,
      href: "https://github.com/annuraggg",
    },
    {
      name: "Discord",
      icon: <RxDiscordLogo size={20} />,
      href: "https://discord.com/users/564130664643952690",
    },
    {
      name: "Linkedin",
      icon: <FiLinkedin size={20} />,
      href: "https://www.linkedin.com/in/annuraggg",
    },
    {
      name: "Instagram",
      icon: <BsInstagram size={20} />,
      href: "https://www.instagram.com/annuraggg",
    },
    {
      name: "Buy Me a Coffee",
      icon: <SiBuymeacoffee size={20} />,
      href: "https://www.buymeacoffee.com/annuraggg",
    },
  ];

  const [coords, setCoords] = useState<{
    [key: string]: { x: number; y: number };
  }>({});
  const [transform, setTransform] = useState<{ [key: string]: string }>({});

  const handleMouseMove = (
    e: React.MouseEvent<HTMLAnchorElement>,
    name: string
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords((prev) => ({ ...prev, [name]: { x, y } }));

    // magnetic transform
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const moveX = (x - centerX) / 3; // smaller divisor = stronger pull
    const moveY = (y - centerY) / 3;
    setTransform((prev) => ({
      ...prev,
      [name]: `translate(${moveX}px, ${moveY}px)`,
    }));
  };

  const handleMouseLeave = (name: string) => {
    setTransform((prev) => ({ ...prev, [name]: "translate(0, 0)" }));
  };

  return (
    <div className="absolute left-10 bottom-10 flex flex-col gap-3 z-50">
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          onMouseMove={(e) => handleMouseMove(e, link.name)}
          onMouseLeave={() => handleMouseLeave(link.name)}
          style={
            {
              "--x": `${coords[link.name]?.x || 20}px`,
              "--y": `${coords[link.name]?.y || 20}px`,
              transform: transform[link.name] || "translate(0, 0)",
              transition: "transform 0.2s ease-out",
            } as React.CSSProperties
          }
          className={`
            relative p-2 rounded-full bg-white text-black 
            overflow-hidden group will-change-transform
          `}
        >
          <span
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300"
            style={{
              background: `radial-gradient(circle at var(--x) var(--y), #6dd2ff 0%, transparent 50%)`,
            }}
          />
          <span className="relative z-10">{link.icon}</span>
        </a>
      ))}
    </div>
  );
};

export default LeftFloatingMenu;
