import ProjectCard from "./ProjectCard";
import { getFeatureFlag } from "@/lib/config/configcat-server";
import {
  getAllProjects,
  type Project,
} from "@/lib/db/projects";

export default async function ProjectsPage() {
  const isFeatureEnabled = await getFeatureFlag("enableprojects", true);

  if (!isFeatureEnabled) {
    return (
      <div className="pt-32 sm:pt-40 md:pt-48 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Projects</h1>
        <p className="mt-4 text-gray-500 text-sm sm:text-base">
          Projects section is currently unavailable
        </p>
      </div>
    );
  }

  const getProjects = async () => {
    try {
      const projects = await getAllProjects();

      return projects;
    } catch (error) {
      console.error("Error fetching projects:", error);
      return { error: "Failed to fetch projects", status: 500 };
    }
  };

  const res = await getProjects();

  if ("error" in res) {
    return (
      <div className="pt-32 sm:pt-40 md:pt-48 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Projects</h1>
        <p className="mt-4 text-red-500 text-sm sm:text-base">
          Failed to load projects
        </p>
      </div>
    );
  }

  const projects: Project[] = res;

  return (
    <div className="pt-32 sm:pt-40 md:pt-48 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
        Projects
      </h1>
      <div>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
