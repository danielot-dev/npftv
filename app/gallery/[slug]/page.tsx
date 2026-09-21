import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
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
      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="border-b-2 border-navy pb-6">
          <h1 className="font-heading text-3xl font-extrabold text-navy">{album.title}</h1>
          {album.description && <p className="mt-2 max-w-2xl text-navy-dark/75">{album.description}</p>}
          <p className="mt-2 font-condensed text-sm text-navy-dark/50">{formatDate(album.eventDate)}</p>
        </div>

        {album.images.length === 0 ? (
          <p className="mt-10 text-sm text-navy-dark/60">No photos in this album yet.</p>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {album.images.map((image) => (
              <div key={image.id} className="relative aspect-square overflow-hidden">
                {image.url ? (
                  <Image src={image.url} alt={image.caption ?? album.title} fill className="object-cover" />
                ) : (
                  <MediaPlaceholder className="h-full w-full" />
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
