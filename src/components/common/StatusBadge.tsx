import { cn, formatStatus } from "@/lib/utils";
import type { ProjectStatus } from "@/types";

interface StatusBadgeProps {
  status: ProjectStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border-[3px] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em]",
        status === "ongoing"
          ? "border-[var(--syntax-yellow)] bg-[var(--syntax-yellow)] text-[var(--terminal-void)]"
          : "border-[var(--hard-white)] bg-[var(--paper-slab)] text-[var(--hard-white)]",
        className,
      )}
    >
      <span className={cn("h-2 w-2", status === "ongoing" ? "bg-[var(--terminal-void)]" : "bg-[var(--bio-cyan)]")} />
      {formatStatus(status)}
    </span>
  );
}
