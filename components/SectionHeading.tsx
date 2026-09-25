import Link from "next/link";

export default function SectionHeading({
  title,
  viewAllHref,
}: {
  title: string;
  viewAllHref?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between border-b border-navy/10 pb-3">
      <h2 className="relative font-heading text-xl font-bold text-navy lg:text-2xl">
        {title}
        <span className="absolute -bottom-[13px] left-0 h-0.5 w-10 rounded-full bg-royal shadow-glow" />
      </h2>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="text-sm font-semibold text-royal-dark transition hover:text-royal"
        >
          View all →
        </Link>
      )}
    </div>
  );
}
