import Link from "next/link";
import { getSiteSettings, getActivePartners } from "@/lib/data";
import SocialIcons from "@/components/SocialIcons";

const FOOTER_PARTNER_LIMIT = 6;

export default async function SiteFooter() {
  const [settings, partners] = await Promise.all([getSiteSettings(), getActivePartners()]);
  const visiblePartners = partners.slice(0, FOOTER_PARTNER_LIMIT);

  return (
    <footer className="border-t border-royal/40 bg-offwhite">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div>
          <h3 className="font-heading text-lg font-bold text-navy">
            NPF <span className="text-royal-dark">TV</span>
          </h3>
          <p className="mt-3 text-sm text-navy-dark/80">
            The official media platform of the Nigeria Police Force.
          </p>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-royal-dark">
            Quick Links
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-navy-dark">
            <li><Link href="/news" className="hover:text-royal-dark">News</Link></li>
            <li><Link href="/live" className="hover:text-royal-dark">Live TV</Link></li>
            <li><Link href="/programs" className="hover:text-royal-dark">Programs</Link></li>
            <li><Link href="/press-centre" className="hover:text-royal-dark">Press Centre</Link></li>
            <li><Link href="/find-a-police-station" className="hover:text-royal-dark">Find a Police Station</Link></li>
            <li><Link href="/crime-prevention" className="hover:text-royal-dark">Crime Prevention</Link></li>
            <li><Link href="/stats-and-data" className="hover:text-royal-dark">Stats and Data</Link></li>
            <li><Link href="/report" className="hover:text-royal-dark">Report</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-royal-dark">
            Partners
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-navy-dark">
            {visiblePartners.length === 0 ? (
              <li className="text-navy-dark/50">Coming soon</li>
            ) : (
              visiblePartners.map((partner) => (
                <li key={partner.id}>
                  {partner.websiteUrl ? (
                    <a
                      href={partner.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-royal-dark"
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
              <Link href="/partners" className="font-semibold text-royal-dark hover:text-royal">
                View all partners →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-royal-dark">
            Emergency Contact
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-navy-dark">
            <li>
              Emergency Line:{" "}
              <span className="font-semibold text-navy">{settings?.emergencyPhone ?? "112"}</span>
            </li>
            <li>Toll-Free: <span className="font-semibold text-navy">0800-CALL-NPF</span></li>
            <li><Link href="/contact" className="hover:text-royal-dark">Full contact directory →</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-royal-dark">
            Follow NPF TV
          </h4>
          <div className="mt-3">
            <SocialIcons />
          </div>
        </div>
      </div>

      <div className="royal-divider" />
      <p className="px-4 py-4 text-center text-xs text-navy-dark/60 lg:px-8">
        © {new Date().getFullYear()} Nigeria Police Force TV. All rights reserved.
      </p>
    </footer>
  );
}
