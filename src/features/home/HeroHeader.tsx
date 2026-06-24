"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const BOOT_LINES = [
  "> init: stochastic_genomics.so ..................... [OK]",
  "> init: cuda_inference_edge.so ..................... [OK]",
  "> init: spatial_omics_stack.so ..................... [OK]",
  "> system: ready.",
];

const NAV = [
  { label: "/projects", href: "/projects", external: false },
  { label: "/resume",   href: "/resume",   external: false },
  { label: "github↗",  href: "https://github.com/Shreyan-A0I", external: true },
];

export default function HeroHeader() {
  const [done, setDone]       = useState<string[]>([]);
  const [cursor, setCursor]   = useState("");
  const lineRef = useRef(0);
  const charRef = useRef(0);

  useEffect(() => {
    const tick = () => {
      const li = lineRef.current;
      if (li >= BOOT_LINES.length) return;
      const line = BOOT_LINES[li];
      const ci   = charRef.current;

      if (ci < line.length) {
        setCursor(line.slice(0, ci + 1));
        charRef.current++;
        setTimeout(tick, 11);
      } else {
        setDone((d) => [...d, line]);
        setCursor("");
        lineRef.current++;
        charRef.current = 0;
        setTimeout(tick, 180);
      }
    };
    const id = setTimeout(tick, 500);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="border-b border-[#27272a] bg-[#09090B]">
      {/* ── Identity bar ── */}
      <div className="flex items-center justify-between px-6 py-3 sm:px-10">
        <span className="font-mono text-xs sm:text-sm">
          <span className="text-[#00E5FF]">Shreyan Balaji Nalwad</span>
          <span className="text-white/25"> :: </span>
          <span className="text-[#FACC15]">[CMU_CompBio]</span>
        </span>
        <nav className="hidden sm:flex items-center gap-6">
          {NAV.map((l) =>
            l.external ? (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] text-white/30 transition-colors hover:text-[#00E5FF]"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.label}
                href={l.href}
                className="font-mono text-[11px] text-white/30 transition-colors hover:text-[#00E5FF]"
              >
                {l.label}
              </Link>
            )
          )}
        </nav>
      </div>

      {/* ── Boot terminal ── */}
      <div className="border-t border-[#27272a] px-6 py-2.5 sm:px-10">
        <div className="space-y-0.5 font-mono text-[11px] leading-5 text-[#00E5FF]/55">
          {done.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
          {cursor && (
            <div>
              {cursor}
              <span className="ml-0.5 inline-block h-[11px] w-[7px] translate-y-px bg-[#00E5FF]/55 align-middle animate-pulse" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
