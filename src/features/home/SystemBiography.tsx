"use client";

import { motion } from "framer-motion";

interface Commit {
  hash:     string;
  refs:     string;
  refColor: string;
  message:  string;
  date:     string;
}

const COMMITS: Commit[] = [
  {
    hash:     "a1b2c3d",
    refs:     "HEAD → cmu-master",
    refColor: "#00E5FF",
    message:
      "MS Computational Biology, Carnegie Mellon University. Zhao Biophotonics Lab — " +
      "building diffusion models for in-silico fluorescence multiplexing. " +
      "One tissue stain channel in; synthesize the rest without touching a reagent.",
    date: "Jan 2026 – present",
  },
  {
    hash:     "8f4e912",
    refs:     "origin/vyuhaa-edge",
    refColor: "#FACC15",
    message:
      "AI Integration Engineer · Vyuhaa Med Data. " +
      "Migrated CerviAI to YOLOv11: 90% precision, 10× recall improvement. " +
      "3-stage pipeline on Jetson Orin Nano cut inference latency 6×.",
    date: "Jan 2026 – present",
  },
  {
    hash:     "3c7d201",
    refs:     "tag: first-author",
    refColor: "#a3e635",
    message:
      "First-author publication at Com-IT-Con 2024 (Taylor & Francis). " +
      "Hybrid CNN + Vision Transformer for diabetic retinopathy grading — 87% accuracy.",
    date: "Oct 2024",
  },
  {
    hash:     "0011a40",
    refs:     "branch: btech-vit",
    refColor: "#c084fc",
    message:
      "B.Tech Computer Science & Bioinformatics, Vellore Institute of Technology. " +
      "Foundation across graph attention networks, sequence models, federated learning, " +
      "and spatial omics tooling.",
    date: "2021 – 2025",
  },
];

const SPRING = { type: "spring" as const, stiffness: 280, damping: 28 };

export default function SystemBiography() {
  return (
    <section className="border-b border-[#27272a] bg-[#09090B] px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="mb-10 font-mono text-xs tracking-widest text-white/20">
          {"$ git log --oneline --decorate --all"}
        </p>

        <div>
          {COMMITS.map((c, i) => (
            <motion.div
              key={c.hash}
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ ...SPRING, delay: i * 0.07 }}
              className="group relative border-l border-[#27272a] pb-10 pl-7 last:pb-0 hover:border-[#3f3f46] transition-colors"
            >
              {/* Timeline dot */}
              <div
                className="absolute -left-[5px] top-0.5 h-2.5 w-2.5 rounded-full border bg-[#09090B] transition-colors"
                style={{ borderColor: c.refColor + "90" }}
              />

              {/* Commit header */}
              <div className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-mono text-[11px] text-[#71717a]">
                  commit{" "}
                  <span className="text-white/50">{c.hash}</span>
                </span>
                <span
                  className="rounded-sm px-1.5 py-0.5 font-mono text-[10px]"
                  style={{
                    color:           c.refColor,
                    backgroundColor: c.refColor + "18",
                  }}
                >
                  {c.refs}
                </span>
                <span className="ml-auto font-mono text-[10px] text-[#52525b]">
                  {c.date}
                </span>
              </div>

              {/* Message */}
              <p className="font-mono text-sm leading-relaxed text-white/45 transition-colors group-hover:text-white/70">
                {c.message}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
