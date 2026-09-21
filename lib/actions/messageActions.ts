"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireStaffSession, requireAdminSession } from "@/lib/authGuard";

export async function markMessageRead(id: string) {
  await requireStaffSession();
  await prisma.contactMessage.update({ where: { id }, data: { read: true } });
  revalidatePath("/admin/messages");
}

export async function deleteMessage(id: string) {
  await requireAdminSession();
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/messages");
}
