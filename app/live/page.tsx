import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ScheduleSidebar from "@/components/ScheduleSidebar";
import { getLiveStream, getActivePrograms } from "@/lib/data";

export const metadata: Metadata = { title: "Live TV" };

export default async function LivePage() {
  const [stream, programs] = await Promise.all([getLiveStream(), getActivePrograms()]);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-navy/10 pb-4">
          <h1 className="font-heading text-3xl font-extrabold text-navy">Live TV</h1>
          {stream?.isLive && <span className="live-badge shadow-glow">On Air Now</span>}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {stream?.isLive ? (
              <>
                <div className="glass aspect-video w-full overflow-hidden rounded-2xl p-2">
                  <iframe
                    className="h-full w-full rounded-xl"
                    src={`https://www.youtube.com/embed/${stream.youtubeId}?autoplay=1`}
                    title={stream.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <h2 className="mt-4 font-heading text-xl font-bold text-navy">{stream.title}</h2>
              </>
            ) : (
              <div className="glass flex aspect-video w-full flex-col items-center justify-center rounded-2xl border-dashed border-navy/20 px-6 text-center">
                <h2 className="font-heading text-xl font-semibold text-navy">
                  NPF TV is currently off air
                </h2>
                <p className="mx-auto mt-2 max-w-md text-sm text-navy-dark/70">
                  {stream?.scheduledAt
                    ? `The next broadcast is scheduled for ${new Date(
                        stream.scheduledAt
                      ).toLocaleString("en-NG", { dateStyle: "full", timeStyle: "short" })}.`
                    : "See the schedule alongside for upcoming broadcasts."}
                </p>
              </div>
            )}
          </div>

          <div>
            <ScheduleSidebar programs={programs} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
