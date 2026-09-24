import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteNews } from "@/lib/actions/newsActions";
import StatusBadge from "@/components/admin/StatusBadge";
import DeleteButton from "@/components/admin/DeleteButton";
import { primaryButtonClass } from "@/components/admin/formStyles";
import { formatDate } from "@/lib/format";
import SuccessBanner from "@/components/admin/SuccessBanner";

export default async function AdminNewsListPage({
  searchParams,
}: {
  searchParams: { success?: string };
}) {
  const articles = await prisma.newsArticle.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <SuccessBanner message={searchParams.success} />
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-navy">News</h1>
        <Link href="/admin/news/new" className={primaryButtonClass}>
          + New Article
        </Link>
      </div>

      {articles.length === 0 ? (
        <p className="rounded-lg border border-dashed border-navy/20 bg-white px-6 py-16 text-center text-sm text-navy-dark/60">
          No articles yet. Create the first one.
        </p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-navy/10 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
            <thead className="bg-navy text-white">
              <tr>
                <th className="px-4 py-3 font-heading">Title</th>
                <th className="px-4 py-3 font-heading">Category</th>
                <th className="px-4 py-3 font-heading">Status</th>
                <th className="px-4 py-3 font-heading">Date</th>
                <th className="px-4 py-3 font-heading text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/10">
              {articles.map((article) => (
                <tr key={article.id}>
                  <td className="px-4 py-3 font-medium text-navy">
                    {article.title}
                    {article.featured && (
                      <span className="ml-2 rounded bg-royal/20 px-1.5 py-0.5 font-condensed text-xs font-semibold text-royal-dark">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-navy-dark/70">{article.category}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={article.status} />
                  </td>
                  <td className="px-4 py-3 text-navy-dark/70">
                    {formatDate(article.publishedAt ?? article.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/news/${article.id}`}
                        className="text-sm font-semibold text-navy hover:text-royal-dark"
                      >
                        Edit
                      </Link>
                      <DeleteButton action={deleteNews.bind(null, article.id)} />
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
