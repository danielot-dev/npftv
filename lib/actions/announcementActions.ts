"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireStaffSession, requireAdminSession } from "@/lib/authGuard";
import type { ActionState } from "@/components/admin/ActionForm";

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function createAnnouncement(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const session = await requireStaffSession();

    const title = str(formData, "title");
    const body = str(formData, "body");
    const priority = Number(str(formData, "priority") || "0");
    const status = str(formData, "status") as "DRAFT" | "PUBLISHED" | "ARCHIVED";
    const expiresAtRaw = str(formData, "expiresAt");

    if (!title || !body) {
      return { error: "Title and body are required." };
    }

    await prisma.announcement.create({
      data: {
        title,
        body,
        priority: Number.isFinite(priority) ? priority : 0,
        status,
        publishedAt: status === "PUBLISHED" ? new Date() : null,
        expiresAt: expiresAtRaw ? new Date(expiresAtRaw) : null,
        authorId: session.user.id,
      },
    });

    revalidatePath("/admin/announcements");
    revalidatePath("/");
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Something went wrong. Please try again." };
  }

  redirect("/admin/announcements?success=Announcement+created.");
}

export async function updateAnnouncement(
  id: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    await requireStaffSession();

    const title = str(formData, "title");
    const body = str(formData, "body");
    const priority = Number(str(formData, "priority") || "0");
    const status = str(formData, "status") as "DRAFT" | "PUBLISHED" | "ARCHIVED";
    const expiresAtRaw = str(formData, "expiresAt");

    if (!title || !body) {
      return { error: "Title and body are required." };
    }

    const current = await prisma.announcement.findUnique({ where: { id } });
    if (!current) return { error: "Announcement not found." };

    await prisma.announcement.update({
      where: { id },
      data: {
        title,
        body,
        priority: Number.isFinite(priority) ? priority : 0,
        status,
        publishedAt: status === "PUBLISHED" ? current.publishedAt ?? new Date() : current.publishedAt,
        expiresAt: expiresAtRaw ? new Date(expiresAtRaw) : null,
      },
    });

    revalidatePath("/admin/announcements");
    revalidatePath("/");
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Something went wrong. Please try again." };
  }

  redirect("/admin/announcements?success=Announcement+updated.");
}

export async function deleteAnnouncement(id: string) {
  await requireAdminSession();
  await prisma.announcement.delete({ where: { id } });
  revalidatePath("/admin/announcements");
  revalidatePath("/");
}
