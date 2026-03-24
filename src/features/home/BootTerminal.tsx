"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { siteProfile } from "@/lib/site";
import { makeAssetUrl } from "@/lib/utils";

const bootLines = [
  "$ boot portfolio --profile shreyan",
  "> loading interdisciplinary graph...ok",
  "> mounting project archive...ok",
  "> kanban gateway status...public_read / edit_locked",
];

export function BootTerminal() {
  const reduceMotion = useReducedMotion();
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timers = bootLines.map((_, index) =>
      window.setTimeout(
        () => setVisibleLines(index + 1),
        reduceMotion ? 0 : 220 * (index + 1),
      ),
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [reduceMotion]);

  const renderedLines = useMemo(() => bootLines.slice(0, visibleLines), [visibleLines]);

  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-14 sm:px-6 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:px-8 lg:py-20">
      <div className="space-y-6">
        <div className="reading-surface max-w-2xl p-4 sm:p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--bio-cyan)]">Boot Sequence</p>
          <div className="mt-4 space-y-2 font-mono text-xs text-[var(--soft-white)]/76 sm:text-sm">
            {renderedLines.map((line, index) => (
              <motion.p
                key={line}
                initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, delay: index * 0.05 }}
              >
                {line}
              </motion.p>
            ))}
            <div className="flex items-center gap-2 pt-2 text-[var(--syntax-yellow)]">
              <span>{visibleLines >= bootLines.length ? "system ready" : "initializing"}</span>
              <span className="terminal-cursor h-4 w-3 bg-[var(--syntax-yellow)]" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-[var(--cmu-red)]">
            {siteProfile.name}
          </p>
          <h1 className="max-w-4xl font-mono text-[2.8rem] font-semibold uppercase leading-[0.95] text-[var(--hard-white)] sm:text-[4.2rem] lg:text-[5.4rem]">
            Computational biology, AI systems, and research tooling.
          </h1>
          <p className="max-w-2xl font-reading text-lg leading-8 text-[var(--soft-white)]/82">
            {siteProfile.tagline}
          </p>
        </div>
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.4 }}
        className="reading-surface relative overflow-hidden p-6"
      >
        <div className="absolute right-4 top-4 flex gap-2">
          <span className="h-3 w-3 bg-[var(--cmu-red)]" />
          <span className="h-3 w-3 bg-[var(--syntax-yellow)]" />
          <span className="h-3 w-3 bg-[var(--bio-cyan)]" />
        </div>
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--bio-cyan)]">Operator Profile</p>
        <div className="mt-6 space-y-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--soft-white)]/58">Name</p>
            <p className="mt-1 font-reading text-2xl font-semibold text-[var(--hard-white)]">{siteProfile.name}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--soft-white)]/58">Mode</p>
            <p className="mt-1 font-reading text-lg text-[var(--soft-white)]/82">{siteProfile.role}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--soft-white)]/58">Location</p>
              <p className="mt-1 text-sm text-[var(--soft-white)]/82">{siteProfile.location}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--soft-white)]/58">Contact</p>
              <a href={`mailto:${siteProfile.email}`} className="mt-1 block text-sm text-[var(--soft-white)]/82 hover:text-[var(--hard-white)]">
                {siteProfile.email}
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/projects" className="border-[3px] border-[var(--hard-white)] bg-[var(--hard-white)] px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.24em] text-[var(--terminal-void)] shadow-neubrutal-cyan transition-transform duration-200 hover:-translate-y-0.5">
            Open Projects
          </Link>
          <Link href="/kanban" className="border-[3px] border-[var(--hard-white)] bg-[var(--paper-slab)] px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.24em] text-[var(--hard-white)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[var(--syntax-yellow)] hover:text-[var(--terminal-void)]">
            View Kanban
          </Link>
          <a href={makeAssetUrl("Resume.pdf")} target="_blank" rel="noreferrer" className="border-[3px] border-[var(--cmu-red)] bg-[var(--cmu-red)] px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.24em] text-[var(--hard-white)] shadow-neubrutal-red transition-transform duration-200 hover:-translate-y-0.5">
            Resume
          </a>
        </div>
      </motion.div>
    </section>
  );
}
