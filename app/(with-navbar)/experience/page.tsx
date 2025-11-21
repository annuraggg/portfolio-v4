import React from "react";
import Experience from "./Experience";
import { CredentialItem } from "./CredentialItem";
import { getAllCredentials, type Credential } from "@/lib/db/credentials";
import {
  getAllExperience,
  type Experience as ExperienceType,
} from "@/lib/db/experience";
import { getFeatureFlag } from "@/lib/config/configcat-server";

async function fetchCredentials(): Promise<Credential[] | Error> {
  try {
    const credentials = await getAllCredentials();
    return credentials;
  } catch (err) {
    console.error("Error loading credentials:", err);
    return new Error("Error fetching credentials");
  }
}

async function fetchExperience(): Promise<ExperienceType[] | Error> {
  try {
    const experience = await getAllExperience();
    return experience;
  } catch (err) {
    console.error("Error loading experience:", err);
    return new Error("Error fetching experience");
  }
}

export const dynamic = "force-dynamic";

export default async function ExperiencePage() {
  const isFeatureEnabled = await getFeatureFlag("enableexperience", true);

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

  const [credentials, experience] = await Promise.all([
    fetchCredentials(),
    fetchExperience(),
  ]);

  if (credentials instanceof Error || experience instanceof Error) {
    return (
      <div className="pt-28 sm:pt-32 md:pt-40 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 text-center">
        <h1 className="font-poly text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-medium bg-gradient-to-b from-[#6b7280] to-[#e5e7eb] via-[#9ca3af] dark:from-[#ffffff6e] dark:via-[#686868] dark:to-[#101010] text-transparent bg-clip-text">
          EXPERIENCE
        </h1>
        <p className="mt-4 text-gray-500 text-sm sm:text-base">
          Failed to load experience data. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="pt-28 sm:pt-32 md:pt-40 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64">
      <h1 className="font-poly text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-center bg-gradient-to-b from-[#6b7280] to-[#e5e7eb] via-[#9ca3af] dark:from-[#ffffff6e] dark:via-[#686868] dark:to-[#101010] text-transparent bg-clip-text">
        EXPERIENCE
      </h1>

      <Experience experience={experience} />

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
}
