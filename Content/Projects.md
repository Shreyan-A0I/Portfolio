# Project Index

High-level one-liners for all projects. See individual project folders for details.

## Active Research

**NuStain** — NAFNet regression (primary) + DDPM (generative alternative) for virtual fluorescence multiplexing at Zhao Biophotonics Lab (CMU). Built on MAGNIFY, the lab's Nature-published expansion microscopy protocol. Predicts fluorescent marker channels (ACTN4, C3, IGG, C1Q in kidney; GFP, TRITC in brain) from a single NHS structural stain. 80× data diversity from dense Z-stack pipeline.

**CerviAI** — YOLOv7→YOLOv11 cervical cancer detection pipeline on clinical-grade WSI. 90% precision, 10× recall improvement. Edge-deployed on Jetson Orin Nano (500s→80s latency). Built end-to-end at Vyuhaa Med Data; active learning loop with pathologist oracle.

**Inv-SHAF** — Domain-adversarial active learning for spatial gene expression prediction from H&E histology. Gradient Reversal Layer for batch effect removal; custom active learning strategy for spatial structure; gene occupancy filtering raised non-zero coverage 42%→78%. UNI backbone.

## Completed / Shipped

**MitoGraph** — GATv2Conv + heterogeneous Knowledge Graph for mitochondrial VUS pathogenicity prediction. 0.830 AUPRC, 1,228 VUS across 808 phenotypes. Live dashboard: mitomap-app.vercel.app

**spotNUMT** — CNN + BiLSTM for mtDNA vs NuMT sequence classification under class imbalance. AUPRC-optimized. Gradio interface on HuggingFace.

**MUFFLE** — NVIDIA federated learning biohackathon. NVFlare pipeline fusing WSI + RNA-seq encoders via gated attention for cancer risk stratification. Best Collaboration Award. (CHIMERA was the dataset used — not the event name.)

**SPARTA** — Streamlit tool for MALDI-MSI spatial metabolomics. Intensity-weighted centroid alignment, log₂ co-localization, tumor boundary detection. 100+ metabolites.

**Hybrid CNN+ViT for Diabetic Retinopathy** — Sequential CNN→ViT architecture for DR grading. 87% accuracy. First-author publication at Com-IT-Con 2024 (Taylor & Francis).

**Influenza VAR** — VAR + Granger Causality + IRF pipeline for flu-weather dynamics. Python preprocessing, Go backend, Shiny frontend. Wind speed Granger-causes Influenza B in Qatar (p < 0.05).

**This For That** — Sustainable food alternative recommendation app. K-Means clustering on nutritional + environmental profiles across 4 axes (carbon, water, land use, biodiversity). Live: thisorthatfood.netlify.app

**CMV Immune Fingerprint** — ML course project on MESA cohort scRNA-seq from CellxGene. KLRD1 as top CMV predictor; XGBoost ethnicity confound check; donor-level pseudobulking.

## Hackathons / Competitions

**AWAP 2026** — 3rd place (~80 teams) at CMU's AWAP programming competition. Built multi-agent Overcooked solver: Hungarian algorithm for task assignment, Johnson's for distance lookups, custom BFS, sabotage module. No RL or neural nets — pure graph theory and resource allocation.

**Personal Website** — This portfolio. TypeScript + Next.js + Tailwind.
