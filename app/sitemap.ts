import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const BASE_URL = "https://npftv.net";

// Metadata route files (sitemap.ts, robots.ts) don't inherit the root
// layout's dynamic config — this needs its own, or it still tries to
// query the database at build time.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [news, videos, programs, albums, press] = await Promise.all([
    prisma.newsArticle.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true, updatedAt: true },
    }),
    prisma.video.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true, updatedAt: true },
    }),
    prisma.program.findMany({ where: { active: true }, select: { slug: true, updatedAt: true } }),
    prisma.galleryAlbum.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true, updatedAt: true },
    }),
    prisma.pressRelease.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true, updatedAt: true },
    }),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "hourly", priority: 1 },
    { url: `${BASE_URL}/news`, changeFrequency: "hourly", priority: 0.9 },
    { url: `${BASE_URL}/live`, changeFrequency: "always", priority: 0.9 },
    { url: `${BASE_URL}/videos`, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/programs`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/gallery`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/press-centre`, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = [
    ...news.map((n) => ({
      url: `${BASE_URL}/news/${n.slug}`,
      lastModified: n.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...videos.map((v) => ({
      url: `${BASE_URL}/videos/${v.slug}`,
      lastModified: v.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...programs.map((p) => ({
      url: `${BASE_URL}/programs/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    ...albums.map((a) => ({
      url: `${BASE_URL}/gallery/${a.slug}`,
      lastModified: a.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
    ...press.map((p) => ({
      url: `${BASE_URL}/press-centre/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
