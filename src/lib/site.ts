import type { GraphCluster, JourneyEntry, SiteProfile } from "@/types";

export const siteProfile: SiteProfile = {
  name: "Shreyan Balaji Nalwad",
  role: "Computational Biology + AI Systems Engineer",
  tagline:
    "I build across biology, inference systems, and product tooling, then turn the overlap into usable software.",
  location: "Pittsburgh, PA / Hyderabad, India",
  email: "shreyan.nalwad@gmail.com",
  phone: "+1 (412) 670-5516",
  linkedin: "https://www.linkedin.com/in/shreyan-nalwad",
  github: "https://github.com/Shreyan-A0I",
};

export const journeyEntries: JourneyEntry[] = [
  {
    stamp: "BOOT::01",
    title: "Biology created the problem space.",
    body:
      "I started from bioinformatics and kept running into the same constraint: good questions were being asked with tools that were too slow, too opaque, or too brittle for the science they were supposed to support.",
  },
  {
    stamp: "BOOT::02",
    title: "Computer vision and edge inference made it physical.",
    body:
      "Clinical imaging and deployment constraints forced me to care about latency, memory, model behavior, and the gap between a paper result and a usable system.",
  },
  {
    stamp: "BOOT::03",
    title: "Systems engineering became the leverage point.",
    body:
      "Once the research got serious, the real work shifted into pipelines, interfaces, storage, and workflows that other people could trust enough to use repeatedly.",
  },
  {
    stamp: "BOOT::04",
    title: "Now the through-line is interdisciplinarity.",
    body:
      "I work best where wet-lab ambiguity, machine learning, and product design all collide. The portfolio is organized around that tension instead of hiding it.",
  },
];

export const graphClusters: GraphCluster[] = [
  {
    id: "biology",
    label: "Biological Systems",
    description: "Clinical pathology, genomics, spatial biology, and disease-centered modeling.",
    color: "var(--bio-cyan)",
    x: 18,
    y: 24,
    relatedProjectSlugs: ["cerviai", "mitograph", "spotnumt", "sparta"],
  },
  {
    id: "vision",
    label: "Computer Vision",
    description: "Whole-slide imaging, dense feature extraction, and clinically defensible recognition systems.",
    color: "var(--syntax-yellow)",
    x: 74,
    y: 18,
    relatedProjectSlugs: ["cerviai", "diabetic-retinopathy", "jetson-optimization"],
  },
  {
    id: "systems",
    label: "Systems + Tooling",
    description: "Interfaces, pipelines, dashboards, and production-minded data ergonomics.",
    color: "var(--hard-white)",
    x: 76,
    y: 64,
    relatedProjectSlugs: ["sparta", "this-for-that", "flu-var", "muffle"],
  },
  {
    id: "inference",
    label: "Inference Engineering",
    description: "Performance under constraint, reliability, and the mechanics of deployment-ready ML.",
    color: "var(--cmu-red)",
    x: 22,
    y: 68,
    relatedProjectSlugs: ["jetson-optimization", "cerviai", "spotnumt", "muffle"],
  },
  {
    id: "graph-ml",
    label: "Graph + Causality",
    description: "Knowledge graphs, predictive structure, and statistical reasoning for messy biological data.",
    color: "var(--bio-cyan)",
    x: 49,
    y: 42,
    relatedProjectSlugs: ["mitograph", "flu-var", "muffle"],
  },
];

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/kanban", label: "Kanban" },
];
