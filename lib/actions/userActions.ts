"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/authGuard";

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function createStaffUser(formData: FormData) {
  await requireAdminSession();

  const name = str(formData, "name");
  const email = str(formData, "email").toLowerCase();
  const password = str(formData, "password");
  const role = str(formData, "role") as "ADMIN" | "EDITOR";

  if (!name || !email || !password) {
    throw new Error("Name, email, and password are required.");
  }
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters.");
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new Error("A staff account with that email already exists.");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: { name, email, passwordHash, role },
  });

  revalidatePath("/admin/users");
}

export async function updateStaffRole(id: string, formData: FormData) {
  const session = await requireAdminSession();
  const role = str(formData, "role") as "ADMIN" | "EDITOR";

  if (session.user.id === id && role !== "ADMIN") {
    throw new Error("You can't remove your own admin access.");
  }

  await prisma.user.update({ where: { id }, data: { role } });
  revalidatePath("/admin/users");
}

export async function deleteStaffUser(id: string) {
  const session = await requireAdminSession();

  if (session.user.id === id) {
    throw new Error("You can't delete your own account while signed in.");
  }

  await prisma.user.delete({ where: { id } });
  revalidatePath("/admin/users");
}
