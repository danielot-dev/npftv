import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CrestBadge from "@/components/CrestBadge";
import MediaPlaceholder from "@/components/MediaPlaceholder";
import ShareButtons from "@/components/ShareButtons";
import ArticleSidebar from "@/components/ArticleSidebar";
import { CompactNewsCard } from "@/components/NewsCard";
import { getNewsBySlug, getLatestNews } from "@/lib/data";
import { formatDate } from "@/lib/format";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await getNewsBySlug(params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/news/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `/news/${article.slug}`,
      type: "article",
      publishedTime: article.publishedAt?.toISOString(),
      images: article.coverImage ? [{ url: article.coverImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: article.coverImage ? [article.coverImage] : undefined,
    },
  };
}

export default async function NewsArticlePage({ params }: { params: { slug: string } }) {
  const article = await getNewsBySlug(params.slug);
  if (!article) notFound();

  const related = await getLatestNews(4, article.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: article.coverImage ? [article.coverImage] : undefined,
    datePublished: article.publishedAt?.toISOString(),
    dateModified: article.updatedAt?.toISOString(),
    author: article.author?.name
      ? { "@type": "Person", name: article.author.name }
      : { "@type": "Organization", name: "Nigeria Police Force TV" },
    publisher: {
      "@type": "Organization",
      name: "Nigeria Police Force TV",
      logo: { "@type": "ImageObject", url: "https://npftv.net/logo.png" },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <article className="lg:col-span-2">
            <CrestBadge label={article.category} />
            <h1 className="mt-4 font-heading text-3xl font-extrabold leading-tight text-navy lg:text-4xl">
              {article.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 font-condensed text-sm text-navy-dark/60">
              <div>
                <span>{formatDate(article.publishedAt)}</span>
                {article.author?.name && <span className="ml-3">Reported by {article.author.name}</span>}
              </div>
              <ShareButtons path={`/news/${article.slug}`} title={article.title} />
            </div>

            <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden">
              {article.coverImage ? (
                <Image src={article.coverImage} alt={article.title} fill className="object-cover" priority />
              ) : (
                <MediaPlaceholder className="h-full w-full" />
              )}
            </div>

            <div className="mt-8 max-w-[70ch] whitespace-pre-line text-[17px] leading-relaxed text-navy-dark">
              {article.body}
            </div>

            {related.length > 0 && (
              <section className="mt-14 border-t-2 border-navy pt-6">
                <h2 className="mb-2 font-heading text-xl font-bold text-navy">More News</h2>
                <div className="grid gap-2 sm:grid-cols-2">
                  {related.map((item) => (
                    <CompactNewsCard key={item.id} article={item} />
                  ))}
                </div>
              </section>
            )}
          </article>

          <ArticleSidebar excludeId={article.id} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
