import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import VideoCard from "@/components/VideoCard";
import EmptyState from "@/components/EmptyState";
import { getAllVideos } from "@/lib/data";

export const metadata: Metadata = { title: "Video Library" };

export default async function VideosPage() {
  const videos = await getAllVideos();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <h1 className="mb-8 border-b-2 border-navy pb-3 font-heading text-3xl font-extrabold text-navy">
          Video Library
        </h1>

        {videos.length === 0 ? (
          <EmptyState
            title="No videos published yet"
            description="Interviews, documentaries, programs, and past broadcasts will appear here."
          />
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
