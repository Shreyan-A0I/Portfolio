"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const BIO     = "#00E5FF";
const COMP    = "#d4a053";
const WARM    = "#c4a46b";
const NEUTRAL = "#5e5e68";

// edge color: if either node is BIO (and the other isn't COMP), use BIO;
// if either is COMP (and the other isn't BIO), use COMP; else neutral
function edgeColor(c1: string, c2: string): string {
  if (c1 === c2) return c1;
  if ((c1 === BIO  && c2 !== COMP) || (c2 === BIO  && c1 !== COMP)) return BIO;
  if ((c1 === COMP && c2 !== BIO)  || (c2 === COMP && c1 !== BIO))  return COMP;
  return NEUTRAL;
}

function curve(x1: number, y1: number, x2: number, y2: number): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  return `M ${x1} ${y1} Q ${mx.toFixed(1)} ${(my - dist * 0.09).toFixed(1)} ${x2} ${y2}`;
}

const NODES = [
  // ── Biology cluster (left, cyan) ──
  { id: "clinical",  label: "Clinical Imaging",   sub: "WSI · histopathology",     x: 155, y: 118, color: BIO,  tier: "bio"  },
  { id: "spatial",   label: "Spatial Biology",    sub: "MALDI · transcriptomics",  x: 155, y: 308, color: BIO,  tier: "bio"  },
  // ── Compute cluster (right, amber) ──
  { id: "graphml",   label: "Graph ML",           sub: "GATv2 · knowledge graphs", x: 565, y: 118, color: COMP, tier: "comp" },
  { id: "federated", label: "Federated Learning", sub: "NVFlare · multi-site",     x: 565, y: 308, color: COMP, tier: "comp" },
  // ── Intersection (center) ──
  { id: "genai",     label: "Generative AI",      sub: "DDPM · NAFNet",            x: 258, y: 208, color: BIO,  tier: "mix"  },
  { id: "cv",        label: "Computer Vision",    sub: "YOLO · ViT",               x: 462, y: 208, color: COMP, tier: "mix"  },
  { id: "edge",      label: "Edge Inference",     sub: "Jetson · TensorRT",        x: 360, y: 108, color: WARM, tier: "mix"  },
  { id: "al",        label: "Active Learning",    sub: "GRL · spatial AL",         x: 293, y: 348, color: BIO,  tier: "mix"  },
  { id: "seq",       label: "Sequence ML",        sub: "CNN-BiLSTM · DNA",         x: 427, y: 348, color: COMP, tier: "mix"  },
];

const EDGES: [string, string][] = [
  ["clinical",  "genai"     ],
  ["clinical",  "cv"        ],
  ["clinical",  "edge"      ],
  ["genai",     "cv"        ],
  ["genai",     "spatial"   ],
  ["cv",        "edge"      ],
  ["cv",        "federated" ],
  ["cv",        "al"        ],
  ["spatial",   "al"        ],
  ["graphml",   "seq"       ],
  ["graphml",   "cv"        ],
  ["federated", "edge"      ],
  ["al",        "seq"       ],
];

function labelPos(id: string, x: number, y: number) {
  if (id === "clinical" || id === "spatial")
    return { lx: x - 15, ly: y, sx: x - 15, sy: y + 13, anchor: "end" as const };
  if (id === "graphml" || id === "federated")
    return { lx: x + 15, ly: y, sx: x + 15, sy: y + 13, anchor: "start" as const };
  if (id === "al" || id === "seq")
    return { lx: x, ly: y + 19, sx: x, sy: y + 31, anchor: "middle" as const };
  // genai, cv, edge — above
  return { lx: x, ly: y - 17, sx: x, sy: y - 6, anchor: "middle" as const };
}

