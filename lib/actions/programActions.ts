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

export async function createProgram(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  try {
    await requireStaffSession();

    const name = str(formData, "name");
    const description = str(formData, "description");
    const dayOfWeek = str(formData, "dayOfWeek") || null;
    const time = str(formData, "time") || null;
    const coverImage = str(formData, "coverImage") || null;
    const active = formData.get("active") === "on";

    if (!name || !description) {
      return { error: "Name and description are required." };
    }

    let slug = makeSlug(name);
    const existing = await prisma.program.findUnique({ where: { slug } });
    if (existing) slug = makeUniqueSlug(name);

    await prisma.program.create({
      data: { name, slug, description, dayOfWeek, time, coverImage, active },
    });

    revalidatePath("/admin/programs");
    revalidatePath("/programs");
    revalidatePath("/live");
    revalidatePath("/");
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Something went wrong. Please try again." };
  }

  redirect("/admin/programs?success=Program+created.");
}

export async function updateProgram(
  id: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    await requireStaffSession();

    const name = str(formData, "name");
    const description = str(formData, "description");
    const dayOfWeek = str(formData, "dayOfWeek") || null;
    const time = str(formData, "time") || null;
    const coverImage = str(formData, "coverImage") || null;
    const active = formData.get("active") === "on";

    if (!name || !description) {
      return { error: "Name and description are required." };
    }

    const current = await prisma.program.findUnique({ where: { id } });
    if (!current) return { error: "Program not found." };

    await prisma.program.update({
      where: { id },
      data: { name, description, dayOfWeek, time, coverImage, active },
    });

    revalidatePath("/admin/programs");
    revalidatePath(`/programs/${current.slug}`);
    revalidatePath("/programs");
    revalidatePath("/live");
    revalidatePath("/");
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Something went wrong. Please try again." };
  }

  redirect("/admin/programs?success=Program+updated.");
}

export async function deleteProgram(id: string) {
  await requireAdminSession();
  const program = await prisma.program.delete({ where: { id } });
  revalidatePath("/admin/programs");
  revalidatePath(`/programs/${program.slug}`);
  revalidatePath("/live");
  revalidatePath("/");
}
