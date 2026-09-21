import PressReleaseForm from "@/components/admin/PressReleaseForm";
import { createPressRelease } from "@/lib/actions/pressActions";

export default function NewPressReleasePage() {
  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-bold text-navy">New Press Release</h1>
      <PressReleaseForm action={createPressRelease} />
    </div>
  );
}
