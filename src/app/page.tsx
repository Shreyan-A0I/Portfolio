import type { Metadata } from "next";
import Link from "next/link";
import SectionHeader from "@/components/shared/SectionHeader";
import ProjectCard from "@/components/projects/ProjectCard";
import HeroHeader from "@/features/home/HeroHeader";
import TranscriptionHero from "@/features/home/TranscriptionHero";
import DomainStack from "@/features/home/DomainStack";
import SystemBiography from "@/features/home/SystemBiography";
import { projectCatalog } from "@/lib/project-catalog";
import { seo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Home",
  description: seo.description,
};

export default function Home() {
  const featuredProjects = projectCatalog.slice(0, 3);

  return (
    <main className="overflow-x-clip">
      <HeroHeader />
      <TranscriptionHero />
      <DomainStack />
      <SystemBiography />

      {/* ── Featured Projects ── */}
      <section className="px-6 py-20 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Featured Work"
            title="Recent Projects"
            subtitle="A selection of ongoing work across computational biology, ML systems, and research tooling."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
              className="inline-block rounded-lg border border-accent-amber/40 bg-accent-amber/10 px-8 py-3 font-semibold text-accent-amber transition hover:border-accent-amber/80 hover:bg-accent-amber/20"
            >
              View All Projects →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="editorial-panel mx-6 mb-10 rounded-2xl px-8 py-12 sm:mx-10 lg:mx-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-text-primary">
            Let&apos;s Build Something
          </h2>
          <p className="mb-8 text-text-secondary">
            Interested in computational biology, generative AI, or edge ML systems? Reach out.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
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
