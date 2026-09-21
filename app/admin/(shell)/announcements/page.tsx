import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteAnnouncement } from "@/lib/actions/announcementActions";
import StatusBadge from "@/components/admin/StatusBadge";
import DeleteButton from "@/components/admin/DeleteButton";
import { primaryButtonClass } from "@/components/admin/formStyles";
import { formatDate } from "@/lib/format";

export default async function AdminAnnouncementsListPage() {
  const announcements = await prisma.announcement.findMany({
    orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-navy">Announcements</h1>
        <Link href="/admin/announcements/new" className={primaryButtonClass}>
          + New Announcement
        </Link>
      </div>

      {announcements.length === 0 ? (
        <p className="rounded-lg border border-dashed border-navy/20 bg-white px-6 py-16 text-center text-sm text-navy-dark/60">
          No announcements yet. Published ones appear in the homepage ticker.
        </p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-navy/10 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
            <thead className="bg-navy text-white">
              <tr>
                <th className="px-4 py-3 font-heading">Announcement</th>
                <th className="px-4 py-3 font-heading">Priority</th>
                <th className="px-4 py-3 font-heading">Status</th>
                <th className="px-4 py-3 font-heading">Expires</th>
                <th className="px-4 py-3 font-heading text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/10">
              {announcements.map((item) => (
                <tr key={item.id}>
                  <td className="max-w-md px-4 py-3 font-medium text-navy">{item.title}</td>
                  <td className="px-4 py-3 text-navy-dark/70">{item.priority}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-4 py-3 text-navy-dark/70">
                    {item.expiresAt ? formatDate(item.expiresAt) : "Never"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/announcements/${item.id}`}
                        className="text-sm font-semibold text-navy hover:text-gold-dark"
                      >
                        Edit
                      </Link>
                      <DeleteButton action={deleteAnnouncement.bind(null, item.id)} />
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
