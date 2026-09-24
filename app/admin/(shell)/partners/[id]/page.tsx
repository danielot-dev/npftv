import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PartnerForm from "@/components/admin/PartnerForm";
import { updatePartner } from "@/lib/actions/partnerActions";

export default async function EditPartnerPage({ params }: { params: { id: string } }) {
  const partner = await prisma.partner.findUnique({ where: { id: params.id } });
  if (!partner) notFound();

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-bold text-navy">Edit Partner</h1>
      <PartnerForm action={updatePartner.bind(null, partner.id)} defaultValues={partner} />
    </div>
  );
}
