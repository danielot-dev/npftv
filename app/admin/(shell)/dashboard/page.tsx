import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [newsCount, videoCount, announcementCount, pressCount, programCount, albumCount, stream] =
    await Promise.all([
      prisma.newsArticle.count(),
      prisma.video.count(),
      prisma.announcement.count(),
      prisma.pressRelease.count(),
      prisma.program.count(),
      prisma.galleryAlbum.count(),
      prisma.liveStream.findFirst({ orderBy: { updatedAt: "desc" } }),
    ]);

  const cards = [
    { label: "News Articles", count: newsCount, href: "/admin/news" },
    { label: "Videos", count: videoCount, href: "/admin/videos" },
    { label: "Programs", count: programCount, href: "/admin/programs" },
    { label: "Gallery Albums", count: albumCount, href: "/admin/gallery" },
    { label: "Press Releases", count: pressCount, href: "/admin/press-releases" },
    { label: "Announcements", count: announcementCount, href: "/admin/announcements" },
  ];

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-bold text-navy">Dashboard</h1>

      <a
        href="/admin/live"
        className={`mb-6 flex items-center justify-between rounded-lg border px-5 py-4 transition hover:border-gold ${
          stream?.isLive ? "border-crimson bg-crimson/5" : "border-navy/20 bg-white"
        }`}
      >
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gold-dark">
            Live TV Status
          </p>
          <p className="mt-1 font-heading text-lg font-bold text-navy">
            {stream?.isLive ? "Currently ON AIR" : "Off air"}
          </p>
        </div>
        {stream?.isLive && <span className="live-badge">Live</span>}
      </a>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <a
            key={card.label}
            href={card.href}
            className="rounded-lg border border-gold/40 bg-white p-6 transition hover:border-gold"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-gold-dark">
              {card.label}
            </p>
            <p className="mt-2 font-heading text-3xl font-bold text-navy">{card.count}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
