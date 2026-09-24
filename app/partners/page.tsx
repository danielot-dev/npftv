import type { Metadata } from "next";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getActivePartners } from "@/lib/data";

export const metadata: Metadata = { title: "Partners" };

export default async function PartnersPage() {
  const partners = await getActivePartners();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
        <h1 className="mb-3 border-b-2 border-navy pb-3 font-heading text-3xl font-extrabold text-navy">
          Our Partners
        </h1>
        <p className="mb-8 max-w-3xl text-sm text-navy-dark/75">
          NPF TV works alongside government agencies and organizations across Nigeria&rsquo;s security
          and public safety ecosystem. These partnerships support coordinated public awareness,
          emergency response, and community safety programming.
        </p>

        {partners.length === 0 ? (
          <p className="rounded-lg border border-dashed border-navy/20 bg-white px-6 py-16 text-center text-sm text-navy-dark/60">
            Partner organizations will be listed here soon.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner) => {
              const Card = (
                <div className="flex h-full flex-col items-center gap-4 border border-navy/10 bg-white p-6 text-center transition hover:border-royal/60 hover:shadow-royal">
                  <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-navy/5">
                    {partner.logoUrl ? (
                      <Image
                        src={partner.logoUrl}
                        alt={partner.name}
                        width={80}
                        height={80}
                        className="h-full w-full object-contain p-2"
                      />
                    ) : (
                      <span className="font-heading text-xl font-bold text-navy">
                        {partner.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <p className="font-heading text-sm font-semibold text-navy">{partner.name}</p>
                  {partner.websiteUrl && (
                    <span className="text-xs font-semibold text-royal-dark">Visit website →</span>
                  )}
                </div>
              );

              return partner.websiteUrl ? (
                <a
                  key={partner.id}
                  href={partner.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {Card}
                </a>
              ) : (
                <div key={partner.id}>{Card}</div>
              );
            })}
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
