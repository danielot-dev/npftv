import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "About the Force" };

const MISSION_POINTS: string[] = [
  "Partner with other security agencies and the public to gather, collate, and share the intelligence needed to keep Nigeria safe.",
  "Address the root causes of crime while ensuring every case is investigated fairly, thoroughly, and professionally.",
  "Build and sustain a skilled, well-trained, and highly motivated workforce across every rank.",
  "Maintain a people-friendly Force that respects and upholds the fundamental rights of every citizen.",
];

const CORE_VALUES: { title: string; description: string }[] = [
  {
    title: "Integrity",
    description: "Acting honestly, transparently, and consistently in every operation and interaction.",
  },
  {
    title: "Rule of Law",
    description: "Every action grounded in Nigeria's Constitution, the Police Act, and due process.",
  },
  {
    title: "Professionalism",
    description: "Discipline, competence, and accountability upheld at every rank of the Force.",
  },
  {
    title: "Respect for Human Rights",
    description: "Fair, dignified treatment of every citizen, regardless of background or status.",
  },
  {
    title: "Community Partnership",
    description: "Policing done with the public, not just for the public — built on shared trust.",
  },
  {
    title: "Accountability",
    description: "A Force that remains responsive and answerable to the people it serves.",
  },
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <PageHero
        eyebrow="Est. 1930"
        title="About the Nigeria Police Force"
        description="The principal law enforcement agency in Nigeria, established under Section 214 of the 1999 Constitution to protect lives and property, prevent and detect crime, and maintain law and order nationwide."
      />
      <main className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
        {/* Motto */}
        <div className="glass fade-in-up mb-10 rounded-2xl p-8 text-center">
          <p className="font-condensed text-xs font-semibold uppercase tracking-[0.25em] text-royal-dark">
            Our Motto
          </p>
          <p className="mt-2 font-heading text-3xl font-extrabold italic text-navy lg:text-4xl">
            &ldquo;Police is Your Friend&rdquo;
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="glass rounded-2xl p-6">
            <h2 className="font-heading text-lg font-bold text-navy">Our Vision</h2>
            <p className="mt-3 text-sm leading-relaxed text-navy-dark/80">
              A Nigeria that is safer and more secure — supporting economic development and growth, and
              creating a safe environment for everyone living within its borders.
            </p>
          </div>
          <div className="glass rounded-2xl p-6">
            <h2 className="font-heading text-lg font-bold text-navy">Our Mission</h2>
            <ul className="mt-3 space-y-3">
              {MISSION_POINTS.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-navy-dark/80">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-royal shadow-glow" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-12">
          <h2 className="mb-6 font-heading text-2xl font-bold text-navy">Core Values</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_VALUES.map((value) => (
              <div key={value.title} className="glass glass-hover rounded-2xl p-6">
                <h3 className="font-heading text-base font-bold text-navy">{value.title}</h3>
                <p className="mt-2 text-sm text-navy-dark/75">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* History */}
        <div className="mt-12">
          <h2 className="mb-6 font-heading text-2xl font-bold text-navy">Our History</h2>
          <div className="glass rounded-2xl p-6 lg:p-8">
            <p className="text-sm leading-relaxed text-navy-dark/80">
              Organised policing in Nigeria dates back to 1820, beginning with local constabularies such
              as the Hausa Constabulary formed in Lagos. In the decades that followed, separate regional
              forces emerged across the country&rsquo;s protectorates — including the Royal Niger Company
              Constabulary in 1888 and the Niger Coast Constabulary in 1894.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-navy-dark/80">
              These regional forces were consolidated in 1930 into a single, unified Nigeria Police Force.
              Following Nigeria&rsquo;s independence in 1960, the Force was regionalised and later
              renationalised, and today operates under Section 214 of the 1999 Constitution and the Police
              Act 2020.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-navy-dark/80">
              Headquartered at Louis Edet House, Abuja, the Nigeria Police Force today comprises 36 state
              commands and the Federal Capital Territory, organised into zonal commands covering the
              entire country.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
