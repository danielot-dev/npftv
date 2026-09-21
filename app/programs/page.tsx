import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProgramCard from "@/components/ProgramCard";
import EmptyState from "@/components/EmptyState";
import { getActivePrograms } from "@/lib/data";

export const metadata: Metadata = { title: "Programs" };

export default async function ProgramsPage() {
  const programs = await getActivePrograms();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-10 lg:px-8">
        <h1 className="mb-8 border-b-2 border-navy pb-3 font-heading text-3xl font-extrabold text-navy">
          Programs
        </h1>

        {programs.length === 0 ? (
          <EmptyState
            title="No programs listed yet"
            description="NPF TV's regular programs and their broadcast schedule will appear here."
          />
        ) : (
          <div>
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
