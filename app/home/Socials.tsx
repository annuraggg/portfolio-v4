"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dock, DockIcon } from "@/components/ui/dock";
import { LuGithub } from "react-icons/lu";
import { RxDiscordLogo } from "react-icons/rx";
import { FiLinkedin } from "react-icons/fi";
import { BsInstagram } from "react-icons/bs";
import { SiBuymeacoffee } from "react-icons/si";

export type IconProps = React.HTMLAttributes<SVGElement>;

const links = [
  {
    name: "Github",
    icon: LuGithub,
    href: "https://github.com/annuraggg",
  },
  {
    name: "Discord",
    icon: RxDiscordLogo,
    href: "https://discord.com/users/564130664643952690",
  },
  {
    name: "Linkedin",
    icon: FiLinkedin,
    href: "https://www.linkedin.com/in/annuraggg",
  },
  {
    name: "Instagram",
    icon: BsInstagram,
    href: "https://www.instagram.com/annuraggg",
  },
  {
    name: "Buy Me a Coffee",
    icon: SiBuymeacoffee,
    href: "https://www.buymeacoffee.com/annuraggg",
  },
];

const DockComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <TooltipProvider>
        <Dock direction="middle">
          {links.map((item) => (
            <DockIcon key={item.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    aria-label={item.name}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 rounded-full"
                    )}
                  >
                    <item.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
        </Dock>
      </TooltipProvider>
    </div>
  );
};

export default DockComponent;
