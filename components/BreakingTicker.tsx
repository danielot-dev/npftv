import { getActiveAnnouncements } from "@/lib/data";

export default async function BreakingTicker() {
  const announcements = await getActiveAnnouncements();

  if (announcements.length === 0) return null;

  const items = [...announcements, ...announcements]; // duplicate for seamless loop

  return (
    <div className="overflow-hidden border-b border-gold/40 bg-navy">
      <div className="mx-auto flex max-w-7xl items-stretch">
        <div className="flex shrink-0 items-center gap-2 bg-crimson px-4 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-white motion-safe:animate-pulse" />
          <span className="font-condensed text-sm font-semibold uppercase tracking-wide text-white">
            Notice
          </span>
        </div>
        <div className="group relative flex-1 overflow-hidden">
          <div className="ticker-track flex whitespace-nowrap py-2 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            {items.map((a, i) => (
              <span key={`${a.id}-${i}`} className="mx-6 text-sm text-white/90">
                {a.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
