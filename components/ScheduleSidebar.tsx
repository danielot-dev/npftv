import Link from "next/link";

type ScheduleProgram = {
  slug: string;
  name: string;
  dayOfWeek: string | null;
  time: string | null;
};

const DAY_ORDER = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function ScheduleSidebar({ programs }: { programs: ScheduleProgram[] }) {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  const sorted = [...programs].sort((a, b) => {
    const dayA = a.dayOfWeek ? DAY_ORDER.indexOf(a.dayOfWeek) : 7;
    const dayB = b.dayOfWeek ? DAY_ORDER.indexOf(b.dayOfWeek) : 7;
    return dayA - dayB;
  });

  return (
    <aside className="glass overflow-hidden rounded-2xl">
      <div className="border-b border-royal/40 bg-navy-gradient px-5 py-4">
        <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-white">
          Programme Schedule
        </h2>
      </div>

      {sorted.length === 0 ? (
        <p className="px-5 py-8 text-center text-sm text-navy-dark/60">
          The broadcast schedule will appear here once programs are added.
        </p>
      ) : (
        <ul className="divide-y divide-navy/10">
          {sorted.map((program) => {
            const isToday = program.dayOfWeek === today;
            return (
              <li key={program.slug}>
                <Link
                  href={`/programs/${program.slug}`}
                  className={`flex items-center justify-between gap-3 px-5 py-4 transition hover:bg-white/50 ${
                    isToday ? "bg-royal/10" : ""
                  }`}
                >
                  <div className="min-w-0">
                    <p className="truncate font-heading text-sm font-semibold text-navy">
                      {program.name}
                    </p>
                    {isToday && (
                      <p className="mt-0.5 font-condensed text-xs font-semibold uppercase tracking-wide text-signal">
                        Airs today
                      </p>
                    )}
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-condensed text-sm font-semibold text-navy">
                      {program.dayOfWeek ?? "TBA"}
                    </p>
                    {program.time && (
                      <p className="font-condensed text-xs text-royal-dark">{program.time}</p>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      <Link
        href="/programs"
        className="block border-t border-navy/10 px-5 py-3 text-center text-sm font-semibold text-royal-dark hover:text-royal"
      >
        View full programme list
      </Link>
    </aside>
  );
}
