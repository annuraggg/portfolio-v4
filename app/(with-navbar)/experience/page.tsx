"use client";

import React, { useState, useEffect } from "react";
import Experience from "./Experience";
import { CredentialItem } from "./CredentialItem";
import { useFeatureFlag } from "configcat-react";
import type { Credential } from "@/lib/db/credentials";
import Loader from "@/components/Loader";
import type { Experience as ExperienceType } from "@/lib/db/experience";

const ExperiencePage = () => {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [experience, setExperience] = useState<ExperienceType[]>([]);
  const [loading, setLoading] = useState(true);

  const { value: isFeatureEnabled, loading: isLoadingFlag } = useFeatureFlag(
    "enableexperience",
    true
  );

  useEffect(() => {
    async function fetchCredentials() {
      try {
        const response = await fetch("/api/credentials");
        if (!response.ok) {
          throw new Error("Failed to fetch credentials");
        }
        const data = await response.json();
        setCredentials(data);
      } catch (err) {
        console.error("Error loading credentials:", err);
      } finally {
        setLoading(false);
      }
    }

    async function fetchExperience() {
      try {
        const response = await fetch("/api/experience");
        if (!response.ok) {
          throw new Error("Failed to fetch experience");
        }
        const data = await response.json();
        setExperience(data);
      } catch (err) {
        console.error("Error loading experience:", err);
      } finally {
        setLoading(false);
      }
    }

    if (isFeatureEnabled && !isLoadingFlag) {
      fetchCredentials();
      fetchExperience();
    }
  }, [isFeatureEnabled, isLoadingFlag]);

  if (isLoadingFlag || loading) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <Loader />
      </div>
    );
  }

  if (!isFeatureEnabled) {
    return (
      <div className="pt-28 sm:pt-32 md:pt-40 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 text-center">
        <h1 className="font-poly text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-medium bg-gradient-to-b from-[#6b7280] to-[#e5e7eb] via-[#9ca3af] dark:from-[#ffffff6e] dark:via-[#686868] dark:to-[#101010] text-transparent bg-clip-text">
          EXPERIENCE
        </h1>
        <p className="mt-4 text-gray-500 text-sm sm:text-base">
          Experience section is currently unavailable
        </p>
      </div>
    );
  }

  return (
    <div className="pt-28 sm:pt-32 md:pt-40 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64">
      <h1 className="font-poly text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-center bg-gradient-to-b from-[#6b7280] to-[#e5e7eb] via-[#9ca3af] dark:from-[#ffffff6e] dark:via-[#686868] dark:to-[#101010] text-transparent bg-clip-text">
        EXPERIENCE
      </h1>

      <div>
        <Experience experience={experience} />
      </div>

      <div className="my-12 sm:my-16 md:my-20">
        <h1 className="font-poly mb-12 sm:mb-16 md:mb-20 text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-center bg-gradient-to-b from-[#6b7280] to-[#e5e7eb] via-[#9ca3af] dark:from-[#ffffff6e] dark:via-[#686868] dark:to-[#101010] text-transparent bg-clip-text">
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
