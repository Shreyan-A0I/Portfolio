"use client";

import { useEffect, useRef, useState } from "react";

const N = 42;

const BIO_SEQ = [
  "A","T","G","C","T","A","C","G","A","T",
  "G","C","A","T","G","C","A","T","C","G",
  "A","T","G","C","T","A","C","G","A","T",
  "G","C","A","T","G","C","A","T","C","G",
  "A","T",
];
const COMP_SEQ = [
  "0xFF","0x00","0x1A","0xDE","0xB2","0xFA","0x42","0xCA",
  "0xFF","0x11","0x7F","0xAA","0x3D","0xEF","0xBC","0xA4",
  "0xFF","0x00","0x1A","0xDE","0xB2","0xFA","0x42","0xCA",
  "0xFF","0x11","0x7F","0xAA","0x3D","0xEF","0xBC","0xA4",
  "0xFF","0x00","0x1A","0xDE","0xB2","0xFA","0x42","0xCA",
  "0xFF","0x11",
];

const BIO_COLOR  = "#00E5FF";
const COMP_COLOR = "#e8e4df";

interface HelixNode {
  sx: number; sy: number; z: number; scale: number;
  label: string; strand: 1 | 2;
}

function easeInOutQuad(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export default function HelixEntry() {
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const labelRef      = useRef<HTMLDivElement>(null);
  const rotationRef   = useRef(0);
  const mergeRef      = useRef(0);      // 0 = split, 1 = merged
  const isMergingRef  = useRef(false);
  const mouse         = useRef({ x: 0.5, y: 0.5 });
  const mouseTarget   = useRef({ x: 0.5, y: 0.5 });

  const [exiting, setExiting] = useState(false);
  const [gone,    setGone]    = useState(false);

  const enter = () => { isMergingRef.current = true; };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    let w = 0, h = 0, rafId = 0, exitTriggered = false;

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
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // Smooth mouse lerp
      const m = mouse.current;
      m.x += (mouseTarget.current.x - m.x) * 0.04;
      m.y += (mouseTarget.current.y - m.y) * 0.04;

      // Advance merge
      if (isMergingRef.current && mergeRef.current < 1) {
        mergeRef.current = Math.min(1, mergeRef.current + 0.016); // ~900ms
        if (labelRef.current) {
          labelRef.current.style.opacity = String(1 - mergeRef.current);
        }
        if (mergeRef.current >= 1 && !exitTriggered) {
          exitTriggered = true;
          setExiting(true);
          setTimeout(() => setGone(true), 700);
        }
      }

      const mp     = easeInOutQuad(mergeRef.current);
      const LEFT_CX  = w * 0.28 + (w * 0.5 - w * 0.28) * mp;
      const RIGHT_CX = w * 0.72 + (w * 0.5 - w * 0.72) * mp;
      const CY       = h / 2;

      const RADIUS = Math.min(w * 0.14, 115);
      const H      = Math.min(h * 0.88, 760);
      const STEP   = H / N;
      const TURNS  = 3.5;
      const FREQ   = (2 * Math.PI * TURNS) / N;
      const D      = Math.max(w, h) * 0.90;

      const tiltY = (m.x - 0.5) * 0.28;
      const tiltX = (m.y - 0.5) * 0.15;
      const cosY = Math.cos(tiltY), sinY = Math.sin(tiltY);
      const cosX = Math.cos(tiltX), sinX = Math.sin(tiltX);

      function project(cx: number, x0: number, y0: number, z0: number) {
        const x1 = x0 * cosY + z0 * sinY;
        const z1 = -x0 * sinY + z0 * cosY;
        const y1 = y0 * cosX - z1 * sinX;
        const z2 = y0 * sinX + z1 * cosX;
        const scale = D / (D + z2 + RADIUS);
        return { sx: cx + x1 * scale, sy: CY + y1 * scale, z: z2, scale };
      }

      const phase = rotationRef.current;
      const s1: HelixNode[] = [];
      const s2: HelixNode[] = [];

      for (let i = 0; i < N; i++) {
        const a    = i * FREQ + phase;
        const yOff = -H / 2 + i * STEP;
        const p1 = project(LEFT_CX,  RADIUS * Math.cos(a),           yOff, RADIUS * Math.sin(a));
        const p2 = project(RIGHT_CX, RADIUS * Math.cos(a + Math.PI), yOff, RADIUS * Math.sin(a + Math.PI));
        s1.push({ ...p1, label: BIO_SEQ[i  % BIO_SEQ.length],  strand: 1 });
        s2.push({ ...p2, label: COMP_SEQ[i % COMP_SEQ.length], strand: 2 });
      }

      const maxZ = RADIUS * 1.15;

      function depthAlpha(z: number, min = 0.18, max = 0.95) {
        return min + (1 - (z + maxZ) / (2 * maxZ)) * (max - min);
      }

      function drawStrand(pts: HelixNode[], color: string) {
        ctx.save();
        ctx.lineJoin = "round"; ctx.lineCap = "round";
        for (let i = 0; i < pts.length - 1; i++) {
          const a = pts[i], b = pts[i + 1];
          ctx.beginPath();
          ctx.moveTo(a.sx, a.sy);
          ctx.lineTo(b.sx, b.sy);
          ctx.strokeStyle = color;
          ctx.lineWidth   = 2.2 * ((a.scale + b.scale) / 2);
          ctx.globalAlpha = depthAlpha((a.z + b.z) / 2);
          ctx.stroke();
        }
        ctx.restore();
      }

      drawStrand(s1, BIO_COLOR);
      drawStrand(s2, COMP_COLOR);

      // Rungs fade in as strands converge
      if (mp > 0.25) {
        const rungFade = (mp - 0.25) / 0.75;
        ctx.save();
        for (let i = 0; i < N; i++) {
          const a = s1[i], b = s2[i];
          ctx.beginPath();
          ctx.moveTo(a.sx, a.sy);
          ctx.lineTo(b.sx, b.sy);
          ctx.strokeStyle = "#4a5568";
          ctx.lineWidth   = 0.9;
          ctx.globalAlpha = depthAlpha((a.z + b.z) / 2, 0.05, 0.25) * rungFade;
          ctx.stroke();
        }
        ctx.restore();
      }

      // Nodes — painter's algorithm
      const allNodes = [...s1, ...s2];
      allNodes.sort((a, b) => b.z - a.z);

      for (const node of allNodes) {
        const alpha   = depthAlpha(node.z);
        const r       = (node.strand === 1 ? 8.5 : 7.0) * node.scale;
        const color   = node.strand === 1 ? BIO_COLOR : COMP_COLOR;
        const cx      = node.strand === 1 ? LEFT_CX : RIGHT_CX;
        const isFront = node.z < -maxZ * 0.3;

        ctx.save();
        ctx.globalAlpha = alpha;
        if (isFront) { ctx.shadowBlur = 22; ctx.shadowColor = color; }
        ctx.beginPath();
        ctx.arc(node.sx, node.sy, r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.shadowBlur = 0;

        if (r > 4) {
          const fs = Math.max(9, (node.strand === 1 ? 12 : 10) * node.scale);
          ctx.font         = `${fs}px "Courier New", monospace`;
          ctx.fillStyle    = color;
          ctx.textBaseline = "middle";
          const pad = r + 5;
          const goLeft = node.sx < cx;
          ctx.textAlign = goLeft ? "right" : "left";
          ctx.fillText(node.label, node.sx + (goLeft ? -pad : pad), node.sy + 1);
        }
        ctx.restore();
      }

      rotationRef.current += 0.0065;
      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col bg-[#09090B] transition-opacity duration-700 ${
        exiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Top identity */}
      <div className="relative z-10 px-8 pt-10 sm:px-14">
        <p className="font-mono text-[13px] tracking-[0.5em] text-white/20 uppercase">
          Shreyan Balaji Nalwad
        </p>
        <p className="mt-1 font-mono text-[12px] text-[#00E5FF]/25 tracking-widest">
          {'[CMU_CompBio] :: Zhao Biophotonics Lab'}
        </p>
      </div>

      {/* Side labels — direct opacity via ref, no re-renders */}
      <div
        ref={labelRef}
        className="absolute inset-0 z-10 flex items-center justify-between px-8 sm:px-20 pointer-events-none"
      >
        <div>
          <p className="font-mono text-[14px] tracking-[0.6em] text-[#00E5FF]/45 uppercase mb-1">
            Biology
          </p>
          <p className="font-mono text-[11px] text-[#00E5FF]/20 tracking-widest">
            A · T · G · C
          </p>
        </div>
        <div className="text-right">
          <p className="font-mono text-[14px] tracking-[0.6em] text-white/30 uppercase mb-1">
            Compute
          </p>
          <p className="font-mono text-[11px] text-white/15 tracking-widest">
            0xFF · 0x1A · …
          </p>
        </div>
      </div>

      {/* Enter button */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-end pb-16">
        <button
          onClick={enter}
          className="group relative font-mono uppercase tracking-[0.35em] text-sm
            border border-[#00E5FF]/25 bg-[#00E5FF]/5 px-10 py-4
            text-[#00E5FF]/60 transition-all duration-300
            hover:border-[#00E5FF]/70 hover:bg-[#00E5FF]/10 hover:text-[#00E5FF]
            hover:shadow-[0_0_32px_rgba(0,229,255,0.18)]
            focus:outline-none"
        >
          enter
          <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00E5FF]/50 -translate-x-px -translate-y-px" />
          <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00E5FF]/50 translate-x-px -translate-y-px" />
          <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00E5FF]/50 -translate-x-px translate-y-px" />
          <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00E5FF]/50 translate-x-px translate-y-px" />
        </button>
        <p className="mt-4 font-mono text-[11px] tracking-[0.4em] text-white/15 uppercase">
          biology · compute · systems
        </p>
      </div>
    </div>
  );
}
