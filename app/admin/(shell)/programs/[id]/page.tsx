import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProgramForm from "@/components/admin/ProgramForm";
import { updateProgram } from "@/lib/actions/programActions";

export default async function EditProgramPage({ params }: { params: { id: string } }) {
  const program = await prisma.program.findUnique({ where: { id: params.id } });
  if (!program) notFound();

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-bold text-navy">Edit Program</h1>
      <ProgramForm action={updateProgram.bind(null, program.id)} defaultValues={program} />
    </div>
  );
}
