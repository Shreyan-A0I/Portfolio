import type { Metadata } from "next";
import Link from "next/link";
import SectionHeader from "@/components/shared/SectionHeader";
import Tag from "@/components/shared/Tag";
import { projectCatalog } from "@/lib/project-catalog";
import { seo, greeting } from "@/lib/data";

export const metadata: Metadata = {
  title: "Home",
  description: seo.description,
};

export default function Home() {
  const featuredProjects = projectCatalog.slice(0, 3);

  return (
    <main className="overflow-x-clip pb-10">
      {/* Hero Section */}
      <section className="hero-overlay px-6 py-20 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 inline-block">
            <Tag variant="default">Computational Biology + AI Systems</Tag>
          </div>
          <h1 className="mb-6 text-5xl font-bold leading-tight text-text-primary md:text-6xl">
            {greeting.title}
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-text-secondary">
            Building across biology, inference systems, and product tooling. Turning the overlap into usable software.
          </p>
          <div className="flex gap-4">
            <Link
              href="/projects"
              className="interactive-link rounded-lg border border-accent-amber/40 bg-accent-amber/10 px-6 py-3 text-accent-amber transition hover:border-accent-amber/80 hover:bg-accent-amber/20"
            >
              View Projects
            </Link>
            <Link
              href="https://github.com/Shreyan-A0I"
              target="_blank"
              className="interactive-link rounded-lg border border-border-subtle bg-surface/40 px-6 py-3 text-text-primary transition hover:border-text-primary"
            >
              GitHub
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="px-6 py-20 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Featured Work"
            title="Recent Projects"
            subtitle="A selection of ongoing work across computational biology, ML systems, and research tooling."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="polymath-card rounded-2xl p-6 transition hover:border-accent-amber/60"
              >
                <Tag variant="metric">{project.category}</Tag>
                <h2 className="mt-4 text-2xl font-bold text-text-primary">
                  {project.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-text-secondary">
                  {project.description}
                </p>
                <p className="mt-4 text-lg font-semibold text-accent-amber">
                  {project.headlineMetric}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.slice(0, 2).map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="editorial-panel mx-6 rounded-2xl px-8 py-12 sm:mx-10 lg:mx-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-text-primary">
            Let's Build Something
          </h2>
          <p className="mb-8 text-text-secondary">
            Interested in discussing computational biology, AI systems, or edge inference? Reach out.
          </p>
          <Link
            href="mailto:shreyan.nalwad@gmail.com"
            className="inline-block rounded-lg border border-text-primary px-6 py-3 text-text-primary transition hover:bg-text-primary hover:text-bg-obsidian"
          >
            Send an Email
          </Link>
        </div>
      </section>
    </main>
  );
}
