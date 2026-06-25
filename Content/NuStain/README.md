# NuStain — Virtual Staining for Expansion Microscopy

**Lab:** Zhao Biophotonics Lab, Carnegie Mellon University  
**Protocol:** MAGNIFY (Nature-published expansion microscopy)  
**Task:** Predict functional fluorescent markers from structural stain (NHS)  
**Models:** NAFNet regression + DDPM (Conditional Diffusion)

---

## Scientific Premise

Conventional light microscopy is bounded by the diffraction limit (~200nm for visible light) — structures smaller than that blur together regardless of magnification. MAGNIFY fights this by physically expanding tissue 4–10× before imaging: the expansion is isotropic, so sub-diffraction structures become resolvable with standard confocal optics. No exotic nanoscopy hardware required.

NuStain adds the next layer: fighting the multiplexing limit. Fluorescent multiplexing allows high-resolution spatial biology, but antibody cross-reactivity and imaging time limit simultaneous channels. NuStain bypasses this by predicting target channels computationally from NHS (a ubiquitous structural protein stain mapping cell/tissue boundaries) — one imaging pass, virtual panel.

| Input | Target Channels (Kidney) | Target Channels (Brain) |
|-------|--------------------------|-------------------------|
| NHS structural stain | ACTN4, C3, IGG, C1Q | GFP, TRITC |

- **ACTN4** (Actinin-4): podocyte injury marker
- **C3** (Complement C3): glomerular immune-complex deposition
- **GFP/TRITC**: brain marker channels

---

## Repository Architecture (Factory-Dispatch Pattern)

```
NuStain/
├── src/data/         # Dataloader factories — dispatched via config.data.tissue
├── src/models/       # nafnet + diffusion architectures — dispatched via config.model.type
├── src/engine/       # NuStainTrainer (regression) + DiffusionTrainer (generative)
├── scripts/          # Thin CLI entry points: train.py, evaluate.py, predict.py
├── configs/          # YAML experiment configs per tissue/model
└── Data/             # Flat-file atomic .npy training patches
```

**Extension protocol:** Add new tissue → `src/data/<tissue>/dataloader.py` + dispatch entry in `src/data/__init__.py`. Add new model → `src/models/<model>/` + dispatch entry. Never modify main scripts; logic belongs in `src/`.

---

## Core Commands

```bash
# Patching (kidney)
/home/WS_Tiger/miniconda3/envs/nustain/bin/python scripts/kidney/patch.py

# Training
conda run -n nustain python scripts/train.py --config configs/kidney/actn4_baseline.yaml

# Evaluation
conda run -n nustain python scripts/evaluate.py \
  --config configs/kidney/actn4_baseline.yaml \
  --checkpoint checkpoints/kidney/actn4_baseline/best_model.ckpt

# Inference from patches
python scripts/predict.py --config ... --checkpoint ... --patches_dir Data/Kidney/patches --output_dir outputs/kidney/actn4_inference

# Inference from raw .nd2
python scripts/predict.py --config ... --checkpoint ... --nd2_path Data/Kidney/raw/slide.nd2 --nhs_channel 0 --output_dir outputs/kidney/slide_inference

# Re-stitch without re-inferring
python scripts/restitch.py
```

**Multi-GPU Brain Training (always pin GPU per job):**
```bash
CUDA_VISIBLE_DEVICES=0 conda run -n nustain python scripts/train.py --config configs/brain/gfp_baseline.yaml
CUDA_VISIBLE_DEVICES=1 conda run -n nustain python scripts/train.py --config configs/brain/tritc_baseline.yaml
```
Use batch_size=16 per single GPU (DataParallel previously split 32 across 2 GPUs). Always confirm `nvidia-smi | grep MiB` shows ~18 MiB idle before launching.

---

## Key Design Decisions & Pivots

### 1. Decoupled CLI Engine (not Streamlit inline)
Spawning GPU training from web app servers → zombie processes + crash dependencies. Keep training/preprocessing in headless CLI scripts. UI is for downstream preview and predictions only.

