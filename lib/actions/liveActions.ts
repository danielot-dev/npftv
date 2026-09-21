"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireStaffSession } from "@/lib/authGuard";

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function updateLiveStream(formData: FormData) {
  await requireStaffSession();

  const title = str(formData, "title");
  const youtubeId = str(formData, "youtubeId");
  const isLive = formData.get("isLive") === "on";
  const scheduledAtRaw = str(formData, "scheduledAt");

  if (!title || !youtubeId) {
    throw new Error("Title and YouTube ID are required.");
  }

  const existing = await prisma.liveStream.findFirst({ orderBy: { updatedAt: "desc" } });

  const data = {
    title,
    youtubeId,
    isLive,
    scheduledAt: scheduledAtRaw ? new Date(scheduledAtRaw) : null,
  };

  if (existing) {
    await prisma.liveStream.update({ where: { id: existing.id }, data });
  } else {
    await prisma.liveStream.create({ data });
  }

  // The header badge and /live page both read live status on every request
  revalidatePath("/", "layout");
  revalidatePath("/live");
  redirect("/admin/live");
}
