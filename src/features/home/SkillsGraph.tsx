"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { graphClusters } from "@/lib/site";
import type { ProjectPreview } from "@/types";
import { StatusBadge } from "@/components/common/StatusBadge";

interface SkillsGraphProps {
  projects: ProjectPreview[];
}

export function SkillsGraph({ projects }: SkillsGraphProps) {
  const reduceMotion = useReducedMotion();
  const [selectedId, setSelectedId] = useState(graphClusters[0]?.id ?? "");

  const selectedCluster = useMemo(
    () => graphClusters.find((cluster) => cluster.id === selectedId) ?? graphClusters[0],
    [selectedId],
  );

  const relatedProjects = useMemo(() => {
    if (!selectedCluster) {
      return [];
    }

    return projects.filter((project) => selectedCluster.relatedProjectSlugs.includes(project.slug));
  }, [projects, selectedCluster]);

  if (!selectedCluster) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-14">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="reading-surface p-4 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--bio-cyan)]">Interdisciplinary Graph</p>
              <h2 className="mt-3 font-reading text-3xl font-semibold text-[var(--hard-white)]">Where the work overlaps</h2>
            </div>
            <div className="hidden font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--soft-white)]/58 md:block">
              hover / focus / trace
            </div>
          </div>

          <div className="relative mt-8 aspect-[5/4] border-[3px] border-[var(--hard-white)] bg-[var(--terminal-void)]">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {graphClusters.flatMap((cluster) =>
                cluster.relatedProjectSlugs.map((slug) => {
                  const projectIndex = projects.findIndex((project) => project.slug === slug);
                  if (projectIndex === -1) {
                    return null;
                  }

                  const x = 16 + (projectIndex % 3) * 22;
                  const y = 86 - Math.floor(projectIndex / 3) * 14;
                  const active = cluster.id === selectedCluster.id;

                  return (
                    <line
                      key={`${cluster.id}-${slug}`}
                      x1={cluster.x}
                      y1={cluster.y}
                      x2={x}
                      y2={y}
                      stroke={active ? cluster.color : "rgba(250,250,250,0.18)"}
                      strokeWidth={active ? 1.4 : 0.7}
                      strokeDasharray="3 2"
                    />
                  );
                }),
              )}
            </svg>

            <div className="absolute inset-0">
              {graphClusters.map((cluster) => {
                const active = cluster.id === selectedCluster.id;
                return (
                  <motion.button
                    key={cluster.id}
                    type="button"
                    style={{ left: `${cluster.x}%`, top: `${cluster.y}%`, borderColor: cluster.color }}
                    whileHover={reduceMotion ? undefined : { scale: 1.03, x: -2, y: -2 }}
                    onMouseEnter={() => setSelectedId(cluster.id)}
                    onFocus={() => setSelectedId(cluster.id)}
                    onClick={() => setSelectedId(cluster.id)}
                    className="absolute w-[10rem] -translate-x-1/2 -translate-y-1/2 border-[3px] bg-[var(--paper-slab)] px-3 py-2 text-left shadow-neubrutal transition-all duration-200"
                    aria-pressed={active}
                  >
                    <span className="block font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--soft-white)]/60">Cluster</span>
                    <span className="mt-2 block font-reading text-sm font-semibold leading-5 text-[var(--hard-white)]">{cluster.label}</span>
                  </motion.button>
                );
              })}

              {projects.slice(0, 6).map((project, index) => {
                const x = 16 + (index % 3) * 22;
                const y = 86 - Math.floor(index / 3) * 14;
                const active = selectedCluster.relatedProjectSlugs.includes(project.slug);
                return (
                  <motion.div
                    key={project.slug}
                    style={{ left: `${x}%`, top: `${y}%` }}
                    animate={active ? { opacity: 1, scale: 1 } : { opacity: 0.45, scale: 0.94 }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 border-[3px] border-[var(--hard-white)] bg-[var(--terminal-void)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--soft-white)]/78"
                  >
                    {project.title}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="reading-surface p-5 sm:p-6">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--syntax-yellow)]">Selected Trace</p>
          <h3 className="mt-3 font-reading text-2xl font-semibold text-[var(--hard-white)]">{selectedCluster.label}</h3>
          <p className="mt-3 font-reading text-base leading-7 text-[var(--soft-white)]/78">{selectedCluster.description}</p>

          <div className="mt-6 space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCluster.id}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-3"
              >
                {relatedProjects.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    className="block border-[3px] border-[var(--hard-white)] bg-[var(--paper-slab)] p-4 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[var(--bio-cyan)] hover:text-[var(--terminal-void)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-reading text-lg font-semibold">{project.title}</p>
                        <p className="mt-1 font-reading text-sm leading-6 text-current/75">{project.shortDescription}</p>
                      </div>
                      <StatusBadge status={project.status} className="shrink-0" />
                    </div>
                  </Link>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
