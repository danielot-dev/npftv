import ImageUploadField from "@/components/admin/ImageUploadField";
import { inputClass, labelClass, primaryButtonClass } from "@/components/admin/formStyles";

export default function AddImageForm({
  action,
}: {
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <form action={action} className="space-y-4 rounded-lg border border-dashed border-navy/20 bg-white p-4">
      <ImageUploadField name="url" label="Add a Photo" />
      <div>
        <label className={labelClass} htmlFor="caption">
          Caption (optional)
        </label>
        <input id="caption" name="caption" className={inputClass} />
      </div>
      <button type="submit" className={primaryButtonClass}>
        Add to Album
      </button>
    </form>
  );
}
