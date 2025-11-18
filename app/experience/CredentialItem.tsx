"use client";

import { FaArrowRight } from "react-icons/fa6";

interface CredentialProps {
  title: string;
  date: string;
  link: string;
  organization: string;
}

export const CredentialItem: React.FC<CredentialProps> = ({
  title,
  date,
  link,
  organization,
}) => {
  return (
    <div
      className="flex border border-gray-800 pr-4 sm:pr-8 md:pr-14 rounded-lg justify-between items-center my-3 sm:my-4 md:my-5 p-3 sm:p-4 md:p-5 group hover:drop-shadow-glow cursor-pointer transition-all duration-300"
      onClick={() => window.open(link, "_blank")}
    >
      <div>
        <h1 className="text-sm sm:text-base md:text-xl drop-shadow-glow font-medium">{title}</h1>
        <p className="text-xs sm:text-sm md:text-base">{organization}</p>
        <p className="text-xs md:text-sm mt-1 md:mt-0 text-gray-500">{date}</p>
      </div>
      <FaArrowRight className="group-hover:translate-x-2 transition-all duration-300 text-sm sm:text-base" />
    </div>
  );
};
