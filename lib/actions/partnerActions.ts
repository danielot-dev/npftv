"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireStaffSession, requireAdminSession } from "@/lib/authGuard";
import type { ActionState } from "@/components/admin/ActionForm";

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function createPartner(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  try {
    await requireStaffSession();

    const name = str(formData, "name");
    const logoUrl = str(formData, "logoUrl") || null;
    const websiteUrl = str(formData, "websiteUrl") || null;
    const order = Number(str(formData, "order") || 0) || 0;
    const active = formData.get("active") === "on";

    if (!name) {
      return { error: "Partner name is required." };
    }

    await prisma.partner.create({
      data: { name, logoUrl, websiteUrl, order, active },
    });

    revalidatePath("/admin/partners");
    revalidatePath("/partners");
    revalidatePath("/");
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Something went wrong. Please try again." };
  }

  redirect("/admin/partners?success=Partner+created.");
}

export async function updatePartner(
  id: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    await requireStaffSession();

    const name = str(formData, "name");
    const logoUrl = str(formData, "logoUrl") || null;
    const websiteUrl = str(formData, "websiteUrl") || null;
    const order = Number(str(formData, "order") || 0) || 0;
    const active = formData.get("active") === "on";

    if (!name) {
      return { error: "Partner name is required." };
    }

    const current = await prisma.partner.findUnique({ where: { id } });
    if (!current) return { error: "Partner not found." };

    await prisma.partner.update({
      where: { id },
      data: { name, logoUrl, websiteUrl, order, active },
    });

    revalidatePath("/admin/partners");
    revalidatePath("/partners");
    revalidatePath("/");
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Something went wrong. Please try again." };
  }

  redirect("/admin/partners?success=Partner+updated.");
}

export async function deletePartner(id: string) {
  await requireAdminSession();
  await prisma.partner.delete({ where: { id } });
  revalidatePath("/admin/partners");
  revalidatePath("/partners");
  revalidatePath("/");
}
