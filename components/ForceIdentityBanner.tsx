import Image from "next/image";
import Link from "next/link";

export default function ForceIdentityBanner() {
  return (
    <section className="relative overflow-hidden bg-navy-gradient">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-royal/20 blur-3xl motion-safe:animate-mesh-drift"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-signal/15 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="fade-in-up flex flex-col items-center gap-6 text-center lg:flex-row lg:items-center lg:gap-10 lg:text-left">
          <Image
            src="/logo(1).jpeg"
            alt="NPF TV crest"
            width={104}
            height={104}
            className="h-24 w-24 shrink-0 rounded-full shadow-glow lg:h-28 lg:w-28"
          />
          <div className="flex-1">
            <p className="font-condensed text-xs font-semibold uppercase tracking-[0.25em] text-royal-light">
              NPF TV · Official Media Platform
            </p>
            <p className="mt-2 font-heading text-2xl font-extrabold text-white lg:text-3xl">
              The Broadcast Voice of the Nigeria Police Force
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-white/75 lg:mx-0 lg:text-base">
              NPF TV brings Nigerians closer to their Police Force — live broadcasts, breaking news,
              documentaries, and programs that promote transparency, public safety awareness, and
              community trust.
            </p>
          </div>
          <Link
            href="/live"
            className="shrink-0 rounded-xl bg-royal px-6 py-3 font-heading text-sm font-semibold text-white shadow-glow transition hover:bg-royal-light"
          >
            Watch Live
          </Link>
        </div>
      </div>
      <div className="royal-divider" />
    </section>
  );
}
