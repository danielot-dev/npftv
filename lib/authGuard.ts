import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * Throws if there's no logged-in staff session. Every content mutation
 * (news, videos, programs, etc.) goes through this first — both EDITOR
 * and ADMIN roles pass.
 */
export async function requireStaffSession() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error("You must be signed in to do this.");
  }
  return session;
}

/**
 * Throws unless the signed-in user is an ADMIN. Used for actions only
 * admins should do — managing other staff accounts, deleting things
 * permanently, etc.
 */
export async function requireAdminSession() {
  const session = await requireStaffSession();
  if (session.user.role !== "ADMIN") {
    throw new Error("Only admins can do this.");
  }
  return session;
}
