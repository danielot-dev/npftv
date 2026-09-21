import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ImageUploadField from "@/components/admin/ImageUploadField";
import {
  inputClass,
  labelClass,
  selectClass,
  textareaClass,
  primaryButtonClass,
  secondaryButtonClass,
} from "@/components/admin/formStyles";

type VideoFormValues = {
  title: string;
  description: string;
  youtubeId: string;
  category: string;
  thumbnail: string | null;
  status: string;
  featured: boolean;
  programId: string | null;
};

export default async function VideoForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: VideoFormValues;
}) {
  const programs = await prisma.program.findMany({ orderBy: { name: "asc" } });

  return (
    <form action={action} className="max-w-2xl space-y-5">
      <div>
        <label className={labelClass} htmlFor="title">Title</label>
        <input id="title" name="title" required defaultValue={defaultValues?.title} className={inputClass} />
      </div>

      <div>
        <label className={labelClass} htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          required
          rows={3}
          defaultValue={defaultValues?.description}
          className={`${textareaClass} min-h-[90px]`}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="youtubeId">YouTube Video ID</label>
        <input
          id="youtubeId"
          name="youtubeId"
          required
          defaultValue={defaultValues?.youtubeId}
          className={inputClass}
          placeholder="e.g. jNQXAC9IVRw — the part after watch?v= in the URL"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="category">Category</label>
          <input
            id="category"
            name="category"
            defaultValue={defaultValues?.category ?? "Programs"}
            className={inputClass}
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

      <div>
        <label className={labelClass} htmlFor="programId">Program (optional)</label>
        <select
          id="programId"
          name="programId"
          defaultValue={defaultValues?.programId ?? ""}
          className={selectClass}
        >
          <option value="">— None —</option>
          {programs.map((program) => (
            <option key={program.id} value={program.id}>
              {program.name}
            </option>
          ))}
        </select>
      </div>

      <ImageUploadField
        name="thumbnail"
        label="Custom Thumbnail (optional — falls back to the YouTube thumbnail)"
        defaultValue={defaultValues?.thumbnail}
      />

      <label className="flex items-center gap-2 text-sm text-navy-dark">
        <input type="checkbox" name="featured" defaultChecked={defaultValues?.featured} />
        Feature on homepage
      </label>

      <div className="flex gap-3 pt-2">
        <button type="submit" className={primaryButtonClass}>
          Save Video
        </button>
        <Link href="/admin/videos" className={secondaryButtonClass}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
