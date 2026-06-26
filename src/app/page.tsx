import type { Metadata } from "next";
import Link from "next/link";
import SectionHeader from "@/components/shared/SectionHeader";
import Tag from "@/components/shared/Tag";
import ProjectCard from "@/components/projects/ProjectCard";
import ConstellationGraph from "@/components/hero/ConstellationGraph";
import HelixEntry from "@/features/home/HelixEntry";
import { projectCatalog } from "@/lib/project-catalog";
import { feedEntries } from "@/lib/feed-entries";
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
        className="hero-overlay min-h-[88vh] px-6 py-16 sm:px-10 lg:px-12 flex items-center"
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
            title="What I'm building"
            subtitle="The ones I'd actually show someone."
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
                thumbnail={project.thumbnail}
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

      {/* ── Feed preview ── */}
      <section className="px-6 py-16 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-baseline justify-between mb-8">
            <p className="hud-text text-xs uppercase tracking-widest text-text-secondary/50">From the feed</p>
            <Link href="/feed" className="text-sm text-accent-amber hover:underline underline-offset-4">
              see all →
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {feedEntries.slice(0, 3).map((entry, i) => (
              <Link key={i} href="/feed" className="group block rounded-xl border border-border-subtle bg-card/30 p-5 transition hover:border-accent-amber/40 hover:bg-card/60">
                <div className="mb-3 flex items-center gap-2">
                  <span className="hud-text text-xs text-text-secondary/40 uppercase tracking-widest">{entry.date}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full border border-border-subtle text-text-secondary/50">{entry.tag}</span>
                </div>
                <p className="text-base font-semibold text-text-primary leading-snug mb-2 group-hover:text-accent-amber transition-colors">
                  {entry.title}
                </p>
                {!entry.image && (
                  <p className="text-sm text-text-secondary/70 leading-relaxed line-clamp-2">
                    {entry.paragraphs[0]}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Background ── */}
      <section className="px-6 py-16 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <p className="mb-8 hud-text text-xs uppercase tracking-widest text-text-secondary/50">Background</p>
          <div className="space-y-5 text-text-secondary leading-relaxed">
            <p>
              I grew up in a house of doctors — strolling behind my mom (a cancer pathologist)
              through labs and hospital corridors, watching dad clean his surgical instruments
              after a long day and chat about cameras, robotic systems; medicine was never
              abstract to me. When I found computation, it felt like a second lens for the same
              class of problems — high stakes, messy data, real consequences.
            </p>
            <p>
              My first real taste of clinical AI came at{" "}
              <strong className="text-text-primary">Vyuhaa Med Data</strong> in Hyderabad —
              building the <strong className="text-text-primary">CerviAI</strong> pipeline
              end-to-end and deploying it on Jetson Orin Nano with live inference running
              concurrently as the scanner captured slides. When it worked, something clicked
              about what it means to build AI that operates in the world, not in a notebook.
            </p>
            <p>
              Now I&apos;m at{" "}
              <strong className="text-text-primary">Zhao Biophotonics Lab at CMU</strong>,
              building diffusion models for in-silico fluorescence multiplexing — letting
              microscopes see more than their optics allow.
            </p>
          </div>
          <div className="mt-8">
            <a href="/feed" className="interactive-link text-sm text-accent-amber hover:underline underline-offset-4">
              Notes &amp; updates →
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="editorial-panel mx-6 rounded-2xl px-8 py-12 sm:mx-10 lg:mx-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-text-primary">
            find me here
          </h2>
          <p className="mb-8 text-text-secondary">
            if you&apos;re working on something interesting, reach out.
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
