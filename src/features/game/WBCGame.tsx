"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// ─── constants
const WBC_R         = 26;
const SPEED         = 210;
const BIO           = "#00E5FF";
const BACT_C        = "#ff5544";
const VIRU_C        = "#ee44cc";
const TOXIN_C       = "#cc2244";
const BUFF_DUR      = 5;       // seconds
const PROJ_SPEED    = 420;
const SHOOT_INTV    = 0.55;    // seconds between shots

// ─── types
interface Pathogen {
  x: number; y: number; vx: number; vy: number;
  r: number; type: "bacteria" | "virus";
  rot: number; wobble: number; speed: number;
}
interface Toxin {
  x: number; y: number; vx: number; vy: number;
  r: number; speed: number; rot: number;
}
interface Projectile {
  x: number; y: number; vx: number; vy: number;
}
type BuffType = "speed" | "shield" | "shoot";
interface Pickup { id: number; x: number; y: number; type: BuffType; }
interface ActiveBuff { type: BuffType; expiresAt: number; }
type Phase = "intro" | "playing" | "waveclear" | "gameover";

// ─── draw helpers
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

function drawShieldRing(ctx: CanvasRenderingContext2D, x: number, y: number, t: number) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, WBC_R + 10 + 2 * Math.sin(t * 5), 0, Math.PI * 2);
  ctx.strokeStyle = "#d4a053";
  ctx.lineWidth = 1.5;
  ctx.globalAlpha = 0.65;
  ctx.stroke();
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

function drawToxin(ctx: CanvasRenderingContext2D, t: Toxin, animT: number) {
  ctx.save();
  ctx.translate(t.x, t.y); ctx.rotate(t.rot);
  const spikes = 5;
  ctx.shadowBlur = 24; ctx.shadowColor = TOXIN_C;
  ctx.beginPath();
  for (let i = 0; i < spikes * 2; i++) {
    const a = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2;
    const r = i % 2 === 0 ? t.r : t.r * 0.42;
    i === 0 ? ctx.moveTo(Math.cos(a)*r, Math.sin(a)*r)
             : ctx.lineTo(Math.cos(a)*r, Math.sin(a)*r);
  }
  ctx.closePath();
  ctx.fillStyle = TOXIN_C + "99"; ctx.fill();
  ctx.strokeStyle = TOXIN_C; ctx.lineWidth = 1.5; ctx.stroke();
  // pulsing ring
  ctx.beginPath();
  ctx.arc(0, 0, t.r + 4 + 3 * Math.sin(animT * 3.5), 0, Math.PI * 2);
  ctx.strokeStyle = TOXIN_C + "44"; ctx.lineWidth = 1; ctx.stroke();
  ctx.restore();
}

function drawPickup(ctx: CanvasRenderingContext2D, p: Pickup, t: number) {
  const COL   = { speed: BIO, shield: "#d4a053", shoot: VIRU_C }[p.type];
  const LABEL = { speed: "SPD", shield: "SLD", shoot: "ZAP" }[p.type];
  ctx.save();
  ctx.translate(p.x, p.y);
  const pulse = 1 + 0.14 * Math.sin(t * 3 + p.id);
  const s = 11 * pulse;
  ctx.shadowBlur = 14; ctx.shadowColor = COL;
  ctx.beginPath();
  ctx.moveTo(0, -s); ctx.lineTo(s, 0); ctx.lineTo(0, s); ctx.lineTo(-s, 0);
  ctx.closePath();
  ctx.fillStyle = COL + "28"; ctx.fill();
  ctx.strokeStyle = COL; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.font = `bold 7px "Courier New", monospace`;
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillStyle = COL;
  ctx.fillText(LABEL, 0, 0);
  ctx.restore();
}

function drawProjectile(ctx: CanvasRenderingContext2D, p: Projectile) {
  ctx.save();
  ctx.shadowBlur = 10; ctx.shadowColor = VIRU_C;
  ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
  ctx.fillStyle = VIRU_C; ctx.fill();
  ctx.restore();
}

