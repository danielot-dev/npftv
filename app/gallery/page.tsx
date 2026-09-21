import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import GalleryAlbumCard from "@/components/GalleryAlbumCard";
import EmptyState from "@/components/EmptyState";
import { getGalleryAlbums } from "@/lib/data";

export const metadata: Metadata = { title: "Photo Gallery" };

export default async function GalleryPage() {
  const albums = await getGalleryAlbums();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <h1 className="mb-8 border-b-2 border-navy pb-3 font-heading text-3xl font-extrabold text-navy">
          Photo Gallery
        </h1>

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
