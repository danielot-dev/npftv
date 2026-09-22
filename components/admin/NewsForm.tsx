import ImageUploadField from "@/components/admin/ImageUploadField";
import { inputClass, labelClass, selectClass, textareaClass, primaryButtonClass, secondaryButtonClass } from "@/components/admin/formStyles";
import ActionForm, { SubmitButton, type ActionState } from "@/components/admin/ActionForm";
import Link from "next/link";

type NewsFormValues = {
  title: string;
  excerpt: string;
  body: string;
  category: string;
  coverImage: string | null;
  status: string;
  featured: boolean;
};

export default function NewsForm({
  action,
  defaultValues,
}: {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  defaultValues?: NewsFormValues;
}) {
  return (
    <ActionForm action={action} className="max-w-2xl space-y-5">
      <div>
        <label className={labelClass} htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          required
          defaultValue={defaultValues?.title}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="excerpt">Excerpt</label>
        <textarea
          id="excerpt"
          name="excerpt"
          required
          rows={2}
          defaultValue={defaultValues?.excerpt}
          className={`${textareaClass} min-h-[70px]`}
          placeholder="One or two sentences shown on listing pages"
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="body">Full Article</label>
        <textarea
          id="body"
          name="body"
          required
          defaultValue={defaultValues?.body}
          className={textareaClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="category">Category</label>
          <input
            id="category"
            name="category"
            defaultValue={defaultValues?.category ?? "General"}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            defaultValue={defaultValues?.status ?? "DRAFT"}
            className={selectClass}
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
      </div>

      <ImageUploadField name="coverImage" label="Cover Image" defaultValue={defaultValues?.coverImage} />

      <label className="flex items-center gap-2 text-sm text-navy-dark">
        <input type="checkbox" name="featured" defaultChecked={defaultValues?.featured} />
        Feature on homepage (replaces any current featured story)
      </label>

      <div className="flex gap-3 pt-2">
        <SubmitButton label="Save Article" className={primaryButtonClass} />
        <Link href="/admin/news" className={secondaryButtonClass}>
          Cancel
        </Link>
      </div>
    </ActionForm>
  );
}
