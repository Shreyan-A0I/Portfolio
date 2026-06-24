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

  cerviai: {
    sections: [
      {
        title: "The Product: Live Inference on a Prototype WSI Scanner",
        paragraphs: [
          "CerviAI isn't a standalone model — it's the AI layer of a full prototype product built at Vyuhaa Med Data: a WSI scanner that physically moves across cervical Pap smear slides while CerviAI runs inference concurrently. The scanner stitches tiles as the arm moves; CerviAI processes them as they arrive, flagging suspicious regions before the scan is even complete. Building AI that operates in the physical world — synchronized with hardware, constrained by real-time budgets — is a different problem from training a model in a notebook.",
          "Cervical cancer is one of the most preventable cancers with early detection, but manual cytology review is labor-intensive and subject to inter-pathologist variability. An automated pipeline running on low-cost edge hardware extends screening capacity to high-volume or resource-limited settings.",
        ],
      },
      {
        title: "The 3-Stage Cascade",
        paragraphs: [
          "Whole slide images are enormous — a single WSI can be 100,000 × 100,000 pixels. The pipeline breaks analysis into three stages: first, a YOLOv11 detection model identifies candidate regions containing abnormal cells; second, a classifier scores each candidate and prunes low-confidence regions via targeted patch-centering (tight crops remove irrelevant background context); third, a segmentation model runs only on the surviving high-confidence patches. Each stage prunes the search space for the next — segmentation, the most expensive stage, only sees roughly 5% of the original slide area.",
          "The migration from YOLOv7 to YOLOv11 required re-engineering data loading, anchor configuration, and NMS post-processing — not just a version bump. Result: precision improved to 90%, recall improved by 10×. The recall gain matters clinically — false negatives (missed abnormal cells) carry higher risk than false positives.",
        ],
      },
      {
        title: "Edge Deployment: 500s → 80s on Jetson Orin Nano",
        paragraphs: [
          "The full 3-stage pipeline runs on NVIDIA Jetson Orin Nano — roughly the size and cost of a paperback book. At 500 seconds per slide, it was a research tool, not a clinical one. The optimization goal: under 90 seconds for practical intraoperative use.",
          "The bottleneck was how OpenSlide (the WSI parsing library) was being used. The original code reopened file handles on every tile access and ran patch extraction sequentially. Switching to persistent handles and parallelizing patch extraction across CPU cores dropped the per-slide time from 500s to 80s — a 6× improvement with no change to model architecture. No clever quantization required; just eliminating unnecessary I/O overhead.",
        ],
      },
      {
        title: "Active Learning Loop",
        paragraphs: [
          "A deployed model that never updates degrades as clinical data drifts — new staining protocols, scanner firmware, different slide preparations. The active learning loop keeps it current: the model flags uncertain cases (low softmax confidence or stage disagreement), an in-house pathologist reviews them as oracle, and labels automatically convert into new training batches. Continuous annotation rather than periodic large-scale relabeling campaigns.",
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
        title: "The Memphis / San Diego Simulation",
        paragraphs: [
          "The federated setup simulates a real-world data access inequality: San Diego Hospital has twice the patients and two modalities (clinical + RNA-seq); Memphis Hospital has only clinical data. MuFFLe handles this via modality dropout — when a site lacks RNA-seq, the model zeros out the RNA-seq encoder embedding, telling the attention layer to ignore it. When Memphis eventually gains sequencing capability, no architecture change is needed; the site starts feeding data through the RNA-seq encoder that was already there.",
          "The per-modality gating weights are learned and directly interpretable as importance scores: which modality drove each patient's risk prediction, morphological (WSI) or molecular (RNA-seq). Attention heatmaps on WSI patches show the model focusing on morphologically complex regions — tumor nests, areas of high cellular pleomorphism — rather than background stroma, consistent with what a pathologist would examine.",
        ],
      },
      {
        title: "Results: CHIMERA Bladder Cancer Dataset",
        paragraphs: [
          "The proof-of-concept runs on the CHIMERA Challenge Task 3 dataset: 176 bladder cancer patients, clinical features + RNA-seq, binary recurrence prediction. The heuristic-based multimodal approach stratified patients into 3 distinct risk clusters. Cluster 2 exhibited the highest recurrence risk; Kaplan-Meier survival curves show visual separation between clusters. C-index: 0.5507 — modest but expected for an unsupervised approach on a small cohort. The 42M-parameter fusion model provides the supervised learning path for larger datasets.",
          "AWS S3 was used for standardized data retrieval across federated sites. The project was built by an 11-person team using NVFlare (NVIDIA's federated learning framework) — I led the multimodal fusion technical design. The team won Best Collaboration Award, recognizing both the coordination across a large distributed team and the technical quality of the multimodal fusion architecture.",
        ],
      },
    ],
  },

  "cmv-immunology": {
    sections: [
      {
        title: "Context: ML Course Project on Real Data",
        paragraphs: [
          "This was a course project for a machine learning course. The task: implement multiple classification methods on a large, real-world dataset. Most groups worked on standard benchmarks; this project went to CellxGene and pulled the MESA (Multi-Ethnic Study of Atherosclerosis) cohort — a longitudinal cardiovascular study that happened to collect single-cell RNA-seq alongside CMV serology from thousands of donors. Real data, real class labels, real noise.",
          "Five methods were implemented (the requirement was three). The fifth method — donor-level pseudobulking — wasn't in the course syllabus but turned out to be a necessary statistical correction once the within-donor correlation structure of single-cell data became apparent.",
        ],
      },
      {
        title: "What Is CMV and Why Does It Matter Immunologically",
        paragraphs: [
          "Cytomegalovirus (CMV) is a herpesvirus that infects 40–90% of adults globally, establishing lifelong latency. While asymptomatic in most healthy individuals, CMV profoundly reshapes the immune system — chronic infection drives the expansion of highly differentiated, antigen-specific T cells and NK cells, a phenomenon linked to accelerated immune aging. Understanding the CMV immune fingerprint at single-cell resolution informs transplant risk stratification, immunotherapy design, and aging research.",
          "The specific question: given single-cell RNA-seq profiles from blood, can we predict whether a donor is CMV-positive? And which cell populations and genes carry the signal?",
        ],
      },
      {
        title: "Dataset and 5-Method Pipeline",
        paragraphs: [
          "Data comes from the MESA (Multi-Ethnic Study of Atherosclerosis) cohort — a large longitudinal cardiovascular study that collected scRNA-seq alongside CMV serology. Processed files (train.h5ad, val.h5ad in AnnData format) contain single-cell gene expression profiles with donor-level CMV status labels.",
          "Five methods were implemented in sequence. Method 1 used PCA and UMAP to validate that unsupervised clustering recovers known cell-type identities — confirming transcriptomic structure survives processing before supervised classification begins. Method 2 applied regularized logistic regression for binary CMV status prediction, surfacing individual genes whose expression predicts donor status. Method 3 used XGBoost to predict donor ethnicity from gene expression — a confound check ensuring the CMV signal isn't proxying demographic variance. Methods 4 and 5 addressed single-cell noise: cascaded Bayesian priors and donor-level pseudobulking aggregate noisy per-cell measurements into robust donor-level predictions.",
        ],
      },
      {
        title: "KLRD1, Gene Importance by Ethnicity, and NK Cell Biology",
        paragraphs: [
          "The standout finding from the logistic regression: KLRD1 (killer cell lectin-like receptor D1, also known as CD94) consistently emerged as a top predictor of CMV-positive donor status. KLRD1 is a surface marker of NKG2-expressing NK cells and effector T cells — exactly the population known to expand under chronic CMV infection. Its appearance as a leading predictor validates that the model is capturing real immunobiology, not a statistical artifact.",
          "The ethnicity classification (Method 3 — XGBoost predicting donor demographic group from gene expression) surfaced a second finding: gene importance scores differed meaningfully by ethnicity. Some genes that seemed to predict CMV status were actually proxying demographic variance. The ethnicity model exposed which features the CMV classifier should treat with skepticism. This is the less headline-grabbing result, but probably the more scientifically careful one.",
          "Donor-level pseudobulking addresses a core statistical problem in single-cell analysis: cells from the same donor are not independent observations. Standard per-cell classification inflates effective sample size and produces overconfident results. Pseudobulking — aggregating all cells from a donor into a single pseudo-sample — correctly treats each donor as the unit of analysis.",
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
        title: "The Problem: Cheap Images, Expensive Ground Truth",
        paragraphs: [
          "H&E (hematoxylin and eosin) staining is the workhorse of histopathology — cheap, fast, and routinely available. Spatial transcriptomics tells you not just what genes are expressed in a tissue, but where — which cells, which spatial niches. It's also expensive, technically demanding, and not routinely available. The premise of ALIAS: if a model can infer spatially-resolved gene expression from H&E morphology alone, spatial transcriptomics becomes accessible anywhere a microscope exists.",
          "This was the automation course project — the specific assignment was to implement active learning strategies on a real problem. Spatial transcriptomics provided a maximally hard version of the problem: the data is sparse, spatially correlated, and the most informative spots to label are not the ones standard uncertainty sampling would pick.",
        ],
      },
      {
        title: "Architecture: Multi-Head + Gradient Reversal Layer",
        paragraphs: [
          "The encoder takes H&E image patches and maps them to a shared bottleneck embedding (128→256 dimensions, scaled to accommodate the UNI vision foundation model backbone). Two heads branch from this embedding: a gene predictor trained with MSE loss on spatial gene expression values, and a domain discriminator trained with CE loss to predict which slide/batch the patch came from.",
          "The Gradient Reversal Layer (GRL) sits between the encoder and the domain discriminator. During forward pass: identity. During backprop: it negates the gradient sign before passing it to the encoder. The encoder must learn to predict gene expression well (gene predictor gradient) while simultaneously producing features that confuse the domain discriminator (reversed discriminator gradient). The result is a batch-invariant representation — features that can't be used to identify which slide preparation, staining protocol, or scanner produced the patch. Loss balance: β=1.0 between gene predictor (MSE) and domain discriminator (CE).",
        ],
      },
      {
        title: "Custom Active Learning on Spatial Data",
        paragraphs: [
          "Standard uncertainty sampling selects the samples a model is least confident about. On spatial transcriptomics, this fails: spots are spatially autocorrelated — the model's uncertainty at one spot is highly predictive of its uncertainty at neighboring spots. Querying nearby uncertain spots is redundant; you spend your annotation budget on correlated samples that teach the model nothing new.",
          "ALIAS implements custom active learning strategies that query spots which are both uncertain AND spatially diverse — maximizing expected information gain per annotation. The course context was specifically about extending AL theory to non-standard settings, and designing a query strategy for spatially structured data with extreme sparsity was the novel contribution.",
        ],
      },
      {
        title: "The Data Quality Breakthrough",
        paragraphs: [
          "Initial performance was very poor (PCC ~0.018). The investigation: many target genes were expressed in fewer than 1% of spots — effectively zero signal for the model to learn from, just noise. The fix was data-centric rather than architecture-centric: restrict gene selection to genes with >20% occupancy across all spots.",
          "This single change moved average non-zero occupancy from 42% to 78% and minimum occupancy from 0.16% to 24%. It also eliminated the need for 'stability hacks' — target clipping, tiny loss weights, aggressive regularization — that had been papering over the signal quality problem. The model became fundamentally more robust once the targets had real signal.",
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
