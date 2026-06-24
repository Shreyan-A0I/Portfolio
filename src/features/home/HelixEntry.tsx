"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

// ── Strand sequences ─────────────────────────────────────────────────────────
const N = 34;

const BIO_SEQ = [
  "A","T","G","C","T","A","C","G","A","T",
  "G","C","A","T","G","C","A","T","C","G",
  "A","T","G","C","T","A","C","G","A","T",
  "G","C","A","T",
];
const COMP_SEQ = [
  "0xFF","0x00","0x1A","0xDE","0xB2","0xFA","0x42","0xCA",
  "0xFF","0x11","0x7F","0xAA","0x3D","0xEF","0xBC","0xA4",
  "0xFF","0x00","0x1A","0xDE","0xB2","0xFA","0x42","0xCA",
  "0xFF","0x11","0x7F","0xAA","0x3D","0xEF","0xBC","0xA4",
  "0xFF","0x00",
];

const BIO_COLOR  = "#00E5FF";
const COMP_COLOR = "#e8e4df";

interface HelixNode {
  sx:     number;
  sy:     number;
  z:      number;
  scale:  number;
  label:  string;
  strand: 1 | 2;
}

export default function HelixEntry() {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const phaseRef    = useRef(0);
  const mouse       = useRef({ x: 0.5, y: 0.5 });
  const mouseTarget = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const dpr = window.devicePixelRatio || 1;
    let w = 0, h = 0, rafId = 0;

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      mouseTarget.current = { x: e.clientX / w, y: e.clientY / h };
    };
    window.addEventListener("mousemove", onMouse);

    const draw = () => {
      // Reset transform each frame so resize doesn't accumulate scales
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // ── Smooth cursor lerp ─────────────────────────────────────────────────
      const m = mouse.current;
      m.x += (mouseTarget.current.x - m.x) * 0.04;
      m.y += (mouseTarget.current.y - m.y) * 0.04;

      // ── Helix parameters ───────────────────────────────────────────────────
      const CX     = w / 2;
      const CY     = h / 2;
      const RADIUS = Math.min(w * 0.12, 85);
      const H      = Math.min(h * 0.84, 600);
      const STEP   = H / N;
      const TURNS  = 3;
      const FREQ   = (2 * Math.PI * TURNS) / N;
      const D      = Math.max(w, h) * 0.88;   // perspective distance

      // Mouse-driven tilt (small angles)
      const tiltY  = (m.x - 0.5) * 0.32;
      const tiltX  = (m.y - 0.5) * 0.18;
      const cosY   = Math.cos(tiltY), sinY = Math.sin(tiltY);
      const cosX   = Math.cos(tiltX), sinX = Math.sin(tiltX);

      function project(x0: number, y0: number, z0: number) {
        // Rotate around Y (left/right lean)
        const x1 = x0 * cosY + z0 * sinY;
        const z1 = -x0 * sinY + z0 * cosY;
        // Rotate around X (forward/back lean)
        const y1 = y0 * cosX - z1 * sinX;
        const z2 = y0 * sinX + z1 * cosX;
        const scale = D / (D + z2 + RADIUS);
        return { sx: CX + x1 * scale, sy: CY + y1 * scale, z: z2, scale };
      }

      // ── Build node arrays ──────────────────────────────────────────────────
      const s1: HelixNode[] = [];
      const s2: HelixNode[] = [];

      for (let i = 0; i < N; i++) {
        const a1   = i * FREQ + phaseRef.current;
        const a2   = a1 + Math.PI;
        const yOff = -H / 2 + i * STEP;

        const x1 = RADIUS * Math.cos(a1), z1 = RADIUS * Math.sin(a1);
        const x2 = RADIUS * Math.cos(a2), z2 = RADIUS * Math.sin(a2);

        const p1 = project(x1, yOff, z1);
        const p2 = project(x2, yOff, z2);

        s1.push({ ...p1, label: BIO_SEQ[i],  strand: 1 });
        s2.push({ ...p2, label: COMP_SEQ[i], strand: 2 });
      }

      const maxZ = RADIUS * 1.15;

      function depthAlpha(z: number, min = 0.18, max = 0.95): number {
        return min + (1 - (z + maxZ) / (2 * maxZ)) * (max - min);
      }

      // ── Draw strand lines ──────────────────────────────────────────────────
      function drawStrand(pts: HelixNode[], color: string) {
        ctx.save();
        ctx.lineJoin = "round";
        ctx.lineCap  = "round";
        for (let i = 0; i < pts.length - 1; i++) {
          const a = pts[i], b = pts[i + 1];
          ctx.beginPath();
          ctx.moveTo(a.sx, a.sy);
          ctx.lineTo(b.sx, b.sy);
          ctx.strokeStyle  = color;
          ctx.lineWidth    = 1.8 * ((a.scale + b.scale) / 2);
          ctx.globalAlpha  = depthAlpha((a.z + b.z) / 2);
          ctx.stroke();
        }
        ctx.restore();
      }

      drawStrand(s1, BIO_COLOR);
      drawStrand(s2, COMP_COLOR);

      // ── Draw base-pair rungs ───────────────────────────────────────────────
      ctx.save();
      for (let i = 0; i < N; i++) {
        const a = s1[i], b = s2[i];
        const avgZ = (a.z + b.z) / 2;
        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.strokeStyle  = "#4a5568";
        ctx.lineWidth    = 0.8;
        ctx.globalAlpha  = depthAlpha(avgZ, 0.05, 0.22);
        ctx.stroke();
      }
      ctx.restore();

      // ── Draw nodes (back-to-front) ─────────────────────────────────────────
      const allNodes: HelixNode[] = [...s1, ...s2];
      allNodes.sort((a, b) => b.z - a.z);

      for (const node of allNodes) {
        const alpha  = depthAlpha(node.z);
        const r      = (node.strand === 1 ? 4.8 : 4.0) * node.scale;
        const color  = node.strand === 1 ? BIO_COLOR : COMP_COLOR;
        const isFront = node.z < -maxZ * 0.3;

        ctx.save();
        ctx.globalAlpha = alpha;

        // Glow on front-facing nodes
        if (isFront) {
          ctx.shadowBlur  = 18;
          ctx.shadowColor = color;
        }

        // Node circle
        ctx.beginPath();
        ctx.arc(node.sx, node.sy, r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label — only when node is large enough to be readable
        if (r > 3.2) {
          const fs = Math.max(6.5, (node.strand === 1 ? 9 : 7.5) * node.scale);
          ctx.font         = `${fs}px "Courier New", monospace`;
          ctx.fillStyle    = color;
          ctx.textBaseline = "middle";

          const pad = r + 4;
          if (node.sx < CX) {
            ctx.textAlign = "right";
            ctx.fillText(node.label, node.sx - pad, node.sy + 1);
          } else {
            ctx.textAlign = "left";
            ctx.fillText(node.label, node.sx + pad, node.sy + 1);
          }
        }

        ctx.restore();
      }

      phaseRef.current += 0.0065;
      rafId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <section className="relative flex h-[calc(100vh-65px)] flex-col overflow-hidden bg-[#09090B]">
      {/* ── Canvas ── */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* ── Top identity ── */}
      <div className="relative z-10 px-8 pt-12 sm:px-14">
        <p className="font-mono text-[10px] tracking-[0.5em] text-white/20 uppercase">
          Shreyan Balaji Nalwad
        </p>
        <p className="mt-1 font-mono text-[10px] text-[#00E5FF]/25 tracking-widest">
          {'[CMU_CompBio] :: Zhao Biophotonics Lab'}
        </p>
      </div>

      {/* ── Bottom CTA ── */}
      <div className="relative z-10 mt-auto px-8 pb-10 sm:px-14 flex items-end justify-between">
        <div className="font-mono text-[10px] text-white/15 leading-relaxed">
          <span className="text-[#00E5FF]/30">● </span>A/T/G/C<br />
          <span className="text-white/25">● </span>0xFF/0x1A/…
        </div>
        <Link
          href="/projects"
          className="font-mono text-xs text-white/30 transition-colors hover:text-[#00E5FF] tracking-widest"
        >
          explore →
        </Link>
      </div>
    </section>
  );
}
