import Link from "next/link";
import { getSiteSettings } from "@/lib/data";
import SocialIcons from "@/components/SocialIcons";

export default async function SiteFooter() {
  const settings = await getSiteSettings();
  return (
    <footer className="border-t border-gold/40 bg-offwhite">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-4 lg:px-8">
        <div>
          <h3 className="font-heading text-lg font-bold text-navy">
            NPF <span className="text-gold-dark">TV</span>
          </h3>
          <p className="mt-3 text-sm text-navy-dark/80">
            The official media platform of the Nigeria Police Force.
          </p>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-gold-dark">
            Quick Links
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-navy-dark">
            <li><Link href="/news" className="hover:text-gold-dark">News</Link></li>
            <li><Link href="/live" className="hover:text-gold-dark">Live TV</Link></li>
            <li><Link href="/programs" className="hover:text-gold-dark">Programs</Link></li>
            <li><Link href="/press-centre" className="hover:text-gold-dark">Press Centre</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-gold-dark">
            Emergency Contact
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-navy-dark">
            <li>
              Emergency Line:{" "}
              <span className="font-semibold text-navy">{settings?.emergencyPhone ?? "112"}</span>
            </li>
            <li>Toll-Free: <span className="font-semibold text-navy">0800-CALL-NPF</span></li>
            <li><Link href="/contact" className="hover:text-gold-dark">Full contact directory →</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-gold-dark">
            Follow NPF TV
          </h4>
          <div className="mt-3">
            <SocialIcons />
          </div>
        </div>
      </div>

      <div className="gold-divider" />
      <p className="px-4 py-4 text-center text-xs text-navy-dark/60 lg:px-8">
        © {new Date().getFullYear()} Nigeria Police Force TV. All rights reserved.
      </p>
    </footer>
  );
}
