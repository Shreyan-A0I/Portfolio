import { promises as fs } from "node:fs";
import path from "node:path";
import type { ProjectAttachment, ProjectPreview, ProjectRecord } from "@/types";

const CONTENT_ROOT = path.join(process.cwd(), "Content");

const seededProjects: ProjectRecord[] = [
  {
    slug: "jetson-optimization",
    title: "Edge AI Inference Optimization",
    status: "ongoing",
    year: "2024-2025",
    shortDescription:
      "Rebuilt a pathology inference pipeline around Jetson constraints to cut latency and make on-device analysis practical.",
    headline: "From eight-minute waits to near-real-time inference on constrained edge hardware.",
    domain: "Edge AI + Clinical Imaging",
    graphLabels: ["Inference Engineering", "Computer Vision", "Biological Systems"],
    stack: ["CUDA", "NVIDIA Jetson", "Python", "OpenSlide", "Concurrency"],
    metrics: [
      { label: "Latency Reduction", value: "85%" },
      { label: "Inference Time", value: "80s" },
      { label: "Recall Gain", value: "10x" },
    ],
    story: [
      {
        title: "Why it mattered",
        body:
          "Clinical-grade computer vision is not useful if the device cannot actually sustain the pipeline. This work focused on the unpleasant but necessary middle ground between model quality and deployment reality.",
      },
      {
        title: "What changed",
        body:
          "I reworked handle initialization, batching, and multi-stage inference flow so the system stopped wasting cycles on repeated setup and could spend them on actual prediction.",
      },
      {
        title: "What it says about my work",
        body:
          "I like working at the boundary where model performance becomes a systems problem. The hardest bugs usually live there.",
      },
    ],
    image: "/Jetson-orin nano.jpeg",
    featured: true,
    attachments: [],
  },
  {
    slug: "cerviai",
    title: "CerviAI",
    status: "ongoing",
    year: "2024-2025",
    shortDescription:
      "Migrated a clinical detection pipeline from YOLOv7 to YOLOv11 for cervical cancer analysis on whole-slide images.",
    headline: "Clinical pathology work where detector upgrades had to be measurable, not cosmetic.",
    domain: "Computer Vision + Pathology",
    graphLabels: ["Computer Vision", "Biological Systems", "Inference Engineering"],
    stack: ["YOLOv11", "PyTorch", "OpenSlide", "NMS", "Segmentation"],
    metrics: [
      { label: "Precision", value: "90%" },
      { label: "Recall Lift", value: "10x" },
    ],
    story: [
      {
        title: "Problem frame",
        body:
          "Clinical image workflows punish vague claims. Any detector migration had to improve the real pipeline instead of simply producing a nicer benchmark slide.",
      },
      {
        title: "Execution",
        body:
          "The pipeline work involved model replacement, grading logic, class prioritization, and segmentation-aware post-processing so the outputs aligned with downstream decision making.",
      },
      {
        title: "Takeaway",
        body:
          "This project sharpened how I think about model swaps: the win only counts if the surrounding workflow improves too.",
      },
    ],
    featured: true,
    sourceFolder: "CerviAI",
    attachments: [],
  },
  {
    slug: "diabetic-retinopathy",
    title: "Hybrid CNN-ViT for Diabetic Retinopathy",
    status: "normal",
    year: "2024",
    shortDescription:
      "Combined convolutional and transformer features for diabetic retinopathy grading with publication-backed results.",
    headline: "A hybrid architecture tuned for the trade-off between local texture and global retinal context.",
    domain: "Deep Learning + Ophthalmology",
    graphLabels: ["Computer Vision", "Biological Systems"],
    stack: ["Vision Transformers", "CNN", "PyTorch", "Attention"],
    metrics: [
      { label: "Accuracy", value: "87%" },
      { label: "Publication", value: "First Author" },
    ],
    story: [
      {
        title: "Motivation",
        body:
          "Retinal grading needs both texture sensitivity and global context. This project explored that balance instead of treating architecture choice as dogma.",
      },
      {
        title: "Approach",
        body:
          "The model fused local pattern extraction from CNN layers with transformer attention so the classifier could reason over fine detail and scene-level structure together.",
      },
      {
        title: "Outcome",
        body:
          "The result was not just a score; it became part of how I think about multimodal architectural trade-offs in biomedical ML.",
      },
    ],
    featured: true,
    sourceFolder: "Diabetic-Retinopathy",
    attachments: [],
  },
  {
    slug: "sparta",
    title: "SPARTA",
    status: "ongoing",
    year: "2025",
    shortDescription:
      "A Streamlit system for spatial metabolite alignment, ratio analysis, and interpretable MALDI-MSI exploration.",
    headline: "A research tool shaped by data integrity, alignment discipline, and biological interpretability.",
    domain: "Spatial Omics + Research Tooling",
    graphLabels: ["Systems + Tooling", "Biological Systems", "Graph + Causality"],
    stack: ["Streamlit", "MALDI-MSI", "METASPACE", "Python", "Visualization"],
    metrics: [
      { label: "Metabolites", value: "100+" },
      { label: "Integrity", value: "100%" },
    ],
    story: [
      {
        title: "Scientific constraint",
        body:
          "Spatial biology tools fail if they hallucinate structure into the data. SPARTA was built around preserving raw signal while still making spatial reasoning usable.",
      },
      {
        title: "Design decision",
        body:
          "Rigid centroid alignment, ratio mapping, and validation-first workflows were prioritized over flashier but scientifically weaker transformations.",
      },
      {
        title: "Why it belongs here",
        body:
          "It captures the exact kind of work I want more of: interface design driven by scientific defensibility.",
      },
    ],
    featured: true,
    sourceFolder: "SPARTA",
    attachments: [],
  },
  {
    slug: "flu-var",
    title: "Influenza VAR Modeling",
    status: "normal",
    year: "2024",
    shortDescription:
      "Built a time-series analysis app around WHO and NOAA data to explore influenza spread and causal lag structure.",
    headline: "Forecasting as a structured argument, not a chart generator.",
    domain: "Statistical Modeling + Epidemiology",
    graphLabels: ["Graph + Causality", "Systems + Tooling", "Biological Systems"],
    stack: ["R Shiny", "VAR", "Granger Causality", "Bootstrap Validation"],
    metrics: [
      { label: "Sources", value: "WHO + NOAA" },
      { label: "Method", value: "IRF" },
    ],
    story: [
      {
        title: "Problem frame",
        body:
          "Disease spread is noisy, policy-sensitive, and easy to oversimplify. I wanted an interface that exposed model reasoning instead of hiding it behind a single prediction line.",
      },
      {
        title: "Implementation",
        body:
          "The application used curated international time-series inputs and explanatory analysis tools so users could inspect directionality, lag effects, and scenario behavior.",
      },
      {
        title: "Personal through-line",
        body:
          "This project sits at the statistical end of my portfolio, where causality and interface clarity matter as much as raw model choice.",
      },
    ],
    featured: true,
    sourceFolder: "InfunezaVAR",
    attachments: [],
  },
  {
    slug: "muffle",
    title: "MUFFLE",
    status: "ongoing",
    year: "2025",
    shortDescription:
      "A multimodal federated learning workflow for combining pathology imagery and RNA-seq signals into risk clusters.",
    headline: "Distributed intelligence across modalities, with collaboration as a systems problem.",
    domain: "Federated Learning + Multi-Omics",
    graphLabels: ["Graph + Causality", "Inference Engineering", "Biological Systems"],
    stack: ["NVFlare", "AWS S3", "Brev.dev", "Fusion Models"],
    metrics: [
      { label: "Risk Clusters", value: "3" },
      { label: "Team", value: "11" },
      { label: "Award", value: "Best Collaboration" },
    ],
    story: [
      {
        title: "Constraint",
        body:
          "Federated learning becomes messy as soon as modalities, environments, and team boundaries stop aligning. That was the real challenge here.",
      },
      {
        title: "Approach",
        body:
          "The pipeline coordinated image and RNA-seq encoders with fusion logic that could survive distributed execution and still remain interpretable enough to discuss scientifically.",
      },
      {
        title: "Result",
        body:
          "The outcome mattered, but the more useful lesson was learning how collaboration architecture and model architecture affect each other.",
      },
    ],
    featured: false,
    sourceFolder: "Muffle",
    attachments: [],
  },
  {
    slug: "mitograph",
    title: "MitoGraph",
    status: "ongoing",
    year: "2025",
    shortDescription:
      "A heterogeneous knowledge graph and attention-based GNN for mitochondrial variant pathogenicity prediction.",
    headline: "Graph structure as a bridge between biological priors and predictive modeling.",
    domain: "Graph ML + Genomics",
    graphLabels: ["Graph + Causality", "Biological Systems"],
    stack: ["PyTorch Geometric", "Knowledge Graphs", "GATv2Conv", "UMAP"],
    metrics: [
      { label: "Test AUPRC", value: "0.830" },
      { label: "Phenotypes", value: "808" },
      { label: "VUS Scored", value: "1,228" },
    ],
    story: [
      {
        title: "Question",
        body:
          "Variants of uncertain significance live in a frustrating space between known biology and missing evidence. I wanted to model that uncertainty structurally rather than pretending it was a flat table problem.",
      },
      {
        title: "System shape",
        body:
          "MitoGraph joins curated databases into a heterogeneous graph, then uses attention-driven message passing to estimate disease associations for VUS candidates.",
      },
      {
        title: "Why it matters",
        body:
          "This is where my interest in biology, graph structure, and explainable inference comes together most clearly.",
      },
    ],
    liveUrl: "https://mitomap-app.vercel.app/",
    repoUrl: "https://github.com/Shreyan-A0I/Mitomap-app",
    featured: true,
    sourceFolder: "Mitograph",
    attachments: [],
  },
  {
    slug: "spotnumt",
    title: "spotNUMT",
    status: "ongoing",
    year: "2025",
    shortDescription:
      "A deep learning sequence classifier for distinguishing real mitochondrial DNA from nuclear mitochondrial pseudogenes.",
    headline: "A sequence-modeling problem shaped by class imbalance and biological look-alikes.",
    domain: "Sequence Modeling + Genomics",
    graphLabels: ["Inference Engineering", "Biological Systems"],
    stack: ["PyTorch", "CNN", "BiLSTM", "Gradio"],
    metrics: [
      { label: "Primary Metric", value: "AUPRC" },
      { label: "Best Model", value: "CNN + BiLSTM" },
    ],
    story: [
      {
        title: "Challenge",
        body:
          "NuMTs are almost designed to fool naive pipelines because they resemble true mitochondrial sequences so closely. That makes the problem as much biological as computational.",
      },
      {
        title: "Experiment logic",
        body:
          "Instead of chasing accuracy, the work focused on precision-recall behavior under class imbalance and systematically compared architectural trade-offs.",
      },
      {
        title: "What I learned",
        body:
          "Evaluation discipline matters more than architectural novelty when the class distribution can lie to you.",
      },
    ],
    featured: false,
    sourceFolder: "spotNUMT",
    attachments: [],
  },
  {
    slug: "this-for-that",
    title: "This For That",
    status: "normal",
    year: "2024",
    shortDescription:
      "A web app for comparing staple foods against sustainability metrics and suggesting lower-impact alternatives.",
    headline: "Environmental product thinking backed by data instead of generic advice.",
    domain: "Sustainability + Full-Stack",
    graphLabels: ["Systems + Tooling"],
    stack: ["Go", "K-Means", "Clustering", "Web App"],
    metrics: [
      { label: "Items", value: "50+" },
      { label: "Impact Axes", value: "4" },
    ],
    story: [
      {
        title: "Intent",
        body:
          "I wanted a tool that translated environmental datasets into a decision interface someone could actually use.",
      },
      {
        title: "Execution",
        body:
          "The app combined food-impact metrics with clustering logic so recommendations felt reasoned rather than arbitrary.",
      },
      {
        title: "Why it stays in the portfolio",
        body:
          "It represents the product-facing side of my work: building interfaces where analysis becomes usable behavior.",
      },
    ],
    featured: false,
    sourceFolder: "This for that",
    attachments: [],
  },
];

