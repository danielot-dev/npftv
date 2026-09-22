import ImageUploadField from "@/components/admin/ImageUploadField";
import { inputClass, labelClass, primaryButtonClass } from "@/components/admin/formStyles";
import ActionForm, { SubmitButton, type ActionState } from "@/components/admin/ActionForm";

export default function AddImageForm({
  action,
}: {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
}) {
  return (
    <ActionForm
      action={action}
      className="space-y-4 rounded-lg border border-dashed border-navy/20 bg-white p-4"
    >
      <ImageUploadField name="url" label="Add a Photo" />
      <div>
        <label className={labelClass} htmlFor="caption">
          Caption (optional)
        </label>
        <input id="caption" name="caption" className={inputClass} />
      </div>
      <SubmitButton label="Add to Album" pendingLabel="Adding…" className={primaryButtonClass} />
    </ActionForm>
  );
}
