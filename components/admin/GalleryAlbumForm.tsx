import Link from "next/link";
import ImageUploadField from "@/components/admin/ImageUploadField";
import ActionForm, { SubmitButton, type ActionState } from "@/components/admin/ActionForm";
import {
  inputClass,
  labelClass,
  selectClass,
  textareaClass,
  primaryButtonClass,
  secondaryButtonClass,
} from "@/components/admin/formStyles";

type AlbumFormValues = {
  title: string;
  description: string | null;
  coverImage: string | null;
  eventDate: Date | null;
  status: string;
};

function toDateInput(date: Date | null) {
  if (!date) return "";
  return new Date(date).toISOString().slice(0, 10);
}

export default function GalleryAlbumForm({
  action,
  defaultValues,
  submitLabel = "Save Album",
  cancelHref = "/admin/gallery",
}: {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  defaultValues?: AlbumFormValues;
  submitLabel?: string;
  cancelHref?: string;
}) {
  return (
    <ActionForm action={action} className="max-w-2xl space-y-5">
      <div>
        <label className={labelClass} htmlFor="title">
          Album Title
        </label>
        <input id="title" name="title" required defaultValue={defaultValues?.title} className={inputClass} />
      </div>

      <div>
        <label className={labelClass} htmlFor="description">
          Description (optional)
        </label>
        <textarea
          id="description"
          name="description"
          rows={2}
          defaultValue={defaultValues?.description ?? ""}
          className={`${textareaClass} min-h-[70px]`}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="eventDate">
            Event Date
          </label>
          <input
            id="eventDate"
            name="eventDate"
            type="date"
            defaultValue={toDateInput(defaultValues?.eventDate ?? null)}
            className={inputClass}
          />
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
      </div>

      <ImageUploadField
        name="coverImage"
        label="Cover Image (optional — defaults to the first photo you add)"
        defaultValue={defaultValues?.coverImage}
      />

      <div className="flex gap-3 pt-2">
        <SubmitButton label={submitLabel} className={primaryButtonClass} />
        <Link href={cancelHref} className={secondaryButtonClass}>
          Cancel
        </Link>
      </div>
    </ActionForm>
  );
}
