export interface ProjectSection {
  title: string;
  paragraphs: string[];
}

export interface ProjectDetailContent {
  sections: ProjectSection[];
}

export const projectContent: Record<string, ProjectDetailContent> = {

  nustain: {
    sections: [
      {
        title: "The Problem With Multiplexed Imaging",
        paragraphs: [
          "Fluorescence microscopy works by labeling cellular structures with fluorescent markers — each marker lights up a different channel. The catch: you can only image a handful of channels simultaneously before the reagents start interfering with each other, and each panel of antibodies is expensive to prepare. A researcher who wants to study 10+ protein markers in the same tissue section has to either run multiple sequential experiments (risk of tissue degradation, spatial drift) or pick their top few and lose the rest.",
          "In-silico multiplexing sidesteps this by learning the statistical relationships between channels from paired training data. If you have enough examples of tissues stained with channels A and B together, you can train a model to synthesize channel B from channel A alone — then at inference time, run a single cheap stain and let the model generate the rest.",
        ],
      },
      {
        title: "Architecture: Conditioned Diffusion",
        paragraphs: [
          "NuStain uses a Denoising Diffusion Probabilistic Model (DDPM) for the channel-to-channel generation task. The model takes a source channel image and generates the target channel, conditioned on which channel pair it's learning. Conditioning is implemented via FiLM (Feature-wise Linear Modulation) layers — these inject channel identity as a learned affine transformation of intermediate feature maps, letting a single 8M-parameter model handle multiple source-target pairs without separate heads.",
          "The data pipeline reads paired multi-channel microscopy images from HDF5 files — a format chosen for high-throughput random access on large image datasets. Stabilizing the diffusion process on microscopy data required careful tuning of the noise schedule and the FiLM injection points in the UNet backbone.",
        ],
      },
      {
        title: "Context: Zhao Biophotonics Lab",
        paragraphs: [
          "This is my primary graduate research project at Carnegie Mellon University's Zhao Biophotonics Lab. The lab works at the intersection of optics, biology, and computational imaging — developing tools that push what you can extract from biological samples. NuStain sits in that space: using generative AI to make existing microscopy data go further.",
          "The project is ongoing. Current focus is on convergence stability, expanding the training set to cover more tissue types, and evaluating output quality against real multiplexed ground truth.",
        ],
      },
    ],
  },

  "jetson-optimization": {
    sections: [
      {
        title: "Running Pathology AI at the Clinical Edge",
        paragraphs: [
          "Clinical pathology AI typically runs in the cloud — you send a whole slide image up, wait for inference, get results back. That works in well-resourced hospitals. It doesn't work in low-resource settings, during connectivity outages, or anywhere that patient data can't leave the facility. The Jetson Orin Nano is NVIDIA's edge compute platform: roughly the size and cost of a paperback book, but capable of running serious deep learning inference without a cloud connection.",
          "The bottleneck was time. The initial pipeline took ~500 seconds per slide. At that speed, it's a research tool, not a clinical one. The goal was to bring that under 90 seconds — the threshold for practical intraoperative use.",
        ],
      },
      {
        title: "The 3-Stage Pipeline",
        paragraphs: [
          "Whole slide images are enormous — a single WSI can be 100,000 × 100,000 pixels. You can't pass that directly to a model. The pipeline breaks it into three stages: first, a lightweight detection model (YOLOv11) identifies candidate regions containing abnormal cells; second, a classifier scores each candidate and prunes low-confidence regions; third, a segmentation model runs only on the surviving high-confidence patches. Each stage reduces the search space for the next.",
          "The latency problem came from how OpenSlide (the WSI parsing library) was being used. The original code reopened file handles repeatedly and ran patch extraction sequentially. Switching to persistent handles and parallelizing extraction across cores dropped the per-slide time from 500s to 80s — a 6× improvement with no change to model architecture.",
        ],
      },
      {
        title: "Active Learning in the Loop",
        paragraphs: [
          "A deployed model that never updates is a model that gets stale. We formalized an active learning feedback loop: the model flags cases where it's uncertain, an in-house pathologist reviews those cases as the oracle, and their annotations get automatically converted into new training batches. This means the model improves continuously from real clinical cases without requiring manual data engineering between cycles.",
        ],
      },
    ],
  },

  cerviai: {
    sections: [
      {
        title: "Cervical Cancer Screening at Scale",
        paragraphs: [
          "Cervical cancer is one of the most preventable cancers with early detection — but manual screening of Pap smear slides is labor-intensive and subject to inter-pathologist variability. Automated cell detection on Whole Slide Images can make screening faster and more consistent, particularly in high-volume clinical settings.",
          "CerviAI is the detection and classification pipeline I built and maintain at Vyuhaa Med Data. It operates on clinical-grade WSIs, identifying abnormal cervical cells across slides that can span gigapixels.",
        ],
      },
      {
        title: "YOLOv7 → YOLOv11 Migration",
        paragraphs: [
          "The original pipeline used YOLOv7. Migrating to YOLOv11 wasn't just a version bump — it required re-engineering the data loading, anchor configuration, and post-processing to match the new architecture. The result: precision improved to 90% and recall increased by 10×. The recall improvement matters clinically; missing abnormal cells (false negatives) is worse than flagging extra patches for human review.",
          "The pipeline adds targeted patch-centering after initial detection: once a candidate region is identified, the model crops a tighter patch centered on the detection before passing it to the classifier and segmenter. This removes irrelevant background context and improves classification accuracy on edge cases.",
        ],
      },
      {
        title: "Active Learning With a Pathologist Oracle",
        paragraphs: [
          "Model performance in clinical settings degrades as real-world data diverges from training distribution — new staining protocols, different slide preparations, scanner variation. To stay current, we implemented an active learning loop: the model isolates negative-sample tissue artifacts it's uncertain about, a pathologist reviews them, and their labels feed directly into new training batches. This makes the annotation pipeline continuous rather than requiring periodic large-scale relabeling campaigns.",
        ],
      },
    ],
  },

  "diabetic-retinopathy": {
    sections: [
      {
        title: "Grading Diabetic Retinopathy",
        paragraphs: [
          "Diabetic retinopathy (DR) is the leading cause of preventable blindness in working-age adults. It's graded on a 5-level severity scale based on fundus images — from no DR to proliferative DR. Automated grading can enable large-scale screening programs where ophthalmologist access is limited.",
          "The challenge for deep learning: the features that distinguish mild from moderate DR are subtle local lesions (microaneurysms, dot hemorrhages) that can be scattered anywhere in the image. Global context also matters — the overall distribution of lesions and the relationship between different regions is part of the grade. Neither CNNs nor ViTs alone handle both optimally.",
        ],
      },
      {
        title: "Sequential CNN + ViT Architecture",
        paragraphs: [
          "The published architecture couples a CNN and a Vision Transformer in sequence rather than in parallel. The CNN runs first: it extracts local spatial features — lesion textures, microaneurysm signatures — from image patches. Its output feature maps then become the input sequence for a ViT, which attends globally across those feature representations to capture spatial relationships between lesions across the full image.",
          "This ordering matters. Feeding raw image patches into a ViT directly loses the local feature inductive biases CNNs excel at. Running the CNN first gives the ViT a richer, more structured input sequence to attend over. The combined model reached 87% grading accuracy, outperforming standalone CNN and ViT baselines.",
        ],
      },
      {
        title: "Publication",
        paragraphs: [
          "This work was published and presented as a first-author paper at Com-IT-Con 2024, published by Taylor & Francis. Writing the paper involved formalizing the architectural design decisions, ablation studies across the CNN-only, ViT-only, and hybrid configurations, and benchmarking against prior grading methods on the APTOS dataset.",
        ],
      },
    ],
  },

  sparta: {
    sections: [
      {
        title: "What Is MALDI-MSI and Why Does Alignment Matter",
        paragraphs: [
          "MALDI Mass Spectrometry Imaging (MALDI-MSI) maps where molecules are located across a tissue section — you get a spatial heatmap for each detected metabolite or lipid. Unlike bulk mass spectrometry (which homogenizes the tissue and loses spatial information), MSI tells you not just what's present but where. This is especially valuable in cancer biology, where tumor cells reprogram their metabolic machinery in spatially organized ways.",
          "The problem: when you want to compare two metabolites within the same section, or the same metabolite across two different experimental conditions (healthy vs. diseased, pre- vs. post-treatment), the distributions can be spatially offset due to tissue drift, matrix crystal density variation, or scanner differences. Naive pixel-wise comparison on misaligned maps produces artifacts, not biology.",
        ],
      },
      {
        title: "The SPARTA Approach: Rigid Alignment Over Interpolation",
        paragraphs: [
          "SPARTA uses intensity-weighted centroid alignment: it finds the center-of-mass of each metabolite's intensity distribution and shifts the image to align those centroids. Crucially, the shifting is rigid — integer pixel offsets with zero-padding, no interpolation. This is a deliberate design choice. Interpolation-based warping (including AI-driven elastic registration) introduces synthetic data points that don't correspond to real measurements. In a research or clinical context, that's hallucination. Centroid alignment keeps every pixel value authentic.",
          "The tool provides two analysis modes: Single MSI mode compares two metabolites within one tissue section to reveal co-localization patterns; Comparison mode compares the same metabolite across two different MSI datasets (pre/post-treatment, healthy/diseased). In both modes, log₂ ratio maps reveal the metabolic front — the spatial boundary where one metabolic signature transitions to another.",
        ],
      },
      {
        title: "Cancer Biology Connection",
        paragraphs: [
          "Tumors alter their lipid and metabolite composition as a hallmark of progression — the Warburg effect is the textbook example, but lipid remodeling is equally significant. SPARTA makes the metabolic front visible: regions where healthy lipid distributions give way to tumor-associated species show up as sharp boundaries in the ratio map. SNR-floor filtering removes background noise before co-localization analysis so the boundaries are biologically real, not instrument artifacts.",
          "The tool is validated against METASPACE-annotated datasets (a public MSI annotation platform), with 100+ metabolites analyzed per tissue section. Results are exported as publication-ready CSV and PNG outputs.",
        ],
      },
    ],
  },

  "flu-var": {
    sections: [
      {
        title: "The Question: Does Weather Cause Flu?",
        paragraphs: [
          "Influenza incidence follows clear seasonal patterns — peaks in winter in temperate climates — and environmental factors like temperature, humidity, and wind speed are known to affect viral survival and transmission. But correlation isn't causation. The statistical question is whether past weather observations provide predictive power over future flu incidence beyond what past flu incidence alone predicts. That's the Granger causality framework.",
          "This project builds a full computational pipeline to test exactly that: fit a Vector Auto-Regression (VAR) model to joint flu + weather time series, compute Impulse Response Functions (IRFs) to see how the system responds to weather shocks, and run Granger causality tests to identify which environmental variables statistically drive flu dynamics.",
        ],
      },
      {
        title: "Stack: Python + Go + Shiny",
        paragraphs: [
          "The pipeline has three layers. Python handles data preprocessing and EDA — aligning WHO influenza surveillance data with NOAA country-level weather records (temperature, humidity, wind speed, precipitation), stationarity testing with ADF, and seasonal differencing. A Go backend implements the computationally intensive parts: VAR estimation via OLS, IRF computation, Granger causality F-tests, and residual bootstrapping for uncertainty quantification. An R Shiny app serves as the interactive frontend for forecasting visualization and result exploration.",
          "The Go backend was chosen for efficiency in the bootstrap resampling step, which requires running hundreds of resampled VAR fits to produce confidence intervals for the IRFs.",
        ],
      },
      {
        title: "Key Results: Qatar as Case Study",
        paragraphs: [
          "The model was tested on Qatar, analyzing both Influenza A and B separately. IRF analysis showed that wind speed and precipitation produced the largest and most sustained responses in both strains — these are the variables the model leans on most. For Granger causality, the results differed by strain: no single weather variable Granger-caused Influenza A (p < 0.05), but wind speed significantly Granger-caused Influenza B.",
          "The A vs. B asymmetry is biologically interesting. Influenza B has a narrower host range (primarily humans, not animals), tends to spread more locally, and may be more sensitive to local environmental conditions like wind-driven aerosol transmission. Influenza A, with its pandemic potential and broader reservoir, may be driven more by global mobility patterns that weather can't capture.",
        ],
      },
      {
        title: "Collaboration",
        paragraphs: [
          "4-person team: Rohan Adla, Arrio Gonsalves, Shreyan Nalwad, Dylan Setiawan. December 2025.",
        ],
      },
    ],
  },

  muffle: {
    sections: [
      {
        title: "Why Federated Learning for Cancer",
        paragraphs: [
          "Cancer patient data is siloed by institution — hospitals can't share raw patient records or pathology slides across sites for privacy and regulatory reasons (HIPAA, GDPR). But a model trained on data from one hospital generalizes poorly to slides from another due to staining protocol differences, scanner variation, and patient population differences. Federated learning solves this by keeping data local: each site trains on its own data, only gradients (not patient data) are shared, and a central server aggregates updates into a global model.",
          "MUFFLE (Multimodal Framework for Federated Learning) extends this to multi-modal data: not just WSI pathology images but also RNA-seq transcriptomic profiles from the same patients. Combining visual (morphological) and molecular (transcriptomic) information should give richer patient representations than either modality alone.",
        ],
      },
      {
        title: "Gated Attention Fusion",
        paragraphs: [
          "The fusion mechanism is a gated attention module. WSI features (from a pretrained pathology encoder) and RNA-seq features (from a transformer encoder) are separately projected into a shared embedding space. A gating network then learns to weight each modality's contribution dynamically — for some patients, morphological features may be more predictive; for others, gene expression dominates. The gated output feeds into the risk stratification head.",
          "This design also provides interpretability: the attention weights show which modality drove each patient's risk assignment. A pathologist can look at a high-risk classification and see whether it was driven by tumor morphology (WSI attention high) or molecular markers (RNA-seq attention high).",
        ],
      },
      {
        title: "Results and Recognition",
        paragraphs: [
          "The federated model successfully stratified patients into 3 distinct risk clusters using the combined WSI + RNA-seq representations. AWS S3 was used for standardized data retrieval across federated sites. The project was built by an 11-person team using NVFlare (NVIDIA's federated learning framework) — I led the multimodal fusion technical design.",
          "The team won Best Collaboration Award at the federated learning competition, recognizing the coordination across a large distributed team and the technical quality of the multimodal fusion approach.",
        ],
      },
    ],
  },

  mitograph: {
    sections: [
      {
        title: "Mitochondrial Variants of Uncertain Significance",
        paragraphs: [
          "Mitochondrial DNA (mtDNA) is a 16,569 base pair circular genome that encodes 37 genes essential for oxidative phosphorylation. Mutations in mtDNA cause a spectrum of diseases — MELAS, Leigh syndrome, Leber's hereditary optic neuropathy — but the clinical significance of most detected variants is unknown. These Variants of Uncertain Significance (VUS) are the dark matter of mitochondrial genetics: they show up in sequencing but can't be classified as pathogenic or benign without expensive functional studies.",
          "MitoGraph addresses this by framing VUS pathogenicity prediction as a graph link prediction problem. If a variant shares structural and evolutionary properties with known pathogenic variants, and those pathogenic variants associate with specific disease phenotypes in the knowledge graph, then the variant may be linked to those phenotypes too.",
        ],
      },
      {
        title: "Knowledge Graph Structure",
        paragraphs: [
          "The heterogeneous knowledge graph integrates three data sources: RefSeq (gene annotations), ClinVar (variant classifications), and MITOMAP (disease associations, conservation scores). It has four node types: Variants (3,439), Genes (37), Respiratory Chain Complexes (4), and Disease Phenotypes (808). Edge types capture biological relationships: LOCATED_IN (variant → gene), PART_OF (gene → complex), ASSOCIATED_WITH (variant → phenotype for known pathogenic variants), and KMER_SIMILARITY (variant ↔ variant based on 4-mer sequence cosine similarity in a ±20bp circular window).",
          "mtDNA is circular, which creates an unusual positional encoding problem — position 16,569 is adjacent to position 1, not distant from it. Variants near the circular junction would get distorted euclidean position features. The fix: encode position as (sin(2π·pos/16569), cos(2π·pos/16569)), so distance in embedding space matches distance on the circular genome.",
        ],
      },
      {
        title: "Model and Zero Data Leakage",
        paragraphs: [
          "The GNN uses GATv2Conv — a dynamic graph attention mechanism where attention weights are computed from a concatenation of both source and target node features (unlike GAT, which only uses the source). 8 attention heads, 64 dimensions. Phenotype node embeddings are generated offline with a sentence-transformer (all-MiniLM-L6-v2) on disease names, giving the model semantic relationships between phenotypes before message passing begins — 'Optic Atrophy' and 'Vision Loss' are closer in embedding space than 'Optic Atrophy' and 'Cardiomyopathy'.",
          "Data leakage was a strict concern. All clinical significance flags (is_pathogenic) and ML-derived scores (APOGEE, MitoTIP) were removed from variant features — the model should learn from sequence, evolutionary conservation, and graph topology, not from pre-computed pathogenicity guesses. Val/test splits are variant-level, not edge-level, preventing the model from seeing any edge connecting a test variant even during training.",
        ],
      },
      {
        title: "Results and Interactive Dashboard",
        paragraphs: [
          "Test AUPRC: 0.830 | Test AUROC: 0.789 | Silhouette: 0.582. 1,228 VUS were scored against all 808 disease phenotypes. GATv2Conv attention weights are extracted and visualized in the dashboard as edge thickness in the force-directed network graph — you can see which gene-complex-phenotype neighborhoods drove a specific variant's risk score.",
          "The dashboard (deployed on Vercel) includes three views: a UMAP projection of GATv2Conv variant embeddings colored by pathogenicity class (flagged VUS cluster with pathogenic variants), a draggable network graph with the full Variant → Gene → Complex → Phenotype hierarchy, and feature importance plots extracted from the input encoder's linear projection weights.",
        ],
      },
    ],
  },

  spotnumt: {
    sections: [
      {
        title: "The NuMT Problem",
        paragraphs: [
          "When cells divide, fragments of mitochondrial DNA occasionally get copied into the nuclear genome. These insertions are called NuMTs — Nuclear Mitochondrial DNA Segments — and they accumulate over evolutionary time. The human hg38 genome has thousands of them. The problem: they share extreme sequence similarity with the mitochondrial sequences they came from, because they're ancient copies.",
          "Variant calling pipelines that process mtDNA reads can accidentally align nuclear NuMT reads to the mitochondrial reference instead. The result is phantom mutations — variants that appear to be in the mitochondria but are actually nuclear polymorphisms. This silently corrupts downstream analyses like heteroplasmy quantification and disease association studies.",
        ],
      },
      {
        title: "Architecture: CNN + BiLSTM",
        paragraphs: [
          "The dataset is severely imbalanced — roughly 1 true mtDNA sequence for every 33 NuMT sequences in the training data. Standard metrics like accuracy and AUROC are misleading under this imbalance (a model that classifies everything as NuMT gets 97% accuracy). AUPRC (Area Under the Precision-Recall Curve) is the primary metric because it directly captures the trade-off between catching true mtDNA and generating false positives.",
          "Six architectures were evaluated: Transformer encoder, CNN + BiLSTM (various configurations), dilated CNN (TCN-style), and focal loss variants. The winner was a simple CNN + 2-layer BiLSTM trained with class-weighted BCE loss. It achieved 100% recall at 0.40 AUPRC — meaning it found every true mtDNA sequence in the test set, at the cost of some false positives. Attempts to improve precision (focal loss, reverse complement augmentation) consistently destroyed recall or caused training collapse.",
        ],
      },
      {
        title: "Pipeline and Deployment",
        paragraphs: [
          "The data pipeline slices FASTA genomes into uniform 200bp windows, drops fragments and ambiguous bases ('N'), and converts sequences to one-hot encoded PyTorch tensors [A, C, G, T]. Training uses an 80/10/10 split with AdamW optimization. The trained model is deployed via a Gradio web interface on HuggingFace Spaces — input a raw DNA sequence, get a probability that it's true mtDNA vs. a NuMT.",
        ],
      },
    ],
  },

  "inv-shaf": {
    sections: [
      {
        title: "Overview",
        paragraphs: [
          "Inv-SHAF (Invariant Spatial Histology Analysis Framework) is an ongoing collaborative project with Dylan Setiawan focused on advanced spatial analysis of histological tissue images. The project is in active development — detailed write-up coming soon.",
        ],
      },
    ],
  },

  "this-for-that": {
    sections: [
      {
        title: "The Idea",
        paragraphs: [
          "Sustainability messaging around food tends to be vague — 'eat less meat', 'reduce your carbon footprint'. This For That tries to be specific: given what you're currently eating, what's the best alternative and by how much does switching reduce each impact axis? Carbon emissions, water usage, land use, and biodiversity impact are tracked separately because the trade-offs are real — some substitutes look great on carbon but terrible on water.",
        ],
      },
      {
        title: "Recommendation Engine",
        paragraphs: [
          "K-Means clustering groups food items by their combined nutritional and environmental profiles. Instead of computing pairwise distances across all 50+ items at query time, clustering pre-computes neighborhoods of similar items. The recommendation returns ranked alternatives sorted by impact delta — the quantified reduction in environmental cost per unit of nutritional equivalence.",
          "The frontend is React; the backend is Python with the clustering and scoring logic. A running list of food items is scored against four environmental datasets and cached for fast query responses.",
        ],
      },
    ],
  },

};
