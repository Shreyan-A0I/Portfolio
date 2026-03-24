import { notFound } from "next/navigation";
import { getProjectBySlug, getProjectRecords } from "@/features/content/project-content";
import { ProjectDetailPage } from "@/features/projects/ProjectDetailPage";

export async function generateStaticParams() {
  const projects = await getProjectRecords();
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailPage project={project} />;
}
