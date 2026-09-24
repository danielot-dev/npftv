import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PoliceStationFinder from "@/components/PoliceStationFinder";
import { getSiteSettings } from "@/lib/data";

export const metadata: Metadata = { title: "Find a Police Station" };

export default async function FindPoliceStationPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
        <h1 className="mb-3 border-b-2 border-navy pb-3 font-heading text-3xl font-extrabold text-navy">
          Find a Police Station
        </h1>
        <p className="mb-8 max-w-3xl text-sm text-navy-dark/75">
          Search for the nearest police station or divisional headquarters to your location. In an
          emergency, call{" "}
          <span className="font-semibold text-navy">{settings?.emergencyPhone ?? "112"}</span> rather
          than waiting to travel to a station.
        </p>

        <PoliceStationFinder />
      </main>
      <SiteFooter />
    </>
  );
}
