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
      className="flex border border-gray-800 pr-14 rounded-lg justify-between items-center my-5 p-5 group hover:drop-shadow-glow cursor-pointer transition-all duration-300"
      onClick={() => window.open(link, "_blank")}
    >
      <div>
        <h1 className="md:text-xl text-base drop-shadow-glow font-medium">{title}</h1>
        <p>{organization}</p>
        <p className="md:text-sm text-xs md:mt-0 mt-2 text-gray-500">{date}</p>
      </div>
      <FaArrowRight className="group-hover:translate-x-2 transition-all duration-300" />
    </div>
  );
};
