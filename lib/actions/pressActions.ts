"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireStaffSession, requireAdminSession } from "@/lib/authGuard";
import { makeSlug, makeUniqueSlug } from "@/lib/slug";

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function createPressRelease(formData: FormData) {
  const session = await requireStaffSession();

  const title = str(formData, "title");
  const summary = str(formData, "summary");
  const body = str(formData, "body");
  const documentUrl = str(formData, "documentUrl") || null;
  const status = str(formData, "status") as "DRAFT" | "PUBLISHED" | "ARCHIVED";

  if (!title || !summary || !body) {
    throw new Error("Title, summary, and body are required.");
  }

  let slug = makeSlug(title);
  const existing = await prisma.pressRelease.findUnique({ where: { slug } });
  if (existing) slug = makeUniqueSlug(title);

  await prisma.pressRelease.create({
    data: {
      title,
      slug,
      summary,
      body,
      documentUrl,
      status,
      publishedAt: status === "PUBLISHED" ? new Date() : null,
      authorId: session.user.id,
    },
  });

  revalidatePath("/admin/press-releases");
  revalidatePath("/press-centre");
  redirect("/admin/press-releases");
}

export async function updatePressRelease(id: string, formData: FormData) {
  await requireStaffSession();

  const title = str(formData, "title");
  const summary = str(formData, "summary");
  const body = str(formData, "body");
  const documentUrl = str(formData, "documentUrl") || null;
  const status = str(formData, "status") as "DRAFT" | "PUBLISHED" | "ARCHIVED";

  if (!title || !summary || !body) {
    throw new Error("Title, summary, and body are required.");
  }

  const current = await prisma.pressRelease.findUnique({ where: { id } });
  if (!current) throw new Error("Press release not found.");

  await prisma.pressRelease.update({
    where: { id },
    data: {
      title,
      summary,
      body,
      documentUrl,
      status,
      publishedAt: status === "PUBLISHED" ? current.publishedAt ?? new Date() : current.publishedAt,
    },
  });

  revalidatePath("/admin/press-releases");
  revalidatePath(`/press-centre/${current.slug}`);
  revalidatePath("/press-centre");
  redirect("/admin/press-releases");
}

export async function deletePressRelease(id: string) {
  await requireAdminSession();
  const release = await prisma.pressRelease.delete({ where: { id } });
  revalidatePath("/admin/press-releases");
  revalidatePath(`/press-centre/${release.slug}`);
  revalidatePath("/press-centre");
}
