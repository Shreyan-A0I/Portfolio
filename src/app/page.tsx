import { getFeaturedProjects, getProjectPreviews } from "@/features/content/project-content";
import { HomePage } from "@/features/home/HomePage";

export default async function Page() {
  const [featuredProjects, allProjects] = await Promise.all([
    getFeaturedProjects(),
    getProjectPreviews(),
  ]);

  return <HomePage featuredProjects={featuredProjects} allProjects={allProjects} />;
}
