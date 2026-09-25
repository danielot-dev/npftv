import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SubscribeSection from "@/components/SubscribeSection";
import SectionHeading from "@/components/SectionHeading";
import { LeadNewsCard, CompactNewsCard } from "@/components/NewsCard";
import VideoCard from "@/components/VideoCard";
import ProgramCard from "@/components/ProgramCard";
import GalleryAlbumCard from "@/components/GalleryAlbumCard";
import EmptyState from "@/components/EmptyState";
import {
  getFeaturedNews,
  getLatestNews,
  getFeaturedVideos,
  getActivePrograms,
  getGalleryAlbums,
} from "@/lib/data";

export default async function HomePage() {
  const featured = await getFeaturedNews();
  const latest = await getLatestNews(5, featured?.id);
  const videos = await getFeaturedVideos(4);
  const programs = (await getActivePrograms()).slice(0, 4);
  const albums = (await getGalleryAlbums()).slice(0, 4);

  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero / bulletin */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-royal/20 blur-3xl motion-safe:animate-mesh-drift"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-signal/15 blur-3xl"
          />
          <div className="relative mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
            {featured ? (
              <div className="grid gap-10 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <LeadNewsCard article={featured} />
                </div>
                <div className="glass fade-in-up rounded-2xl p-5">
                  <h2 className="relative border-b border-navy/10 pb-3 font-heading text-xl font-bold text-navy">
                    Latest
                    <span className="absolute -bottom-[1px] left-0 h-0.5 w-10 rounded-full bg-royal" />
                  </h2>
                  <div className="divide-y divide-navy/5">
                    {latest.length > 0 ? (
                      latest.slice(0, 4).map((article) => (
                        <CompactNewsCard key={article.id} article={article} />
                      ))
                    ) : (
                      <p className="py-6 text-sm text-navy-dark/60">
                        More stories will appear here as they're published.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <EmptyState
                title="No news published yet"
                description="Once the admin dashboard is live, featured stories will appear here as they're published."
              />
            )}
          </div>
        </section>

        {/* Programs strip */}
        <section className="border-t border-navy/10">
          <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
            <SectionHeading title="On Air This Week" viewAllHref="/programs" />
            {programs.length > 0 ? (
              <div>
                {programs.map((program) => (
                  <ProgramCard key={program.id} program={program} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No programs scheduled yet"
                description="Program schedules added through the admin dashboard will be listed here."
              />
            )}
          </div>
        </section>

        {/* Featured videos */}
        <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <SectionHeading title="Featured Videos" viewAllHref="/videos" />
          {videos.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No videos published yet"
              description="Interviews, documentaries, and broadcasts will appear here once uploaded."
            />
          )}
        </section>

        {/* Gallery teaser */}
        <section className="border-t border-navy/10">
          <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
            <SectionHeading title="Photo Gallery" viewAllHref="/gallery" />
            {albums.length > 0 ? (
              <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
                {albums.map((album) => (
                  <GalleryAlbumCard key={album.id} album={album} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No albums published yet"
                description="Photos from official events and activities will appear here."
              />
            )}
          </div>
        </section>
      </main>
      <SubscribeSection />
      <SiteFooter />
    </>
  );
}
