# ALIAS — Invariance-Aware Active Learning for Label-Efficient Spatial Gene Expression Prediction
*(Also referred to as Inv-SHAF — Invariant Spatial Histology Analysis Framework)*

**Course:** Automation course with heavy focus on active learning  
**Team:** Shreyan Nalwad (primary developer), Dylan Setiawan (collaboration)  
**Status:** Research prototype — one of Shreyan's favourite projects, developed mostly solo

---

## High-Level Summary

ALIAS predicts spatial gene expression from low-cost, standard H&E histology images — bridging the gap between cheap morphology staining and expensive spatial transcriptomics. The core research challenge: H&E images are routine and cheap; spatially-resolved gene expression is not. If a model can learn to infer *where* and *how much* each gene is expressed from pure image appearance, spatial transcriptomics can be applied far more widely.

Two key ideas drive the architecture:
1. **Domain adversarial training** (Gradient Reversal Layer) to remove batch effects — making predictions invariant to slide preparation, staining protocol, and scanner differences
2. **Active learning** on a uniquely complex data type — spatial transcriptomics spots are noisy, sparse, and have structured spatial correlations that make standard AL strategies suboptimal

---

## Architecture: Multi-Head + Gradient Reversal

```
H&E Patch
    │
[Encoder (vision backbone)]
    │
[Shared bottleneck embedding]
    ├── [Gene Predictor Head]  →  predicted spatial gene expression (MSE loss)
    └── [Domain Discriminator Head]  →  predicts slide/batch origin (CE loss)
              ↑
     [Gradient Reversal Layer]  ← reverses gradient sign during backprop
```

The Gradient Reversal Layer (GRL) is the core of the invariance mechanism: during forward pass it acts as identity; during backprop it negates gradients flowing to the encoder. This forces the encoder to learn features that are *maximally confusing* for the domain discriminator — i.e., features that cannot be used to identify which slide/batch a patch came from. The result is a representation invariant to batch effects, so the gene predictor sees only biology.

**Loss:** `L_total = L_gene_predictor (MSE) - β × L_domain_discriminator (CE)`, balanced at `β = 1.0`

---

## Active Learning Strategy on Spatial Data

Standard active learning selects uncertain samples for labeling. On spatial transcriptomics, standard uncertainty sampling fails because:
- Spots are spatially correlated — selecting nearby spots is redundant
- Gene expression is highly sparse (some genes expressed in <1% of spots)
- The informativeness of a spot depends on its spatial neighborhood

ALIAS implements custom active learning strategies that account for spatial structure, querying spots that are both uncertain AND spatially diverse — maximizing information gain per annotation budget. The course context was specifically about applying and extending AL concepts to non-standard problem settings, and spatial transcriptomics provided a maximally challenging one.

---

## Key Performance Breakthrough: Data-Centric Fix

Initial performance was very poor (PCC ~0.018). The cause: ultra-sparse gene targets.

**Problem:** Many genes expressed in <1% of spots. Models can't learn signal from near-zero targets.  
**Fix:** Restrict gene selection to genes with **>20% occupancy** across all spots.

| Metric | Before | After |
|--------|--------|-------|
| Avg non-zero occupancy | 42% | **78%** |
| Min occupancy | 0.16% | **24%** |

This data-centric approach eliminated the need for "stability hacks" (target clipping, tiny loss weights) and made the model fundamentally more robust.

**Additional architecture refinements after data fix:**
- Bottleneck dimension: 128 → 256
- Hidden dimensions doubled (→ 128)
- Learning rate: lowered to 5e-4 for smoother convergence
- Gradient clipping: max_norm=1.0 (GRL instability)
- Removed redundant target clipping

---

## Tech Stack

- PyTorch (model + training)
- Spatial transcriptomics data (H&E patches + gene expression spot measurements)
- Domain adversarial training (GRL implementation)
- Active learning loop (custom query strategies)
- UNI (vision foundation model) as encoder backbone — high-dimensional features requiring architecture scaling

---

## Why This Project Stands Out

"It was fascinating to apply active learning concepts and cook up new strategies, develop new model architecture to support this on data as complicated as spatial transcriptomics." — Shreyan

The combination of: (1) genuinely difficult data, (2) custom active learning strategy design, (3) adversarial domain invariance, and (4) discovering and solving a data quality problem empirically makes this one of Shreyan's top 3 projects despite being a course project.
