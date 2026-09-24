import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
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
      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="border-b-2 border-navy pb-6">
          <h1 className="font-heading text-3xl font-extrabold text-navy">{program.name}</h1>
          <p className="mt-2 max-w-2xl text-navy-dark/75">{program.description}</p>
          {(program.dayOfWeek || program.time) && (
            <p className="mt-3 font-condensed text-lg font-semibold text-royal-dark">
              Airs {program.dayOfWeek} {program.time}
            </p>
          )}
        </div>

        <h2 className="mb-6 mt-10 font-heading text-xl font-bold text-navy">Episodes</h2>
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
