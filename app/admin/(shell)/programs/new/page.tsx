import ProgramForm from "@/components/admin/ProgramForm";
import { createProgram } from "@/lib/actions/programActions";

export default function NewProgramPage() {
  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-bold text-navy">New Program</h1>
      <ProgramForm action={createProgram} />
    </div>
  );
}