### 2. High-Density 3D Spatial Pipeline (80× data diversity)
- **Before:** 3 evenly spaced Z-slices, stride 256 (sparse)
- **After:** every 5th Z-slice, stride 64, 75% overlap (dense)
- Successive Z-slices contain genuine 3D structural diversity — not duplicates. Dense sampling + overlap = 80× more data without new acquisitions.
- Preprocessing per slice: Gaussian denoise σ=1.5, rolling_ball BG subtract r=50, percentile normalize.

### 3. Multi-GPU DataParallel with Clean Checkpoint Keys
Automatic `module.` prefix stripping/adding in `_load_checkpoint()` — checkpoints stay portable between single-GPU and DataParallel runs. batch_size=16 per GPU (not 32).

### 4. Sigmoid over Clamp (critical for NAFNet)
Never `clamp(0,1)` on regression outputs — creates zero gradients and mosaic/tiled artifacts in predictions. Always project via `torch.sigmoid` for clean gradient flow.

### 5. Coordinate-Level Dataset Splits (not patch-index)
Split on `(base_name, Y, X)` physical coordinates, not random patch index. Correlated Z-slices from same physical location stay grouped — prevents validation score inflation.

### 6. Target File Existence Check (O(1) in-memory)
Load all target channel files into a Python `set` before caching patch keys. Avoids per-patch `os.path.exists()` calls on 150k+ patches. `if base_f in target_files` → O(1) lookup.

---

## Evaluation Metrics

| Metric | What It Measures |
|--------|-----------------|
| MAE | Mean absolute pixel error |
| PSNR (dB) | Signal-to-noise reconstruction quality |
| SSIM | Structural similarity (luminance, contrast, structure) |
| Edge Corr | Pearson r on Sobel gradient magnitudes — edge/structure fidelity |
| F-IoU@90 | IoU of foreground masks at 90th-percentile GT threshold — spatial precision of bright regions |

Stitch visualization output: labeled 4-column PNG `[NHS | GT | Prediction | Overlay]`. Overlay: yellow = missed GT, magenta = false positive, white = match.

---

## Architecture Ablation (NAFNet variants on ACTN4)

5 configs: base, small, shallow, deep, large — in `configs/kidney/ablation/`.  
Orchestrator: `scripts/kidney/run_ablation.py` (resume-safe, state in `checkpoints/kidney/ablation/state.json`)  
Tracked on WandB project: `NuStain_Ablation`. Run naming: `[Model]_[Tissue]_[Input]_to_[Target]_[Details]`.

---

## Current Training State (as of May 2026)

**Golden Baseline:** ACTN4 epoch 1569 val_loss 0.1953; C3 epoch 1048 val_loss 0.1162.

Active tmux sessions:
- `nustain_actn4` (GPU 0): ACTN4 baseline, running to 3000 epochs, patience=500
- `nustain_c3` (GPU 1): C3, warm-started from ACTN4 `last_model.ckpt`, 3000 epochs
- `nustain_actn4_infer` (GPU 0): Full-patch ACTN4 inference → `outputs/kidney/actn4_inference/`
- `nustain_c3_infer` (GPU 1): C3 inference → `outputs/kidney/c3_inference/`

Always use absolute python path in tmux: `/home/WS_Tiger/miniconda3/envs/nustain/bin/python` (prevents SIGHUP, avoids conda stdout buffering).

Pending after ablation/inference: resume IGG (ep 104, val=0.143) and C1Q (ep 251, val=0.035).

---

## PyTorch / Safety Constraints

- `torch.load(..., weights_only=False)` — needed to safely unpickle `DotDict` config from checkpoints (PyTorch 2.6+)
- `sys.path.insert(0, ...)` at top of every script in `scripts/` — Python adds script dir, not project root, to sys.path when running directly
- WandB: always pass `step=epoch` in every `wandb.log()` call — otherwise fractional step drift misaligns charts
- Test data: `Data/Kidney/patches_test/` — 147,622 NHS + 147,622 ACTN4 patches from 11 slides. Channel correction applied: 20240523 cohort had NHS↔ACTN4 physically swapped (fixed by renaming patches).
