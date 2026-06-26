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
  thumbnail?: string;
  github?: string;
  demo?: string;
}

export const projectCatalog: ProjectCatalogEntry[] = [
  {
    category: "GENERATIVE AI",
    description:
      "NAFNet regression + DDPM for virtual staining in expansion microscopy — predicting fluorescent channels from NHS structural stain alone, built on MAGNIFY, the lab's Nature-published protocol that circumvents the diffraction limit by physically expanding tissue.",
    longDescription:
      "NuStain is my primary graduate research at Zhao Biophotonics Lab (CMU), built on the lab's Nature-published MAGNIFY protocol. MAGNIFY is an expansion microscopy technique that physically expands tissue 4–10×, pushing structures beyond the diffraction limit (~200nm) so standard confocal optics can resolve them at nanoscale resolution. NuStain adds a computational layer on top: predicting target fluorescent markers (ACTN4, C3 in kidney; GFP, TRITC in brain) from a single NHS structural stain, so a full multiplexed panel can be generated from one imaging pass. Primary model is NAFNet regression; DDPM is being explored as a generative alternative. A high-density 3D patch pipeline (every 5th Z-slice, stride 64, 75% overlap) provides 80× more training data from the same raw acquisitions.",
    highlights: [
      "Visually indistinguishable from ground truth on MAGNIFY protocol",
      "Predicts ACTN4, C3, IGG, C1Q (kidney) and GFP, TRITC (brain) from NHS structural stain",
      "NAFNet regression as primary model; DDPM (diffusion) explored as generative alternative",
      "80× data diversity via high-density 3D Z-stack pipeline from same raw acquisitions",
      "Ongoing research at Zhao Biophotonics Lab, Carnegie Mellon University",
    ],
    domains: [
      "generative-ai",
      "fluorescence-microscopy",
      "computer-vision",
      "biological-systems",
    ],
    headlineMetric: "Visually indistinguishable from ground truth on MAGNIFY",
    slug: "nustain",
    status: "ongoing",
    tech: ["PyTorch", "NAFNet", "DDPM", "Diffusion Models", "Expansion Microscopy", "WandB", "Python"],
    title: "NuStain — Virtual Staining for Expansion Microscopy",
    thumbnail: "/thumb-nustain.png",
  },
  {
    category: "CLINICAL AI",
    description:
      "End-to-end cervical cancer detection pipeline (YOLOv11, 90% precision, 10× recall) deployed live on a prototype WSI scanner via Jetson Orin Nano — latency cut from 500s to 80s.",
    longDescription:
      "Built at Vyuhaa Med Data, CerviAI is a 3-stage clinical pipeline (detection → classification → segmentation) for automated cervical cancer detection on Whole Slide Images, deployed on NVIDIA Jetson Orin Nano for live concurrent inference as the scanner captures slides. Migrated from YOLOv7 to YOLOv11 (90% precision, 10× recall lift). Dropped per-slide latency from 500s to 80s via persistent OpenSlide handles and parallel patch extraction. Formalized an active learning loop with an in-house pathologist oracle.",
    highlights: [
      "YOLOv7 → YOLOv11 migration: 90% precision, 10× recall improvement",
      "500s → 80s latency via persistent OpenSlide handles + parallel patch extraction (6× speedup)",
      "Live concurrent inference — pipeline processes tiles while scanner is still capturing",
      "Active learning loop: pathologist oracle → automated training batch generation",
      "Deployed on NVIDIA Jetson Orin Nano at the clinical edge",
    ],
    domains: ["computer-vision", "inference-engineering", "cancer-biology", "medical-imaging"],
    headlineMetric: "90% precision · 10× recall · 6× edge speedup",
    slug: "cerviai",
    status: "ongoing",
    tech: ["YOLOv11", "PyTorch", "OpenSlide", "TensorRT", "Jetson Orin Nano", "Active Learning", "Python"],
    title: "CerviAI — WSI Pipeline + Edge Deployment",
    thumbnail: "/thumb-cerviai.png",
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
    thumbnail: "/thumb-hybrid.png",
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
    thumbnail: "/thumb-sparta.jpeg",
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
    thumbnail: "/thumb-muffle.png",
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
    thumbnail: "/thumb-mitograph.png",
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
    thumbnail: "/thumb-spotnumt.jpeg",
    demo: "https://huggingface.co/spaces/shwew/spotNUMT",
  },
  {
    category: "ACTIVE LEARNING",
    description:
      "Inv-SHAF: domain-adversarial active learning for spatial gene expression prediction from H&E histology. Gradient Reversal Layer removes batch effects; custom AL strategy accounts for spatial structure.",
    longDescription:
      "Inv-SHAF (Invariance-Aware Active Learning for Label-Efficient Spatial Gene Expression Prediction) predicts spatially-resolved gene expression from standard H&E histology images — bridging cheap morphology staining and expensive spatial transcriptomics. A Gradient Reversal Layer (GRL) forces the encoder to learn batch-invariant representations decoupled from slide/staining artifacts. A custom active learning loop queries spatially diverse, uncertain spots to maximize annotation efficiency on this uniquely complex data type.",
    highlights: [
      "Gradient Reversal Layer for domain-adversarial batch effect removal from slide/staining variation",
      "Custom active learning strategy accounting for spatial correlation structure of transcriptomic spots",
      "Multi-head architecture: gene predictor (MSE) + domain discriminator (CE) balanced at β=1.0",
      "Data-centric fix: gene occupancy filtering (>20%) raised avg non-zero coverage from 42% → 78%",
      "UNI vision foundation model backbone; bottleneck scaled 128→256 for richer features",
    ],
    domains: ["spatial-omics", "active-learning", "computer-vision", "transcriptomics"],
    headlineMetric: "Domain-adversarial GRL + custom active learning on spatial transcriptomics",
    slug: "inv-shaf",
    status: "research",
    tech: ["PyTorch", "Domain Adversarial Training", "Active Learning", "Spatial Transcriptomics", "H&E Histology", "UNI", "Python"],
    title: "Inv-SHAF — Spatial Gene Expression Prediction",
    thumbnail: "/thumb-invshaf.png",
  },
  {
    category: "TRANSCRIPTOMICS",
    description:
      "ML course project: 5-method scRNA-seq pipeline on real MESA cohort CMV data from CellxGene. KLRD1 surfaces as top NK cell CMV predictor; XGBoost finds gene importance for ethnicity as confound check.",
    longDescription:
      "Course project for an ML course — task was to implement multiple classification methods on a large, real-world single-cell RNA-seq dataset. Chose CMV disease from CellxGene (MESA cohort). Five progressive methods implemented: PCA/UMAP unsupervised clustering, regularized logistic regression (KLRD1 as top CMV predictor), XGBoost ethnicity classification as a confound control revealing gene importance by demographic group, cascaded Bayesian priors, and donor-level pseudobulking to aggregate noisy per-cell signals into robust donor-level predictions.",
    highlights: [
      "KLRD1 (CD94, NK cell marker) surfaces as top predictor of CMV-positive donor status",
      "XGBoost ethnicity classification reveals gene importance by demographic group — key confound check",
      "Donor-level pseudobulking corrects for within-donor cell non-independence",
      "Cascaded Bayesian priors for noise-robust single-cell → donor-level classification",
      "5-method pipeline on real MESA cohort scRNA-seq from CellxGene (train.h5ad / val.h5ad)",
    ],
    domains: ["transcriptomics", "biological-systems", "immunology", "single-cell"],
    headlineMetric: "KLRD1 CMV predictor · gene importance by ethnicity",
    slug: "cmv-immunology",
    status: "research",
    tech: ["Python", "scanpy", "AnnData", "UMAP", "PCA", "XGBoost", "scikit-learn", "Bayesian Methods"],
    title: "CMV Immune Fingerprint — scRNA-seq",
    thumbnail: "/thumb-cmv.png",
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
    thumbnail: "/thumb-thisorthat.png",
    demo: "https://thisorthatfood.netlify.app/",
  },
];
