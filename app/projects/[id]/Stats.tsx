import { Project } from "@/data/projects";
import React from "react";

interface Props {
  project: Project;
}

const Stats = ({ project }: Props) => {
  return (
    <div className="flex gap-20 flex-wrap items-center justify-center px-32">
      <StatCard stat={project.timeline} label="Timeline" />
      <StatCard stat={project.role} label="My Role" />
      </div>
  );
};

const StatCard = ({ stat, label }: { stat: string; label: string }) => {
  return (
    <div className="flex flex-col py-32 w-fit">
      <span className="text-4xl font-semibold">{stat}</span>
      <span className="text-zinc-400">{label}</span>
    </div>
  );
};

export default Stats;
