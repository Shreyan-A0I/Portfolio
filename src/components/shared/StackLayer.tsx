"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/types";

interface StackLayerProps {
  id: string;
  title: string;
  subtitle: string;
  hook: string;
  description: string;
  accentColor: "cmu-red" | "bio-cyan" | "neural-purple" | "system-amber";
  icon: React.ReactNode;
  projects: Project[];
  index: number;
}

const accentStyles = {
  "cmu-red": {
    gradient: "from-[#C41230]/20 via-transparent to-transparent",
    border: "border-[#C41230]/30",
    text: "text-[#C41230]",
    glow: "bg-[#C41230]",
    line: "bg-gradient-to-b from-[#C41230] to-transparent",
  },
  "bio-cyan": {
    gradient: "from-[#00D4AA]/20 via-transparent to-transparent",
    border: "border-[#00D4AA]/30",
    text: "text-[#00D4AA]",
    glow: "bg-[#00D4AA]",
    line: "bg-gradient-to-b from-[#00D4AA] to-transparent",
  },
  "neural-purple": {
    gradient: "from-[#8B5CF6]/20 via-transparent to-transparent",
    border: "border-[#8B5CF6]/30",
    text: "text-[#8B5CF6]",
    glow: "bg-[#8B5CF6]",
    line: "bg-gradient-to-b from-[#8B5CF6] to-transparent",
  },
  "system-amber": {
    gradient: "from-[#F59E0B]/20 via-transparent to-transparent",
    border: "border-[#F59E0B]/30",
    text: "text-[#F59E0B]",
    glow: "bg-[#F59E0B]",
    line: "bg-gradient-to-b from-[#F59E0B] to-transparent",
  },
};

export const StackLayer = ({
  id,
  title,
  subtitle,
  hook,
  description,
  accentColor,
  icon,
  projects,
  index,
}: StackLayerProps) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  const styles = accentStyles[accentColor];

  return (
    <motion.section
      ref={ref}
      id={id}
      style={{ opacity, y, scale }}
      className="relative min-h-screen py-24 md:py-32"
    >
      {/* Background Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${styles.gradient} pointer-events-none`}
      />

      {/* Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none">
        <div
          className={`absolute inset-0 ${styles.glow} rounded-full blur-[150px] opacity-10`}
        />
      </div>

      <div className="container mx-auto px-6 relative">
        {/* Layer Number & Line */}
        <div className="absolute left-6 top-0 bottom-0 hidden lg:flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`w-12 h-12 rounded-full glass ${styles.border} flex items-center justify-center`}
          >
            <span className={`text-lg font-bold font-mono ${styles.text}`}>
              0{index + 1}
            </span>
          </motion.div>
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 1, delay: 0.3 }}
            className={`w-px ${styles.line} flex-1 mt-4`}
          />
        </div>

        {/* Content */}
        <div className="lg:pl-24">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-16"
          >
            {/* Icon & Subtitle */}
            <div className="flex items-center gap-4 mb-4">
              <div
                className={`w-14 h-14 rounded-xl glass ${styles.border} flex items-center justify-center ${styles.text}`}
              >
                {icon}
              </div>
              <div>
                <p className={`text-sm font-mono uppercase tracking-wider ${styles.text}`}>
                  {subtitle}
                </p>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              {title}
            </h2>

            {/* Hook */}
            <p className={`text-xl md:text-2xl font-medium italic ${styles.text} mb-4`}>
              &ldquo;{hook}&rdquo;
            </p>

            {/* Description */}
            <p className="text-lg text-muted-foreground max-w-2xl">
              {description}
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, projectIndex) => (
              <ProjectCard
                key={project.id}
                project={project}
                accentColor={accentColor}
                index={projectIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};
