export default function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="relative overflow-hidden bg-navy-gradient">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-royal/25 blur-3xl motion-safe:animate-mesh-drift"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-signal/20 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="fade-in-up max-w-3xl">
          {eyebrow && (
            <p className="mb-3 font-condensed text-xs font-semibold uppercase tracking-[0.2em] text-royal-light">
              {eyebrow}
            </p>
          )}
          <h1 className="font-heading text-3xl font-extrabold text-white lg:text-4xl">{title}</h1>
          {description && <p className="mt-4 max-w-2xl text-sm text-white/75 lg:text-base">{description}</p>}
        </div>
      </div>
      <div className="royal-divider" />
    </div>
  );
}
