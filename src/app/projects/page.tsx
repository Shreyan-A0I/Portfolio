import type { Metadata } from "next";
import Link from "next/link";
import SectionHeader from "@/components/shared/SectionHeader";
import Tag from "@/components/shared/Tag";
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
          title="Case studies and systems work"
          subtitle="A running index of projects mapped across computational biology, AI systems, and research tooling domains."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {projectCatalog.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="rounded-[1.9rem] border border-border-subtle bg-card/74 p-6 transition hover:border-accent-amber/35"
            >
              <Tag variant="metric">{project.category}</Tag>
              <h2 className="mt-5 text-2xl text-text-primary">{project.title}</h2>
              <p className="mt-3 text-sm leading-7 text-text-secondary">{project.description}</p>
              <p className="mt-5 text-lg text-accent-amber">{project.headlineMetric}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tech.slice(0, 3).map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
