import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteAlbum } from "@/lib/actions/galleryActions";
import StatusBadge from "@/components/admin/StatusBadge";
import DeleteButton from "@/components/admin/DeleteButton";
import { primaryButtonClass } from "@/components/admin/formStyles";
import { formatDate } from "@/lib/format";
import SuccessBanner from "@/components/admin/SuccessBanner";

export default async function AdminGalleryListPage({
  searchParams,
}: {
  searchParams: { success?: string };
}) {
  const albums = await prisma.galleryAlbum.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { images: true } } },
  });

  return (
    <div>
      <SuccessBanner message={searchParams.success} />
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-navy">Gallery</h1>
        <Link href="/admin/gallery/new" className={primaryButtonClass}>
          + New Album
        </Link>
      </div>

      {albums.length === 0 ? (
        <p className="rounded-lg border border-dashed border-navy/20 bg-white px-6 py-16 text-center text-sm text-navy-dark/60">
          No albums yet. Create one, then add photos to it.
        </p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-navy/10 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
            <thead className="bg-navy text-white">
              <tr>
                <th className="px-4 py-3 font-heading">Album</th>
                <th className="px-4 py-3 font-heading">Photos</th>
                <th className="px-4 py-3 font-heading">Status</th>
                <th className="px-4 py-3 font-heading">Event Date</th>
                <th className="px-4 py-3 font-heading text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/10">
              {albums.map((album) => (
                <tr key={album.id}>
                  <td className="px-4 py-3 font-medium text-navy">{album.title}</td>
                  <td className="px-4 py-3 text-navy-dark/70">{album._count.images}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={album.status} />
                  </td>
                  <td className="px-4 py-3 text-navy-dark/70">
                    {album.eventDate ? formatDate(album.eventDate) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/gallery/${album.id}`}
                        className="text-sm font-semibold text-navy hover:text-gold-dark"
                      >
                        Manage
                      </Link>
                      <DeleteButton
                        action={deleteAlbum.bind(null, album.id)}
                        confirmMessage="Delete this album and all its photos? This can't be undone."
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
