import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import PoliceStationFinder from "@/components/PoliceStationFinder";
import { getSiteSettings } from "@/lib/data";

export const metadata: Metadata = { title: "Find a Police Station" };

export default async function FindPoliceStationPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <SiteHeader />
      <PageHero
        eyebrow="Locate"
        title="Find a Police Station"
        description={`Search for the nearest police station or divisional headquarters to your location. In an emergency, call ${settings?.emergencyPhone ?? "112"} rather than waiting to travel to a station.`}
      />
      <main className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
        <PoliceStationFinder />
      </main>
      <SiteFooter />
    </>
  );
}
