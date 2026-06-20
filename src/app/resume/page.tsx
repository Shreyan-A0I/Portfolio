import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume for Shreyan Nalwad",
};

export default function ResumePage() {
  return (
    <main className="px-6 pb-20 sm:px-10 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Link
            href="/"
            className="interactive-link inline-block text-accent-amber hover:text-accent-amber/80"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="editorial-panel rounded-2xl p-8 md:p-12">
          <h1 className="mb-2 text-4xl font-bold text-text-primary">
            Shreyan Balaji Nalwad
          </h1>
          <p className="mb-6 text-lg text-text-secondary">
            Computational Biology + AI Systems Engineer
          </p>

          <div className="mb-8 space-y-2 text-sm text-text-secondary">
            <p>Location: Pittsburgh, PA / Hyderabad, India</p>
            <p>
              Email:{" "}
              <a
                href="mailto:shreyan.nalwad@gmail.com"
                className="text-accent-amber"
              >
                shreyan.nalwad@gmail.com
              </a>
            </p>
            <p>
              GitHub:{" "}
              <a
                href="https://github.com/Shreyan-A0I"
                className="text-accent-amber"
              >
                github.com/Shreyan-A0I
              </a>
            </p>
            <p>
              LinkedIn:{" "}
              <a
                href="https://linkedin.com/in/shreyan-nalwad"
                className="text-accent-amber"
              >
                linkedin.com/in/shreyan-nalwad
              </a>
            </p>
          </div>

          <div className="space-y-8 border-t border-border-subtle pt-8">
            <section>
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                Summary
              </h2>
              <p className="text-text-secondary">
                Building systems at the intersection of computational biology, machine learning, and product engineering. Expertise in medical imaging, genomics, inference optimization, and production systems. Proven track record in scaling ML systems, optimizing deployment pipelines, and bridging research and production.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                Core Competencies
              </h2>
              <ul className="grid gap-3 md:grid-cols-2">
                <li className="text-text-secondary">
                  <strong>ML & Deep Learning:</strong> PyTorch, TensorFlow, CNN/LSTM, Vision Transformers, Quantization, TensorRT
                </li>
                <li className="text-text-secondary">
                  <strong>Domains:</strong> Medical Imaging, Genomics, Metabolomics, Clinical ML, Epidemiology
                </li>
                <li className="text-text-secondary">
                  <strong>Systems:</strong> Python, SQL, FastAPI, Docker, AWS, Data Pipelines, CI/CD
                </li>
                <li className="text-text-secondary">
                  <strong>Specializations:</strong> Inference optimization, Edge deployment, Graph ML, Causal inference
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                Experience
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-text-primary">
                    Computational Biology + AI Systems Engineer
                  </h3>
                  <p className="text-sm text-text-secondary">
                    Multiple research and industry projects | 2020 - Present
                  </p>
                  <p className="mt-2 text-text-secondary">
                    Working on cutting-edge problems in medical imaging, genomics, and production ML systems. Published work in deep learning and epidemiology.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                Featured Projects
              </h2>
              <p className="text-text-secondary">
                See <Link href="/projects" className="text-accent-amber">projects</Link> for detailed case studies on edge inference optimization, clinical AI, medical imaging, genomics, and research tooling.
              </p>
            </section>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-text-secondary">
          Download resume PDF from {" "}
          <a
            href="mailto:shreyan.nalwad@gmail.com"
            className="text-accent-amber"
          >
            email
          </a>
        </p>
      </div>
    </main>
  );
}
