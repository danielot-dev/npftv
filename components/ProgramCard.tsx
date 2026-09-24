import Link from "next/link";
import Image from "next/image";
import MediaPlaceholder from "@/components/MediaPlaceholder";

type ProgramCardItem = {
  slug: string;
  name: string;
  description: string;
  dayOfWeek: string | null;
  time: string | null;
  coverImage: string | null;
};

export default function ProgramCard({ program }: { program: ProgramCardItem }) {
  return (
    <Link
      href={`/programs/${program.slug}`}
      className="group flex items-center gap-5 border-b border-navy/10 py-6 first:pt-0 last:border-b-0"
    >
      <div className="relative h-24 w-24 shrink-0 overflow-hidden">
        {program.coverImage ? (
          <Image src={program.coverImage} alt={program.name} fill className="object-cover" />
        ) : (
          <MediaPlaceholder className="h-full w-full" variant="royal" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-heading text-lg font-bold text-navy group-hover:text-navy-light">
          {program.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-navy-dark/70">{program.description}</p>
      </div>
      {(program.dayOfWeek || program.time) && (
        <div className="shrink-0 border-l border-navy/10 pl-5 text-right">
          <p className="font-condensed text-lg font-semibold text-navy">{program.dayOfWeek}</p>
          <p className="font-condensed text-sm text-royal-dark">{program.time}</p>
        </div>
      )}
    </Link>
  );
}
