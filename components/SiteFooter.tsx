import Link from "next/link";
import { getSiteSettings, getActivePartners } from "@/lib/data";
import SocialIcons from "@/components/SocialIcons";

const FOOTER_PARTNER_LIMIT = 6;

export default async function SiteFooter() {
  const [settings, partners] = await Promise.all([getSiteSettings(), getActivePartners()]);
  const visiblePartners = partners.slice(0, FOOTER_PARTNER_LIMIT);

  return (
    <footer className="relative overflow-hidden border-t border-royal/30 bg-navy-gradient">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-royal/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-signal/10 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div>
          <h3 className="font-heading text-lg font-bold text-white">
            NPF <span className="text-royal-light">TV</span>
          </h3>
          <p className="mt-3 text-sm text-white/70">
            The official media platform of the Nigeria Police Force.
          </p>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-royal-light">
            Quick Links
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li><Link href="/about" className="hover:text-royal-light">About</Link></li>
            <li><Link href="/news" className="hover:text-royal-light">News</Link></li>
            <li><Link href="/live" className="hover:text-royal-light">Live TV</Link></li>
            <li><Link href="/programs" className="hover:text-royal-light">Programs</Link></li>
            <li><Link href="/press-centre" className="hover:text-royal-light">Press Centre</Link></li>
            <li><Link href="/find-a-police-station" className="hover:text-royal-light">Find a Police Station</Link></li>
            <li><Link href="/crime-prevention" className="hover:text-royal-light">Crime Prevention</Link></li>
            <li><Link href="/stats-and-data" className="hover:text-royal-light">Stats and Data</Link></li>
            <li><Link href="/report" className="hover:text-royal-light">Report</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-royal-light">
            Partners
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            {visiblePartners.length === 0 ? (
              <li className="text-white/50">Coming soon</li>
            ) : (
              visiblePartners.map((partner) => (
                <li key={partner.id}>
                  {partner.websiteUrl ? (
                    <a
                      href={partner.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-royal-light"
                    >
                      {partner.name}
                    </a>
                  ) : (
                    <span>{partner.name}</span>
                  )}
                </li>
              ))
            )}
            <li>
              <Link href="/partners" className="font-semibold text-royal-light hover:text-royal">
                View all partners →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-royal-light">
            Emergency Contact
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li>
              Emergency Line:{" "}
              <span className="font-semibold text-white">{settings?.emergencyPhone ?? "112"}</span>
            </li>
            <li>Toll-Free: <span className="font-semibold text-white">0800-CALL-NPF</span></li>
            <li><Link href="/contact" className="hover:text-royal-light">Full contact directory →</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-royal-light">
            Follow NPF TV
          </h4>
          <div className="mt-3">
            <SocialIcons variant="dark" />
          </div>
        </div>
      </div>

      <div className="royal-divider" />
      <p className="px-4 py-4 text-center text-xs text-white/50 lg:px-8">
        © {new Date().getFullYear()} Nigeria Police Force TV. All rights reserved.
      </p>
    </footer>
  );
}
