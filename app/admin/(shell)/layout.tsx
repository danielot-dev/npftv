import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import SignOutButton from "@/components/admin/SignOutButton";

export default async function AdminShellLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  // Middleware already guards /admin/*, but this covers any direct
  // server-side render path and satisfies TypeScript's null checks below.
  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-offwhite">
      <header className="flex items-center justify-between border-b border-gold/40 bg-white px-6 py-3">
        <span className="font-heading text-lg font-bold text-navy">
          NPF <span className="text-gold-dark">TV</span> Admin
        </span>
        <div className="flex items-center gap-4">
          <span className="text-sm text-navy-dark/70">
            {session.user.name} <span className="text-gold-dark">({session.user.role})</span>
          </span>
          <SignOutButton />
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-6 px-6 py-6">
        <aside className="w-56 shrink-0">
          <AdminSidebar isAdmin={session.user.role === "ADMIN"} />
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
