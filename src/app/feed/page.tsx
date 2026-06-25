import type { Metadata } from "next";
import SectionHeader from "@/components/shared/SectionHeader";

export const metadata: Metadata = {
  title: "Feed",
  description: "Updates, notes, and observations from Shreyan Nalwad — research, comp bio, and things worth writing down.",
};

interface FeedEntry {
  date: string;
  tag: string;
  title: string;
  paragraphs: string[];
}

const entries: FeedEntry[] = [
  {
    date: "2026-06",
    tag: "research",
    title: "NuStain: NAFNet on kidney tissue converging",
    paragraphs: [
      "ACTN4 and C3 training runs are both deep into convergence — ACTN4 at epoch 1569, C3 at 1048. The high-density Z-stack pipeline (every 5th slice, stride 64) is doing a lot of the work: having 80× more training patches from the same raw acquisitions meant the model saw real 3D structural diversity instead of three sparse slices per volume. Predictions on held-out slides are looking indistinguishable from ground truth at a glance.",
      "Started running the DDPM (diffusion) track alongside NAFNet to see whether a generative approach handles texture differently. Early results pending.",
    ],
  },
  {
    date: "2026-05",
    tag: "update",
    title: "CHIMERA, MUFFLE, and what hackathons are actually good for",
    paragraphs: [
      "Built MUFFLE in a compressed sprint for the CHIMERA federated learning challenge — 11-person team, multimodal WSI + RNA-seq fusion, bladder cancer risk stratification. Won Best Collaboration Award. The thing about well-run hackathons is that the time pressure forces you to make architectural decisions fast and live with them. Gated attention for modality fusion was a 20-minute decision that turned out to be the right one.",
      "C-index of 0.5507 on 176 patients isn't going to set the world on fire, but the point was demonstrating the federated multimodal framework, and the Kaplan-Meier separation across 3 clusters held up visually.",
    ],
  },
  {
    date: "origin",
    tag: "background",
    title: "How I got here",
    paragraphs: [
      "Both my parents are doctors — my mother is a cancer pathologist, my father a laparoscopic gynecologist. Growing up accompanying my mom to the lab, being around hospitals from an early age, kept medicine close. When I found computation, I found a second lens for the same kind of problems: high-stakes, complex data, real consequences. Comp bio sits at the intersection of the most unique data in all of machine learning and problems that can eventually change outcomes for real people — in cancer diagnosis, in drug discovery, in how we understand disease at a molecular level.",
      "My first real taste of what clinical AI actually means came at Vyuhaa Med Data in Hyderabad. My coworker handled the robotics side of a prototype WSI scanner — slide movement, stitching, mechanical choreography. I owned the software: the CerviAI pipeline end-to-end, deployment on Jetson Orin Nano, live inference running concurrently while the slide was being captured. When it worked — when the scanner was moving and the pipeline was flagging suspicious regions in near real-time — something clicked about what it means to build AI that operates in the world, not in a notebook.",
      "My CTO pushed hard on modularity and unit testing, and modelled a principle I now carry into everything: show, don't explain. I also spent a lot of time translating between the technical pipeline and the in-house pathologist — that back-and-forth forced me to understand the domain, not just the model.",
      "Now I'm at Zhao Biophotonics Lab at CMU, building diffusion models for in-silico fluorescence multiplexing. Letting microscopes see more than their optics allow.",
    ],
  },
];

export default function FeedPage() {
  return (
    <main className="px-6 pb-20 sm:px-10 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <SectionHeader
          eyebrow="Feed"
          title="Notes & Updates"
          subtitle="Research observations, project updates, and things worth writing down."
        />

        <div className="space-y-12 mt-2">
          {entries.map((entry, i) => (
            <article key={i} className="relative border-l-2 border-border-subtle pl-8">
              <span className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-accent-amber/80" />

              <div className="mb-3 flex items-center gap-3">
                <span className="hud-text text-xs text-text-secondary/50 uppercase tracking-widest">
                  {entry.date}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full border border-border-subtle text-text-secondary/60">
                  {entry.tag}
                </span>
              </div>

              <h2 className="mb-4 text-xl font-bold text-text-primary leading-snug">
                {entry.title}
              </h2>

              <div className="space-y-4 text-text-secondary leading-relaxed">
                {entry.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
