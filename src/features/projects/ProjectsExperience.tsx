"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { ProjectPreview } from "@/types";

interface ProjectsExperienceProps {
  projects: ProjectPreview[];
}

export function ProjectsExperience({ projects }: ProjectsExperienceProps) {
  const reduceMotion = useReducedMotion();
  const [selectedLabel, setSelectedLabel] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectPreview | null>(null);

  const labels = useMemo(
    () => [
      "All",
      ...Array.from(new Set(projects.flatMap((project) => project.graphLabels))).sort((left, right) =>
        left.localeCompare(right),
      ),
    ],
    [projects],
  );

  const filteredProjects = useMemo(() => {
    if (selectedLabel === "All") {
      return projects;
    }

    return projects.filter((project) => project.graphLabels.includes(selectedLabel));
  }, [projects, selectedLabel]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="reading-surface h-fit p-5 sm:p-6">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--cmu-red)]">Project Index</p>
          <h1 className="mt-3 font-reading text-4xl font-semibold text-[var(--hard-white)]">Research, systems, product work.</h1>
          <p className="mt-4 font-reading text-base leading-7 text-[var(--soft-white)]/78">
            Each card is tagged against the same graph logic used on the homepage. Scan by direction, open the quick view, or jump into the full dossier route.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {labels.map((label) => {
              const active = label === selectedLabel;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setSelectedLabel(label)}
                  className={active
                    ? "border-[3px] border-[var(--hard-white)] bg-[var(--hard-white)] px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-[var(--terminal-void)] shadow-neubrutal-cyan"
                    : "border-[3px] border-[var(--hard-white)] bg-[var(--paper-slab)] px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-[var(--hard-white)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[var(--bio-cyan)] hover:text-[var(--terminal-void)]"
                  }
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {filteredProjects.map((project) => (
            <motion.button
              key={project.slug}
              layoutId={`project-card-${project.slug}`}
              type="button"
              onClick={() => setSelectedProject(project)}
              whileHover={reduceMotion ? undefined : { x: -4, y: -4 }}
              className="reading-surface group cursor-pointer overflow-hidden p-0 text-left"
            >
              {project.image && (
                <div className="relative h-44 border-b-[3px] border-[var(--hard-white)] bg-[var(--terminal-void)]">
                  <Image src={project.image} alt={project.title} fill className="object-cover opacity-90 transition-transform duration-300 group-hover:scale-105" />
                </div>
              )}
              <div className="space-y-4 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--bio-cyan)]">{project.domain}</p>
                    <h2 className="mt-2 font-reading text-2xl font-semibold text-[var(--hard-white)]">{project.title}</h2>
                  </div>
                  <StatusBadge status={project.status} className="shrink-0" />
                </div>

                <p className="font-reading text-sm leading-6 text-[var(--soft-white)]/78">{project.shortDescription}</p>

                <div className="flex flex-wrap gap-2">
                  {project.graphLabels.map((label) => (
                    <span key={label} className="border-[3px] border-[var(--hard-white)] bg-[var(--terminal-void)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--soft-white)]/72">
                      {label}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 border-t-[3px] border-dashed border-[var(--hard-white)]/45 pt-4">
                  {project.metrics.slice(0, 2).map((metric) => (
                    <div key={metric.label}>
                      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--soft-white)]/58">{metric.label}</p>
                      <p className="mt-1 text-xl font-semibold text-[var(--hard-white)]">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center bg-[rgba(9,9,11,0.75)] p-4 sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              layoutId={`project-card-${selectedProject.slug}`}
              className="reading-surface max-h-[92vh] w-full max-w-4xl overflow-auto p-0"
              onClick={(event) => event.stopPropagation()}
            >
              {selectedProject.image && (
                <div className="relative h-64 border-b-[3px] border-[var(--hard-white)] bg-[var(--terminal-void)] sm:h-80">
                  <Image src={selectedProject.image} alt={selectedProject.title} fill className="object-cover" />
                </div>
              )}
              <div className="space-y-6 p-6 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--bio-cyan)]">{selectedProject.domain}</p>
                    <h2 className="mt-3 font-reading text-3xl font-semibold text-[var(--hard-white)]">{selectedProject.title}</h2>
                    <p className="mt-3 max-w-2xl font-reading text-base leading-7 text-[var(--soft-white)]/82">{selectedProject.headline}</p>
                  </div>
                  <StatusBadge status={selectedProject.status} />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {selectedProject.metrics.map((metric) => (
                    <div key={metric.label} className="border-[3px] border-[var(--hard-white)] bg-[var(--terminal-void)] p-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[var(--soft-white)]/58">{metric.label}</p>
                      <p className="mt-2 text-2xl font-semibold text-[var(--hard-white)]">{metric.value}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <p className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--syntax-yellow)]">Graph Labels</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.graphLabels.map((label) => (
                      <span key={label} className="border-[3px] border-[var(--hard-white)] bg-[var(--paper-slab)] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--hard-white)]">
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link href={`/projects/${selectedProject.slug}`} className="border-[3px] border-[var(--hard-white)] bg-[var(--hard-white)] px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.24em] text-[var(--terminal-void)] shadow-neubrutal-cyan transition-transform duration-200 hover:-translate-y-0.5">
                    Open Full Dossier
                  </Link>
                  <button type="button" onClick={() => setSelectedProject(null)} className="border-[3px] border-[var(--hard-white)] bg-[var(--paper-slab)] px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.24em] text-[var(--hard-white)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[var(--cmu-red)]">
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
