import Link from "next/link";
import { getLatestNews, getNewsCategories, getLiveStream } from "@/lib/data";
import { formatDate } from "@/lib/format";

export default async function ArticleSidebar({ excludeId }: { excludeId?: string }) {
  const [latest, categories, stream] = await Promise.all([
    getLatestNews(5, excludeId),
    getNewsCategories(),
    getLiveStream(),
  ]);

  return (
    <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
      {stream?.isLive && (
        <Link
          href="/live"
          className="live-badge flex w-full items-center justify-center rounded-xl py-3 shadow-glow"
        >
          Watch NPF TV Live Now
        </Link>
      )}

      <div className="glass rounded-2xl p-5">
        <h2 className="relative mb-4 pb-2 font-heading text-sm font-bold uppercase tracking-wide text-navy">
          Latest News
          <span className="absolute -bottom-[1px] left-0 h-0.5 w-8 rounded-full bg-royal" />
        </h2>
        <ul className="space-y-4">
          {latest.map((item) => (
            <li key={item.id}>
              <Link href={`/news/${item.slug}`} className="group block">
                <p className="font-heading text-sm font-semibold leading-snug text-navy group-hover:text-royal-dark">
                  {item.title}
                </p>
                <p className="mt-1 font-condensed text-xs text-navy-dark/50">
                  {formatDate(item.publishedAt)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {categories.length > 0 && (
        <div className="glass rounded-2xl p-5">
          <h2 className="relative mb-4 pb-2 font-heading text-sm font-bold uppercase tracking-wide text-navy">
            Categories
            <span className="absolute -bottom-[1px] left-0 h-0.5 w-8 rounded-full bg-royal" />
          </h2>
          <ul className="space-y-2">
            {categories.map((c) => (
              <li key={c.category}>
                <Link
                  href={`/news?category=${encodeURIComponent(c.category)}`}
                  className="flex items-center justify-between text-sm text-navy-dark hover:text-royal-dark"
                >
                  <span>{c.category}</span>
                  <span className="font-condensed text-xs text-navy-dark/40">{c.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
