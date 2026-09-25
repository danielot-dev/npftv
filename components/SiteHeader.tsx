import Link from "next/link";
import Image from "next/image";
import BreakingTicker from "@/components/BreakingTicker";
import MobileMenu from "@/components/MobileMenu";
import { getLiveStream } from "@/lib/data";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/news", label: "News" },
  { href: "/live", label: "Live TV" },
  { href: "/videos", label: "Videos" },
  { href: "/programs", label: "Programs" },
  { href: "/gallery", label: "Gallery" },
  { href: "/press-centre", label: "Press Centre" },
  { href: "/contact", label: "Contact" },
];

export default async function SiteHeader() {
  const stream = await getLiveStream();
  const isLive = stream?.isLive ?? false;
  return (
    <header className="glass sticky top-0 z-50">
      <BreakingTicker />
      <div className="relative border-b border-royal/30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo(1).jpeg"
              alt="Nigeria Police Force TV"
              width={44}
              height={44}
              className="h-11 w-11 rounded-full shadow-glass-sm"
              priority
            />
            <span className="font-heading text-lg font-bold tracking-wide text-navy">
              NPF <span className="text-royal-dark">TV</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative font-heading text-sm font-medium text-navy-dark transition hover:text-royal-dark"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/search"
              aria-label="Search"
              className="flex h-9 w-9 items-center justify-center rounded-full text-navy transition hover:bg-white/60 hover:text-royal-dark"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" strokeLinecap="round" />
              </svg>
            </Link>
            <Link
              href="/live"
              className={
                isLive
                  ? "live-badge hidden shadow-glow sm:inline-flex"
                  : "hidden items-center gap-1.5 rounded-full border border-navy/15 bg-white/40 px-2.5 py-0.5 font-condensed text-xs font-semibold uppercase tracking-wide text-navy-dark/70 backdrop-blur-sm transition hover:border-royal hover:text-royal-dark sm:inline-flex"
              }
            >
              {isLive ? "Live" : "Live TV"}
            </Link>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
