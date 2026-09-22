import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteProgram } from "@/lib/actions/programActions";
import DeleteButton from "@/components/admin/DeleteButton";
import { primaryButtonClass } from "@/components/admin/formStyles";
import SuccessBanner from "@/components/admin/SuccessBanner";

export default async function AdminProgramsListPage({
  searchParams,
}: {
  searchParams: { success?: string };
}) {
  const programs = await prisma.program.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <SuccessBanner message={searchParams.success} />
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-navy">Programs</h1>
        <Link href="/admin/programs/new" className={primaryButtonClass}>
          + New Program
        </Link>
      </div>

      {programs.length === 0 ? (
        <p className="rounded-lg border border-dashed border-navy/20 bg-white px-6 py-16 text-center text-sm text-navy-dark/60">
          No programs yet. Add the first one.
        </p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-navy/10 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
            <thead className="bg-navy text-white">
              <tr>
                <th className="px-4 py-3 font-heading">Name</th>
                <th className="px-4 py-3 font-heading">Day</th>
                <th className="px-4 py-3 font-heading">Time</th>
                <th className="px-4 py-3 font-heading">Active</th>
                <th className="px-4 py-3 font-heading text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/10">
              {programs.map((program) => (
                <tr key={program.id}>
                  <td className="px-4 py-3 font-medium text-navy">{program.name}</td>
                  <td className="px-4 py-3 text-navy-dark/70">{program.dayOfWeek ?? "—"}</td>
                  <td className="px-4 py-3 text-navy-dark/70">{program.time ?? "—"}</td>
                  <td className="px-4 py-3 text-navy-dark/70">{program.active ? "Yes" : "No"}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/programs/${program.id}`}
                        className="text-sm font-semibold text-navy hover:text-gold-dark"
                      >
                        Edit
                      </Link>
                      <DeleteButton
                        action={deleteProgram.bind(null, program.id)}
                        confirmMessage="Delete this program? Videos linked to it will keep the video itself but lose the program link."
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
                </div>
</div>
      )}
    </div>
  );
}
