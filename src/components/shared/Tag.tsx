import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "metric";
  className?: string;
}

export default function Tag({
  children,
  variant = "default",
  className,
}: TagProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-3 py-1 text-sm",
        variant === "default" &&
          "border border-border-subtle/40 bg-surface/40 text-text-secondary",
        variant === "metric" &&
          "border border-accent-amber/40 bg-accent-amber/10 text-accent-amber",
        className
      )}
    >
      {children}
    </span>
  );
}
