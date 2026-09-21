import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ShareButtons from "@/components/ShareButtons";
import { formatDate, youtubeThumbnail } from "@/lib/format";
import { getVideoBySlug } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const video = await getVideoBySlug(params.slug);
  if (!video) return {};
  const image = video.thumbnail || youtubeThumbnail(video.youtubeId);
  return {
    title: video.title,
    description: video.description,
    alternates: { canonical: `/videos/${video.slug}` },
    openGraph: {
      title: video.title,
      description: video.description,
      url: `/videos/${video.slug}`,
      type: "video.other",
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title: video.title,
      description: video.description,
      images: [image],
    },
  };
}

export default async function VideoDetailPage({ params }: { params: { slug: string } }) {
  const video = await getVideoBySlug(params.slug);
  if (!video) notFound();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-10 lg:px-8">
        <div className="aspect-video w-full overflow-hidden bg-navy-dark">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${video.youtubeId}`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="mt-6">
          <p className="font-condensed text-xs font-semibold uppercase tracking-wide text-gold-dark">
            {video.category}
            {video.program && (
              <>
                {" from "}
                <Link href={`/programs/${video.program.slug}`} className="hover:text-gold">
                  {video.program.name}
                </Link>
              </>
            )}
          </p>
          <h1 className="mt-1 font-heading text-2xl font-extrabold text-navy lg:text-3xl">
            {video.title}
          </h1>
          <p className="mt-1 font-condensed text-sm text-navy-dark/50">
            {formatDate(video.publishedAt)}
          </p>
          <p className="mt-4 max-w-2xl text-navy-dark/80">{video.description}</p>

          <div className="mt-6">
            <ShareButtons path={`/videos/${video.slug}`} title={video.title} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
