import { siteProfile } from "@/lib/site";
import { makeAssetUrl } from "@/lib/utils";

export function SiteFooter() {
  return (
    <footer className="border-t-[3px] border-[var(--hard-white)] bg-[var(--paper-slab)]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--bio-cyan)]">System Footer</p>
          <h2 className="font-reading text-2xl font-semibold text-[var(--hard-white)]">{siteProfile.name}</h2>
          <p className="max-w-xl font-reading text-sm leading-6 text-[var(--soft-white)]/75">
            Built as a living portfolio and project management surface. Research, systems, and interface design are treated as one stack.
          </p>
        </div>

        <div className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--syntax-yellow)]">Links</p>
          <div className="space-y-2 text-sm text-[var(--soft-white)]/75">
            <a href={siteProfile.linkedin} target="_blank" rel="noreferrer" className="block hover:text-[var(--hard-white)]">
              LinkedIn
            </a>
            <a href={siteProfile.github} target="_blank" rel="noreferrer" className="block hover:text-[var(--hard-white)]">
              GitHub
            </a>
            <a href={makeAssetUrl("Projects.pdf")} target="_blank" rel="noreferrer" className="block hover:text-[var(--hard-white)]">
              Projects PDF
            </a>
          </div>
        </div>

        <div className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--cmu-red)]">Contact</p>
          <div className="space-y-2 text-sm text-[var(--soft-white)]/75">
            <a href={`mailto:${siteProfile.email}`} className="block hover:text-[var(--hard-white)]">
              {siteProfile.email}
            </a>
            <p>{siteProfile.location}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
