import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "Stats and Data" };

// TODO(client): replace these placeholder figures with verified NPF data.
// Each entry renders as one stat card below. Update `value` and `label`
// (and `note` if you want a short caption under the number).
const HEADLINE_STATS: { value: string; label: string; note?: string }[] = [
  { value: "112", label: "Emergency line", note: "Toll-free, nationwide, 24/7" },
  { value: "36+FCT", label: "State commands", note: "Covering every state and the FCT" },
  { value: "24/7", label: "Operational response", note: "Round-the-clock duty rosters" },
];

// TODO(client): replace with a verified year-over-year dataset once
// available, or remove this section if not needed at launch.
const TREND_NOTE =
  "Detailed crime statistics and year-over-year trend data will be published here as they are verified and cleared for public release.";

export default function StatsAndDataPage() {
  return (
    <>
      <SiteHeader />
      <PageHero
        eyebrow="Transparency"
        title="Stats and Data"
        description="Key figures on the Nigeria Police Force's operations and public safety coverage. This page will expand as more verified datasets are cleared for publication."
      />
      <main className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-3">
          {HEADLINE_STATS.map((stat) => (
            <div key={stat.label} className="glass glass-hover fade-in-up rounded-2xl p-6 text-center">
              <p className="font-heading text-4xl font-extrabold text-royal-dark">{stat.value}</p>
              <p className="mt-2 font-heading text-sm font-semibold text-navy">{stat.label}</p>
              {stat.note && <p className="mt-1 text-xs text-navy-dark/60">{stat.note}</p>}
            </div>
          ))}
        </div>

        <div className="glass mt-10 rounded-2xl border-dashed border-navy/15 p-6">
          <h2 className="font-heading text-lg font-bold text-navy">Detailed data &amp; trends</h2>
          <p className="mt-2 text-sm text-navy-dark/70">{TREND_NOTE}</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
