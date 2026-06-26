# Shreyan Balaji Nalwad — Personal Profile

*Reference document for portfolio, cover letters, and personal writing. Add to this over time.*

---

## Identity

- **Full name:** Shreyan Balaji Nalwad
- **Current location:** Pittsburgh, PA (CMU) / Hyderabad, India (home)
- **Email:** shreyan.nalwad@gmail.com | snalwad@andrew.cmu.edu
- **GitHub:** [Shreyan-A0I](https://github.com/Shreyan-A0I)
- **LinkedIn:** [shreyan-nalwad](https://linkedin.com/in/shreyan-nalwad)

---

## Education

| Degree | Institution | Period |
|--------|-------------|--------|
| MS Computational Biology | Carnegie Mellon University | 2025 – Dec 2026 (expected) |
| B.Tech Computer Science & Bioinformatics | Vellore Institute of Technology | 2021 – 2025 |

---

## The Origin Story

Both parents are doctors — mother is a cancer pathologist, father is a laparoscopic gynecologist. Growing up, biology wasn't abstract; it was dinner-table conversation. When Shreyan found computation, he found a second lens for the same kind of problems: high-stakes, complex data, real consequences.

He stays in comp bio because the data is unlike anything else in ML. Metabolite maps of tumor boundaries, mitochondrial variant phenotype signatures, diffusion models synthesizing stains that don't physically exist yet. These problems demand domain respect alongside engineering rigor. There's also a longer arc: high-impact work in cancer detection or drug discovery is a future he's drawn to.

In his own words: *"I like comp bio because I get to deal with complex data and fascinating problems which are very unique to bio."*

---

## Work Experience

### Research Assistant — Zhao Biophotonics Lab, CMU (Jan 2026 – present)
- Building **NuStain**: virtual fluorescence multiplexing on MAGNIFY expansion microscopy protocol
- Primary model: NAFNet regression; DDPM (diffusion) explored as generative alternative
- Predicts fluorescent marker channels from NHS structural stain alone (one imaging pass → full multiplexed panel)
- Goal: circumvent the multiplexing limit the way MAGNIFY circumvents the diffraction limit

### AI Integration Engineer — Vyuhaa Med Data, Hyderabad (internship: ~2025, continued remotely)
*(Vyuhaa's mission: digitize pathology and enhance it with AI)*

**CerviAI — Cervical Cancer Detection Pipeline** (Shreyan's main ownership):
- End-to-end responsibility: dataset curation → model training → multi-pass inference pipeline
- Pipeline stages: detection (YOLOv11 on WSI) → segmentation → classification
- 90% precision, 10× recall improvement over baseline
- Deployed on Jetson Orin Nano; cut inference latency 6× (500s → 80s)

**Live WSI Microscope Scanner (prototype):**
- Co-built with a coworker who handled robotics (slide movement, stitching algorithm, arm mechanics)
- Shreyan owned all software: CerviAI pipeline + live inference running *concurrently while the slide was being captured*
- Collaboration with CTO (CS mentorship: modularity, unit testing, "show don't tell") and an in-house pathologist
- First time seeing AI deployed in a real clinical context
- First time witnessing a full product built both software and hardware side
- Knowledge transfer to a junior engineer before leaving for CMU masters

*Key lessons from Vyuhaa: The importance of modularity and unit testing. Showing is better than telling. Strategising and communicating ideas clearly with CTO and domain expert pathologist.*

---

## Research & Publications

- **First-author:** Hybrid CNN + Vision Transformer for diabetic retinopathy grading. Published at Com-IT-Con 2024 (Taylor & Francis). 87% accuracy.

---

## Technical Philosophy

- Follows the interesting problem wherever it goes — ended up in graph ML because biology is full of relational structure; keeps gravitating to computer vision without planning to
- Loves interdisciplinary collaboration (Vyuhaa-style: AI + medical hardware + clinical domain)
- Drive is to make things useful — "making AI useful for everyone" — not just publishing
- CS-first instinct: "I like graphs, let's see where I can apply or explore cool concepts in bio"
- Values: modularity, showing over telling, bridging the lab → product gap

---

## Core Technical Domains

- **Generative AI** — DDPM, FiLM conditioning, virtual staining (NuStain)
- **Computer Vision** — YOLOv11, ViT, WSI analysis, multi-pass pipelines (CerviAI, Diabetic Retinopathy)
- **Graph ML** — GATv2Conv, heterogeneous KGs, LLM embeddings (MitoGraph)
- **Edge Inference** — Jetson Orin Nano, TensorRT, latency optimization
- **Spatial Omics** — MALDI-MSI, MALDI-MSI ratio maps, co-localization (SPARTA)
- **Federated Learning** — NVFlare, multimodal WSI + RNA-seq fusion (MUFFLE)
- **Sequence ML** — NUMT detection, DNA analysis (spotNUMT)
- **Causal Inference** — VAR modeling, Granger causality (Flu-Var)

---

## Projects (Quick Reference)

| Project | What | Key Number |
|---------|------|-----------|
| NuStain | DDPM virtual fluorescence multiplexing | ~80% reagent cost reduction potential |
| CerviAI | YOLOv11 cervical cancer WSI pipeline | 90% precision, 10× recall |
| MitoGraph / Mitomap | GATv2 mitochondrial VUS pathogenicity | AUPRC 0.830, [live app](https://mitomap-app.vercel.app/) |
| SPARTA | MALDI-MSI metabolic spatial mapping | 100+ metabolites, tumor boundary segmentation |
| MUFFLE | Federated learning WSI + RNA-seq (NVIDIA biohackathon) | Best Collaboration Award |
| AWAP 2026 | Multi-agent Overcooked solver (CMU competition) | 3rd / ~80 teams |
| This For That | Sustainable food alternatives app | [live](https://thisorthatfood.netlify.app/) |
| spotNUMT | NUMT detection tool | [HuggingFace space](https://huggingface.co/spaces/shwew/spotNUMT) |
| INV-SHAF | Invariant Spatial Histology Analysis Framework | collab w/ Dylan Setiawan |
| Flu-Var | VAR/Granger influenza causal analysis | Wind speed Granger-causes Influenza B in Qatar (p<0.05) |
| Diabetic Retinopathy | CNN + ViT grading | 87% accuracy, first-author pub |

---

## Personality & Hobbies

- **Running** — regular
- **Chess** — plays
- **Cooking** — enjoys
- **Reading** — occasional
- **Anime** — watches
- **Sports:** Heavy F1 fan; getting into NBA

Communication style: direct, strategic, prefers showing over explaining. Collaborative instinct — strong ability to bridge technical and domain-expert stakeholders (learned at Vyuhaa).

Wide-ranging curiosity — similar breadth in hobbies as in technical domains.

---

## Goals & What Drives Him

Short-term: deepen research at the intersection of generative AI and microscopy/pathology imaging at CMU.

Long-term: high-impact work — cancer detection, drug discovery, or similar areas where computational biology can change outcomes for patients. Currently more on the CS/compute side and feels the pull toward making AI genuinely useful in clinical settings (not just benchmark-accurate).

Open to: interdisciplinary collaborations, research with real clinical translation, projects at the edge of biology and inference.

---

## Voice / How He Talks About His Work

- Grounded, not overclaiming
- Draws connections between domains naturally ("I like graphs, let me see where I can apply them in bio")
- Warm but focused — collaborative instinct, always learning
- Fascinated by complexity but outcome-oriented
- Doesn't separate the tool from the context it operates in

---

*Last updated: June 2026 — add new projects, publications, and experiences as they happen.*
