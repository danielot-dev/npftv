"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireStaffSession, requireAdminSession } from "@/lib/authGuard";
import { makeSlug, makeUniqueSlug } from "@/lib/slug";

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function createAlbum(formData: FormData) {
  await requireStaffSession();

  const title = str(formData, "title");
  const description = str(formData, "description") || null;
  const coverImage = str(formData, "coverImage") || null;
  const eventDateRaw = str(formData, "eventDate");
  const status = str(formData, "status") as "DRAFT" | "PUBLISHED" | "ARCHIVED";

  if (!title) {
    throw new Error("Title is required.");
  }

  let slug = makeSlug(title);
  const existing = await prisma.galleryAlbum.findUnique({ where: { slug } });
  if (existing) slug = makeUniqueSlug(title);

  const album = await prisma.galleryAlbum.create({
    data: {
      title,
      slug,
      description,
      coverImage,
      eventDate: eventDateRaw ? new Date(eventDateRaw) : null,
      status,
    },
  });

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  // Go straight to the edit page so photos can be added right away
  redirect(`/admin/gallery/${album.id}`);
}

export async function updateAlbum(id: string, formData: FormData) {
  await requireStaffSession();

  const title = str(formData, "title");
  const description = str(formData, "description") || null;
  const coverImage = str(formData, "coverImage") || null;
  const eventDateRaw = str(formData, "eventDate");
  const status = str(formData, "status") as "DRAFT" | "PUBLISHED" | "ARCHIVED";

  if (!title) {
    throw new Error("Title is required.");
  }

  const current = await prisma.galleryAlbum.findUnique({ where: { id } });
  if (!current) throw new Error("Album not found.");

  await prisma.galleryAlbum.update({
    where: { id },
    data: {
      title,
      description,
      coverImage,
      eventDate: eventDateRaw ? new Date(eventDateRaw) : null,
      status,
    },
  });

  revalidatePath("/admin/gallery");
  revalidatePath(`/gallery/${current.slug}`);
  revalidatePath("/gallery");
  redirect("/admin/gallery");
}

export async function deleteAlbum(id: string) {
  await requireAdminSession();
  const album = await prisma.galleryAlbum.delete({ where: { id } });
  revalidatePath("/admin/gallery");
  revalidatePath(`/gallery/${album.slug}`);
  revalidatePath("/gallery");
}

export async function addImageToAlbum(albumId: string, formData: FormData) {
  await requireStaffSession();

  const url = str(formData, "url");
  const caption = str(formData, "caption") || null;

  if (!url) {
    throw new Error("Upload an image before adding it.");
  }

  const album = await prisma.galleryAlbum.findUnique({ where: { id: albumId } });
  if (!album) throw new Error("Album not found.");

  const count = await prisma.galleryImage.count({ where: { albumId } });

  await prisma.galleryImage.create({
    data: { albumId, url, caption, order: count },
  });

  // If the album has no cover yet, use this as the default
  if (!album.coverImage) {
    await prisma.galleryAlbum.update({ where: { id: albumId }, data: { coverImage: url } });
  }

  revalidatePath(`/admin/gallery/${albumId}`);
  revalidatePath(`/gallery/${album.slug}`);
  revalidatePath("/gallery");
}

export async function deleteImage(albumId: string, imageId: string) {
  await requireStaffSession();
  await prisma.galleryImage.delete({ where: { id: imageId } });

  const album = await prisma.galleryAlbum.findUnique({ where: { id: albumId } });

  revalidatePath(`/admin/gallery/${albumId}`);
  if (album) {
    revalidatePath(`/gallery/${album.slug}`);
    revalidatePath("/gallery");
  }
}
