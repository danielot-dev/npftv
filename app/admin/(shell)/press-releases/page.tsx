import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deletePressRelease } from "@/lib/actions/pressActions";
import StatusBadge from "@/components/admin/StatusBadge";
import DeleteButton from "@/components/admin/DeleteButton";
import { primaryButtonClass } from "@/components/admin/formStyles";
import { formatDate } from "@/lib/format";
import SuccessBanner from "@/components/admin/SuccessBanner";

export default async function AdminPressListPage({
  searchParams,
}: {
  searchParams: { success?: string };
}) {
  const releases = await prisma.pressRelease.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <SuccessBanner message={searchParams.success} />
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-navy">Press Releases</h1>
        <Link href="/admin/press-releases/new" className={primaryButtonClass}>
          + New Release
        </Link>
      </div>

      {releases.length === 0 ? (
        <p className="rounded-lg border border-dashed border-navy/20 bg-white px-6 py-16 text-center text-sm text-navy-dark/60">
          No press releases yet.
        </p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-navy/10 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
            <thead className="bg-navy text-white">
              <tr>
                <th className="px-4 py-3 font-heading">Title</th>
                <th className="px-4 py-3 font-heading">Status</th>
                <th className="px-4 py-3 font-heading">Date</th>
                <th className="px-4 py-3 font-heading text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/10">
              {releases.map((release) => (
                <tr key={release.id}>
                  <td className="px-4 py-3 font-medium text-navy">{release.title}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={release.status} />
                  </td>
                  <td className="px-4 py-3 text-navy-dark/70">
                    {formatDate(release.publishedAt ?? release.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/press-releases/${release.id}`}
                        className="text-sm font-semibold text-navy hover:text-gold-dark"
                      >
                        Edit
                      </Link>
                      <DeleteButton action={deletePressRelease.bind(null, release.id)} />
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
