"use client";
import DirectionAwareButton from "@/components/DirectionAwareButton";
import { useNavStore } from "@/lib/stores/nav-store";
import Link from "next/link";
import React from "react";

const ProjectCaseButton = ({ id }: { id: string }) => {
  const setNavigating = useNavStore((state) => state.setNavigating);

  return (
    <Link href={`/projects/${id}`}>
      <DirectionAwareButton
        className="mt-4 sm:mt-5 md:mt-7"
        onClick={() => setNavigating(true)}
      >
        See Project Case
      </DirectionAwareButton>
    </Link>
  );
};

export default ProjectCaseButton;
