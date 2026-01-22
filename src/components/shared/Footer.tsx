"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#C41230] to-[#00D4AA] flex items-center justify-center">
                <span className="text-white font-bold text-lg font-mono">SN</span>
              </div>
              <div>
                <p className="font-semibold text-foreground">Shreyan Nalwad</p>
                <p className="text-xs text-muted-foreground font-mono">
                  Computational Biology & AI
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Bridging the gap between biological complexity and computational precision.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Navigate
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "The Tactical Edge", href: "#tactical-edge" },
                { label: "The Neural Interface", href: "#neural-interface" },
                { label: "The Systemic Backbone", href: "#systemic-backbone" },
                { label: "The Predictive Core", href: "#predictive-core" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4" id="contact">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:shreyan.nalwad@gmail.com"
                className="text-sm text-muted-foreground hover:text-[#00D4AA] transition-colors font-mono"
              >
                shreyan.nalwad@gmail.com
              </a>
              <a
                href="tel:+14126705516"
                className="text-sm text-muted-foreground hover:text-[#00D4AA] transition-colors font-mono"
              >
                (412) 670-5516
              </a>
              <a
                href="https://www.linkedin.com/in/shreyan-nalwad"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-[#00D4AA] transition-colors"
              >
                LinkedIn →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-muted-foreground">
            © {currentYear} Shreyan Balaji Nalwad. Crafted with precision.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground font-mono">
              <span className="text-[#C41230]">CMU</span> MSCB &apos;27
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground font-mono">
              <span className="text-[#00D4AA]">VIT</span> BTech &apos;25
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
