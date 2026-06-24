"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Layer {
  hex:      string;
  label:    string;
  sublabel: string;
  console:  string;
  color:    string;
}

const LAYERS: Layer[] = [
  {
    hex:      "0x01",
    label:    "Generative Vision",
    sublabel: "NuStain · DDPM · FiLM-conditioning",
    color:    "#00E5FF",
    console:
`> process: nustain_inference.py
> task: virtual fluorescence multiplexing
> arch: FiLM-conditioned DDPM, 8M params
> input:  single_channel_brightfield.tif
> output: [DAPI] [GFP] [mCherry] ... [DONE]
> reagent_cost_reduction: ~80%
> lab: Zhao Biophotonics · CMU`,
  },
  {
    hex:      "0x02",
    label:    "Clinical Inference",
    sublabel: "CerviAI · YOLOv11 · Jetson Orin Nano",
    color:    "#FACC15",
    console:
`> process: cerviai_pipeline.py
> stages: detect → classify → segment
> precision: 90.0%
> recall_delta: +10x vs baseline
> latency: 500s → 80s (Jetson Orin Nano)
> active_learning: pathologist_oracle [ON]
> collab: Vyuhaa Med Data`,
  },
  {
    hex:      "0x03",
    label:    "Graph Intelligence",
    sublabel: "MitoGraph · GATv2Conv · LLM embeddings",
    color:    "#00E5FF",
    console:
`> process: mitograph_predict.py
> graph: 3,439 variants | 808 phenotypes
> node_types: variant, gene, phenotype, pathway
> model: GATv2Conv 8-head 64-dim
> test_AUPRC: 0.830  test_AUROC: 0.789
> dashboard: mitomap-app.vercel.app [LIVE]`,
  },
  {
    hex:      "0x04",
    label:    "Spatial Systems",
    sublabel: "SPARTA · MUFFLE · MALDI-MSI",
    color:    "#FACC15",
    console:
`> process: sparta_colocalize.py
> modality: MALDI-MSI metabolite ratio maps
> metabolites_mapped: 100+
> tumor_boundary_segmentation: [OK]
>
> process: muffle_federated.py
> fusion: WSI + RNA-seq gated attention
> framework: NVFlare multi-site
> award: Best_Collaboration [RECEIVED]`,
  },
];

const SPRING = { type: "spring" as const, stiffness: 320, damping: 32 };

export default function DomainStack() {
  const [active, setActive] = useState(0);

  return (
    <section className="border-b border-[#27272a] bg-[#09090B] px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="mb-8 font-mono text-xs tracking-widest text-white/20">
          {"// DOMAIN_STACK :: hover a layer to inspect"}
        </p>

        <div className="grid gap-4 lg:grid-cols-[1fr_1fr] lg:gap-6 items-start">

          {/* ── Stack layers ── */}
          <div className="space-y-2">
            {LAYERS.map((layer, i) => (
              <motion.button
                key={layer.hex}
                onHoverStart={() => setActive(i)}
                onClick={() => setActive(i)}
                animate={{ borderColor: active === i ? layer.color : "#27272a" }}
                transition={SPRING}
                className="w-full rounded-sm border bg-[#0c0c0f] px-5 py-4 text-left"
                style={{ borderStyle: "solid", borderWidth: "1px" }}
              >
                <div className="flex items-baseline gap-3">
                  <motion.span
                    animate={{ color: active === i ? layer.color : "#52525b" }}
                    transition={SPRING}
                    className="font-mono text-[11px]"
                  >
                    [{layer.hex}]
                  </motion.span>
                  <motion.span
                    animate={{ color: active === i ? "#ffffff" : "#71717a" }}
                    transition={SPRING}
                    className="font-mono text-sm font-semibold"
                  >
                    {layer.label}
                  </motion.span>
                </div>
                <motion.p
                  animate={{ color: active === i ? layer.color + "88" : "#3f3f46" }}
                  transition={SPRING}
                  className="mt-1 font-mono text-[10px]"
                >
                  {layer.sublabel}
                </motion.p>
              </motion.button>
            ))}
          </div>

          {/* ── Console panel ── */}
          <div className="rounded-sm border border-[#27272a] bg-[#040406] p-5 min-h-[210px] lg:min-h-[260px]">
            <div className="mb-3 flex items-center gap-2 font-mono text-[10px] text-white/20">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
              ACTIVE_CONSOLE :: layer_{LAYERS[active].hex}
            </div>

            <AnimatePresence mode="wait">
              <motion.pre
                key={active}
                className="whitespace-pre-wrap font-mono text-[11px] leading-[1.75]"
                style={{ color: LAYERS[active].color }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={SPRING}
              >
                {LAYERS[active].console}
              </motion.pre>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
