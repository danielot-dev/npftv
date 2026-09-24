import PartnerForm from "@/components/admin/PartnerForm";
import { createPartner } from "@/lib/actions/partnerActions";

export default function NewPartnerPage() {
  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-bold text-navy">New Partner</h1>
      <PartnerForm action={createPartner} />
    </div>
  );
}
