import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import PressReleaseRow from "@/components/PressReleaseRow";
import EmptyState from "@/components/EmptyState";
import { getPressReleases } from "@/lib/data";

export const metadata: Metadata = { title: "Press Centre" };

export default async function PressCentrePage() {
  const releases = await getPressReleases();

  return (
    <>
      <SiteHeader />
      <PageHero
        eyebrow="Official"
        title="Press Centre"
        description="Official statements, press releases, and media resources from the Nigeria Police Force."
      />
      <main className="mx-auto max-w-3xl px-4 py-10 lg:px-8">
        {releases.length === 0 ? (
          <EmptyState
            title="No statements published yet"
            description="Official press releases and statements will be listed here."
          />
        ) : (
          <div>
            {releases.map((release) => (
              <PressReleaseRow key={release.id} release={release} />
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
