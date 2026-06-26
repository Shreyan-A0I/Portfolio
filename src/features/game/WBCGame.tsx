"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const WBC_R   = 26;
const SPEED   = 210;
const BIO     = "#00E5FF";
const BACT_C  = "#ff5544";
const VIRU_C  = "#ee44cc";

interface Pathogen {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  type: "bacteria" | "virus";
  rot: number;
  wobble: number;
  speed: number;
}

function drawWBC(ctx: CanvasRenderingContext2D, x: number, y: number, t: number) {
  ctx.save();
  ctx.shadowBlur = 20; ctx.shadowColor = BIO;
  ctx.beginPath();
  for (let i = 0; i <= 32; i++) {
    const a = (i / 32) * Math.PI * 2;
    const w = 1 + 0.08 * Math.sin(a * 3 + t * 1.6) + 0.04 * Math.sin(a * 5 - t * 2.1);
    const rx = x + Math.cos(a) * WBC_R * w;
    const ry = y + Math.sin(a) * WBC_R * w;
    i === 0 ? ctx.moveTo(rx, ry) : ctx.lineTo(rx, ry);
  }
  ctx.closePath();
  ctx.fillStyle = BIO + "1a"; ctx.fill();
  ctx.strokeStyle = BIO; ctx.lineWidth = 1.8; ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2);
  ctx.fillStyle = BIO + "44"; ctx.fill();
  ctx.restore();
}

function drawBacteria(ctx: CanvasRenderingContext2D, p: Pathogen, t: number) {
  ctx.save();
  ctx.translate(p.x, p.y); ctx.rotate(p.rot);
  const stretch = 1 + 0.06 * Math.sin(t * 3 + p.wobble);
  const rw = p.r * 2.4 * stretch, rh = p.r;
  ctx.shadowBlur = 8; ctx.shadowColor = BACT_C;
  ctx.beginPath();
  ctx.roundRect(-rw / 2, -rh / 2, rw, rh, rh / 2);
  ctx.fillStyle = BACT_C + "bb"; ctx.fill();
  ctx.strokeStyle = BACT_C; ctx.lineWidth = 1.2; ctx.stroke();
  ctx.restore();
}

function drawVirus(ctx: CanvasRenderingContext2D, p: Pathogen, t: number) {
  ctx.save();
  ctx.translate(p.x, p.y);
  const spinRot = p.rot + t * 0.55;
  ctx.shadowBlur = 12; ctx.shadowColor = VIRU_C;
  ctx.beginPath(); ctx.arc(0, 0, p.r, 0, Math.PI * 2);
  ctx.fillStyle = VIRU_C + "88"; ctx.fill();
  ctx.strokeStyle = VIRU_C; ctx.lineWidth = 1.4; ctx.stroke();
  for (let i = 0; i < 8; i++) {
    const a  = spinRot + (i / 8) * Math.PI * 2;
    const sl = p.r * 0.7 + 2.5 * Math.sin(t * 2.2 + p.wobble + i * 1.3);
    ctx.strokeStyle = VIRU_C + "bb"; ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * p.r,        Math.sin(a) * p.r);
    ctx.lineTo(Math.cos(a) * (p.r + sl), Math.sin(a) * (p.r + sl));
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(Math.cos(a) * (p.r + sl), Math.sin(a) * (p.r + sl), 1.8, 0, Math.PI * 2);
    ctx.fillStyle = VIRU_C; ctx.fill();
  }
  ctx.restore();
}

