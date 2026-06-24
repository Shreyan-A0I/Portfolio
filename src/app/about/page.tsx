import type { Metadata } from "next";
import SectionHeader from "@/components/shared/SectionHeader";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Shreyan Nalwad and his approach to computational biology and AI systems.",
};

export default function AboutPage() {
  return (
    <main className="px-6 pb-20 sm:px-10 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          eyebrow="About"
          title="Shreyan Balaji Nalwad"
          subtitle="Computational Biology + AI Systems Engineer"
        />

        <div className="editorial-panel rounded-2xl p-8 md:p-12">
          <div className="space-y-6 text-text-secondary">
            <p>
              I build systems at the intersection of computational biology, machine learning, and product engineering. My work spans from clinical imaging analysis and genomic data pipelines to inference optimization and research tooling.
            </p>

            <p>
              The through-line across projects: taking problems that start in biology, applying rigorous computation, and shipping systems that others can trust. This means respecting the domain, understanding deployment constraints, and not settling for papers when users need production-grade tools.
            </p>

            <h3 className="text-lg font-bold text-text-primary">Core domains</h3>
            <ul className="list-inside space-y-2 pl-4">
              <li>• <strong>Biological Systems</strong> - medical imaging, genomics, metabolomics, clinical workflows</li>
              <li>• <strong>Computer Vision</strong> - medical image analysis, model optimization, clinical validation</li>
              <li>• <strong>Inference Engineering</strong> - quantization, latency reduction, edge deployment</li>
              <li>• <strong>Systems & Tooling</strong> - pipelines, reproducibility, internal systems</li>
              <li>• <strong>Graph & Causality</strong> - knowledge graphs, causal inference, relational modeling</li>
            </ul>

            <h3 className="text-lg font-bold text-text-primary">Background</h3>
            <p>
              Currently a Research Assistant at Zhao Biophotonics Lab (CMU), building
              diffusion models for in-silico fluorescence multiplexing. Previously at
              Vyuhaa Med Data in Hyderabad, where I developed CerviAI — a cervical cancer
              detection pipeline using YOLOv11 on Whole Slide Imaging — and led deployment
              of an Edge AI-enabled live WSI microscope scanner on Jetson Orin Nano, cutting
              inference latency 6×. Location-wise, I move between Pittsburgh and Hyderabad.
            </p>

            <p>
              If you're working on problems in this space or just want to discuss systems, biology, or inference—reach out.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-border-subtle bg-surface/40 p-6">
            <h3 className="mb-4 text-lg font-bold text-text-primary">
              Where to find me
            </h3>
            <ul className="space-y-3 text-text-secondary">
              <li>
                <a
                  href="https://github.com/Shreyan-A0I"
                  className="interactive-link text-accent-amber"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/shreyan-nalwad"
                  className="interactive-link text-accent-amber"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="mailto:shreyan.nalwad@gmail.com"
                  className="interactive-link text-accent-amber"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-border-subtle bg-surface/40 p-6">
            <h3 className="mb-4 text-lg font-bold text-text-primary">
              Technical interests
            </h3>
            <p className="text-sm text-text-secondary">
              Deep learning, systems design, medical imaging, genomics, edge inference, causal inference, knowledge graphs, production ML, and research reproducibility.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
