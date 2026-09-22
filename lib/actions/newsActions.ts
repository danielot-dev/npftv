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

export async function createNews(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  try {
    const session = await requireStaffSession();

    const title = str(formData, "title");
    const excerpt = str(formData, "excerpt");
    const body = str(formData, "body");
    const category = str(formData, "category") || "General";
    const coverImage = str(formData, "coverImage") || null;
    const status = str(formData, "status") as "DRAFT" | "PUBLISHED" | "ARCHIVED";
    const featured = formData.get("featured") === "on";

    if (!title || !excerpt || !body) {
      return { error: "Title, excerpt, and body are required." };
    }

    let slug = makeSlug(title);
    const existing = await prisma.newsArticle.findUnique({ where: { slug } });
    if (existing) slug = makeUniqueSlug(title);

    // Only one featured story at a time on the homepage
    if (featured) {
      await prisma.newsArticle.updateMany({ where: { featured: true }, data: { featured: false } });
    }

    await prisma.newsArticle.create({
      data: {
        title,
        slug,
        excerpt,
        body,
        category,
        coverImage,
        status,
        featured,
        publishedAt: status === "PUBLISHED" ? new Date() : null,
        authorId: session.user.id,
      },
    });

    revalidatePath("/admin/news");
    revalidatePath("/news");
    revalidatePath("/");
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Something went wrong. Please try again." };
  }

  redirect("/admin/news?success=Article+created.");
}

export async function updateNews(
  id: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    await requireStaffSession();

    const title = str(formData, "title");
    const excerpt = str(formData, "excerpt");
    const body = str(formData, "body");
    const category = str(formData, "category") || "General";
    const coverImage = str(formData, "coverImage") || null;
    const status = str(formData, "status") as "DRAFT" | "PUBLISHED" | "ARCHIVED";
    const featured = formData.get("featured") === "on";

    if (!title || !excerpt || !body) {
      return { error: "Title, excerpt, and body are required." };
    }

    const current = await prisma.newsArticle.findUnique({ where: { id } });
    if (!current) return { error: "Article not found." };

    if (featured && !current.featured) {
      await prisma.newsArticle.updateMany({ where: { featured: true }, data: { featured: false } });
    }

    await prisma.newsArticle.update({
      where: { id },
      data: {
        title,
        excerpt,
        body,
        category,
        coverImage,
        status,
        featured,
        publishedAt: status === "PUBLISHED" ? current.publishedAt ?? new Date() : current.publishedAt,
      },
    });

    revalidatePath("/admin/news");
    revalidatePath(`/news/${current.slug}`);
    revalidatePath("/news");
    revalidatePath("/");
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Something went wrong. Please try again." };
  }

  redirect("/admin/news?success=Article+updated.");
}

export async function deleteNews(id: string) {
  await requireAdminSession();
  const article = await prisma.newsArticle.delete({ where: { id } });
  revalidatePath("/admin/news");
  revalidatePath(`/news/${article.slug}`);
  revalidatePath("/");
}
