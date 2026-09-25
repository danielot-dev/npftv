import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import GalleryAlbumCard from "@/components/GalleryAlbumCard";
import EmptyState from "@/components/EmptyState";
import { getGalleryAlbums } from "@/lib/data";

export const metadata: Metadata = { title: "Photo Gallery" };

export default async function GalleryPage() {
  const albums = await getGalleryAlbums();

  return (
    <>
      <SiteHeader />
      <PageHero
        eyebrow="Moments"
        title="Photo Gallery"
        description="Photos from official events and activities, organized into albums."
      />
      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        {albums.length === 0 ? (
          <EmptyState
            title="No albums published yet"
            description="Photos from official events and activities will be organized into albums here."
          />
        ) : (
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {albums.map((album) => (
              <GalleryAlbumCard key={album.id} album={album} />
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
