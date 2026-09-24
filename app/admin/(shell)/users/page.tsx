import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import CreateStaffForm from "@/components/admin/CreateStaffForm";
import RoleSelect from "@/components/admin/RoleSelect";
import DeleteButton from "@/components/admin/DeleteButton";
import { updateStaffRole, deleteStaffUser } from "@/lib/actions/userActions";
import { formatDate } from "@/lib/format";

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") {
    redirect("/admin/dashboard");
  }

  const users = await prisma.user.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-bold text-navy">Staff Accounts</h1>

      <div className="mb-8 overflow-hidden rounded-lg border border-navy/10 bg-white">
        <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-navy text-white">
            <tr>
              <th className="px-4 py-3 font-heading">Name</th>
              <th className="px-4 py-3 font-heading">Email</th>
              <th className="px-4 py-3 font-heading">Role</th>
              <th className="px-4 py-3 font-heading">Joined</th>
              <th className="px-4 py-3 font-heading text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy/10">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-3 font-medium text-navy">
                  {user.name}
                  {user.id === session.user.id && (
                    <span className="ml-2 rounded bg-royal/20 px-1.5 py-0.5 font-condensed text-xs font-semibold text-royal-dark">
                      You
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-navy-dark/70">{user.email}</td>
                <td className="px-4 py-3">
                  <RoleSelect action={updateStaffRole.bind(null, user.id)} defaultValue={user.role} />
                </td>
                <td className="px-4 py-3 text-navy-dark/70">{formatDate(user.createdAt)}</td>
                <td className="px-4 py-3 text-right">
                  {user.id !== session.user.id && (
                    <DeleteButton
                      action={deleteStaffUser.bind(null, user.id)}
                      confirmMessage={`Remove ${user.name}'s access? They won't be able to sign in anymore.`}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      <h2 className="mb-4 font-heading text-lg font-bold text-navy">Add Staff Member</h2>
      <CreateStaffForm />
    </div>
  );
}
