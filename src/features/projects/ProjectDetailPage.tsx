import Image from "next/image";
import Link from "next/link";
import { StatusBadge } from "@/components/common/StatusBadge";
import { MarkdownArticle } from "@/features/content/markdown-article";
import { makeAssetUrl } from "@/lib/utils";
import type { ProjectRecord } from "@/types";

interface ProjectDetailPageProps {
  project: ProjectRecord;
}

export function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  const fileAttachments = project.attachments.filter((attachment) => attachment.kind !== "readme");

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="flex flex-wrap items-center gap-3">
        <Link href="/projects" className="border-[3px] border-[var(--hard-white)] bg-[var(--paper-slab)] px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-[var(--hard-white)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[var(--bio-cyan)] hover:text-[var(--terminal-void)]">
          Back To Projects
        </Link>
        <StatusBadge status={project.status} />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <div className="reading-surface p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--bio-cyan)]">{project.domain}</p>
            <h1 className="mt-3 font-reading text-4xl font-semibold text-[var(--hard-white)] sm:text-5xl">{project.title}</h1>
            <p className="mt-4 font-reading text-lg leading-8 text-[var(--soft-white)]/82">{project.headline}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="border-[3px] border-[var(--hard-white)] bg-[var(--terminal-void)] p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--soft-white)]/58">{metric.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-[var(--hard-white)]">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>

          {project.image ? (
            <div className="reading-surface overflow-hidden p-0">
              <div className="relative h-[360px] w-full bg-[var(--terminal-void)]">
                <Image src={project.image} alt={project.title} fill className="object-cover" />
              </div>
            </div>
          ) : null}

          <div className="reading-surface p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--syntax-yellow)]">Narrative Breakdown</p>
            <div className="mt-6 space-y-6">
              {project.story.map((section) => (
                <article key={section.title} className="border-l-[3px] border-[var(--bio-cyan)] pl-4">
                  <h2 className="font-reading text-2xl font-semibold text-[var(--hard-white)]">{section.title}</h2>
                  <p className="mt-3 font-reading text-base leading-7 text-[var(--soft-white)]/82">{section.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="reading-surface p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--cmu-red)]">Stack + Labels</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span key={item} className="border-[3px] border-[var(--hard-white)] bg-[var(--terminal-void)] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--hard-white)]">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.graphLabels.map((label) => (
                <span key={label} className="border-[3px] border-[var(--bio-cyan)] bg-[var(--paper-slab)] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--bio-cyan)]">
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="reading-surface p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--bio-cyan)]">Attachments</p>
            <div className="mt-5 space-y-3">
              {fileAttachments.length === 0 ? (
                <p className="font-reading text-sm leading-6 text-[var(--soft-white)]/72">No external files attached yet. The narrative is seeded from the portfolio content layer and can be expanded later.</p>
              ) : (
                fileAttachments.map((attachment) => {
                  const href = attachment.path ? makeAssetUrl(attachment.path) : attachment.url ?? "#";
                  return (
                    <a key={`${attachment.kind}-${attachment.label}`} href={href} target="_blank" rel="noreferrer" className="block border-[3px] border-[var(--hard-white)] bg-[var(--terminal-void)] p-4 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[var(--syntax-yellow)] hover:text-[var(--terminal-void)]">
                      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-current/60">{attachment.kind}</p>
                      <p className="mt-2 font-reading text-lg font-semibold">{attachment.label}</p>
                    </a>
                  );
                })
              )}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {project.liveUrl ? (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="border-[3px] border-[var(--hard-white)] bg-[var(--hard-white)] px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.24em] text-[var(--terminal-void)] shadow-neubrutal-cyan transition-transform duration-200 hover:-translate-y-0.5">
                  Live Link
                </a>
              ) : null}
              {project.repoUrl ? (
                <a href={project.repoUrl} target="_blank" rel="noreferrer" className="border-[3px] border-[var(--hard-white)] bg-[var(--paper-slab)] px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.24em] text-[var(--hard-white)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[var(--bio-cyan)] hover:text-[var(--terminal-void)]">
                  GitHub
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {project.readme ? (
        <div className="reading-surface mt-8 p-6 sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--syntax-yellow)]">Source Notes</p>
          <div className="reading-prose mt-6">
            <MarkdownArticle source={project.readme} />
          </div>
        </div>
      ) : null}
    </section>
  );
}
