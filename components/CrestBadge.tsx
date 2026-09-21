const CATEGORY_STYLES: Record<string, string> = {
  General: "border-navy/30 text-navy",
  Investigation: "border-crimson/40 text-crimson",
  Community: "border-gold/50 text-gold-dark",
  Operations: "border-navy/30 text-navy",
  Programs: "border-gold/50 text-gold-dark",
};

export default function CrestBadge({ label }: { label: string }) {
  const style = CATEGORY_STYLES[label] ?? "border-navy/30 text-navy";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border bg-white px-2.5 py-0.5 text-xs font-semibold ${style}`}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
        <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="5" cy="5" r="1.4" fill="currentColor" />
      </svg>
      {label}
    </span>
  );
}