function inferAttachmentKind(filename: string): ProjectAttachment["kind"] | null {
  const extension = path.extname(filename).toLowerCase();

  if (extension === ".pdf") {
    return "pdf";
  }

  if ([".png", ".jpg", ".jpeg", ".gif", ".webp"].includes(extension)) {
    return "image";
  }

  if (extension === ".md") {
    return "readme";
  }

  return null;
}

function makeAttachmentLabel(filename: string) {
  return filename.replace(/[-_]/g, " ").replace(/\.[^.]+$/, "");
}

async function collectFolderAttachments(folderName: string) {
  const folderPath = path.join(CONTENT_ROOT, folderName);

  try {
    const files = await fs.readdir(folderPath);
    const attachments: Array<ProjectAttachment | null> = files.map((filename) => {
        const kind = inferAttachmentKind(filename);
        if (!kind) {
          return null;
        }

        return {
          kind,
          label: makeAttachmentLabel(filename),
          path: `${folderName}/${filename}`,
        } satisfies ProjectAttachment;
      });

    return attachments.filter((attachment): attachment is ProjectAttachment => attachment !== null);
  } catch {
    return [];
  }
}

async function loadReadme(folderName: string) {
  const readmePath = path.join(CONTENT_ROOT, folderName, "README.md");

  try {
    return await fs.readFile(readmePath, "utf8");
  } catch {
    return undefined;
  }
}

