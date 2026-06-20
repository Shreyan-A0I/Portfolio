import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Tag from "@/components/shared/Tag";
import { projectCatalog } from "@/lib/project-catalog";

export function generateStaticParams() {
  return projectCatalog.map((project) => ({
    slug: project.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = projectCatalog.find((p) => p.slug === params.slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = projectCatalog.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="px-6 pb-20 sm:px-10 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/projects"
          className="interactive-link mb-8 inline-block text-accent-amber hover:text-accent-amber/80"
        >
          ← Back to Projects
        </Link>

        <header className="mb-12">
          <div className="mb-4 flex flex-wrap gap-2">
            <Tag variant="metric">{project.category}</Tag>
            {project.domains.map((domain) => (
              <Tag key={domain}>{domain}</Tag>
            ))}
          </div>

          <h1 className="mb-4 text-5xl font-bold text-text-primary">
            {project.title}
          </h1>

          <p className="mb-6 max-w-2xl text-lg text-text-secondary">
            {project.description}
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-widest text-text-secondary">
                Headline Metric
              </p>
              <p className="mt-2 text-2xl font-bold text-accent-amber">
                {project.headlineMetric}
              </p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-widest text-text-secondary">
                Status
              </p>
              <p className="mt-2 capitalize text-xl text-text-primary">
                {project.status}
              </p>
            </div>
          </div>
        </header>

        <div className="mb-12 rounded-2xl border border-border-subtle bg-card/40 p-8">
          <h2 className="mb-4 text-xl font-bold text-text-primary">
            Technology Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
        </div>

        <div className="editorial-panel rounded-2xl p-8">
          <h2 className="mb-4 text-2xl font-bold text-text-primary">
            About This Project
          </h2>
          <div className="space-y-4 text-text-secondary">
            <p>
              This project explores {project.domains.join(" and ")}.
            </p>
            <p>
              The main focus is on {project.description.toLowerCase()}.
            </p>
            <p>
              Key achievement: <span className="text-accent-amber font-semibold">{project.headlineMetric}</span>
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-border-subtle pt-12">
          <h3 className="mb-6 text-xl font-bold text-text-primary">
            Related Projects
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {projectCatalog
              .filter((p) => p.slug !== project.slug && p.domains.some((d) => project.domains.includes(d)))
              .slice(0, 2)
              .map((relatedProject) => (
                <Link
                  key={relatedProject.slug}
                  href={`/projects/${relatedProject.slug}`}
                  className="rounded-lg border border-border-subtle bg-surface/40 p-4 transition hover:border-accent-amber/40"
                >
                  <h4 className="font-bold text-text-primary">
                    {relatedProject.title}
                  </h4>
                  <p className="mt-2 text-sm text-text-secondary">
                    {relatedProject.description}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
