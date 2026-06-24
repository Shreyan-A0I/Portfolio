"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const NODES = [
  {
    id: "cv",
    label: "Computer Vision",
    sub: "ViT · YOLO · WSI",
    x: 330,
    y: 58,
    color: "#c47d3e",
  },
  {
    id: "genai",
    label: "Generative AI",
    sub: "DDPM · NuStain",
    x: 115,
    y: 168,
    color: "#d4a053",
  },
  {
    id: "graphml",
    label: "Graph ML",
    sub: "GATv2 · KG",
    x: 545,
    y: 168,
    color: "#d4a053",
  },
  {
    id: "edge",
    label: "Edge AI",
    sub: "Jetson · TensorRT",
    x: 185,
    y: 295,
    color: "#c47d3e",
  },
  {
    id: "seq",
    label: "Sequence ML",
    sub: "CNN-BiLSTM · DNA",
    x: 330,
    y: 295,
    color: "#d4a053",
  },
  {
    id: "omics",
    label: "Spatial Omics",
    sub: "MALDI · scRNA",
    x: 475,
    y: 295,
    color: "#c47d3e",
  },
];

const EDGES: [string, string][] = [
  ["genai", "cv"],
  ["genai", "edge"],
  ["genai", "seq"],
  ["cv", "graphml"],
  ["cv", "seq"],
  ["cv", "omics"],
  ["graphml", "omics"],
  ["graphml", "seq"],
  ["edge", "seq"],
  ["seq", "omics"],
];

function labelPos(id: string, x: number, y: number) {
  switch (id) {
    case "cv":
      return { lx: x, ly: y - 18, sx: x, sy: y - 6, anchor: "middle" as const };
    case "genai":
      return { lx: x - 14, ly: y, sx: x - 14, sy: y + 13, anchor: "end" as const };
    case "graphml":
      return { lx: x + 14, ly: y, sx: x + 14, sy: y + 13, anchor: "start" as const };
    default:
      return { lx: x, ly: y + 18, sx: x, sy: y + 30, anchor: "middle" as const };
  }
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
      viewBox="0 0 660 360"
      className="w-full select-none"
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      {/* edges */}
      {EDGES.map(([f, t], i) => {
        const n1 = nodeById(f);
        const n2 = nodeById(t);
        const lit = isEdgeLit(f, t);
        return (
          <motion.line
            key={`${f}-${t}`}
            x1={n1.x}
            y1={n1.y}
            x2={n2.x}
            y2={n2.y}
            stroke="#d4a053"
            strokeWidth={lit && hovered ? 1.5 : 1}
            initial={{ opacity: 0 }}
            animate={{ opacity: lit ? (hovered ? 0.55 : 0.18) : 0.04 }}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.07 }}
            style={{ transition: "stroke-width 200ms" }}
          />
        );
      })}

      {/* nodes */}
      {NODES.map((node, i) => {
        const lit = isNodeLit(node.id);
        const isActive = hovered === node.id;
        const lp = labelPos(node.id, node.x, node.y);

        return (
          <motion.g
            key={node.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: lit ? 1 : 0.15 }}
            transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
            onHoverStart={() => setHovered(node.id)}
            onHoverEnd={() => setHovered(null)}
            style={{ cursor: "pointer" }}
          >
            {/* transparent hit area */}
            <circle cx={node.x} cy={node.y} r={28} fill="transparent" />

            {/* ambient glow on active */}
            {isActive && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={18}
                fill={node.color}
                fillOpacity={0.12}
                initial={{ r: 0, fillOpacity: 0 }}
                animate={{ r: 18, fillOpacity: 0.12 }}
                transition={{ duration: 0.2 }}
              />
            )}

            {/* pulse ring */}
            {isActive && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={6}
                fill="none"
                stroke={node.color}
                strokeWidth={0.8}
                initial={{ r: 6, opacity: 0.8 }}
                animate={{ r: 22, opacity: 0 }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
              />
            )}

            {/* node dot */}
            <circle
              cx={node.x}
              cy={node.y}
              r={isActive ? 6.5 : 4.5}
              fill={node.color}
              style={{ transition: "r 180ms ease-out" }}
            />

            {/* label */}
            <text
              x={lp.lx}
              y={lp.ly}
              textAnchor={lp.anchor}
              fill={isActive ? "#e8e4df" : "#8a8680"}
              fontSize={10}
              fontFamily="ui-monospace, monospace"
              fontWeight={isActive ? "600" : "400"}
              style={{ transition: "fill 200ms" }}
            >
              {node.label}
            </text>

            {/* sublabel */}
            <text
              x={lp.sx}
              y={lp.sy}
              textAnchor={lp.anchor}
              fill={isActive ? "#8a8680" : "#3a3a3e"}
              fontSize={8}
              fontFamily="ui-monospace, monospace"
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
