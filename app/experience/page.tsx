"use client";

import React, { useState, useEffect } from "react";
import Experience from "./Experience";
import { CredentialItem } from "./CredentialItem";
import { useFeatureFlag } from "configcat-react";
import type { Credential } from "@/lib/db/credentials";

const ExperiencePage = () => {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { value: isFeatureEnabled, loading: isLoadingFlag } = useFeatureFlag(
    "enableexperience",
    true
  );

  useEffect(() => {
    async function fetchCredentials() {
      try {
        const response = await fetch('/api/credentials');
        if (!response.ok) {
          throw new Error('Failed to fetch credentials');
        }
        const data = await response.json();
        setCredentials(data);
      } catch (err) {
        console.error('Error loading credentials:', err);
      } finally {
        setLoading(false);
      }
    }

    if (isFeatureEnabled && !isLoadingFlag) {
      fetchCredentials();
    }
  }, [isFeatureEnabled, isLoadingFlag]);

  if (isLoadingFlag || loading) {
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
