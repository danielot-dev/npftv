import { inputClass, labelClass, selectClass, primaryButtonClass } from "@/components/admin/formStyles";
import { createStaffUser } from "@/lib/actions/userActions";
import ActionForm, { SubmitButton } from "@/components/admin/ActionForm";

export default function CreateStaffForm() {
  return (
    <ActionForm
      action={createStaffUser}
      className="grid gap-4 rounded-lg border border-navy/10 bg-white p-6 sm:grid-cols-2"
    >
      <div>
        <label className={labelClass} htmlFor="name">
          Full Name
        </label>
        <input id="name" name="name" required className={inputClass} />
      </div>
      <div>
        <label className={labelClass} htmlFor="email">
          Email
        </label>
        <input id="email" name="email" type="email" required className={inputClass} />
      </div>
      <div>
        <label className={labelClass} htmlFor="password">
          Temporary Password
        </label>
        <input id="password" name="password" type="password" required minLength={8} className={inputClass} />
        <p className="mt-1 text-xs text-navy-dark/50">At least 8 characters.</p>
      </div>
      <div>
        <label className={labelClass} htmlFor="role">
          Role
        </label>
        <select id="role" name="role" defaultValue="EDITOR" className={selectClass}>
          <option value="EDITOR">Editor — can create and edit content</option>
          <option value="ADMIN">Admin — can also manage staff and delete content</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <SubmitButton label="Create Staff Account" pendingLabel="Creating…" className={primaryButtonClass} />
      </div>
    </ActionForm>
  );
}
