import Link from "next/link";

export default function SectionHeading({
  title,
  viewAllHref,
}: {
  title: string;
  viewAllHref?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between border-b-2 border-navy pb-3">
      <h2 className="font-heading text-xl font-bold text-navy lg:text-2xl">{title}</h2>
      {viewAllHref && (
        <Link href={viewAllHref} className="text-sm font-semibold text-royal-dark hover:text-royal">
          View all
        </Link>
      )}
    </div>
  );
}