export default function ConstellationGraph() {
  const [hovered, setHovered] = useState<string | null>(null);
  const nodeById = (id: string) => NODES.find((n) => n.id === id)!;

  const isEdgeLit = (f: string, t: string) =>
    !hovered || f === hovered || t === hovered;
  const isNodeLit = (id: string) =>
    !hovered ||
    id === hovered ||
    EDGES.some(([f, t]) => (f === hovered && t === id) || (t === hovered && f === id));

  return (
    <svg
      viewBox="0 0 720 430"
      className="w-full select-none"
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      {/* Faint cluster labels */}
      <text x="155" y="44" textAnchor="middle" fill={BIO} fillOpacity={0.07}
        fontSize={30} fontFamily="ui-monospace,monospace" fontWeight="700" letterSpacing="0.25em">
        BIOLOGY
      </text>
      <text x="565" y="44" textAnchor="middle" fill={COMP} fillOpacity={0.07}
        fontSize={30} fontFamily="ui-monospace,monospace" fontWeight="700" letterSpacing="0.25em">
        COMPUTE
      </text>

      {/* Edges */}
      {EDGES.map(([f, t], i) => {
        const n1 = nodeById(f);
        const n2 = nodeById(t);
        const lit = isEdgeLit(f, t);
        const stroke = edgeColor(n1.color, n2.color);
        return (
          <motion.path
            key={`${f}-${t}`}
            d={curve(n1.x, n1.y, n2.x, n2.y)}
            fill="none"
            stroke={stroke}
            strokeWidth={lit && hovered ? 1.6 : 0.9}
            initial={{ opacity: 0 }}
            animate={{ opacity: lit ? (hovered ? 0.6 : 0.17) : 0.04 }}
            transition={{ duration: 0.7, delay: 0.1 + i * 0.05 }}
            style={{ transition: "stroke-width 200ms" }}
          />
        );
      })}

      {/* Nodes */}
      {NODES.map((node, i) => {
        const lit = isNodeLit(node.id);
        const isActive = hovered === node.id;
        const lp = labelPos(node.id, node.x, node.y);

        return (
          <motion.g
            key={node.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: lit ? 1 : 0.12 }}
            transition={{ duration: 0.5, delay: 0.35 + i * 0.09 }}
            onHoverStart={() => setHovered(node.id)}
            onHoverEnd={() => setHovered(null)}
            style={{ cursor: "pointer" }}
          >
            {/* hit area */}
            <circle cx={node.x} cy={node.y} r={28} fill="transparent" />

            {/* ambient glow */}
            {isActive && (
              <motion.circle
                cx={node.x} cy={node.y} r={22}
                fill={node.color} fillOpacity={0.1}
                initial={{ r: 4, fillOpacity: 0 }}
                animate={{ r: 22, fillOpacity: 0.1 }}
                transition={{ duration: 0.2 }}
              />
            )}

            {/* pulse ring */}
            {isActive && (
              <motion.circle
                cx={node.x} cy={node.y} r={6}
                fill="none" stroke={node.color} strokeWidth={0.8}
                initial={{ r: 6, opacity: 0.9 }}
                animate={{ r: 24, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
              />
            )}

            {/* outer ring */}
            <circle
              cx={node.x} cy={node.y}
              r={isActive ? 13 : 10}
              fill="none"
              stroke={node.color}
              strokeWidth={0.8}
              opacity={isActive ? 0.4 : 0.12}
              style={{ transition: "r 180ms ease-out, opacity 180ms" }}
            />

            {/* dot */}
            <circle
              cx={node.x} cy={node.y}
              r={isActive ? 7.5 : 5.5}
              fill={node.color}
              style={{ transition: "r 180ms ease-out" }}
            />

            {/* label */}
            <text
              x={lp.lx} y={lp.ly}
              textAnchor={lp.anchor}
              fill={isActive ? "#e8e4df" : "#787880"}
              fontSize={12}
              fontFamily="ui-monospace,monospace"
              fontWeight={isActive ? "600" : "400"}
              style={{ transition: "fill 200ms" }}
            >
              {node.label}
            </text>

            {/* sublabel */}
            <text
              x={lp.sx} y={lp.sy}
              textAnchor={lp.anchor}
              fill={isActive ? node.color : "#3a3a42"}
              fontSize={9.5}
              fontFamily="ui-monospace,monospace"
              style={{ transition: "fill 200ms" }}
            >
              {node.sub}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}
