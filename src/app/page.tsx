import type { Metadata } from "next";
import Link from "next/link";
import SectionHeader from "@/components/shared/SectionHeader";
import Tag from "@/components/shared/Tag";
import ProjectCard from "@/components/projects/ProjectCard";
import ConstellationGraph from "@/components/hero/ConstellationGraph";
import HelixEntry from "@/features/home/HelixEntry";
import { projectCatalog } from "@/lib/project-catalog";
import { seo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Home",
  description: seo.description,
};

export default function Home() {
  const featuredProjects = ["cerviai", "nustain", "inv-shaf"]
    .map((slug) => projectCatalog.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => !!p);

  return (
    <main className="overflow-x-clip pb-10">

      {/* ── Entry gate ── */}
      <HelixEntry />

      {/* ── Portfolio landing ──────────────────────────────────────────────── */}
      <section
        id="portfolio"
        className="hero-overlay scroll-mt-16 min-h-[88vh] px-6 py-16 sm:px-10 lg:px-12 flex items-center"
      >
        <div className="mx-auto max-w-7xl w-full">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-center">

            {/* ── Bio ── */}
            <div>
              <div className="mb-6 inline-block">
                <Tag variant="default">MS Computational Biology · CMU · 2027</Tag>
              </div>

              {/* No name heading — navbar already shows it */}
              <p className="mb-8 max-w-xl text-lg text-text-secondary leading-relaxed">
                MS Comp Bio @ CMU. Research in Zhao Biophotonics Lab, currently working
                on in-silico multiplexing — building diffusion models that let microscopes
                see more than their hardware allows. I love building tools, learning from
                collaborations, and finding the next interesting problem at the edge of
                biology and compute.
              </p>

              <div className="mb-8 flex flex-wrap gap-2">
                {[
                  "Generative AI",
                  "Graph ML",
                  "Spatial Omics",
                  "Edge Inference",
                  "Sequence ML",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border-subtle px-3 py-1 text-xs text-text-secondary hud-text"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/projects"
                  className="interactive-link rounded-lg border border-accent-amber/40 bg-accent-amber/10 px-6 py-3 text-accent-amber transition hover:border-accent-amber/80 hover:bg-accent-amber/20"
                >
                  View Projects
                </Link>
                <Link
                  href="/resume"
                  className="interactive-link rounded-lg border border-border-subtle bg-surface/40 px-6 py-3 text-text-primary transition hover:border-text-primary/50"
                >
                  Resume
                </Link>
                <a
                  href="https://github.com/Shreyan-A0I"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive-link rounded-lg border border-border-subtle bg-surface/40 px-6 py-3 text-text-primary transition hover:border-text-primary/50"
                >
                  GitHub
                </a>
              </div>
            </div>

            {/* ── Constellation ── */}
            <div className="hidden lg:flex flex-col items-center gap-4">
              <ConstellationGraph />
              <p className="hud-text text-text-secondary opacity-50">
                hover a domain to explore connections
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section className="px-6 py-20 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Featured Work"
            title="Recent Projects"
            subtitle="A selection of ongoing work across computational biology, ML systems, and research tooling."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                slug={project.slug}
                title={project.title}
                description={project.description}
                headlineMetric={project.headlineMetric}
                tech={project.tech}
                category={project.category}
              />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="inline-block rounded-lg border border-accent-amber/40 bg-accent-amber/10 px-8 py-3 text-accent-amber transition hover:border-accent-amber/80 hover:bg-accent-amber/20 font-semibold"
            >
              View All Projects →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="editorial-panel mx-6 rounded-2xl px-8 py-12 sm:mx-10 lg:mx-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-text-primary">
            Let&apos;s Build Something
          </h2>
          <p className="mb-8 text-text-secondary">
            Interested in computational biology, generative AI, or edge ML systems? Reach out.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="mailto:shreyan.nalwad@gmail.com"
              className="inline-block rounded-lg border border-text-primary px-6 py-3 text-text-primary transition hover:bg-text-primary hover:text-obsidian"
            >
              shreyan.nalwad@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/shreyan-nalwad"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg border border-border-subtle px-6 py-3 text-text-secondary transition hover:border-text-primary hover:text-text-primary"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
