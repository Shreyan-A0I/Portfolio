"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";

// ── Helix constants ──────────────────────────────────────────────────────────
const N          = 22;
const CX         = 140;   // SVG center-x (viewBox width 280)
const BASE_AMP   = 65;
const MAX_PUSH   = 42;
const SIGMA      = 60;    // Gaussian spread in SVG px
const Y_START    = 16;
const Y_STEP     = 17.5;
const FREQ       = 0.52;  // radians per step → ~3.6 full cycles over 22 steps

const BIO_SEQ = ["A","T","G","C","T","A","C","G","A","T","G","C","A","T","G","C","A","T","C","G","A","T"];
const BIN_SEQ = ["0","1","0xFF","1","0","0xA4","1","0","0xB2","1","0xFF","0","1","0xCA","0","1","0xFA","1","0x11","0","1","0xDE"];

function gauss(y: number, mY: number | null): number {
  if (mY === null) return 0;
  const d = y - mY;
  return MAX_PUSH * Math.exp(-(d * d) / (2 * SIGMA * SIGMA));
}

function HelixSVG({ mouseY }: { mouseY: number | null }) {
  const pairs = Array.from({ length: N }, (_, i) => {
    const y     = Y_START + i * Y_STEP;
    const phase = i * FREQ;
    const push  = gauss(y, mouseY);
    const sin   = Math.sin(phase);
    // Bio strand pushed left, binary strand pushed right — both away from center
    const x1 = CX - BASE_AMP * sin - push;
    const x2 = CX + BASE_AMP * sin + push;
    return { y, x1, x2, sin, push, bio: BIO_SEQ[i], bin: BIN_SEQ[i] };
  });

  const pts1 = pairs.map((p) => `${p.x1.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const pts2 = pairs.map((p) => `${p.x2.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

  return (
    <svg
      viewBox="0 0 280 420"
      className="w-full"
      aria-hidden="true"
      overflow="visible"
    >
      {/* Base-pair rungs */}
      {pairs.map((p, i) => {
        const t = p.push / MAX_PUSH;
        return (
          <line
            key={`r${i}`}
            x1={p.x1} y1={p.y}
            x2={p.x2} y2={p.y}
            stroke={t > 0.3 ? "#00E5FF" : "#2a2a2e"}
            strokeWidth={0.75}
            strokeOpacity={0.25 + t * 0.6}
            strokeDasharray={t > 0.5 ? "2.5 2" : undefined}
          />
        );
      })}

      {/* Strand paths */}
      <polyline points={pts1} fill="none" stroke="#00E5FF" strokeWidth={1.5} strokeOpacity={0.6} />
      <polyline points={pts2} fill="none" stroke="#ffffff"  strokeWidth={1.5} strokeOpacity={0.5} />

      {/* Nodes + labels */}
      {pairs.map((p, i) => {
        const showLabel = Math.abs(p.x1 - CX) > 10;
        const bioLeft   = p.x1 < CX;
        const binRight  = p.x2 >= CX;
        const t = p.push / MAX_PUSH;

        return (
          <g key={`n${i}`}>
            {/* Bio node */}
            <circle
              cx={p.x1} cy={p.y} r={t > 0.4 ? 3.5 : 2.8}
              fill="#00E5FF"
              fillOpacity={0.75 + t * 0.2}
            />
            {/* Binary node */}
            <circle
              cx={p.x2} cy={p.y} r={t > 0.4 ? 3 : 2.4}
              fill="#ffffff"
              fillOpacity={0.65 + t * 0.2}
            />
            {showLabel && (
              <>
                <text
                  x={bioLeft ? p.x1 - 5 : p.x1 + 5}
                  y={p.y + 3.5}
                  textAnchor={bioLeft ? "end" : "start"}
                  fontSize="6.5"
                  fill="#00E5FF"
                  fontFamily="monospace"
                  fillOpacity={0.6}
                >
                  {p.bio}
                </text>
                <text
                  x={binRight ? p.x2 + 5 : p.x2 - 5}
                  y={p.y + 3.5}
                  textAnchor={binRight ? "start" : "end"}
                  fontSize="5.8"
                  fill="#ffffff"
                  fontFamily="monospace"
                  fillOpacity={0.45}
                >
                  {p.bin}
                </text>
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export default function TranscriptionHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [mouseY, setMouseY] = useState<number | null>(null);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouseY(((e.clientY - rect.top) / rect.height) * 420);
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-[#27272a] bg-[#09090B] px-6 py-24 sm:px-10">
      {/* Faint grid overlay */}
      <div className="landing-grid pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1fr_210px]">

        {/* ── Left: tagline ── */}
        <div>
          <p className="mb-6 font-mono text-xs tracking-widest text-[#00E5FF]/45">
            {"// CORE_DIRECTIVE"}
          </p>

          <h1 className="mb-8 text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
            Building where<br />
            biology ends<br />
            and compute<br />
            begins.
          </h1>

          <p className="mb-10 max-w-md font-mono text-sm leading-relaxed text-white/40">
            MS Computational Biology · Zhao Biophotonics Lab · CMU
            <br />
            <span className="text-[#00E5FF]/55">
              Generative AI · Graph ML · Edge Inference · Spatial Omics
            </span>
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="rounded-sm border border-[#00E5FF]/40 px-5 py-2.5 font-mono text-xs text-[#00E5FF] transition hover:border-[#00E5FF] hover:bg-[#00E5FF]/10"
            >
              /projects
            </Link>
            <a
              href="/resume"
              className="rounded-sm border border-[#27272a] px-5 py-2.5 font-mono text-xs text-white/40 transition hover:border-white/30 hover:text-white/70"
            >
              /resume
            </a>
            <a
              href="https://github.com/Shreyan-A0I"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-[#27272a] px-5 py-2.5 font-mono text-xs text-white/40 transition hover:border-white/30 hover:text-white/70"
            >
              github↗
            </a>
          </div>
        </div>

        {/* ── Right: helix ── */}
        <div
          ref={wrapRef}
          className="hidden lg:block"
          onMouseMove={onMove}
          onMouseLeave={() => setMouseY(null)}
        >
          <HelixSVG mouseY={mouseY} />
          <p className="mt-2 text-center font-mono text-[9px] text-white/15">
            ↑ hover to unzip
          </p>
        </div>

      </div>
    </section>
  );
}
