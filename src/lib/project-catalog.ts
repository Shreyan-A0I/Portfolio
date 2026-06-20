export interface ProjectCatalogEntry {
  category: string;
  description: string;
  domains: string[];
  headlineMetric: string;
  slug: string;
  status: "concept" | "research" | "shipped" | "ongoing";
  tech: string[];
  title: string;
}

export const projectCatalog: ProjectCatalogEntry[] = [
  {
    category: "EDGE INFERENCE",
    description: "Optimized pathology inference on Jetson-constrained hardware through model quantization, operator fusion, and memory-aware batching.",
    domains: ["inference-engineering", "computer-vision"],
    headlineMetric: "85% latency reduction",
    slug: "jetson-optimization",
    status: "ongoing",
    tech: ["TensorRT", "CUDA", "PyTorch", "Jetson"],
    title: "Edge AI Inference Optimization",
  },
  {
    category: "CLINICAL AI",
    description: "Cervical cancer detection pipeline migration from legacy systems to modern inference, improving precision to 90% while maintaining clinical workflow.",
    domains: ["computer-vision", "inference-engineering"],
    headlineMetric: "90% precision, 10x recall lift",
    slug: "cerviai",
    status: "ongoing",
    tech: ["Deep Learning", "Computer Vision", "Clinical Data", "Python"],
    title: "CerviAI",
  },
  {
    category: "DEEP LEARNING",
    description: "Hybrid CNN-ViT architecture for diabetic retinopathy grading, published work combining local feature extraction with global transformer attention.",
    domains: ["computer-vision", "biological-systems"],
    headlineMetric: "87% accuracy, first-author publication",
    slug: "diabetic-retinopathy",
    status: "research",
    tech: ["PyTorch", "Vision Transformers", "Medical Imaging", "Published"],
    title: "Hybrid CNN-ViT for Diabetic Retinopathy",
  },
  {
    category: "SPATIAL OMICS",
    description: "MALDI-MSI alignment and ratio analysis for spatial metabolomics, building defensible scientific tooling for research reproducibility.",
    domains: ["systems-tooling", "biological-systems"],
    headlineMetric: "100+ metabolites, 100% integrity",
    slug: "sparta",
    status: "ongoing",
    tech: ["Mass Spectrometry", "Image Processing", "Python", "Scientific Computing"],
    title: "SPARTA - Spatial Omics Analysis",
  },
  {
    category: "EPIDEMIOLOGY",
    description: "WHO and NOAA influenza time-series analysis with causal lag structure identification and explainable forecasting.",
    domains: ["graph-causality", "biological-systems"],
    headlineMetric: "IRF-based causal modeling",
    slug: "flu-var",
    status: "research",
    tech: ["Time Series", "Causal Inference", "Statistical Modeling", "Python"],
    title: "Influenza VAR Modeling",
  },
  {
    category: "FEDERATED LEARNING",
    description: "Distributed multimodal fusion across pathology imagery and RNA-seq data with privacy-preserving techniques for research collaboration.",
    domains: ["graph-causality", "inference-engineering", "biological-systems"],
    headlineMetric: "3 risk clusters, 11-person team",
    slug: "muffle",
    status: "ongoing",
    tech: ["Federated Learning", "Multi-Modal Fusion", "Privacy ML", "PyTorch"],
    title: "MUFFLE - Multi-Omics Fusion",
  },
  {
    category: "GRAPH ML",
    description: "Knowledge graph and GNN for mitochondrial VUS pathogenicity prediction, scoring 1,228 variants across 808 phenotypes.",
    domains: ["graph-causality", "biological-systems"],
    headlineMetric: "0.830 test AUPRC, 1,228 VUS scored",
    slug: "mitograph",
    status: "ongoing",
    tech: ["Graph Neural Networks", "Knowledge Graphs", "Genomics", "PyTorch Geometric"],
    title: "MitoGraph - Genomic Graph ML",
  },
  {
    category: "SEQUENCE MODELING",
    description: "mtDNA vs NuMT classification under severe class imbalance using CNN-BiLSTM ensemble with class-weighted training.",
    domains: ["inference-engineering", "biological-systems"],
    headlineMetric: "AUPRC primary metric, CNN+BiLSTM ensemble",
    slug: "spotnumt",
    status: "ongoing",
    tech: ["PyTorch", "CNN/LSTM", "Genomics", "Class Imbalance"],
    title: "spotNUMT - Sequence Classification",
  },
  {
    category: "FULL-STACK",
    description: "Sustainability-focused food alternative recommendation tooling, quantifying impact across carbon, water, land, and biodiversity axes.",
    domains: ["systems-tooling"],
    headlineMetric: "50+ items, 4 impact axes",
    slug: "this-for-that",
    status: "research",
    tech: ["Full-Stack", "React", "Python", "Sustainability Data"],
    title: "This For That - Impact Recommendations",
  },
];
