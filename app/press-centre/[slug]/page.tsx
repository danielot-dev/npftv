import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CrestBadge from "@/components/CrestBadge";
import ShareButtons from "@/components/ShareButtons";
import ArticleSidebar from "@/components/ArticleSidebar";
import { formatDate } from "@/lib/format";
import { getPressReleaseBySlug } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const release = await getPressReleaseBySlug(params.slug);
  if (!release) return {};
  return {
    title: release.title,
    description: release.summary,
    alternates: { canonical: `/press-centre/${release.slug}` },
    openGraph: {
      title: release.title,
      description: release.summary,
      url: `/press-centre/${release.slug}`,
      type: "article",
      publishedTime: release.publishedAt?.toISOString(),
    },
    twitter: {
      card: "summary",
      title: release.title,
      description: release.summary,
    },
  };
}

export default async function PressReleaseDetailPage({ params }: { params: { slug: string } }) {
  const release = await getPressReleaseBySlug(params.slug);
  if (!release) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: release.title,
    description: release.summary,
    datePublished: release.publishedAt?.toISOString(),
    dateModified: release.updatedAt?.toISOString(),
    publisher: {
      "@type": "GovernmentOrganization",
      name: "Nigeria Police Force",
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
            <CrestBadge label="Official Statement" />
            <h1 className="mt-4 font-heading text-3xl font-extrabold leading-tight text-navy">
              {release.title}
            </h1>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
              <p className="font-condensed text-sm text-navy-dark/50">
                {formatDate(release.publishedAt)}
              </p>
              <ShareButtons path={`/press-centre/${release.slug}`} title={release.title} />
            </div>

            <div className="mt-8 max-w-[70ch] whitespace-pre-line text-[17px] leading-relaxed text-navy-dark">
              {release.body}
            </div>

            {release.documentUrl && (
              <a
                href={release.documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block rounded-xl border border-navy/60 bg-white/40 px-5 py-2.5 font-heading text-sm font-semibold text-navy backdrop-blur-sm transition hover:bg-navy hover:text-white hover:shadow-glow"
              >
                Download official document
              </a>
            )}
          </article>

          <ArticleSidebar />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
