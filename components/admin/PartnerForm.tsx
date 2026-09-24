import Link from "next/link";
import ImageUploadField from "@/components/admin/ImageUploadField";
import ActionForm, { SubmitButton, type ActionState } from "@/components/admin/ActionForm";
import { inputClass, labelClass, primaryButtonClass, secondaryButtonClass } from "@/components/admin/formStyles";

type PartnerFormValues = {
  name: string;
  logoUrl: string | null;
  websiteUrl: string | null;
  order: number;
  active: boolean;
};

export default function PartnerForm({
  action,
  defaultValues,
}: {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  defaultValues?: PartnerFormValues;
}) {
  return (
    <ActionForm action={action} className="max-w-2xl space-y-5">
      <div>
        <label className={labelClass} htmlFor="name">Partner Name</label>
        <input id="name" name="name" required defaultValue={defaultValues?.name} className={inputClass} />
      </div>

      <div>
        <label className={labelClass} htmlFor="websiteUrl">Website URL</label>
        <input
          id="websiteUrl"
          name="websiteUrl"
          type="url"
          placeholder="https://"
          defaultValue={defaultValues?.websiteUrl ?? ""}
          className={inputClass}
        />
      </div>

      <ImageUploadField name="logoUrl" label="Logo" defaultValue={defaultValues?.logoUrl} />

      <div>
        <label className={labelClass} htmlFor="order">Display Order</label>
        <input
          id="order"
          name="order"
          type="number"
          defaultValue={defaultValues?.order ?? 0}
          className={inputClass}
        />
        <p className="mt-1 text-xs text-navy-dark/50">Lower numbers appear first in the footer and Partners page.</p>
      </div>

      <label className="flex items-center gap-2 text-sm text-navy-dark">
        <input type="checkbox" name="active" defaultChecked={defaultValues?.active ?? true} />
        Active (shown on the public site)
      </label>

      <div className="flex gap-3 pt-2">
        <SubmitButton label="Save Partner" className={primaryButtonClass} />
        <Link href="/admin/partners" className={secondaryButtonClass}>
          Cancel
        </Link>
      </div>
    </ActionForm>
  );
}
