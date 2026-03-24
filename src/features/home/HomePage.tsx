import Link from "next/link";
import { StatusBadge } from "@/components/common/StatusBadge";
import { journeyEntries } from "@/lib/site";
import { makeAssetUrl } from "@/lib/utils";
import type { ProjectPreview } from "@/types";
import { BootTerminal } from "./BootTerminal";
import { SkillsGraph } from "./SkillsGraph";

interface HomePageProps {
  featuredProjects: ProjectPreview[];
  allProjects: ProjectPreview[];
}

export function HomePage({ featuredProjects, allProjects }: HomePageProps) {
  return (
    <>
      <BootTerminal />

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="reading-surface p-5 sm:p-6">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--cmu-red)]">Narrative</p>
            <h2 className="mt-3 font-reading text-3xl font-semibold text-[var(--hard-white)]">A portfolio that reads like an operating log</h2>
            <p className="mt-4 max-w-2xl font-reading text-lg leading-8 text-[var(--soft-white)]/82">
              The homepage is intentionally direct: no soft gradients, no abstract branding language, and no separation between research identity and engineering identity. The work is presented as a system under construction.
            </p>
          </div>

          <div className="marching-border reading-surface p-5 sm:p-6">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--bio-cyan)]">Featured Signal</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {featuredProjects.slice(0, 4).map((project) => (
                <Link key={project.slug} href={`/projects/${project.slug}`} className="border-[3px] border-[var(--hard-white)] bg-[var(--terminal-void)] p-4 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[var(--syntax-yellow)] hover:text-[var(--terminal-void)]">
                  <div className="flex items-center justify-between gap-2">
                    <StatusBadge status={project.status} />
                    <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-current/60">{project.year}</span>
                  </div>
                  <p className="mt-4 font-reading text-lg font-semibold">{project.title}</p>
                  <p className="mt-2 font-reading text-sm leading-6 text-current/72">{project.headline}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SkillsGraph projects={allProjects} />

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="reading-surface p-5 sm:p-6">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--syntax-yellow)]">Story Log</p>
            <h2 className="mt-3 font-reading text-3xl font-semibold text-[var(--hard-white)]">Journey, not summary</h2>
            <p className="mt-4 font-reading text-base leading-7 text-[var(--soft-white)]/78">
              The portfolio is organized around transition points: where biology forced better modeling, where modeling forced better systems, and where systems forced clearer interfaces.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={makeAssetUrl("Resume.pdf")} target="_blank" rel="noreferrer" className="border-[3px] border-[var(--hard-white)] bg-[var(--hard-white)] px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.24em] text-[var(--terminal-void)] shadow-neubrutal-cyan transition-transform duration-200 hover:-translate-y-0.5">
                Download Resume
              </a>
              <Link href="/projects" className="border-[3px] border-[var(--hard-white)] bg-[var(--paper-slab)] px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.24em] text-[var(--hard-white)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[var(--bio-cyan)] hover:text-[var(--terminal-void)]">
                Browse All Projects
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            {journeyEntries.map((entry) => (
              <article key={entry.stamp} className="reading-surface p-5 sm:p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--bio-cyan)]">{entry.stamp}</p>
                <h3 className="mt-3 font-reading text-2xl font-semibold text-[var(--hard-white)]">{entry.title}</h3>
                <p className="mt-3 font-reading text-base leading-7 text-[var(--soft-white)]/78">{entry.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
