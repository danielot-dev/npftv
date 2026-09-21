import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import NewsForm from "@/components/admin/NewsForm";
import { updateNews } from "@/lib/actions/newsActions";

export default async function EditNewsPage({ params }: { params: { id: string } }) {
  const article = await prisma.newsArticle.findUnique({ where: { id: params.id } });
  if (!article) notFound();

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-bold text-navy">Edit Article</h1>
      <NewsForm action={updateNews.bind(null, article.id)} defaultValues={article} />
    </div>
  );
}
