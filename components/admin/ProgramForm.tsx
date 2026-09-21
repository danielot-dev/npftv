import Link from "next/link";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { inputClass, labelClass, selectClass, textareaClass, primaryButtonClass, secondaryButtonClass } from "@/components/admin/formStyles";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

type ProgramFormValues = {
  name: string;
  description: string;
  dayOfWeek: string | null;
  time: string | null;
  coverImage: string | null;
  active: boolean;
};

export default function ProgramForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: ProgramFormValues;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-5">
      <div>
        <label className={labelClass} htmlFor="name">Program Name</label>
        <input id="name" name="name" required defaultValue={defaultValues?.name} className={inputClass} />
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="dayOfWeek">Day of Week</label>
          <select
            id="dayOfWeek"
            name="dayOfWeek"
            defaultValue={defaultValues?.dayOfWeek ?? ""}
            className={selectClass}
          >
            <option value="">— Unscheduled —</option>
            {DAYS.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="time">Time</label>
          <input
            id="time"
            name="time"
            defaultValue={defaultValues?.time ?? ""}
            placeholder="e.g. 8:00 PM"
            className={inputClass}
          />
        </div>
      </div>

      <ImageUploadField name="coverImage" label="Cover Image" defaultValue={defaultValues?.coverImage} />

      <label className="flex items-center gap-2 text-sm text-navy-dark">
        <input type="checkbox" name="active" defaultChecked={defaultValues?.active ?? true} />
        Active (shown on the public site and schedule)
      </label>

      <div className="flex gap-3 pt-2">
        <button type="submit" className={primaryButtonClass}>
          Save Program
        </button>
        <Link href="/admin/programs" className={secondaryButtonClass}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
