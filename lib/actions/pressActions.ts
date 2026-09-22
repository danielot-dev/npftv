"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireStaffSession, requireAdminSession } from "@/lib/authGuard";
import { makeSlug, makeUniqueSlug } from "@/lib/slug";
import type { ActionState } from "@/components/admin/ActionForm";

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function createPressRelease(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  try {
    const session = await requireStaffSession();

    const title = str(formData, "title");
    const summary = str(formData, "summary");
    const body = str(formData, "body");
    const documentUrl = str(formData, "documentUrl") || null;
    const status = str(formData, "status") as "DRAFT" | "PUBLISHED" | "ARCHIVED";

    if (!title || !summary || !body) {
      return { error: "Title, summary, and body are required." };
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
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Something went wrong. Please try again." };
  }

  redirect("/admin/press-releases?success=Press+release+created.");
}

export async function updatePressRelease(
  id: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    await requireStaffSession();

    const title = str(formData, "title");
    const summary = str(formData, "summary");
    const body = str(formData, "body");
    const documentUrl = str(formData, "documentUrl") || null;
    const status = str(formData, "status") as "DRAFT" | "PUBLISHED" | "ARCHIVED";

    if (!title || !summary || !body) {
      return { error: "Title, summary, and body are required." };
    }

    const current = await prisma.pressRelease.findUnique({ where: { id } });
    if (!current) return { error: "Press release not found." };

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
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Something went wrong. Please try again." };
  }

  redirect("/admin/press-releases?success=Press+release+updated.");
}

export async function deletePressRelease(id: string) {
  await requireAdminSession();
  const release = await prisma.pressRelease.delete({ where: { id } });
  revalidatePath("/admin/press-releases");
  revalidatePath(`/press-centre/${release.slug}`);
  revalidatePath("/press-centre");
}
