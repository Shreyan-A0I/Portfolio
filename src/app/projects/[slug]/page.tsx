import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Tag from "@/components/shared/Tag";
import { projectCatalog } from "@/lib/project-catalog";
import { getProjectGradient } from "@/lib/project-color";
import { projectContent } from "@/content/projects";

export function generateStaticParams() {
  return projectCatalog.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectCatalog.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.description,
  };
}

const STATUS_LABEL: Record<string, { label: string; color: string }> = {
  ongoing:  { label: "Ongoing",  color: "text-emerald-400" },
  research: { label: "Research", color: "text-accent-amber" },
  shipped:  { label: "Shipped",  color: "text-accent-amber" },
  concept:  { label: "Concept",  color: "text-text-secondary" },
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectCatalog.find((p) => p.slug === slug);
  if (!project) notFound();

  const gradient = getProjectGradient(project.title);
  const status = STATUS_LABEL[project.status] ?? STATUS_LABEL.concept;
  const detail = projectContent[project.slug];

  const related = projectCatalog
    .filter(
      (p) =>
        p.slug !== project.slug &&
        p.domains.some((d) => project.domains.includes(d))
    )
    .slice(0, 3);

  return (
    <main>

      {/* ── Banner ── */}
      <div className={`relative h-52 md:h-64 overflow-hidden bg-gradient-to-br ${gradient}`}>
        {/* vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
        {/* grain */}
        <div className="absolute inset-0 ember-noise opacity-20 pointer-events-none" />

        {/* back nav */}
        <div className="relative z-10 px-6 pt-6 sm:px-10 lg:px-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition"
          >
            ← All Projects
          </Link>
        </div>

        {/* title block pinned to bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-7 sm:px-10 lg:px-12">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Tag variant="metric">{project.category}</Tag>
            <span className={`hud-text text-xs ${status.color}`}>
              {status.label}
            </span>
          </div>
          <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl">
            {project.title}
          </h1>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="mx-auto max-w-6xl px-6 pb-28 pt-10 sm:px-10 lg:px-12">

        {/* lead */}
        <p className="mb-10 max-w-3xl text-lg leading-relaxed text-text-secondary">
          {project.description}
        </p>

        {/* two-column */}
        <div className="grid gap-10 lg:grid-cols-[1fr_288px] items-start">

          {/* ── Main ── */}
          <div className="space-y-6">

            {/* Per-project sections */}
            {detail ? (
              detail.sections.map((section, si) => (
                <section
                  key={si}
                  className={
                    si === 0
                      ? "editorial-panel rounded-2xl p-8"
                      : "rounded-2xl border border-border-subtle bg-card/40 p-8"
                  }
                >
                  <h2 className="mb-5 text-lg font-bold text-text-primary">
                    {section.title}
                  </h2>
                  <div className="space-y-4">
                    {section.paragraphs.map((p, pi) => (
                      <p key={pi} className="leading-relaxed text-text-secondary">
                        {p}
                      </p>
                    ))}
                  </div>
                </section>
              ))
            ) : (
              <>
                <section className="editorial-panel rounded-2xl p-8">
                  <h2 className="mb-4 text-lg font-bold text-text-primary">
                    About This Project
                  </h2>
                  <p className="leading-relaxed text-text-secondary">
                    {project.longDescription}
                  </p>
                </section>
                <section className="rounded-2xl border border-border-subtle bg-card/40 p-8">
                  <h2 className="mb-5 text-lg font-bold text-text-primary">
                    Key Highlights
                  </h2>
                  <ul className="space-y-4">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-0.5 shrink-0 font-bold text-accent-amber">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-text-secondary">{h}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </>
            )}

          </div>

          {/* ── Sidebar ── */}
          <aside className="space-y-4 lg:sticky lg:top-28">

            {/* Metric */}
            <div className="rounded-xl border border-accent-amber/30 bg-accent-amber/8 p-5">
              <p className="hud-text mb-2 text-xs text-text-secondary">Key Result</p>
              <p className="text-lg font-bold leading-snug text-accent-amber">
                {project.headlineMetric}
              </p>
            </div>

            {/* Links */}
            {(project.demo || project.github) && (
              <div className="flex flex-col gap-2">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-lg border border-accent-amber/40 bg-accent-amber/10 px-4 py-2.5 text-sm text-accent-amber transition hover:border-accent-amber/80 hover:bg-accent-amber/20"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-lg border border-border-subtle bg-surface/40 px-4 py-2.5 text-sm text-text-primary transition hover:border-accent-amber/40 hover:text-accent-amber"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    GitHub
                  </a>
                )}
              </div>
            )}

            {/* Tech Stack */}
            <div className="rounded-xl border border-border-subtle bg-card/40 p-5">
              <h3 className="hud-text mb-3 text-xs text-text-secondary">Tech Stack</h3>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <Tag key={t} className="text-xs">
                    {t}
                  </Tag>
                ))}
              </div>
            </div>

            {/* Domains */}
            <div className="rounded-xl border border-border-subtle bg-card/40 p-5">
              <h3 className="hud-text mb-3 text-xs text-text-secondary">Domains</h3>
              <div className="flex flex-wrap gap-1.5">
                {project.domains.map((d) => (
                  <Tag key={d} variant="default" className="text-xs">
                    {d}
                  </Tag>
                ))}
              </div>
            </div>

          </aside>
        </div>

        {/* ── Related Projects ── */}
        {related.length > 0 && (
          <div className="mt-16 border-t border-border-subtle pt-12">
            <h3 className="mb-6 text-lg font-bold text-text-primary">
              Related Projects
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/projects/${rel.slug}`}
                  className="group rounded-xl border border-border-subtle bg-surface/40 p-5 transition hover:border-accent-amber/40"
                >
                  <p className="hud-text mb-2 text-xs text-accent-amber">
                    {rel.category}
                  </p>
                  <h4 className="mb-2 font-bold text-text-primary transition group-hover:text-accent-amber">
                    {rel.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-text-secondary line-clamp-2">
                    {rel.description}
                  </p>
                  <p className="mt-3 text-xs text-accent-amber/70">
                    {rel.headlineMetric}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
