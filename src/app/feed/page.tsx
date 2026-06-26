import type { Metadata } from "next";
import SectionHeader from "@/components/shared/SectionHeader";
import { feedEntries } from "@/lib/feed-entries";

export const metadata: Metadata = {
  title: "Feed",
  description: "Updates, notes, and observations from Shreyan Nalwad — research, comp bio, and things worth writing down.",
};

const entries = feedEntries;

export default function FeedPage() {
  return (
    <main className="px-6 pb-20 sm:px-10 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <SectionHeader
          eyebrow="Feed"
          title="Notes & Updates"
          subtitle="I dump stories here."
        />

        <div className="space-y-12 mt-2">
          {entries.map((entry, i) => (
            <article key={i} className="relative border-l-2 border-border-subtle pl-8">
              <span className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-accent-amber/80" />

              <div className="mb-3 flex items-center gap-3">
                <span className="hud-text text-sm text-text-secondary/50 uppercase tracking-widest">
                  {entry.date}
                </span>
                <span className="text-sm px-2 py-0.5 rounded-full border border-border-subtle text-text-secondary/60">
                  {entry.tag}
                </span>
              </div>

              <h2 className="mb-4 text-xl font-bold text-text-primary leading-snug">
                {entry.title}
              </h2>

              {entry.gif && (
                <div className="mb-4 overflow-hidden rounded-xl border border-border-subtle">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={entry.gif} alt={entry.title} className="w-full max-w-md" />
                </div>
              )}
              <div className="space-y-4 text-text-secondary leading-relaxed">
                {entry.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
