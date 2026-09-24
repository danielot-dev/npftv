import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deletePartner } from "@/lib/actions/partnerActions";
import DeleteButton from "@/components/admin/DeleteButton";
import { primaryButtonClass } from "@/components/admin/formStyles";
import SuccessBanner from "@/components/admin/SuccessBanner";

export default async function AdminPartnersListPage({
  searchParams,
}: {
  searchParams: { success?: string };
}) {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.role === "ADMIN";
  const partners = await prisma.partner.findMany({ orderBy: [{ order: "asc" }, { name: "asc" }] });

  return (
    <div>
      <SuccessBanner message={searchParams.success} />
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-navy">Partners</h1>
        <Link href="/admin/partners/new" className={primaryButtonClass}>
          + New Partner
        </Link>
      </div>

      <p className="mb-4 text-sm text-navy-dark/60">
        Active partners appear on the public Partners page and in the footer&rsquo;s Partners section.
      </p>

      {partners.length === 0 ? (
        <p className="rounded-lg border border-dashed border-navy/20 bg-white px-6 py-16 text-center text-sm text-navy-dark/60">
          No partners yet. Add the first one.
        </p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-navy/10 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-navy text-white">
                <tr>
                  <th className="px-4 py-3 font-heading">Name</th>
                  <th className="px-4 py-3 font-heading">Website</th>
                  <th className="px-4 py-3 font-heading">Order</th>
                  <th className="px-4 py-3 font-heading">Active</th>
                  <th className="px-4 py-3 font-heading text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/10">
                {partners.map((partner) => (
                  <tr key={partner.id}>
                    <td className="px-4 py-3 font-medium text-navy">{partner.name}</td>
                    <td className="px-4 py-3 text-navy-dark/70">
                      {partner.websiteUrl ? (
                        <a
                          href={partner.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-royal-dark"
                        >
                          {partner.websiteUrl.replace(/^https?:\/\//, "")}
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-3 text-navy-dark/70">{partner.order}</td>
                    <td className="px-4 py-3 text-navy-dark/70">{partner.active ? "Yes" : "No"}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/admin/partners/${partner.id}`}
                          className="text-sm font-semibold text-navy hover:text-royal-dark"
                        >
                          Edit
                        </Link>
                        {isAdmin && (
                          <DeleteButton
                            action={deletePartner.bind(null, partner.id)}
                            confirmMessage="Delete this partner? This cannot be undone."
                          />
                        )}
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
