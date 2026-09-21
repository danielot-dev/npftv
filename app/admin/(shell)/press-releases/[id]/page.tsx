import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PressReleaseForm from "@/components/admin/PressReleaseForm";
import { updatePressRelease } from "@/lib/actions/pressActions";

export default async function EditPressReleasePage({ params }: { params: { id: string } }) {
  const release = await prisma.pressRelease.findUnique({ where: { id: params.id } });
  if (!release) notFound();

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-bold text-navy">Edit Press Release</h1>
      <PressReleaseForm action={updatePressRelease.bind(null, release.id)} defaultValues={release} />
    </div>
  );
}
