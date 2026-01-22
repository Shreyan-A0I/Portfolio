"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { personalInfo } from "@/lib/data";

export const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <motion.section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C41230] rounded-full blur-[150px] opacity-10"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00D4AA] rounded-full blur-[150px] opacity-10"
        />
      </div>

      <motion.div
        style={{ y, opacity, scale }}
        className="container mx-auto px-6 relative z-10"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Pre-title Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#00D4AA] animate-pulse" />
            <span className="text-sm font-mono text-muted-foreground">
              Available for opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          >
            <span className="text-foreground">{personalInfo.name.split(" ")[0]}</span>
            <br />
            <span className="gradient-text-cmu">{personalInfo.name.split(" ").slice(1).join(" ")}</span>
          </motion.h1>

          {/* Title */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-4 font-mono"
          >
            {personalInfo.title}
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto mb-8"
          >
            {personalInfo.tagline}
          </motion.p>

          {/* Education Badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-12"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#C41230]/30">
              <span className="text-[#C41230] font-bold">CMU</span>
              <span className="text-muted-foreground text-sm">MS Computational Biology &apos;27</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#00D4AA]/30">
              <span className="text-[#00D4AA] font-bold">VIT</span>
              <span className="text-muted-foreground text-sm">BTech CSE Bioinformatics &apos;25</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#stack"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#C41230] to-[#ff4d6d] text-white font-semibold hover:shadow-[0_0_30px_rgba(196,18,48,0.4)] transition-all duration-300"
            >
              Explore My Work
            </a>
            <a
              href="mailto:shreyan.nalwad@gmail.com"
              className="px-8 py-4 rounded-full glass border border-white/20 text-foreground font-semibold hover:border-white/40 hover:bg-white/5 transition-all duration-300"
            >
              Get in Touch
            </a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                Scroll to explore
              </span>
              <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-[#00D4AA]"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};
