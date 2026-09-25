import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import MediaPlaceholder from "@/components/MediaPlaceholder";
import { formatDate } from "@/lib/format";
import { getGalleryAlbumBySlug } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const album = await getGalleryAlbumBySlug(params.slug);
  if (!album) return {};
  return {
    title: album.title,
    description: album.description ?? undefined,
    alternates: { canonical: `/gallery/${album.slug}` },
    openGraph: {
      title: album.title,
      description: album.description ?? undefined,
      url: `/gallery/${album.slug}`,
      images: album.coverImage ? [{ url: album.coverImage }] : undefined,
    },
  };
}

export default async function GalleryAlbumPage({ params }: { params: { slug: string } }) {
  const album = await getGalleryAlbumBySlug(params.slug);
  if (!album) notFound();

  return (
    <>
      <SiteHeader />
      <PageHero eyebrow={formatDate(album.eventDate)} title={album.title} description={album.description ?? undefined} />
      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        {album.images.length === 0 ? (
          <p className="text-sm text-navy-dark/60">No photos in this album yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {album.images.map((image) => (
              <div key={image.id} className="glass relative aspect-square overflow-hidden rounded-xl p-1">
                {image.url ? (
                  <Image src={image.url} alt={image.caption ?? album.title} fill className="rounded-lg object-cover" />
                ) : (
                  <MediaPlaceholder className="h-full w-full rounded-lg" />
                )}
              </div>
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
