"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireStaffSession, requireAdminSession } from "@/lib/authGuard";
import { makeSlug, makeUniqueSlug } from "@/lib/slug";

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function createProgram(formData: FormData) {
  await requireStaffSession();

  const name = str(formData, "name");
  const description = str(formData, "description");
  const dayOfWeek = str(formData, "dayOfWeek") || null;
  const time = str(formData, "time") || null;
  const coverImage = str(formData, "coverImage") || null;
  const active = formData.get("active") === "on";

  if (!name || !description) {
    throw new Error("Name and description are required.");
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
  redirect("/admin/programs");
}

export async function updateProgram(id: string, formData: FormData) {
  await requireStaffSession();

  const name = str(formData, "name");
  const description = str(formData, "description");
  const dayOfWeek = str(formData, "dayOfWeek") || null;
  const time = str(formData, "time") || null;
  const coverImage = str(formData, "coverImage") || null;
  const active = formData.get("active") === "on";

  if (!name || !description) {
    throw new Error("Name and description are required.");
  }

  const current = await prisma.program.findUnique({ where: { id } });
  if (!current) throw new Error("Program not found.");

  await prisma.program.update({
    where: { id },
    data: { name, description, dayOfWeek, time, coverImage, active },
  });

  revalidatePath("/admin/programs");
  revalidatePath(`/programs/${current.slug}`);
  revalidatePath("/programs");
  revalidatePath("/live");
  revalidatePath("/");
  redirect("/admin/programs");
}

export async function deleteProgram(id: string) {
  await requireAdminSession();
  const program = await prisma.program.delete({ where: { id } });
  revalidatePath("/admin/programs");
  revalidatePath(`/programs/${program.slug}`);
  revalidatePath("/live");
  revalidatePath("/");
}
