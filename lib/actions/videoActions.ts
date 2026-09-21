"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireStaffSession, requireAdminSession } from "@/lib/authGuard";
import { makeSlug, makeUniqueSlug } from "@/lib/slug";

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function createVideo(formData: FormData) {
  const session = await requireStaffSession();

  const title = str(formData, "title");
  const description = str(formData, "description");
  const youtubeId = str(formData, "youtubeId");
  const category = str(formData, "category") || "Programs";
  const thumbnail = str(formData, "thumbnail") || null;
  const status = str(formData, "status") as "DRAFT" | "PUBLISHED" | "ARCHIVED";
  const featured = formData.get("featured") === "on";
  const programId = str(formData, "programId") || null;

  if (!title || !description || !youtubeId) {
    throw new Error("Title, description, and YouTube ID are required.");
  }

  let slug = makeSlug(title);
  const existing = await prisma.video.findUnique({ where: { slug } });
  if (existing) slug = makeUniqueSlug(title);

  await prisma.video.create({
    data: {
      title,
      slug,
      description,
      youtubeId,
      category,
      thumbnail,
      status,
      featured,
      programId,
      publishedAt: status === "PUBLISHED" ? new Date() : null,
      uploaderId: session.user.id,
    },
  });

  revalidatePath("/admin/videos");
  revalidatePath("/videos");
  revalidatePath("/");
  redirect("/admin/videos");
}

export async function updateVideo(id: string, formData: FormData) {
  await requireStaffSession();

  const title = str(formData, "title");
  const description = str(formData, "description");
  const youtubeId = str(formData, "youtubeId");
  const category = str(formData, "category") || "Programs";
  const thumbnail = str(formData, "thumbnail") || null;
  const status = str(formData, "status") as "DRAFT" | "PUBLISHED" | "ARCHIVED";
  const featured = formData.get("featured") === "on";
  const programId = str(formData, "programId") || null;

  if (!title || !description || !youtubeId) {
    throw new Error("Title, description, and YouTube ID are required.");
  }

  const current = await prisma.video.findUnique({ where: { id } });
  if (!current) throw new Error("Video not found.");

  await prisma.video.update({
    where: { id },
    data: {
      title,
      description,
      youtubeId,
      category,
      thumbnail,
      status,
      featured,
      programId,
      publishedAt: status === "PUBLISHED" ? current.publishedAt ?? new Date() : current.publishedAt,
    },
  });

  revalidatePath("/admin/videos");
  revalidatePath(`/videos/${current.slug}`);
  revalidatePath("/videos");
  revalidatePath("/");
  redirect("/admin/videos");
}

export async function deleteVideo(id: string) {
  await requireAdminSession();
  const video = await prisma.video.delete({ where: { id } });
  revalidatePath("/admin/videos");
  revalidatePath(`/videos/${video.slug}`);
  revalidatePath("/");
}
