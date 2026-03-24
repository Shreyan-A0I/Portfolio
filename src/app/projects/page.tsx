import { getProjectPreviews } from "@/features/content/project-content";
import { ProjectsExperience } from "@/features/projects/ProjectsExperience";

export default async function ProjectsPage() {
  const projects = await getProjectPreviews();
  return <ProjectsExperience projects={projects} />;
}
