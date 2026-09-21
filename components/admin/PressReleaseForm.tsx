import Link from "next/link";
import { inputClass, labelClass, selectClass, textareaClass, primaryButtonClass, secondaryButtonClass } from "@/components/admin/formStyles";

type PressFormValues = {
  title: string;
  summary: string;
  body: string;
  documentUrl: string | null;
  status: string;
};

export default function PressReleaseForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: PressFormValues;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-5">
      <div>
        <label className={labelClass} htmlFor="title">Title</label>
        <input id="title" name="title" required defaultValue={defaultValues?.title} className={inputClass} />
      </div>

      <div>
        <label className={labelClass} htmlFor="summary">Summary</label>
        <textarea
          id="summary"
          name="summary"
          required
          rows={2}
          defaultValue={defaultValues?.summary}
          className={`${textareaClass} min-h-[70px]`}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="body">Full Statement</label>
        <textarea id="body" name="body" required defaultValue={defaultValues?.body} className={textareaClass} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="documentUrl">Document URL (optional PDF link)</label>
          <input
            id="documentUrl"
            name="documentUrl"
            defaultValue={defaultValues?.documentUrl ?? ""}
            className={inputClass}
            placeholder="https://..."
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="status">Status</label>
          <select id="status" name="status" defaultValue={defaultValues?.status ?? "DRAFT"} className={selectClass}>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" className={primaryButtonClass}>
          Save Release
        </button>
        <Link href="/admin/press-releases" className={secondaryButtonClass}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
