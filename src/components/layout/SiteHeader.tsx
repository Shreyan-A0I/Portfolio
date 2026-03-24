"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/site";
import { cn, makeAssetUrl } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-[var(--hard-white)] bg-[rgba(9,9,11,0.9)] backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group inline-flex items-center gap-3">
          <div className="shadow-neubrutal border-[3px] border-[var(--hard-white)] bg-[var(--paper-slab)] px-3 py-2 font-mono text-sm font-bold uppercase tracking-[0.3em] text-[var(--bio-cyan)] transition-transform duration-200 group-hover:-translate-y-0.5">
            SN
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--bio-cyan)]">Syntactic Brutalism</p>
            <p className="font-reading text-sm text-[var(--soft-white)]/78">Portfolio + project command deck</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navigation.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "border-[3px] px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.24em] transition-all duration-200",
                  active
                    ? "border-[var(--hard-white)] bg-[var(--hard-white)] text-[var(--terminal-void)] shadow-neubrutal-cyan"
                    : "border-[var(--hard-white)] bg-[var(--paper-slab)] text-[var(--hard-white)] hover:-translate-y-0.5 hover:bg-[var(--bio-cyan)] hover:text-[var(--terminal-void)]",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={makeAssetUrl("Resume.pdf")}
            target="_blank"
            rel="noreferrer"
            className="hidden border-[3px] border-[var(--hard-white)] bg-[var(--cmu-red)] px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.24em] text-[var(--hard-white)] shadow-neubrutal transition-transform duration-200 hover:-translate-y-0.5 sm:inline-flex"
          >
            Resume.pdf
          </a>
          <div className="terminal-cursor hidden h-8 w-4 bg-[var(--hard-white)] md:block" aria-hidden="true" />
        </div>
      </div>
    </header>
  );
}
