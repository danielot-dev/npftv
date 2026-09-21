import { prisma } from "@/lib/prisma";
import { deactivateSubscriber } from "@/lib/actions/adminSubscriberActions";
import DeleteButton from "@/components/admin/DeleteButton";
import { primaryButtonClass } from "@/components/admin/formStyles";
import { formatDate } from "@/lib/format";

export default async function AdminSubscribersPage() {
  const subscribers = await prisma.subscriber.findMany({ orderBy: { createdAt: "desc" } });
  const activeCount = subscribers.filter((s) => s.active).length;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">Newsletter Subscribers</h1>
          <p className="text-sm text-navy-dark/60">
            {activeCount} active of {subscribers.length} total
          </p>
        </div>
        <a href="/api/admin/subscribers-export" className={primaryButtonClass}>
          Export Active as CSV
        </a>
      </div>

      {subscribers.length === 0 ? (
        <p className="rounded-lg border border-dashed border-navy/20 bg-white px-6 py-16 text-center text-sm text-navy-dark/60">
          No subscribers yet. The subscribe form lives near the bottom of the homepage.
        </p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-navy/10 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-navy text-white">
                <tr>
                  <th className="px-4 py-3 font-heading">Email</th>
                  <th className="px-4 py-3 font-heading">Status</th>
                  <th className="px-4 py-3 font-heading">Subscribed</th>
                  <th className="px-4 py-3 font-heading text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/10">
                {subscribers.map((sub) => (
                  <tr key={sub.id}>
                    <td className="px-4 py-3 font-medium text-navy">{sub.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded px-2 py-0.5 font-condensed text-xs font-semibold uppercase tracking-wide ${
                          sub.active ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {sub.active ? "Active" : "Unsubscribed"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-navy-dark/70">{formatDate(sub.createdAt)}</td>
                    <td className="px-4 py-3 text-right">
                      {sub.active && (
                        <DeleteButton
                          action={deactivateSubscriber.bind(null, sub.id)}
                          confirmMessage={`Unsubscribe ${sub.email}?`}
                          label="Unsubscribe"
                        />
                      )}
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