// ─── spawners
function spawnWave(wave: number, w: number, h: number, px: number, py: number): Pathogen[] {
  const n = 4 + wave * 2;
  return Array.from({ length: n }, (_, i) => {
    const type: Pathogen["type"] = wave >= 2 && i >= Math.ceil(n * 0.55) ? "virus" : "bacteria";
    let x = 0, y = 0;
    do { x = 60 + Math.random()*(w-120); y = 60 + Math.random()*(h-120); }
    while (Math.hypot(x-px, y-py) < 130);
    const a = Math.random()*Math.PI*2;
    const spd = type === "virus" ? 72 + Math.random()*40 : 42 + Math.random()*28;
    return { x, y, vx: Math.cos(a)*spd, vy: Math.sin(a)*spd,
             r: type==="virus" ? 9+Math.random()*4 : 7+Math.random()*5,
             type, rot: Math.random()*Math.PI*2, wobble: Math.random()*Math.PI*2, speed: spd };
  });
}

function spawnToxins(wave: number, w: number, h: number, px: number, py: number): Toxin[] {
  if (wave < 2) return [];
  const n = Math.min(wave - 1, 3);
  return Array.from({ length: n }, () => {
    let x = 0, y = 0;
    do { x = 60 + Math.random()*(w-120); y = 60 + Math.random()*(h-120); }
    while (Math.hypot(x-px, y-py) < 160);
    const spd = 90 + Math.random()*45;
    const a = Math.random()*Math.PI*2;
    return { x, y, vx: Math.cos(a)*spd, vy: Math.sin(a)*spd, r: 18, speed: spd, rot: 0 };
  });
}

let _pickupId = 0;
function spawnPickups(w: number, h: number, px: number, py: number): Pickup[] {
  const types: BuffType[] = ["speed", "shield", "shoot"];
  return Array.from({ length: 2 }, (_, i) => {
    let x = 0, y = 0;
    do { x = 80 + Math.random()*(w-160); y = 80 + Math.random()*(h-160); }
    while (Math.hypot(x-px, y-py) < 100);
    return { id: ++_pickupId, x, y, type: types[Math.floor(Math.random()*types.length)] };
  });
}

