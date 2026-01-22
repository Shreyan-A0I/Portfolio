"use client";

import { HeroSection } from "@/components/shared/HeroSection";
import { StackLayer } from "@/components/shared/StackLayer";
import { ExperienceSection } from "@/components/shared/ExperienceSection";
import {
  edgeAIProjects,
  neuralInterfaceProjects,
  systemsProjects,
  predictiveProjects,
} from "@/lib/data";

// Layer Icons as SVG components
const TacticalEdgeIcon = () => (
  <svg
    className="w-7 h-7"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
    />
  </svg>
);

const NeuralInterfaceIcon = () => (
  <svg
    className="w-7 h-7"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const SystemicBackboneIcon = () => (
  <svg
    className="w-7 h-7"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    />
  </svg>
);

const PredictiveCoreIcon = () => (
  <svg
    className="w-7 h-7"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
);

// Stack Layer Data
const stackLayers = [
  {
    id: "tactical-edge",
    title: "The Tactical Edge",
    subtitle: "Hardware & Optimization",
    hook: "Optimizing for the constraints of reality.",
    description:
      "Real-time problem solving where code meets the physical world. Pushing the boundaries of edge computing with CUDA optimization and embedded AI systems.",
    accentColor: "cmu-red" as const,
    icon: <TacticalEdgeIcon />,
    projects: edgeAIProjects,
  },
  {
    id: "neural-interface",
    title: "The Neural Interface",
    subtitle: "Computer Vision & Deep Learning",
    hook: "Decoding visual complexity with clinical precision.",
    description:
      "Training machines to perceive and interpret complex biological patterns. From whole-slide imaging to retinal analysis, bridging AI with clinical pathology.",
    accentColor: "bio-cyan" as const,
    icon: <NeuralInterfaceIcon />,
    projects: neuralInterfaceProjects,
  },
  {
    id: "systemic-backbone",
    title: "The Systemic Backbone",
    subtitle: "Software Engineering & Tooling",
    hook: "Architecting tools for human and environmental impact.",
    description:
      "Building the robust, scalable tools that enable researchers and users to work effectively. Full-stack engineering with a focus on sustainability and accessibility.",
    accentColor: "system-amber" as const,
    icon: <SystemicBackboneIcon />,
    projects: systemsProjects,
  },
  {
    id: "predictive-core",
    title: "The Predictive Core",
    subtitle: "Statistics, Causality & Genomics",
    hook: "Inferring causality in stochastic environments.",
    description:
      "Finding the 'Why' behind the 'What' through mathematical modeling. From epidemiological forecasting to spatial metabolomics, uncovering hidden patterns in complex data.",
    accentColor: "neural-purple" as const,
    icon: <PredictiveCoreIcon />,
    projects: predictiveProjects,
  },
];

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Stack Section */}
      <section id="stack" className="relative">
        {/* Section Intro */}
        <div className="container mx-auto px-6 py-16 text-center">
          <p className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-4">
            Interdisciplinary Problem-Solving
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            The Stack
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each layer represents a different level of abstraction, moving from
            hardware and physics to abstract logic and systems.
          </p>
        </div>

        {/* Stack Layers */}
        {stackLayers.map((layer, index) => (
          <StackLayer
            key={layer.id}
            {...layer}
            index={index}
          />
        ))}
      </section>

      {/* Experience Section */}
      <ExperienceSection />
    </>
  );
};

export default HomePage;
