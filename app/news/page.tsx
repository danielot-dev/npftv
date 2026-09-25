import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { CompactNewsCard, LeadNewsCard } from "@/components/NewsCard";
import EmptyState from "@/components/EmptyState";
import { getAllPublishedNews, getNewsByCategory, getNewsCategories } from "@/lib/data";

export const metadata: Metadata = { title: "News" };

export default async function NewsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const activeCategory = searchParams.category;
  const [articles, categories] = await Promise.all([
    activeCategory ? getNewsByCategory(activeCategory) : getAllPublishedNews(),
    getNewsCategories(),
  ]);
  const [lead, ...rest] = articles;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-navy/10 pb-4">
          <h1 className="font-heading text-3xl font-extrabold text-navy">
            {activeCategory ?? "News"}
          </h1>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/news"
              className={`rounded-full border px-3 py-1 font-condensed text-xs font-semibold uppercase tracking-wide backdrop-blur-sm transition ${
                !activeCategory
                  ? "border-royal bg-royal text-white shadow-glow"
                  : "border-navy/15 bg-white/50 text-navy-dark hover:border-royal hover:text-royal-dark"
              }`}
            >
              All
            </Link>
            {categories.map((c) => (
              <Link
                key={c.category}
                href={`/news?category=${encodeURIComponent(c.category)}`}
                className={`rounded-full border px-3 py-1 font-condensed text-xs font-semibold uppercase tracking-wide backdrop-blur-sm transition ${
                  activeCategory === c.category
                    ? "border-royal bg-royal text-white shadow-glow"
                    : "border-navy/15 bg-white/50 text-navy-dark hover:border-royal hover:text-royal-dark"
                }`}
              >
                {c.category}
              </Link>
            ))}
          </div>
        </div>

        {!lead ? (
          <EmptyState
            title={activeCategory ? `No ${activeCategory} news yet` : "No news published yet"}
            description="Official news and updates will be listed here as they're published."
          />
        ) : (
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <LeadNewsCard article={lead} />
            </div>
            <div className="divide-y divide-navy/5">
              {rest.slice(0, 6).map((article) => (
                <CompactNewsCard key={article.id} article={article} />
              ))}
            </div>
            {rest.length > 6 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-3">
                {rest.slice(6).map((article) => (
                  <CompactNewsCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
