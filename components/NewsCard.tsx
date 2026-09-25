import Link from "next/link";
import Image from "next/image";
import MediaPlaceholder from "@/components/MediaPlaceholder";
import CrestBadge from "@/components/CrestBadge";
import { formatDate } from "@/lib/format";

type NewsCardArticle = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  category: string;
  publishedAt: Date | null;
};

export function LeadNewsCard({ article }: { article: NewsCardArticle }) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="glass glass-hover fade-in-up group block overflow-hidden rounded-2xl"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        {article.coverImage ? (
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
            priority
          />
        ) : (
          <MediaPlaceholder className="h-full w-full" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-dark/40 via-transparent to-transparent" />
      </div>
      <div className="p-5 lg:p-6">
        <CrestBadge label={article.category} />
        <h2 className="mt-3 font-heading text-2xl font-bold leading-tight text-navy transition group-hover:text-royal-dark lg:text-3xl">
          {article.title}
        </h2>
        <p className="mt-2 max-w-2xl text-navy-dark/75">{article.excerpt}</p>
        <p className="mt-3 font-condensed text-sm font-semibold uppercase tracking-wide text-navy-dark/50">
          {formatDate(article.publishedAt)}
        </p>
      </div>
    </Link>
  );
}

export function CompactNewsCard({ article }: { article: NewsCardArticle }) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="group flex gap-4 rounded-xl p-2 transition hover:bg-white/60 hover:backdrop-blur-sm"
    >
      <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg">
        {article.coverImage ? (
          <Image src={article.coverImage} alt={article.title} fill className="object-cover" />
        ) : (
          <MediaPlaceholder className="h-full w-full" variant="royal" />
        )}
      </div>
      <div className="min-w-0">
        <p className="font-condensed text-xs font-semibold uppercase tracking-wide text-royal-dark">
          {article.category}
        </p>
        <h3 className="mt-1 font-heading text-base font-semibold leading-snug text-navy group-hover:text-royal-dark">
          {article.title}
        </h3>
        <p className="mt-1 font-condensed text-xs text-navy-dark/50">
          {formatDate(article.publishedAt)}
        </p>
      </div>
    </Link>
  );
}