// ─── component
export default function WBCGame() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const playerRef    = useRef({ x: 0, y: 0 });
  const pathRef      = useRef<Pathogen[]>([]);
  const toxinsRef    = useRef<Toxin[]>([]);
  const pickupsRef   = useRef<Pickup[]>([]);
  const projectilesRef = useRef<Projectile[]>([]);
  const buffsRef     = useRef<ActiveBuff[]>([]);
  const keysRef      = useRef(new Set<string>());
  const tRef         = useRef(0);
  const waveRef      = useRef(1);
  const scoreRef     = useRef(0);
  const livesRef     = useRef(3);
  const iframesRef   = useRef(0);   // invincibility seconds remaining
  const flashRef     = useRef(0);   // damage flash remaining
  const shootTimerRef = useRef(0);
  const phaseRef     = useRef<Phase>("intro");
  const wRef         = useRef(0);
  const hRef         = useRef(0);
  const rafRef       = useRef(0);

  const [uiPhase,     setUiPhase]     = useState<Phase>("intro");
  const [score,       setScore]       = useState(0);
  const [wave,        setWave]        = useState(1);
  const [lives,       setLives]       = useState(3);
  const [activeBuffs, setActiveBuffs] = useState<BuffType[]>([]);

  function startGame() {
    const w = wRef.current, h = hRef.current;
    scoreRef.current  = 0; waveRef.current = 1; livesRef.current = 3;
    iframesRef.current = 0; flashRef.current = 0; shootTimerRef.current = 0;
    buffsRef.current  = []; projectilesRef.current = [];
    playerRef.current = { x: w/2, y: h/2 };
    pathRef.current    = spawnWave(1, w, h, w/2, h/2);
    toxinsRef.current  = [];
    pickupsRef.current = spawnPickups(w, h, w/2, h/2);
    setScore(0); setWave(1); setLives(3); setActiveBuffs([]);
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
      ctx.fillStyle = "#09090B"; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(255,255,255,0.022)"; ctx.lineWidth = 1;
      for (let gx = 0; gx < w; gx += 64) { ctx.beginPath(); ctx.moveTo(gx,0); ctx.lineTo(gx,h); ctx.stroke(); }
      for (let gy = 0; gy < h; gy += 64) { ctx.beginPath(); ctx.moveTo(0,gy); ctx.lineTo(w,gy); ctx.stroke(); }

      if (phaseRef.current === "playing") {
        // ── expire buffs
        const prevLen = buffsRef.current.length;
        buffsRef.current = buffsRef.current.filter(b => b.expiresAt > tRef.current);
        if (buffsRef.current.length !== prevLen) setActiveBuffs(buffsRef.current.map(b => b.type));

        const hasSpeed  = buffsRef.current.some(b => b.type === "speed");
        const hasShield = buffsRef.current.some(b => b.type === "shield");
        const hasShoot  = buffsRef.current.some(b => b.type === "shoot");

        // ── player movement
        const sp = SPEED * dt * (hasSpeed ? 2.0 : 1.0);
        const k  = keysRef.current;
        if (k.has("ArrowLeft")  || k.has("a")) playerRef.current.x -= sp;
        if (k.has("ArrowRight") || k.has("d")) playerRef.current.x += sp;
        if (k.has("ArrowUp")    || k.has("w")) playerRef.current.y -= sp;
        if (k.has("ArrowDown")  || k.has("s")) playerRef.current.y += sp;
        playerRef.current.x = Math.max(WBC_R, Math.min(w-WBC_R, playerRef.current.x));
        playerRef.current.y = Math.max(WBC_R, Math.min(h-WBC_R, playerRef.current.y));

        // ── pickup collection
        pickupsRef.current = pickupsRef.current.filter(p => {
          if (Math.hypot(playerRef.current.x-p.x, playerRef.current.y-p.y) < WBC_R + 14) {
            buffsRef.current = buffsRef.current.filter(b => b.type !== p.type);
            buffsRef.current.push({ type: p.type, expiresAt: tRef.current + BUFF_DUR });
            setActiveBuffs(buffsRef.current.map(b => b.type));
            return false;
          }
          return true;
        });

        // ── pathogen movement + eat
        const eaten: number[] = [];
        for (let i = 0; i < pathRef.current.length; i++) {
          const p = pathRef.current[i];
          const dx = playerRef.current.x-p.x, dy = playerRef.current.y-p.y;
          const dist = Math.hypot(dx, dy) || 1;
          const homing = p.type === "virus" ? 0.11 : 0.055;
          p.vx += (dx/dist)*p.speed*homing; p.vy += (dy/dist)*p.speed*homing;
          const cs = Math.hypot(p.vx, p.vy);
          if (cs > p.speed*1.5) { p.vx=p.vx/cs*p.speed; p.vy=p.vy/cs*p.speed; }
          p.x += p.vx*dt; p.y += p.vy*dt;
          if (p.type === "bacteria") p.rot = Math.atan2(p.vy, p.vx);
          if (p.x<p.r)   { p.x=p.r;   p.vx= Math.abs(p.vx); }
          if (p.x>w-p.r) { p.x=w-p.r; p.vx=-Math.abs(p.vx); }
          if (p.y<p.r)   { p.y=p.r;   p.vy= Math.abs(p.vy); }
          if (p.y>h-p.r) { p.y=h-p.r; p.vy=-Math.abs(p.vy); }
          if (Math.hypot(playerRef.current.x-p.x, playerRef.current.y-p.y) < WBC_R+p.r-6) eaten.push(i);
        }
        if (eaten.length) {
          pathRef.current = pathRef.current.filter((_,i) => !eaten.includes(i));
          scoreRef.current += eaten.length;
          setScore(scoreRef.current);
        }

        // ── toxin movement
        for (const t of toxinsRef.current) {
          const dx = playerRef.current.x-t.x, dy = playerRef.current.y-t.y;
          const dist = Math.hypot(dx, dy) || 1;
          t.vx += (dx/dist)*t.speed*0.15; t.vy += (dy/dist)*t.speed*0.15;
          const cs = Math.hypot(t.vx, t.vy);
          if (cs > t.speed*1.5) { t.vx=t.vx/cs*t.speed; t.vy=t.vy/cs*t.speed; }
          t.x += t.vx*dt; t.y += t.vy*dt;
          t.rot += dt * 1.3;
          if (t.x<t.r)   { t.x=t.r;   t.vx= Math.abs(t.vx); }
          if (t.x>w-t.r) { t.x=w-t.r; t.vx=-Math.abs(t.vx); }
          if (t.y<t.r)   { t.y=t.r;   t.vy= Math.abs(t.vy); }
          if (t.y>h-t.r) { t.y=h-t.r; t.vy=-Math.abs(t.vy); }
        }

        // ── toxin collision with player
        if (!hasShield && iframesRef.current <= 0) {
          for (const t of toxinsRef.current) {
            if (Math.hypot(playerRef.current.x-t.x, playerRef.current.y-t.y) < WBC_R+t.r-6) {
              livesRef.current -= 1;
              setLives(livesRef.current);
              iframesRef.current = 1.5;
              flashRef.current   = 0.35;
              if (livesRef.current <= 0) { phaseRef.current = "gameover"; setUiPhase("gameover"); }
              break;
            }
          }
        }
        if (iframesRef.current > 0) iframesRef.current -= dt;
        if (flashRef.current   > 0) flashRef.current   -= dt;

        // ── projectiles (ZAP buff)
        if (hasShoot) {
          shootTimerRef.current -= dt;
          if (shootTimerRef.current <= 0) {
            shootTimerRef.current = SHOOT_INTV;
            const allTargets = [...pathRef.current, ...toxinsRef.current] as {x:number,y:number}[];
            let nearest: {x:number,y:number}|null = null, nearDist = Infinity;
            for (const t of allTargets) {
              const d = Math.hypot(t.x-playerRef.current.x, t.y-playerRef.current.y);
              if (d < nearDist) { nearDist = d; nearest = t; }
            }
            if (nearest) {
              const dx = nearest.x-playerRef.current.x, dy = nearest.y-playerRef.current.y;
              const d = Math.hypot(dx, dy) || 1;
              projectilesRef.current.push({ x: playerRef.current.x, y: playerRef.current.y,
                vx: (dx/d)*PROJ_SPEED, vy: (dy/d)*PROJ_SPEED });
            }
          }
        } else {
          shootTimerRef.current = 0;
        }

        // move projectiles + check hits
        const aliveProj: Projectile[] = [];
        for (const proj of projectilesRef.current) {
          proj.x += proj.vx*dt; proj.y += proj.vy*dt;
          if (proj.x < -20 || proj.x > w+20 || proj.y < -20 || proj.y > h+20) continue;
          let hit = false;
          for (let i = pathRef.current.length-1; i >= 0; i--) {
            if (Math.hypot(proj.x-pathRef.current[i].x, proj.y-pathRef.current[i].y) < 4+pathRef.current[i].r) {
              pathRef.current.splice(i, 1);
              scoreRef.current++; setScore(scoreRef.current);
              hit = true; break;
            }
          }
          if (!hit) {
            for (let i = toxinsRef.current.length-1; i >= 0; i--) {
              if (Math.hypot(proj.x-toxinsRef.current[i].x, proj.y-toxinsRef.current[i].y) < 4+toxinsRef.current[i].r) {
                toxinsRef.current.splice(i, 1);
                hit = true; break;
              }
            }
          }
          if (!hit) aliveProj.push(proj);
        }
        projectilesRef.current = aliveProj;

        // ── wave clear (only pathogens count)
        if (pathRef.current.length === 0) {
          phaseRef.current = "waveclear";
          setUiPhase("waveclear");
          setTimeout(() => {
            if (phaseRef.current !== "gameover") {
              waveRef.current += 1;
              const nw = waveRef.current;
              pathRef.current    = spawnWave(nw, w, h, playerRef.current.x, playerRef.current.y);
              toxinsRef.current  = spawnToxins(nw, w, h, playerRef.current.x, playerRef.current.y);
              pickupsRef.current = spawnPickups(w, h, playerRef.current.x, playerRef.current.y);
              projectilesRef.current = [];
              setWave(nw);
              phaseRef.current = "playing"; setUiPhase("playing");
            }
          }, 1800);
        }
      }

      // ─── render
      for (const p of pickupsRef.current) drawPickup(ctx, p, tRef.current);
      for (const p of pathRef.current) {
        if (p.type === "bacteria") drawBacteria(ctx, p, tRef.current);
        else drawVirus(ctx, p, tRef.current);
      }
      for (const t of toxinsRef.current) drawToxin(ctx, t, tRef.current);
      for (const p of projectilesRef.current) drawProjectile(ctx, p);

      if (phaseRef.current !== "intro") {
        const hasShield = buffsRef.current.some(b => b.type === "shield");
        if (hasShield) drawShieldRing(ctx, playerRef.current.x, playerRef.current.y, tRef.current);
        const blink = iframesRef.current > 0 && Math.sin(tRef.current * 22) > 0;
        if (!blink) drawWBC(ctx, playerRef.current.x, playerRef.current.y, tRef.current);
      }

      // damage flash
      if (flashRef.current > 0) {
        ctx.fillStyle = `rgba(204,34,68,${(flashRef.current / 0.35) * 0.22})`;
        ctx.fillRect(0, 0, w, h);
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

  const BUFF_META: Record<BuffType, { label: string; color: string }> = {
    speed:  { label: "SPD ×2",  color: "text-[#00E5FF] border-[#00E5FF]/40"  },
    shield: { label: "SHIELD",  color: "text-[#d4a053] border-[#d4a053]/40"  },
    shoot:  { label: "ZAP",     color: "text-[#ee44cc] border-[#ee44cc]/40"  },
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#09090B]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }} />

      {/* HUD */}
      {uiPhase !== "intro" && uiPhase !== "gameover" && (
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 pointer-events-none z-10">
          {/* Lives */}
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {[0,1,2].map(i => (
                <span key={i} className={`text-base ${i < lives ? "text-red-400" : "text-white/12"}`}>♥</span>
              ))}
            </div>
            <span className="font-mono text-xs tracking-widest text-[#00E5FF]/50 uppercase">
              WAVE {String(wave).padStart(2,"0")}
            </span>
          </div>
          {/* Active buffs */}
          <div className="flex gap-2">
            {activeBuffs.map(b => (
              <span key={b} className={`font-mono text-[10px] tracking-widest border px-2 py-0.5 uppercase ${BUFF_META[b].color}`}>
                {BUFF_META[b].label}
              </span>
            ))}
          </div>
          {/* Score */}
          <span className="font-mono text-xs tracking-widest text-white/40 uppercase">
            SCORE {String(score).padStart(4,"0")}
          </span>
        </div>
      )}

      {/* Intro */}
      {uiPhase === "intro" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-5">
          <p className="font-mono text-[10px] tracking-[0.5em] text-[#00E5FF]/25 uppercase">
            internal threat response protocol
          </p>
          <h1 className="font-mono text-5xl font-bold text-[#00E5FF] tracking-widest">PHAGOCYTE</h1>
          <div className="font-mono text-sm text-white/22 text-center leading-relaxed mt-1 space-y-1">
            <p>you are a white blood cell. eat the pathogens.</p>
            <p className="text-xs text-white/15">
              <span className="text-[#ff5544]/50">red rods</span> + <span className="text-[#ee44cc]/50">pink spikes</span> → eat them ·{" "}
              <span className="text-[#cc2244]/60">crimson stars</span> → avoid or shoot
            </p>
            <p className="text-xs text-white/15">
              pick up <span className="text-[#00E5FF]/50">SPD</span> · <span className="text-[#d4a053]/50">SLD</span> · <span className="text-[#ee44cc]/50">ZAP</span> diamonds for 5s buffs
            </p>
          </div>
          <p className="font-mono text-xs text-white/15 mt-1">WASD or ↑↓←→ to move</p>
          <button
            onClick={startGame}
            className="mt-3 font-mono text-sm uppercase tracking-[0.35em]
              border border-[#00E5FF]/30 bg-[#00E5FF]/5 px-8 py-3
              text-[#00E5FF]/60 hover:border-[#00E5FF]/70 hover:text-[#00E5FF]
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

      {/* Game over */}
      {uiPhase === "gameover" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-5">
          <p className="font-mono text-[10px] tracking-[0.5em] text-red-400/40 uppercase">
            programmed cell death initiated
          </p>
          <h1 className="font-mono text-5xl font-bold text-red-400 tracking-widest">APOPTOSIS</h1>
          <p className="font-mono text-sm text-white/30 tracking-widest mt-1">
            WAVE {String(wave).padStart(2,"0")} · SCORE {String(score).padStart(4,"0")}
          </p>
          <button
            onClick={startGame}
            className="mt-3 font-mono text-sm uppercase tracking-[0.35em]
              border border-red-400/30 bg-red-400/5 px-8 py-3
              text-red-400/60 hover:border-red-400/70 hover:text-red-400
              transition-all duration-200"
          >
            retry
          </button>
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
