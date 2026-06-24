export interface ProjectCatalogEntry {
  category: string;
  description: string;
  domains: string[];
  headlineMetric: string;
  longDescription: string;
  highlights: string[];
  slug: string;
  status: "concept" | "research" | "shipped" | "ongoing";
  tech: string[];
  title: string;
  github?: string;
  demo?: string;
}

export const projectCatalog: ProjectCatalogEntry[] = [
  {
    category: "GENERATIVE AI",
    description:
      "DDPM-based 'channel-to-channel generation' for virtual fluorescence microscopy — synthesizing multiplexed tissue stains in silico without the physical reagents.",
    longDescription:
      "NuStain is the core project of my graduate research at Zhao Biophotonics Lab (CMU). The idea: a fluorescence microscopy experiment typically requires expensive reagents and can only stain a handful of channels simultaneously. NuStain trains a Denoising Diffusion Probabilistic Model to generate those additional stain channels computationally — from a single input channel, the model synthesizes what the other fluorescent markers would look like. Built an end-to-end HDF5 data pipeline, integrated FiLM (Feature-wise Linear Modulation) layers into a custom 8M-parameter architecture to condition generation on channel identity, and stabilized the diffusion process to convergence.",
    highlights: [
      "DDPM trained for 'channel-to-channel generation' of multiplexed fluorescent tissue stains",
      "FiLM layers integrated into custom 8M-parameter architecture for channel-conditioned generation",
      "End-to-end HDF5 data pipeline for high-throughput microscopy image pairs",
      "Enables cost-effective virtual multiplexing without expensive physical reagents",
      "Ongoing research at Zhao Biophotonics Lab, Carnegie Mellon University",
    ],
    domains: [
      "generative-ai",
      "fluorescence-microscopy",
      "computer-vision",
      "biological-systems",
    ],
    headlineMetric: "In-silico multiplexing via diffusion",
    slug: "nustain",
    status: "ongoing",
    tech: ["PyTorch", "DDPM", "Diffusion Models", "FiLM Layers", "HDF5", "Fluorescence Microscopy", "Python"],
    title: "NuStain — Virtual Fluorescence Multiplexing",
  },
  {
    category: "EDGE INFERENCE",
    description:
      "3-stage pathology inference pipeline (detection → classification → segmentation) deployed on Jetson Orin Nano. Latency cut from 500s to 80s.",
    longDescription:
      "Built at Vyuhaa Med Data, this is a 3-stage inference engine for clinical-grade Whole Slide Image analysis on Jetson Orin Nano. The goal: make pathologist-grade AI run on $200 hardware without sacrificing accuracy. Optimized via parallelization, eliminated redundant OpenSlide handle initializations, and formalized an active learning loop with an in-house pathologist oracle.",
    highlights: [
      "500s → 80s latency via parallelization and OpenSlide handle deduplication",
      "3-stage pipeline: abnormal cell detection → targeted patch-centering → high-confidence segmentation",
      "Active learning loop with pathologist oracle for automated annotation batch generation",
      "Deployed on NVIDIA Jetson Orin Nano at the clinical edge",
    ],
    domains: ["inference-engineering", "computer-vision", "cancer-biology", "medical-imaging"],
    headlineMetric: "6× latency reduction (500s → 80s)",
    slug: "jetson-optimization",
    status: "ongoing",
    tech: ["TensorRT", "CUDA", "PyTorch", "OpenSlide", "Jetson Orin Nano", "Python"],
    title: "Edge AI Inference Optimization",
  },
  {
    category: "CLINICAL AI",
    description:
      "Cervical cancer detection pipeline migrated from YOLOv7 to YOLOv11 on clinical-grade WSIs — 90% precision, 10× recall improvement.",
    longDescription:
      "Led the migration of a cervical cancer detection pipeline from YOLOv7 to YOLOv11 at Vyuhaa Med Data, operating on clinical-grade Whole Slide Images. Added targeted patch-centering for high-confidence ROI isolation and collaborated with pathologists to formalize an active learning feedback loop from expert annotations to new training batches.",
    highlights: [
      "YOLOv7 → YOLOv11 migration: 90% precision, 10× recall improvement",
      "Targeted patch-centering for high-confidence region isolation",
      "Active learning: pathologist annotations → automated training batch generation",
      "Clinical-grade WSI processing with OpenSlide end-to-end",
    ],
    domains: ["computer-vision", "inference-engineering", "cancer-biology", "medical-imaging"],
    headlineMetric: "90% precision · 10× recall lift",
    slug: "cerviai",
    status: "ongoing",
    tech: ["YOLOv11", "PyTorch", "OpenSlide", "Computer Vision", "Python", "Clinical WSI"],
    title: "CerviAI",
  },
  {
    category: "DEEP LEARNING",
    description:
      "First-author published research: sequential CNN + ViT architecture for diabetic retinopathy grading at 87% accuracy.",
    longDescription:
      "Designed and published a sequential CNN + Vision Transformer architecture for multi-class diabetic retinopathy grading. CNNs run first for local texture features, then feed into a ViT for global context — a simple but effective coupling that outperforms either architecture alone. Presented at Com-IT-Con 2024 (Taylor & Francis).",
    highlights: [
      "87% grading accuracy on diabetic retinopathy classification",
      "First-author publication presented at Com-IT-Con 2024 (Taylor & Francis)",
      "Sequential CNN → ViT: local texture then global attention",
      "Outperforms standalone CNN and ViT baselines individually",
    ],
    domains: ["computer-vision", "biological-systems", "medical-imaging", "ophthalmology"],
    headlineMetric: "87% accuracy · first-author publication",
    slug: "diabetic-retinopathy",
    status: "research",
    tech: ["PyTorch", "Vision Transformers (ViT)", "CNN", "Medical Imaging", "Python"],
    title: "Hybrid CNN-ViT for Diabetic Retinopathy",
  },
  {
    category: "SPATIAL OMICS",
    description:
      "Streamlit tool for MALDI-MSI spatial metabolomics — intensity-weighted centroid alignment for reproducible metabolic map co-localization.",
    longDescription:
      "SPARTA (Spatial Metabolite Alignment and Ratio Temperament Analysis) superimposes metabolic maps from MALDI-MSI experiments using intensity-weighted centroid alignment, preserving spatial variance while enabling principled co-localization analysis. SNR-floor filtering and log2 co-localization logic identify metabolic fronts and tumor boundaries across 100+ METASPACE-annotated metabolites.",
    highlights: [
      "100+ METASPACE-annotated metabolites analyzed per tissue section",
      "Intensity-weighted centroid alignment preserving spatial variance across sections",
      "SNR-floor filtering + log2 co-localization for metabolic front detection",
      "Identifies tumor boundaries in spatial metabolomics data",
    ],
    domains: ["systems-tooling", "biological-systems", "metabolomics", "cancer-biology", "spatial-omics"],
    headlineMetric: "100+ metabolites · reproducible spatial analysis",
    slug: "sparta",
    status: "ongoing",
    tech: ["Streamlit", "pyimzML", "METASPACE", "MALDI-MSI", "Python", "Scientific Computing"],
    title: "SPARTA - Spatial Omics Analysis",
  },
  {
    category: "EPIDEMIOLOGY",
    description:
      "VAR + Granger Causality pipeline for flu-weather dynamics. Wind speed Granger-causes Influenza B in Qatar (p < 0.05). Python preprocessing, Go backend, Shiny frontend.",
    longDescription:
      "4-person collaborative project (with Rohan Adla, Arrio Gonsalves, Dylan Setiawan) building a full VAR-based computational pipeline for influenza-weather analysis. Python handles preprocessing and EDA; a Go backend runs VAR estimation (OLS), IRF computation, Granger causality testing, and residual bootstrapping for efficiency; a Shiny app serves interactive forecasting and visualization. Tested on WHO influenza surveillance + country-level weather data for Qatar.",
    highlights: [
      "Wind speed Granger-causes Influenza B in Qatar (p < 0.05) — no significant causality found for Influenza A",
      "IRFs show wind speed and precipitation have the largest sustained effect on flu incidence",
      "Go backend for VAR/Granger/IRF computations; Python preprocessing; Shiny frontend",
      "Bootstrap uncertainty quantification validating asymptotic model assumptions",
      "VAR captures seasonal periodicity of both Influenza A and B in Qatar",
    ],
    domains: ["graph-causality", "biological-systems", "epidemiology", "causal-inference"],
    headlineMetric: "Wind speed Granger-causes Flu B · Go + R + Python",
    slug: "flu-var",
    status: "research",
    tech: ["VAR", "Granger Causality", "IRF", "Go", "R", "Shiny", "Python", "WHO/NOAA Data"],
    title: "Influenza VAR Modeling",
  },
  {
    category: "FEDERATED LEARNING",
    description:
      "Multimodal federated learning fusing WSI + RNA-seq encoders to stratify cancer patients into risk clusters. Best Collaboration Award.",
    longDescription:
      "MUFFLE (Multimodal Framework for Federated Learning) is a privacy-preserving cancer risk stratification system built with NVFlare. It fuses Whole Slide Image encoders with RNA-seq encoders via a gated attention mechanism, trained across federated sites without centralizing patient data. Led technical design for an 11-person team.",
    highlights: [
      "Best Collaboration Award at the federated learning competition",
      "Gated attention fusion mechanism for WSI + RNA-seq modality correlation",
      "3 distinct patient risk clusters from multimodal stratification",
      "NVFlare + AWS S3 data standardization across federated sites",
      "11-person team — led multimodal fusion technical design",
    ],
    domains: ["graph-causality", "inference-engineering", "biological-systems", "transcriptomics", "cancer-biology", "medical-imaging"],
    headlineMetric: "Best Collaboration Award · 3 risk clusters",
    slug: "muffle",
    status: "ongoing",
    tech: ["NVFlare", "Federated Learning", "PyTorch", "AWS S3", "RNA-seq", "WSI", "Gated Attention"],
    title: "MUFFLE - Multimodal Federated Learning",
  },
  {
    category: "GRAPH ML",
    description:
      "Heterogeneous knowledge graph + GATv2 attention network scoring 1,228 mitochondrial Variants of Uncertain Significance across 808 phenotypes.",
    longDescription:
      "MitoGraph is a knowledge graph + Graph Attention Network (GATv2Conv) for predicting clinical pathogenicity of mitochondrial Variants of Uncertain Significance (VUS). Node representations are built with LLM sentence-transformers and circular positional encoding. GNN attention weights expose interpretable biological reasoning — you can see which graph neighborhoods drove each prediction.",
    highlights: [
      "0.830 Test AUPRC on held-out mitochondrial VUS",
      "1,228 variants scored across 808 disease phenotypes",
      "LLM sentence-transformers for biologically grounded node embeddings",
      "Circular positional encoding with strict zero data leakage",
      "GATv2Conv attention weights expose interpretable biological reasoning",
    ],
    domains: ["graph-causality", "biological-systems", "mitochondrial-genomics", "variant-pathogenicity"],
    headlineMetric: "0.830 AUPRC · 1,228 VUS scored",
    slug: "mitograph",
    status: "ongoing",
    tech: ["PyTorch Geometric", "GATv2Conv", "Knowledge Graphs", "LLM Embeddings", "Genomics", "Python"],
    title: "MitoGraph - Genomic Graph ML",
    github: "https://github.com/Shreyan-A0I/Mitomap-app",
    demo: "https://mitomap-app.vercel.app/",
  },
  {
    category: "SEQUENCE MODELING",
    description:
      "mtDNA vs NuMT sequence classification under severe class imbalance using a CNN-BiLSTM ensemble with AUPRC-optimized training.",
    longDescription:
      "spotNUMT distinguishes authentic mitochondrial DNA sequences from Nuclear Mitochondrial DNA Segments (NuMTs) — ancient mtDNA copies embedded in the nuclear genome. NuMT misclassification silently corrupts downstream genomic analysis. The severe class imbalance makes this a hard problem that naive classifiers fail on.",
    highlights: [
      "CNN + BiLSTM ensemble for genomic sequence classification",
      "Class-weighted training strategy for extreme mtDNA vs NuMT imbalance",
      "AUPRC as primary metric — correct for skewed class distributions",
      "Biological motivation: NuMT contamination corrupts downstream genomic pipelines",
    ],
    domains: ["inference-engineering", "biological-systems", "mitochondrial-genomics", "sequence-ml"],
    headlineMetric: "CNN+BiLSTM ensemble · AUPRC-optimized",
    slug: "spotnumt",
    status: "ongoing",
    tech: ["PyTorch", "CNN", "BiLSTM", "Genomics", "Sequence Classification", "Gradio", "Python"],
    title: "spotNUMT - Sequence Classification",
    demo: "https://huggingface.co/spaces/shwew/spotNUMT",
  },
  {
    category: "SPATIAL HISTOLOGY",
    description:
      "Invariant Spatial Histology Analysis Framework — collaborative project with Dylan Setiawan on advanced spatial analysis of histological tissue images.",
    longDescription:
      "Inv-SHAF (Invariant Spatial Histology Analysis Framework) is an ongoing collaborative project with Dylan Setiawan focused on spatial analysis of histological tissue data. Details and technical approach to be added — check back soon.",
    highlights: [
      "Spatial histology analysis on tissue section images",
      "Collaborative project with Dylan Setiawan",
      "Ongoing — more details coming",
    ],
    domains: ["computer-vision", "medical-imaging", "cancer-biology", "spatial-omics"],
    headlineMetric: "Ongoing collaborative research",
    slug: "inv-shaf",
    status: "concept",
    tech: ["Spatial Analysis", "Histology", "Python"],
    title: "Inv-SHAF — Spatial Histology Analysis",
  },
  {
    category: "TRANSCRIPTOMICS",
    description:
      "Single-cell RNA-seq analysis of the CMV infection immune footprint in the MESA cohort — 5-method pipeline from unsupervised clustering to cascaded Bayesian priors.",
    longDescription:
      "Analyzes whether single-cell gene expression profiles from blood can predict Cytomegalovirus (CMV) infection status in donors. Using the MESA cohort scRNA-seq data, five progressive methods were implemented: PCA/UMAP unsupervised clustering to validate cell-type structure, regularized logistic regression identifying KLRD1 as a top CMV predictor gene, XGBoost ethnicity classification as a confound control, and cascaded Bayesian priors with donor-level pseudobulking to aggregate noisy single-cell signal to robust donor-level predictions.",
    highlights: [
      "KLRD1 (CD94, NK cell marker) surfaces as top predictor of CMV-positive donor status",
      "Ethnicity XGBoost control ensures CMV signature isn't proxying demographic variance",
      "Donor-level pseudobulking corrects for within-donor cell non-independence",
      "Cascaded Bayesian priors for noise-robust single-cell → donor-level classification",
      "5-method progressive pipeline on MESA cohort scRNA-seq (train.h5ad / val.h5ad)",
    ],
    domains: ["transcriptomics", "biological-systems", "immunology", "single-cell"],
    headlineMetric: "KLRD1 as CMV predictor · 5-method scRNA pipeline",
    slug: "cmv-immunology",
    status: "research",
    tech: ["Python", "scanpy", "AnnData", "UMAP", "PCA", "XGBoost", "scikit-learn", "Bayesian Methods"],
    title: "CMV Immune Fingerprint — scRNA-seq",
  },
  {
    category: "FULL-STACK",
    description:
      "Food alternative recommendation tool quantifying sustainability impact across carbon emissions, water usage, land use, and biodiversity.",
    longDescription:
      "This For That helps users make informed dietary substitutions by quantifying the environmental impact of food choices across four axes. Instead of vague 'eat less meat' messaging, it gives specific numbers: swap X for Y and reduce your carbon footprint by Z%. The recommendation engine uses K-Means clustering to group food items by combined nutritional and environmental profiles, then ranks alternatives by impact delta.",
    highlights: [
      "K-Means clustering on combined nutritional + environmental feature space",
      "50+ food items scored across 4 axes: carbon, water, land use, biodiversity",
      "Ranks alternatives by impact delta — not just 'eat less meat', but 'swap X for Y, save Z%'",
      "Full-stack React frontend + Python backend",
    ],
    domains: ["systems-tooling"],
    headlineMetric: "50+ items · 4 sustainability axes",
    slug: "this-for-that",
    status: "research",
    tech: ["React", "Python", "Full-Stack", "Data Pipelines", "Sustainability Data"],
    title: "This For That - Impact Recommendations",
  },
];
