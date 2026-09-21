"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireStaffSession } from "@/lib/authGuard";

export async function deactivateSubscriber(id: string) {
  await requireStaffSession();
  await prisma.subscriber.update({ where: { id }, data: { active: false } });
  revalidatePath("/admin/subscribers");
}
