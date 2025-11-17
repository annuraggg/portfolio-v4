"use client";

import React from "react";
import Experience from "./Experience";
import { credentials } from "@/data/credentials";
import { CredentialItem } from "./CredentialItem";
import { useFeatureFlag } from "configcat-react";

const ExperiencePage = () => {
  const { value: isFeatureEnabled, loading: isLoadingFlag } = useFeatureFlag(
    "enableExperience",
    true // Default to true for backward compatibility
  );

  if (isLoadingFlag) {
    return (
      <div className="pt-40 px-64 text-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!isFeatureEnabled) {
    return (
      <div className="pt-40 px-64 text-center">
        <h1 className="font-poly text-3xl md:text-7xl font-medium bg-gradient-to-b from-[#6b7280] to-[#e5e7eb] via-[#9ca3af] dark:from-[#ffffff6e] dark:via-[#686868] dark:to-[#101010] text-transparent bg-clip-text">
          EXPERIENCE
        </h1>
        <p className="mt-4 text-gray-500">
          Experience section is currently unavailable
        </p>
      </div>
    );
  }

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

export default ExperiencePage;
