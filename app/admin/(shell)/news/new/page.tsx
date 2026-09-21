import NewsForm from "@/components/admin/NewsForm";
import { createNews } from "@/lib/actions/newsActions";

export default function NewNewsPage() {
  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-bold text-navy">New Article</h1>
      <NewsForm action={createNews} />
    </div>
  );
}
