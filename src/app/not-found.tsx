import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-[10px] tracking-[0.5em] text-[#00E5FF]/30 uppercase mb-5">
        404 · null reference
      </p>
      <h1 className="font-mono text-5xl font-bold text-text-primary mb-4 tracking-tight">
        Page not found.
      </h1>
      <p className="text-text-secondary max-w-sm mb-10 leading-relaxed">
        This route doesn&apos;t exist. Might&apos;ve been moved, renamed, or never shipped.
      </p>
      <Link
        href="/"
        className="font-mono text-sm uppercase tracking-[0.35em]
          border border-[#00E5FF]/25 bg-[#00E5FF]/5 px-8 py-3
          text-[#00E5FF]/60 hover:border-[#00E5FF]/60 hover:text-[#00E5FF]
          transition-all duration-200"
      >
        ← back home
      </Link>
    </main>
  );
}
