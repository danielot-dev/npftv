import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import VideoCard from "@/components/VideoCard";
import EmptyState from "@/components/EmptyState";
import { getProgramBySlug } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const program = await getProgramBySlug(params.slug);
  if (!program) return {};
  return {
    title: program.name,
    description: program.description,
    alternates: { canonical: `/programs/${program.slug}` },
    openGraph: {
      title: program.name,
      description: program.description,
      url: `/programs/${program.slug}`,
    },
  };
}

export default async function ProgramDetailPage({ params }: { params: { slug: string } }) {
  const program = await getProgramBySlug(params.slug);
  if (!program) notFound();

  return (
    <>
      <SiteHeader />
      <PageHero
        eyebrow={program.dayOfWeek || program.time ? `Airs ${program.dayOfWeek ?? ""} ${program.time ?? ""}`.trim() : "Program"}
        title={program.name}
        description={program.description}
      />
      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <h2 className="mb-6 font-heading text-xl font-bold text-navy">Episodes</h2>
        {program.videos.length === 0 ? (
          <EmptyState
            title="No episodes published yet"
            description="Episodes of this program will appear here once uploaded."
          />
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {program.videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
