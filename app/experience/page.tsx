import React from "react";
import Experience from "./Experience";
import { credentials } from "@/data/credentials";
import { CredentialItem } from "./CredentialItem";

const page = () => {
  return (
    <div className="pt-40 px-64">
      <h1 className="font-poly text-3xl md:text-7xl font-medium text-center bg-gradient-to-b from-[#6b7280] to-[#e5e7eb] via-[#9ca3af] dark:from-[#ffffff6e] dark:via-[#686868] dark:to-[#101010] text-transparent bg-clip-text">
        EXPERIENCE
      </h1>

      <div>
        <Experience />
      </div>

      <div className="my-20">
        <h1 className="font-poly mb-20 text-3xl md:text-7xl font-medium text-center bg-gradient-to-b from-[#6b7280] to-[#e5e7eb] via-[#9ca3af] dark:from-[#ffffff6e] dark:via-[#686868] dark:to-[#101010] text-transparent bg-clip-text">
          CREDENTIALS
        </h1>
        {credentials.map((c) => (
          <CredentialItem key={c.title} {...c} />
        ))}
      </div>
    </div>
  );
};

export default page;
