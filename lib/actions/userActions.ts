"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/authGuard";
import type { ActionState } from "@/components/admin/ActionForm";

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function createStaffUser(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    await requireAdminSession();

    const name = str(formData, "name");
    const email = str(formData, "email").toLowerCase();
    const password = str(formData, "password");
    const role = str(formData, "role") as "ADMIN" | "EDITOR";

    if (!name || !email || !password) {
      return { error: "Name, email, and password are required." };
    }
    if (password.length < 8) {
      return { error: "Password must be at least 8 characters." };
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return { error: "A staff account with that email already exists." };
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: { name, email, passwordHash, role },
    });

    revalidatePath("/admin/users");
    return { success: `Staff account created for ${name}.` };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Something went wrong. Please try again." };
  }
}

export async function updateStaffRole(id: string, formData: FormData) {
  try {
    const session = await requireAdminSession();
    const role = str(formData, "role") as "ADMIN" | "EDITOR";

    if (session.user.id === id && role !== "ADMIN") {
      return;
    }

    await prisma.user.update({ where: { id }, data: { role } });
    revalidatePath("/admin/users");
  } catch {
    // Role-change UI has no inline error display — failing silently here
    // is safer than crashing the whole admin page to the error boundary.
  }
}

export async function deleteStaffUser(id: string) {
  try {
    const session = await requireAdminSession();
    if (session.user.id === id) return;

    await prisma.user.delete({ where: { id } });
    revalidatePath("/admin/users");
  } catch {
    // Same reasoning as updateStaffRole above.
  }
}
