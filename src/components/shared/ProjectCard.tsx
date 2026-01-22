"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  accentColor: "cmu-red" | "bio-cyan" | "neural-purple" | "system-amber";
  index?: number;
}

const accentColorMap = {
  "cmu-red": {
    border: "border-[#C41230]/20 hover:border-[#C41230]/50",
    glow: "hover:shadow-[0_0_30px_rgba(196,18,48,0.15)]",
    badge: "bg-[#C41230]/10 text-[#C41230] border-[#C41230]/20",
    metric: "text-[#C41230]",
  },
  "bio-cyan": {
    border: "border-[#00D4AA]/20 hover:border-[#00D4AA]/50",
    glow: "hover:shadow-[0_0_30px_rgba(0,212,170,0.15)]",
    badge: "bg-[#00D4AA]/10 text-[#00D4AA] border-[#00D4AA]/20",
    metric: "text-[#00D4AA]",
  },
  "neural-purple": {
    border: "border-[#8B5CF6]/20 hover:border-[#8B5CF6]/50",
    glow: "hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]",
    badge: "bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/20",
    metric: "text-[#8B5CF6]",
  },
  "system-amber": {
    border: "border-[#F59E0B]/20 hover:border-[#F59E0B]/50",
    glow: "hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
    badge: "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20",
    metric: "text-[#F59E0B]",
  },
};

export const ProjectCard = ({ project, accentColor, index = 0 }: ProjectCardProps) => {
  const colors = accentColorMap[accentColor];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card
        className={`glass glass-hover ${colors.border} ${colors.glow} transition-all duration-500 overflow-hidden group`}
      >
        {/* Image Section */}
        {project.image && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>
        )}

        <CardHeader className="space-y-3">
          {/* Domain Tags */}
          <div className="flex flex-wrap gap-2">
            {project.domains.map((domain) => (
              <Badge
                key={domain}
                variant="outline"
                className={`${colors.badge} text-xs font-mono`}
              >
                {domain}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-foreground group-hover:text-white transition-colors">
            {project.title}
          </h3>

          {/* Hook */}
          <p className={`text-sm font-medium italic ${colors.metric}`}>
            &ldquo;{project.hook}&rdquo;
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.description}
          </p>

          {/* Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {project.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="glass rounded-lg p-3 text-center"
                >
                  <p className={`text-lg font-bold font-mono ${colors.metric}`}>
                    {metric.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{metric.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-1 rounded-full bg-white/5 text-muted-foreground font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
