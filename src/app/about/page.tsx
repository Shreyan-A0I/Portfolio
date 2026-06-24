import type { Metadata } from "next";
import SectionHeader from "@/components/shared/SectionHeader";

export const metadata: Metadata = {
  title: "About",
  description: "Shreyan Nalwad — MS Computational Biology at CMU, building AI systems at the edge of biology and compute.",
};

export default function AboutPage() {
  return (
    <main className="px-6 pb-20 sm:px-10 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          eyebrow="About"
          title="Shreyan Balaji Nalwad"
          subtitle="Computational Biology + AI Systems"
        />

        {/* ── Main narrative ── */}
        <div className="editorial-panel rounded-2xl p-8 md:p-12">
          <div className="space-y-6 text-text-secondary leading-relaxed">

            <p>
              Both my parents are doctors — my mother is a cancer pathologist, my father
              a laparoscopic gynecologist. Growing up accompanying my mom to the lab,
              being around hospitals from an early age, kept medicine close. When I found
              computation, I found a second lens for the same kind of problems: high-stakes,
              complex data, real consequences. That&apos;s what keeps pulling me back.
              Comp bio sits at the intersection of the most unique data in all of machine
              learning and problems that can eventually change outcomes for real people —
              in cancer diagnosis, in drug discovery, in how we understand disease at a
              molecular level.
            </p>

            <p>
              My first real taste of what &quot;clinical AI&quot; actually means came at
              {" "}<strong className="text-text-primary">Vyuhaa Med Data</strong> in Hyderabad.
              My coworker handled the robotics side of a prototype WSI scanner — slide
              movement, stitching algorithms, the mechanical choreography of the whole
              thing. I owned the software: the end-to-end{" "}
              <strong className="text-text-primary">CerviAI</strong> pipeline — training
              data, a multi-pass detection → segmentation → classification stack, and
              deployment on Jetson Orin Nano with live inference running{" "}
              <em>concurrently</em> while the slide was being captured. When it worked —
              when the scanner was moving across a slide and the pipeline was flagging
              suspicious regions in near real-time — something clicked about what it
              actually means to build AI that operates in the world, not in a notebook.
            </p>

            <p>
              My CTO pushed hard on modularity and unit testing, and modelled a principle
              I now carry into everything: <em>show, don&apos;t explain.</em> I also spent
              a lot of time translating between the technical pipeline and the in-house
              pathologist — that back-and-forth forced me to understand the domain, not
              just the model. Before leaving for CMU, I did a full knowledge transfer to
              a junior engineer. That handoff taught me as much as building the thing did.
            </p>

            <p>
              Now I&apos;m at{" "}
              <strong className="text-text-primary">Zhao Biophotonics Lab at CMU</strong>,
              building diffusion models for in-silico fluorescence multiplexing. The idea:
              give a model one tissue stain channel, and have it synthesize the others —
              no additional reagents, no additional hardware passes. Letting microscopes
              see more than their optics allow.
            </p>

            <p>
              Across all of it, my instinct is to follow the interesting problem wherever
              it goes. I ended up in graph ML because biology is full of relational
              structure and I find graphs elegant. I keep gravitating to computer vision
              despite never planning it as a specialty. I work across a lot of domains —
              not because I scatter, but because I&apos;m drawn to wherever computation
              can make complex biological data interpretable for the people who actually
              need it.
            </p>

          </div>
        </div>

        {/* ── Domain list ── */}
        <div className="mt-8 editorial-panel rounded-2xl p-8 md:p-10">
          <h3 className="mb-5 text-lg font-bold text-text-primary">Core domains</h3>
          <ul className="grid gap-3 sm:grid-cols-2 text-text-secondary text-sm">
            {[
              ["Generative AI", "DDPM, FiLM conditioning, virtual staining"],
              ["Computer Vision", "YOLOv11, ViT, WSI analysis, multi-pass pipelines"],
              ["Graph ML", "GATv2Conv, heterogeneous KGs, LLM embeddings"],
              ["Edge Inference", "Jetson Orin Nano, TensorRT, latency optimization"],
              ["Spatial Omics", "MALDI-MSI, metabolite mapping, co-localization"],
              ["Federated Learning", "NVFlare, multimodal WSI + RNA-seq fusion"],
            ].map(([domain, detail]) => (
              <li key={domain} className="flex flex-col gap-0.5">
                <span className="font-semibold text-text-primary">{domain}</span>
                <span className="text-xs text-text-secondary/70">{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Panels row ── */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">

          <div className="rounded-xl border border-border-subtle bg-surface/40 p-6">
            <h3 className="mb-4 text-base font-bold text-text-primary">Find me</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <a href="https://github.com/Shreyan-A0I" className="interactive-link text-accent-amber">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/shreyan-nalwad" className="interactive-link text-accent-amber">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:shreyan.nalwad@gmail.com" className="interactive-link text-accent-amber">
                  Email
                </a>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-border-subtle bg-surface/40 p-6">
            <h3 className="mb-4 text-base font-bold text-text-primary">Outside the lab</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Running, chess, cooking, anime. Heavy F1 fan — getting into basketball lately.
              Hobbies are as wide-ranging as the technical domains.
            </p>
          </div>

          <div className="rounded-xl border border-border-subtle bg-surface/40 p-6">
            <h3 className="mb-4 text-base font-bold text-text-primary">Open to</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Interdisciplinary collaborations, research with clinical translation, and
              problems at the edge of biology and inference. Reach out.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
