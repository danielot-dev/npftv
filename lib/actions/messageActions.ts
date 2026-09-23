"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireStaffSession, requireAdminSession } from "@/lib/authGuard";

export async function markMessageRead(id: string) {
  try {
    await requireStaffSession();
    await prisma.contactMessage.update({ where: { id }, data: { read: true } });
    revalidatePath("/admin/messages");
  } catch {
    // Safe no-op — avoids crashing the page on a stale/expired session.
  }
}

export async function deleteMessage(id: string) {
  try {
    await requireAdminSession();
    await prisma.contactMessage.delete({ where: { id } });
    revalidatePath("/admin/messages");
  } catch {
    // No inline error UI on delete buttons — failing silently (e.g. an
    // Editor without delete rights) is safer than crashing the page.
  }
}
