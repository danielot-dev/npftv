"use server";

import { randomBytes } from "crypto";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export type SubscribeResult =
  | { success: true; email: string; token: string }
  | { success: false; error: string };

export async function subscribeToNewsletter(email: string): Promise<SubscribeResult> {
  const trimmed = email.trim().toLowerCase();

  if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return { success: false, error: "Enter a valid email address." };
  }

  const existing = await prisma.subscriber.findUnique({ where: { email: trimmed } });

  if (existing) {
    if (existing.active) {
      return { success: false, error: "This email is already subscribed." };
    }
    // Re-subscribing after a previous unsubscribe
    await prisma.subscriber.update({ where: { id: existing.id }, data: { active: true } });
    revalidatePath("/admin/subscribers");
    return { success: true, email: trimmed, token: existing.token };
  }

  const token = randomBytes(16).toString("hex");
  await prisma.subscriber.create({ data: { email: trimmed, token } });
  revalidatePath("/admin/subscribers");

  return { success: true, email: trimmed, token };
}

export async function unsubscribe(email: string, token: string) {
  const subscriber = await prisma.subscriber.findUnique({ where: { email: email.toLowerCase() } });

  if (!subscriber || subscriber.token !== token) {
    return { success: false as const, error: "Invalid or expired unsubscribe link." };
  }

  await prisma.subscriber.update({ where: { id: subscriber.id }, data: { active: false } });
  revalidatePath("/admin/subscribers");
  return { success: true as const };
}
