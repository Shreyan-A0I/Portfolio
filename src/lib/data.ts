import { Project, PersonalInfo, Experience, Skill } from "@/types";

export const personalInfo: PersonalInfo = {
  name: "Shreyan Balaji Nalwad",
  title: "Computational Biology & AI Engineer",
  tagline: "Bridging the gap between biological complexity and computational precision",
  email: "shreyan.nalwad@gmail.com",
  phone: "(412) 670-5516",
  linkedin: "https://www.linkedin.com/in/shreyan-nalwad",
  location: "Pittsburgh, PA",
  education: [
    {
      institution: "Carnegie Mellon University",
      degree: "Master of Science",
      field: "Computational Biology",
      location: "Pittsburgh, PA",
      graduationDate: "May 2027",
      coursework: [
        "Algorithms and Advanced Data Structures",
        "Quantitative Genetics",
        "Computational Genomics",
        "Automation",
      ],
    },
    {
      institution: "Vellore Institute of Technology",
      degree: "Bachelor of Technology",
      field: "Computer Science and Engineering (Bioinformatics)",
      location: "Vellore, India",
      graduationDate: "May 2025",
      coursework: [
        "Data Analytics in Bioinformatics",
        "Biological Database",
        "Artificial Intelligence",
      ],
    },
  ],
};

export const experience: Experience[] = [
  {
    company: "Vyuhaa Med Data",
    role: "AI Integration Engineer - Intern",
    location: "Hyderabad, India",
    startDate: "Oct 2024",
    endDate: "Jul 2025",
    highlights: [
      "Reduced WSI inference latency by 85% (8 min to 80s) by re-engineering the data-loading pipeline",
      "Architected a 3-stage iterative inference engine for Edge AI performance optimization",
      "Orchestrated pipeline migration from YOLOv7 to YOLOv11, achieving 90% precision and 10x recall boost",
      "Engineered hierarchical class-priority system for cell grading with NMS and cell segmentation",
    ],
  },
];

export const skills: Skill[] = [
  {
    category: "High-Performance ML",
    items: ["PyTorch", "CUDA", "NVIDIA Jetson", "YOLO", "DETR", "Vision Transformers (ViT)", "HDBSCAN"],
  },
  {
    category: "Spatial & Molecular Omics",
    items: ["MALDI-MSI (pyimzML)", "WSI (OpenSlide, Napari)", "scRNA-seq (Seurat, Bioconductor)", "METASPACE"],
  },
  {
    category: "Cloud & Infrastructure",
    items: ["AWS Certified Cloud Practitioner", "S3", "Brev.dev", "MLOps", "Git", "Streamlit/Shiny"],
  },
  {
    category: "Languages",
    items: ["Python", "R", "GO", "SQL", "C++", "Java"],
  },
];

// Projects organized by domain
export const edgeAIProjects: Project[] = [
  {
    id: "jetson-optimization",
    title: "Edge AI Inference Optimization",
    description:
      "Re-engineered data-loading pipeline for Jetson Orin Nano, eliminating redundant OpenSlide handle initializations and deploying multi-threaded batching strategy.",
    hook: "Optimizing for the constraints of reality.",
    technologies: ["CUDA", "NVIDIA Jetson", "OpenSlide", "Python", "Multi-threading"],
    domains: ["Edge Computing", "Medical Imaging"],
    metrics: [
      { label: "Latency Reduction", value: "85%" },
      { label: "Inference Time", value: "80s" },
      { label: "Speedup", value: "3x" },
    ],
    image: "/Jetson-orin nano.jpeg",
    featured: true,
  },
];