function spawnWave(wave: number, w: number, h: number, px: number, py: number): Pathogen[] {
  const n = 4 + wave * 2;
  return Array.from({ length: n }, (_, i) => {
    const type: Pathogen["type"] = wave >= 2 && i >= Math.ceil(n * 0.55) ? "virus" : "bacteria";
    let x = 0, y = 0;
    do {
      x = 60 + Math.random() * (w - 120);
      y = 60 + Math.random() * (h - 120);
    } while (Math.hypot(x - px, y - py) < 130);
    const a   = Math.random() * Math.PI * 2;
    const spd = type === "virus" ? 72 + Math.random() * 40 : 42 + Math.random() * 28;
    return {
      x, y,
      vx: Math.cos(a) * spd, vy: Math.sin(a) * spd,
      r: type === "virus" ? 9 + Math.random() * 4 : 7 + Math.random() * 5,
      type, rot: Math.random() * Math.PI * 2,
      wobble: Math.random() * Math.PI * 2,
      speed: spd,
    };
  });
}

type Phase = "intro" | "playing" | "waveclear";

export default function WBCGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerRef = useRef({ x: 0, y: 0 });
  const pathRef   = useRef<Pathogen[]>([]);
  const keysRef   = useRef(new Set<string>());
  const tRef      = useRef(0);
  const waveRef   = useRef(1);
  const scoreRef  = useRef(0);
  const phaseRef  = useRef<Phase>("intro");
  const wRef      = useRef(0);
  const hRef      = useRef(0);
  const rafRef    = useRef(0);

  const [uiPhase, setUiPhase] = useState<Phase>("intro");
  const [score,   setScore]   = useState(0);
  const [wave,    setWave]    = useState(1);

  function startGame() {
    const w = wRef.current, h = hRef.current;
    scoreRef.current = 0; waveRef.current = 1;
    playerRef.current = { x: w / 2, y: h / 2 };
    pathRef.current = spawnWave(1, w, h, w / 2, h / 2);
    setScore(0); setWave(1);
    phaseRef.current = "playing";
    setUiPhase("playing");
  }

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;
    const dpr    = window.devicePixelRatio || 1;

    const resize = () => {
      wRef.current = canvas.offsetWidth;
      hRef.current = canvas.offsetHeight;
      canvas.width  = wRef.current * dpr;
      canvas.height = hRef.current * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"," "].includes(e.key)) e.preventDefault();
      keysRef.current.add(e.key);
    };
    const handleKeyUp = (e: KeyboardEvent) => keysRef.current.delete(e.key);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup",   handleKeyUp);

    let last = 0;
    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      tRef.current += dt;

      const w = wRef.current, h = hRef.current;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      ctx.fillStyle = "#09090B";
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(255,255,255,0.022)";
      ctx.lineWidth = 1;
      for (let gx = 0; gx < w; gx += 64) { ctx.beginPath(); ctx.moveTo(gx,0); ctx.lineTo(gx,h); ctx.stroke(); }
      for (let gy = 0; gy < h; gy += 64) { ctx.beginPath(); ctx.moveTo(0,gy); ctx.lineTo(w,gy); ctx.stroke(); }

      if (phaseRef.current === "playing") {
        const sp = SPEED * dt;
        const k  = keysRef.current;
        if (k.has("ArrowLeft")  || k.has("a")) playerRef.current.x -= sp;
        if (k.has("ArrowRight") || k.has("d")) playerRef.current.x += sp;
        if (k.has("ArrowUp")    || k.has("w")) playerRef.current.y -= sp;
        if (k.has("ArrowDown")  || k.has("s")) playerRef.current.y += sp;
        playerRef.current.x = Math.max(WBC_R, Math.min(w - WBC_R, playerRef.current.x));
        playerRef.current.y = Math.max(WBC_R, Math.min(h - WBC_R, playerRef.current.y));

        const eaten: number[] = [];
        for (let i = 0; i < pathRef.current.length; i++) {
          const p    = pathRef.current[i];
          const dx   = playerRef.current.x - p.x, dy = playerRef.current.y - p.y;
          const dist = Math.hypot(dx, dy) || 1;
          const homing = p.type === "virus" ? 0.11 : 0.055;
          p.vx += (dx / dist) * p.speed * homing;
          p.vy += (dy / dist) * p.speed * homing;
          const cs = Math.hypot(p.vx, p.vy);
          if (cs > p.speed * 1.5) { p.vx = p.vx / cs * p.speed; p.vy = p.vy / cs * p.speed; }
          p.x += p.vx * dt; p.y += p.vy * dt;
          if (p.type === "bacteria") p.rot = Math.atan2(p.vy, p.vx);
          if (p.x < p.r)   { p.x = p.r;   p.vx =  Math.abs(p.vx); }
          if (p.x > w-p.r) { p.x = w-p.r; p.vx = -Math.abs(p.vx); }
          if (p.y < p.r)   { p.y = p.r;   p.vy =  Math.abs(p.vy); }
          if (p.y > h-p.r) { p.y = h-p.r; p.vy = -Math.abs(p.vy); }
          if (Math.hypot(playerRef.current.x - p.x, playerRef.current.y - p.y) < WBC_R + p.r - 6) {
            eaten.push(i);
          }
        }

        if (eaten.length) {
          pathRef.current = pathRef.current.filter((_, idx) => !eaten.includes(idx));
          scoreRef.current += eaten.length;
          setScore(scoreRef.current);
        }

        if (pathRef.current.length === 0) {
          phaseRef.current = "waveclear";
          setUiPhase("waveclear");
          setTimeout(() => {
            waveRef.current += 1;
            const nw = waveRef.current;
            pathRef.current = spawnWave(nw, w, h, playerRef.current.x, playerRef.current.y);
            setWave(nw);
            phaseRef.current = "playing";
            setUiPhase("playing");
          }, 1800);
        }
      }

      for (const p of pathRef.current) {
        if (p.type === "bacteria") drawBacteria(ctx, p, tRef.current);
        else drawVirus(ctx, p, tRef.current);
      }
      if (phaseRef.current !== "intro") {
        drawWBC(ctx, playerRef.current.x, playerRef.current.y, tRef.current);
      }

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup",   handleKeyUp);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#09090B]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* HUD */}
      {uiPhase !== "intro" && (
        <div className="absolute top-0 left-0 right-0 flex justify-between px-6 py-4 pointer-events-none z-10">
          <span className="font-mono text-xs tracking-widest text-[#00E5FF]/50 uppercase">
            WAVE {String(wave).padStart(2, "0")}
          </span>
          <span className="font-mono text-xs tracking-widest text-white/40 uppercase">
            SCORE {String(score).padStart(4, "0")}
          </span>
        </div>
      )}

      {/* Intro overlay */}
      {uiPhase === "intro" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-5">
          <p className="font-mono text-[10px] tracking-[0.5em] text-[#00E5FF]/25 uppercase">
            internal threat response protocol
          </p>
          <h1 className="font-mono text-5xl font-bold text-[#00E5FF] tracking-widest">
            PHAGOCYTE
          </h1>
          <p className="font-mono text-sm text-white/25 text-center max-w-xs leading-relaxed mt-1">
            you are a white blood cell.<br />
            eat the pathogens.<br />
            don&apos;t think too hard about it.
          </p>
          <p className="font-mono text-xs text-white/15 mt-1">WASD or ↑↓←→ to move</p>
          <button
            onClick={startGame}
            className="mt-3 font-mono text-sm uppercase tracking-[0.35em]
              border border-[#00E5FF]/30 bg-[#00E5FF]/5
              px-8 py-3 text-[#00E5FF]/60
              hover:border-[#00E5FF]/70 hover:text-[#00E5FF]
              transition-all duration-200"
          >
            deploy
          </button>
        </div>
      )}

      {/* Wave clear */}
      {uiPhase === "waveclear" && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="font-mono text-center">
            <p className="text-2xl text-[#00E5FF] tracking-widest animate-pulse">WAVE CLEAR</p>
            <p className="mt-2 text-xs text-white/30 tracking-widest">reinforcements inbound</p>
          </div>
        </div>
      )}

      <Link
        href="/"
        className="absolute bottom-5 left-6 font-mono text-[10px] tracking-widest text-white/20 hover:text-white/50 transition z-10"
      >
        ← portfolio
      </Link>
    </div>
  );
}
