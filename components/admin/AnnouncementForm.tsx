import Link from "next/link";
import {
  inputClass,
  labelClass,
  selectClass,
  textareaClass,
  primaryButtonClass,
  secondaryButtonClass,
} from "@/components/admin/formStyles";
import ActionForm, { SubmitButton, type ActionState } from "@/components/admin/ActionForm";

type AnnouncementFormValues = {
  title: string;
  body: string;
  priority: number;
  status: string;
  expiresAt: Date | null;
};

function toDateTimeLocal(date: Date | null) {
  if (!date) return "";
  const d = new Date(date);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
}

export default function AnnouncementForm({
  action,
  defaultValues,
}: {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  defaultValues?: AnnouncementFormValues;
}) {
  return (
    <ActionForm action={action} className="max-w-2xl space-y-5">
      <div>
        <label className={labelClass} htmlFor="title">
          Announcement
        </label>
        <input
          id="title"
          name="title"
          required
          defaultValue={defaultValues?.title}
          className={inputClass}
          placeholder="Shown in the breaking-news ticker on the homepage"
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="body">
          Details
        </label>
        <textarea
          id="body"
          name="body"
          required
          rows={4}
          defaultValue={defaultValues?.body}
          className={textareaClass}
          placeholder="Fuller context — not shown in the ticker, but kept on record"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className={labelClass} htmlFor="priority">
            Priority
          </label>
          <input
            id="priority"
            name="priority"
            type="number"
            defaultValue={defaultValues?.priority ?? 0}
            className={inputClass}
          />
          <p className="mt-1 text-xs text-navy-dark/50">Higher shows first in the ticker.</p>
        </div>
        <div>
          <label className={labelClass} htmlFor="status">
            Status
          </label>
          <select id="status" name="status" defaultValue={defaultValues?.status ?? "DRAFT"} className={selectClass}>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="expiresAt">
            Expires (optional)
          </label>
          <input
            id="expiresAt"
            name="expiresAt"
            type="datetime-local"
            defaultValue={toDateTimeLocal(defaultValues?.expiresAt ?? null)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <SubmitButton label="Save Announcement" className={primaryButtonClass} />
        <Link href="/admin/announcements" className={secondaryButtonClass}>
          Cancel
        </Link>
      </div>
    </ActionForm>
  );
}
