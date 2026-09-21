import Link from "next/link";
import { formatDate } from "@/lib/format";

type PressReleaseItem = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: Date | null;
  documentUrl: string | null;
};

export default function PressReleaseRow({ release }: { release: PressReleaseItem }) {
  return (
    <div className="border-b border-navy/10 py-6 first:pt-0 last:border-b-0">
      <p className="font-condensed text-xs font-semibold uppercase tracking-wide text-navy-dark/50">
        {formatDate(release.publishedAt)}
      </p>
      <Link href={`/press-centre/${release.slug}`} className="group">
        <h3 className="mt-1 font-heading text-lg font-bold text-navy group-hover:text-navy-light">
          {release.title}
        </h3>
      </Link>
      <p className="mt-2 text-sm text-navy-dark/75">{release.summary}</p>
      <div className="mt-3 flex gap-4">
        <Link href={`/press-centre/${release.slug}`} className="text-sm font-semibold text-gold-dark hover:text-gold">
          Read statement
        </Link>
        {release.documentUrl && (
          <a
            href={release.documentUrl}
            className="text-sm font-semibold text-navy hover:text-navy-light"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download document
          </a>
        )}
      </div>
    </div>
  );
}
