"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireStaffSession } from "@/lib/authGuard";

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim() || null;
}

export async function updateSiteSettings(formData: FormData) {
  await requireStaffSession();

  const data = {
    emergencyPhone: str(formData, "emergencyPhone"),
    emergencyEmail: str(formData, "emergencyEmail"),
    facebookUrl: str(formData, "facebookUrl"),
    twitterUrl: str(formData, "twitterUrl"),
    instagramUrl: str(formData, "instagramUrl"),
    youtubeUrl: str(formData, "youtubeUrl"),
    tiktokUrl: str(formData, "tiktokUrl"),
  };

  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: data,
    create: { id: "singleton", ...data },
  });

  // Footer (every page) and the contact page both read these values
  revalidatePath("/", "layout");
  revalidatePath("/contact");
}
