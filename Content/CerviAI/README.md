# CerviAI — Cervical Cancer Detection Pipeline

**Organization:** Vyuhaa Med Data, Hyderabad  
**Role:** End-to-end development, sole engineer on the AI pipeline  
**Collaborators:** Coworker (hardware/robotics side), CTO (technical mentorship), in-house pathologist (clinical domain expert)  
**Status:** Ongoing (shipped to prototype hardware, knowledge transferred to junior engineer before leaving for CMU)

---

## High-Level Summary

CerviAI is a multi-stage, end-to-end deep learning pipeline for automated cervical cancer detection on clinical-grade Whole Slide Images (WSI). It was built as part of a broader prototype: a live WSI microscope scanner that physically captures slides while CerviAI runs inference *concurrently* — detecting suspicious cervical cells in near real-time as the image is being acquired.

The project is motivated by the accessibility gap in cervical cancer screening. Pap smear cytology review is labor-intensive, requires skilled pathologists, and introduces significant inter-observer variability. An automated pipeline that runs on low-cost edge hardware can extend screening capacity to high-volume or resource-limited settings.

---

## Technical Architecture

### Multi-Pass Pipeline

CerviAI uses a 3-stage cascade, where each stage narrows the search space for the next:

```
WSI Input
   │
   ▼
[Stage 1: Detection]
   YOLOv11 sliding window over WSI tiles
   → Identifies candidate regions containing abnormal cells
   → Outputs bounding boxes with confidence scores
   │
   ▼
[Stage 2: Patch Centering + Classification]  
   Crops tight patches centered on each detection
   → Removes irrelevant background context
   → Classifier scores each candidate, prunes low-confidence regions
   │
   ▼
[Stage 3: Segmentation]
   Runs only on high-confidence surviving patches
   → Instance segmentation of individual abnormal cells
   → Final output: segmented cell regions with classification labels
```

This cascade matters for latency: the detection stage prunes ~95% of slide area, so segmentation (the most expensive stage) only processes a small fraction of the slide.

### YOLOv7 → YOLOv11 Migration

The original pipeline used YOLOv7. The migration to YOLOv11 was not a version bump — it required re-engineering:
- Data loading pipeline (new format expectations)
- Anchor configuration
- Post-processing and NMS thresholds
- Training configuration

**Results of migration:**
- Precision: improved to **90%**
- Recall: **10× improvement** over YOLOv7 baseline
- The recall improvement is clinically significant: false negatives (missed abnormal cells) carry higher risk than false positives

### Edge Deployment: Jetson Orin Nano

The full 3-stage pipeline runs on **NVIDIA Jetson Orin Nano** — roughly the cost and size of a paperback book. Key optimization work:
- Eliminated repeated OpenSlide file handle initializations (original code reopened handles on every tile access)
- Parallelized patch extraction across CPU cores
- **Result: 500s → 80s latency per slide (6× reduction)**

This brings single-slide inference under the threshold for practical clinical use during a scanning session.

### Live Concurrent Inference

The defining feature of the full product: CerviAI runs *while the scanner is still capturing the slide*. The scanner's arm moves across the glass, stitches tiles, and feeds them to the pipeline. CerviAI processes tiles as they arrive, flagging suspicious regions before the scan completes. This required careful buffer management and pipeline parallelism to avoid inference falling behind image capture.

---

## Active Learning Loop

A deployed model degrades as clinical data drifts — new staining protocols, different labs, scanner firmware updates. The active learning loop addresses this:

1. **Uncertainty identification:** The model flags cases where it's uncertain (low max softmax confidence, or disagreement between stages)
2. **Pathologist oracle review:** An in-house pathologist reviews flagged cases and provides labels
3. **Automated batch generation:** Labels automatically convert into new training batches
4. **Continuous retraining:** Model stays current without large-scale periodic relabeling campaigns

This made the annotation pipeline continuous rather than one-off.

---

## Project Context

- Shreyan owned all software; a separate coworker handled the mechanical/robotics side (slide movement, stitching algorithm, robotic arm control)
- Regular collaboration with CTO (technical mentorship: modularity, unit testing, code quality standards) and the in-house pathologist (domain grounding: what matters clinically, what to annotate, how to evaluate)
- First time Shreyan saw AI deployed in a real clinical context
- First time seeing a software + hardware product built end-to-end as a functioning prototype
- Knowledge transfer completed to a junior engineer before leaving for CMU

---

## Tech Stack

| Component | Technology |
|-----------|------------|
| Detection | YOLOv11 (PyTorch) |
| Segmentation | Custom segmentation head (PyTorch) |
| WSI I/O | OpenSlide |
| Edge deployment | NVIDIA Jetson Orin Nano |
| Inference optimization | Parallelized patch extraction, persistent file handles |
| Active learning | Custom annotation pipeline → training batch generator |
| Language | Python |

---

## Key Numbers

| Metric | Value |
|--------|-------|
| Precision | 90% |
| Recall improvement | 10× over YOLOv7 baseline |
| Latency (full pipeline) | 80s per slide (from 500s) |
| Speedup | 6× |
| Deployment target | Jetson Orin Nano |
