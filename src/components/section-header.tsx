interface SectionHeaderProps {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
}

export default function SectionHeader({ id, eyebrow, title, description, children }: SectionHeaderProps) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center lg:mb-16">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-navy">{eyebrow}</p>
      <h2 id={id} className="mb-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && <p className="text-lg leading-relaxed text-slate-600">{description}</p>}
      {children && <div className="mt-8">{children}</div>}
    </div>
  );
}
