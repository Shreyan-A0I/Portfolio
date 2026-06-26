import type { Metadata } from "next";
import SectionHeader from "@/components/shared/SectionHeader";
import ProjectCard from "@/components/projects/ProjectCard";
import { projectCatalog } from "@/lib/project-catalog";

export const metadata: Metadata = {
  title: "Projects",
  description: "Project deep dives across computational biology, AI systems, and research tooling.",
};

export default function ProjectsPage() {
  return (
    <main className="px-6 pb-20 sm:px-10 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Projects"
          title="Everything I've built or obsessed over"
          subtitle="Mapped across bio, ML, and wherever the problem took me."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projectCatalog.map((project, index) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              title={project.title}
              description={project.description}
              headlineMetric={project.headlineMetric}
              tech={project.tech}
              category={project.category}
              thumbnail={project.thumbnail}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
