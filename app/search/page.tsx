import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SearchBar from "@/components/SearchBar";
import CrestBadge from "@/components/CrestBadge";
import { formatDate } from "@/lib/format";
import { searchSite } from "@/lib/data";

export const metadata: Metadata = { title: "Search" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q ?? "";
  const results = query
    ? await searchSite(query)
    : { news: [], videos: [], programs: [], press: [] };
  const totalResults =
    results.news.length + results.videos.length + results.programs.length + results.press.length;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-10 lg:px-8">
        <h1 className="mb-6 font-heading text-3xl font-extrabold text-navy">Search</h1>
        <SearchBar initialQuery={query} />

        {!query ? (
          <p className="mt-10 text-sm text-navy-dark/60">
            Search across news, videos, and programs.
          </p>
        ) : totalResults === 0 ? (
          <div className="mt-10 border border-dashed border-navy/20 bg-white px-6 py-16 text-center">
            <h2 className="font-heading text-lg font-semibold text-navy">
              No results for &ldquo;{query}&rdquo;
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-navy-dark/70">
              Try a different word, or check the spelling. You can also browse News, Videos, or
              Programs directly from the menu above.
            </p>
          </div>
        ) : (
          <div className="mt-10 space-y-12">
            {results.news.length > 0 && (
              <section>
                <h2 className="mb-4 border-b-2 border-navy pb-2 font-heading text-lg font-bold text-navy">
                  News ({results.news.length})
                </h2>
                <div className="space-y-4">
                  {results.news.map((item) => (
                    <Link key={item.id} href={`/news/${item.slug}`} className="group block">
                      <CrestBadge label={item.category} />
                      <h3 className="mt-2 font-heading text-lg font-semibold text-navy group-hover:text-navy-light">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-navy-dark/70">{item.excerpt}</p>
                      <p className="mt-1 font-condensed text-xs text-navy-dark/50">
                        {formatDate(item.publishedAt)}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {results.videos.length > 0 && (
              <section>
                <h2 className="mb-4 border-b-2 border-navy pb-2 font-heading text-lg font-bold text-navy">
                  Videos ({results.videos.length})
                </h2>
                <div className="space-y-4">
                  {results.videos.map((item) => (
                    <Link key={item.id} href={`/videos/${item.slug}`} className="group block">
                      <p className="font-condensed text-xs font-semibold uppercase tracking-wide text-royal-dark">
                        {item.category}
                      </p>
                      <h3 className="mt-1 font-heading text-lg font-semibold text-navy group-hover:text-navy-light">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-navy-dark/70">{item.description}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {results.programs.length > 0 && (
              <section>
                <h2 className="mb-4 border-b-2 border-navy pb-2 font-heading text-lg font-bold text-navy">
                  Programs ({results.programs.length})
                </h2>
                <div className="space-y-4">
                  {results.programs.map((item) => (
                    <Link key={item.id} href={`/programs/${item.slug}`} className="group block">
                      <h3 className="font-heading text-lg font-semibold text-navy group-hover:text-navy-light">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm text-navy-dark/70">{item.description}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {results.press.length > 0 && (
              <section>
                <h2 className="mb-4 border-b-2 border-navy pb-2 font-heading text-lg font-bold text-navy">
                  Press Centre ({results.press.length})
                </h2>
                <div className="space-y-4">
                  {results.press.map((item) => (
                    <Link key={item.id} href={`/press-centre/${item.slug}`} className="group block">
                      <h3 className="font-heading text-lg font-semibold text-navy group-hover:text-navy-light">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-navy-dark/70">{item.summary}</p>
                      <p className="mt-1 font-condensed text-xs text-navy-dark/50">
                        {formatDate(item.publishedAt)}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
