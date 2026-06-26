export interface FeedEntry {
  date: string;
  tag: string;
  title: string;
  paragraphs: string[];
  image?: string;
}

export const feedEntries: FeedEntry[] = [
  {
    date: "2026-06",
    tag: "relatable",
    title: "Ross: the most relatable character ever",
    paragraphs: [
      "that sandwich was the only good thing in his life. i get it ross. i get it.",
    ],
    image: "/sandwich.gif",
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
    date: "2026-02",
    tag: "hackathon",
    title: "3rd at AWAP 2026 — and a drone I'll probably crash on Forbes",
    paragraphs: [
      "CMU's AWAP is a semester-long programming competition. This year: Overcooked. Two bots had to coordinate across buying, prepping, cooking, and plating in real-time against 80-odd other teams. No RL, no neural nets — we treated the kitchen as a resource allocation problem. Hungarian algorithm for task assignment, Johnson's for fast distance lookups, and a sabotage module that invades the opponent's kitchen at exactly the right moment.",
      "Was mid-table for most of the semester. Then my roommate and I spent the last 6 hours really iterating on each other's approaches. Something clicked — we went from nowhere to 3rd. Working inside a competition engine reminded me why I love this kind of problem. The game engine itself was complicated; getting two agents to reason about a shared environment without stepping on each other is genuinely hard. Walked away with 3rd place and a drone.",
    ],
    image: "/awap-win.jpeg",
  },
  {
    date: "2026-01",
    tag: "hackathon",
    title: "MUFFLE at CHIMERA — the best decisions came from asking obvious questions",
    paragraphs: [
      "CHIMERA was NVIDIA's federated learning biohackathon — 11-person team, multimodal WSI + RNA-seq fusion for bladder cancer risk stratification. We called ourselves MUFFLE. Won Best Collaboration Award.",
      "The thing I remember most wasn't the architecture. It was that asking mentors blunt, simple questions — 'what would you actually do here?', 'what's the fastest path to something that works?' — consistently produced better answers than long internal debates. Our gated attention approach for modality fusion came from a 5-minute conversation. Most of the good decisions that weekend did.",
    ],
    image: "/nvidia-biohackathon.jpeg",
  },
  {
    date: "2025-07",
    tag: "reflection",
    title: "What I actually took from Vyuhaa Med Data",
    paragraphs: [
      "Wrapped up my internship at Vyuhaa Med Data in Hyderabad. Built the CerviAI pipeline — tissue detection, nuclear segmentation, a 3-stage cascade, and deployment on Jetson Orin Nano running live inference while the scanner captured slides. More detail in the CerviAI project page.",
      "What I didn't expect was how much the culture shaped my thinking. Dhritiman built something rare: a team where you're trusted to figure things out. My mentor Krishna gave me three things that stuck — know what not to do, back ideas with a proof of concept before refining them, and know when to go deep vs zoom out. Simple rules that are actually hard to execute.",
      "CerviAI is trying to do something real. Early cervical cancer screening in rural India, where specialist access is close to zero. That part hasn't left me.",
    ],
  },
];
