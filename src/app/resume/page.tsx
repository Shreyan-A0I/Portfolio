import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume — Shreyan Nalwad, MS Computational Biology at CMU.",
};

export default function ResumePage() {
  return (
    <main className="px-6 pb-20 sm:px-10 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="interactive-link inline-block text-accent-amber hover:text-accent-amber/80"
          >
            ← Back to Home
          </Link>
          <a
            href="/resume.pdf"
            download="Shreyan_Nalwad_Resume.pdf"
            className="rounded-lg border border-accent-amber/40 bg-accent-amber/10 px-5 py-2 text-sm text-accent-amber transition hover:border-accent-amber/80 hover:bg-accent-amber/20"
          >
            Download PDF
          </a>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border-subtle bg-card/40">
          <iframe
            src="/resume.pdf"
            className="h-[85vh] w-full"
            title="Shreyan Nalwad Resume"
          />
        </div>
      </div>
    </main>
  );
}
