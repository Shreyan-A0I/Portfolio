interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <div className="mb-12">
      {eyebrow && (
        <p className="mb-4 text-xs uppercase tracking-widest text-text-secondary">
          {eyebrow}
        </p>
      )}
      <h1 className="mb-4 text-4xl font-bold text-text-primary md:text-5xl">
        {title}
      </h1>
      {subtitle && (
        <p className="max-w-2xl text-xl text-text-secondary">{subtitle}</p>
      )}
    </div>
  );
}