function mergeAttachments(
  existing: ProjectAttachment[],
  collected: ProjectAttachment[],
  hasReadme: boolean,
): ProjectAttachment[] {
  const merged = [
    ...existing,
    ...collected.filter((attachment) => attachment.label.toLowerCase() !== "readme"),
  ];

  if (hasReadme) {
    merged.unshift({ kind: "readme", label: "Source Notes" });
  }

  return merged;
}

export async function getProjectRecords(): Promise<ProjectRecord[]> {
  const records = await Promise.all(
    seededProjects.map(async (project) => {
      if (!project.sourceFolder) {
        return project;
      }

      const [readme, collectedAttachments] = await Promise.all([
        loadReadme(project.sourceFolder),
        collectFolderAttachments(project.sourceFolder),
      ]);

      return {
        ...project,
        readme,
        attachments: mergeAttachments(project.attachments, collectedAttachments, Boolean(readme)),
      } satisfies ProjectRecord;
    }),
  );

  return records.sort((left, right) => Number(right.featured) - Number(left.featured));
}

export async function getProjectPreviews(): Promise<ProjectPreview[]> {
  const records = await getProjectRecords();
  return records.map((project) => ({
    slug: project.slug,
    title: project.title,
    status: project.status,
    year: project.year,
    shortDescription: project.shortDescription,
    headline: project.headline,
    domain: project.domain,
    graphLabels: project.graphLabels,
    stack: project.stack,
    metrics: project.metrics,
    image: project.image,
    featured: project.featured,
  }));
}

export async function getProjectBySlug(slug: string) {
  const records = await getProjectRecords();
  return records.find((project) => project.slug === slug);
}

export async function getFeaturedProjects() {
  const previews = await getProjectPreviews();
  return previews.filter((project) => project.featured).slice(0, 6);
}
