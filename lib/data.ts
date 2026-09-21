import { prisma } from "@/lib/prisma";

const PUBLISHED = { status: "PUBLISHED" as const };

// ---- News ----

export async function getFeaturedNews() {
  return prisma.newsArticle.findFirst({
    where: { ...PUBLISHED, featured: true },
    orderBy: { publishedAt: "desc" },
  });
}

export async function getLatestNews(take = 6, excludeId?: string) {
  return prisma.newsArticle.findMany({
    where: { ...PUBLISHED, ...(excludeId ? { id: { not: excludeId } } : {}) },
    orderBy: { publishedAt: "desc" },
    take,
  });
}

export async function getNewsBySlug(slug: string) {
  return prisma.newsArticle.findFirst({
    where: { slug, ...PUBLISHED },
    include: { author: { select: { name: true } } },
  });
}

export async function getAllPublishedNews() {
  return prisma.newsArticle.findMany({
    where: PUBLISHED,
    orderBy: { publishedAt: "desc" },
  });
}

export async function getNewsCategories() {
  const rows = await prisma.newsArticle.groupBy({
    by: ["category"],
    where: PUBLISHED,
    _count: { category: true },
    orderBy: { _count: { category: "desc" } },
  });
  return rows.map((r) => ({ category: r.category, count: r._count.category }));
}

export async function getNewsByCategory(category: string) {
  return prisma.newsArticle.findMany({
    where: { ...PUBLISHED, category },
    orderBy: { publishedAt: "desc" },
  });
}

// ---- Videos ----

export async function getFeaturedVideos(take = 4) {
  return prisma.video.findMany({
    where: { ...PUBLISHED, featured: true },
    orderBy: { publishedAt: "desc" },
    take,
  });
}

export async function getAllVideos() {
  return prisma.video.findMany({
    where: PUBLISHED,
    orderBy: { publishedAt: "desc" },
    include: { program: { select: { name: true, slug: true } } },
  });
}

export async function getVideoBySlug(slug: string) {
  return prisma.video.findFirst({
    where: { slug, ...PUBLISHED },
    include: { program: { select: { name: true, slug: true } } },
  });
}

// ---- Programs ----

export async function getActivePrograms() {
  return prisma.program.findMany({
    where: { active: true },
    orderBy: { name: "asc" },
  });
}

export async function getProgramBySlug(slug: string) {
  return prisma.program.findFirst({
    where: { slug },
    include: {
      videos: {
        where: PUBLISHED,
        orderBy: { publishedAt: "desc" },
      },
    },
  });
}

// ---- Gallery ----

export async function getGalleryAlbums() {
  return prisma.galleryAlbum.findMany({
    where: PUBLISHED,
    orderBy: { eventDate: "desc" },
    include: { images: { take: 1, orderBy: { order: "asc" } } },
  });
}

export async function getGalleryAlbumBySlug(slug: string) {
  return prisma.galleryAlbum.findFirst({
    where: { slug, ...PUBLISHED },
    include: { images: { orderBy: { order: "asc" } } },
  });
}

// ---- Press releases ----

export async function getPressReleases() {
  return prisma.pressRelease.findMany({
    where: PUBLISHED,
    orderBy: { publishedAt: "desc" },
  });
}

export async function getPressReleaseBySlug(slug: string) {
  return prisma.pressRelease.findFirst({
    where: { slug, ...PUBLISHED },
  });
}

// ---- Announcements (used on homepage ticker) ----

export async function getActiveAnnouncements() {
  const now = new Date();
  return prisma.announcement.findMany({
    where: {
      status: "PUBLISHED",
      OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
    },
    orderBy: [{ priority: "desc" }, { publishedAt: "desc" }],
    take: 8,
  });
}

// ---- Site settings ----

export async function getSiteSettings() {
  return prisma.siteSettings.findUnique({ where: { id: "singleton" } });
}

// ---- Live stream ----

export async function getLiveStream() {
  return prisma.liveStream.findFirst({ orderBy: { updatedAt: "desc" } });
}

// ---- Search ----

export async function searchSite(query: string) {
  if (!query.trim()) {
    return { news: [], videos: [], programs: [], press: [] };
  }

  const [news, videos, programs, press] = await Promise.all([
    prisma.newsArticle.findMany({
      where: {
        ...PUBLISHED,
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { excerpt: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 10,
      orderBy: { publishedAt: "desc" },
    }),
    prisma.video.findMany({
      where: {
        ...PUBLISHED,
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 10,
      orderBy: { publishedAt: "desc" },
    }),
    prisma.program.findMany({
      where: {
        active: true,
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 10,
    }),
    prisma.pressRelease.findMany({
      where: {
        ...PUBLISHED,
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { summary: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 10,
      orderBy: { publishedAt: "desc" },
    }),
  ]);

  return { news, videos, programs, press };
}
