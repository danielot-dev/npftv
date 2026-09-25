import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import ReportForm from "@/components/ReportForm";
import { getSiteSettings } from "@/lib/data";

export const metadata: Metadata = { title: "Report" };

export default async function ReportPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <SiteHeader />
      <PageHero
        eyebrow="Speak Up"
        title="Report"
        description="Report a crime, incident, or concern — anonymously if you prefer. All reports are reviewed by our team."
      />
      <main className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="glass fade-in-up rounded-2xl border-l-4 border-signal p-6">
              <h2 className="font-heading text-lg font-bold text-navy">Emergency in progress?</h2>
              <p className="mt-3 font-condensed text-3xl font-bold text-signal">
                {settings?.emergencyPhone ?? "112"}
              </p>
              <p className="mt-1 text-sm text-navy-dark/70">
                Call now — do not use this form for emergencies in progress.
              </p>
            </div>

            <div className="glass mt-6 rounded-2xl p-6">
              <h2 className="font-heading text-lg font-bold text-navy">About this form</h2>
              <p className="mt-2 text-sm text-navy-dark/75">
                Use this form to report a crime, incident, or concern that is not an active emergency.
                You may report anonymously. All reports are reviewed by our team.
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h2 className="mb-4 font-heading text-lg font-bold text-navy">Submit a report</h2>
            <ReportForm />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
