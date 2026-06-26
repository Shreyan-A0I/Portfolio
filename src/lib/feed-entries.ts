export interface FeedEntry {
  date: string;
  tag: string;
  title: string;
  paragraphs: string[];
  gif?: string;
}

export const feedEntries: FeedEntry[] = [
  {
    date: "2026-06",
    tag: "relatable",
    title: "Ross: the most relatable character ever",
    paragraphs: [
      "that sandwich was the only good thing in his life. i get it ross. i get it.",
    ],
    gif: "/sandwich.gif",
  },
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
];
