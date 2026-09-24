import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteVideo } from "@/lib/actions/videoActions";
import StatusBadge from "@/components/admin/StatusBadge";
import DeleteButton from "@/components/admin/DeleteButton";
import { primaryButtonClass } from "@/components/admin/formStyles";
import { formatDate } from "@/lib/format";
import SuccessBanner from "@/components/admin/SuccessBanner";

export default async function AdminVideosListPage({
  searchParams,
}: {
  searchParams: { success?: string };
}) {
  const videos = await prisma.video.findMany({
    orderBy: { createdAt: "desc" },
    include: { program: { select: { name: true } } },
  });

  return (
    <div>
      <SuccessBanner message={searchParams.success} />
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-navy">Videos</h1>
        <Link href="/admin/videos/new" className={primaryButtonClass}>
          + New Video
        </Link>
      </div>

      {videos.length === 0 ? (
        <p className="rounded-lg border border-dashed border-navy/20 bg-white px-6 py-16 text-center text-sm text-navy-dark/60">
          No videos yet. Add the first one.
        </p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-navy/10 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
            <thead className="bg-navy text-white">
              <tr>
                <th className="px-4 py-3 font-heading">Title</th>
                <th className="px-4 py-3 font-heading">Category</th>
                <th className="px-4 py-3 font-heading">Program</th>
                <th className="px-4 py-3 font-heading">Status</th>
                <th className="px-4 py-3 font-heading">Date</th>
                <th className="px-4 py-3 font-heading text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/10">
              {videos.map((video) => (
                <tr key={video.id}>
                  <td className="px-4 py-3 font-medium text-navy">{video.title}</td>
                  <td className="px-4 py-3 text-navy-dark/70">{video.category}</td>
                  <td className="px-4 py-3 text-navy-dark/70">{video.program?.name ?? "—"}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={video.status} />
                  </td>
                  <td className="px-4 py-3 text-navy-dark/70">
                    {formatDate(video.publishedAt ?? video.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/videos/${video.id}`}
                        className="text-sm font-semibold text-navy hover:text-royal-dark"
                      >
                        Edit
                      </Link>
                      <DeleteButton action={deleteVideo.bind(null, video.id)} />
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