export const neuralInterfaceProjects: Project[] = [
  {
    id: "cerviai",
    title: "CerviAI - Cervical Cancer Detection",
    description:
      "Orchestrated pipeline migration from YOLOv7 to YOLOv11, streamlining deep learning workflow for tumor cell detection in clinical-grade Whole Slide Images.",
    hook: "Decoding visual complexity with clinical precision.",
    technologies: ["YOLOv11", "PyTorch", "OpenSlide", "NMS", "Cell Segmentation"],
    domains: ["Computer Vision", "Clinical Pathology"],
    metrics: [
      { label: "Precision", value: "90%" },
      { label: "Recall Boost", value: "10x" },
    ],
    featured: true,
  },
  {
    id: "diabetic-retinopathy",
    title: "Hybrid CNN-ViT for Diabetic Retinopathy",
    description:
      "Designed a two-stage architecture combining CNNs and Vision Transformers for multi-class diabetic retinopathy grading. First Author publication at Taylor & Francis.",
    hook: "Capturing local spatial and global contextual features.",
    technologies: ["Vision Transformers", "CNN", "Multi-head Self-Attention", "PyTorch"],
    domains: ["Deep Learning", "Ophthalmology"],
    metrics: [
      { label: "Accuracy", value: "87%" },
      { label: "Publication", value: "First Author" },
    ],
    link: "#",
    featured: true,
  },
];

export const systemsProjects: Project[] = [
  {
    id: "sustainable-food",
    title: "Sustainable Food Alternative Web App",
    description:
      "Built and deployed a web app for suggesting diet alternatives based on carbon impact, water, land and fertilizer usage for 50+ staple food items using USDA dataset.",
    hook: "Architecting tools for human and environmental impact.",
    technologies: ["Go", "K-Means Clustering", "Silhouette Score", "Web Development"],
    domains: ["Full-Stack Engineering", "Environmental Science"],
    metrics: [
      { label: "Food Items", value: "50+" },
      { label: "Metrics", value: "4" },
    ],
    featured: true,
  },
  {
    id: "virtual-mouse",
    title: "Virtual Mouse - Finger Tracking",
    description:
      "Created a virtual mouse controlled via finger-tracking using Mediapipe API, enabling live tracking and gesture-based computer interaction.",
    hook: "Bridging human gestures to digital interfaces.",
    technologies: ["OpenCV", "Mediapipe", "Python", "Computer Vision"],
    domains: ["HCI", "Computer Vision"],
    featured: false,
  },
];

export const predictiveProjects: Project[] = [
  {
    id: "muffle",
    title: "MUFFLE - Multimodal Federated Learning",
    description:
      "Spearheaded multimodal fusion strategy using NVIDIA NVFlare, orchestrating integration of WSI and RNA-seq encoders to stratify patients into 3 distinct risk clusters.",
    hook: "Federating intelligence across modalities.",
    technologies: ["NVIDIA NVFlare", "Gated Attention", "AWS S3", "Brev.dev"],
    domains: ["Federated Learning", "Multi-omics"],
    metrics: [
      { label: "Team Size", value: "11" },
      { label: "Award", value: "Best Collaboration" },
      { label: "Risk Clusters", value: "3" },
    ],
    featured: true,
  },
  {
    id: "sparta",
    title: "SPARTA - Spatial Metabolite Analysis",
    description:
      "Developed a high-performance Streamlit engine for MALDI-MSI analysis, utilizing intensity-weighted centroid alignment to superimpose metabolic maps.",
    hook: "Mapping the metabolic landscape.",
    technologies: ["Streamlit", "MALDI-MSI", "Log-transformed Co-localization", "METASPACE"],
    domains: ["Spatial Omics", "Metabolomics"],
    metrics: [
      { label: "Metabolites", value: "100+" },
      { label: "Data Integrity", value: "100%" },
    ],
    featured: true,
  },
  {
    id: "flu-var",
    title: "VAR Modeling for Influenza Spread",
    description:
      "Created a Shiny app for influenza type spread analysis by country using curated time-series data from WHO and NOAA with Granger Causality analysis.",
    hook: "Inferring causality in stochastic environments.",
    technologies: ["R Shiny", "VAR Model", "Granger Causality", "Bootstrap Validation"],
    domains: ["Epidemiology", "Statistical Modeling"],
    metrics: [
      { label: "Data Sources", value: "WHO + NOAA" },
      { label: "Method", value: "IRF" },
    ],
    featured: true,
  },
];
