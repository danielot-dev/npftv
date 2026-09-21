import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ContactForm from "@/components/ContactForm";
import { getSiteSettings } from "@/lib/data";

export const metadata: Metadata = { title: "Contact & Emergency Information" };

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
        <h1 className="mb-8 border-b-2 border-navy pb-3 font-heading text-3xl font-extrabold text-navy">
          Contact &amp; Emergency Information
        </h1>

        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="border-l-4 border-crimson bg-white p-6">
              <h2 className="font-heading text-lg font-bold text-navy">In an emergency</h2>
              <p className="mt-3 font-condensed text-3xl font-bold text-crimson">
                {settings?.emergencyPhone ?? "112"}
              </p>
              <p className="mt-1 text-sm text-navy-dark/70">
                Nationwide emergency number — available 24/7.
              </p>
              {settings?.emergencyEmail && (
                <p className="mt-4 text-sm text-navy-dark/75">
                  Emergency email:{" "}
                  <a href={`mailto:${settings.emergencyEmail}`} className="text-navy hover:text-gold-dark">
                    {settings.emergencyEmail}
                  </a>
                </p>
              )}
            </div>

            <div className="mt-6 border border-navy/10 bg-white p-6">
              <h2 className="font-heading text-lg font-bold text-navy">Follow NPF TV</h2>
              <ul className="mt-3 space-y-2 text-sm text-navy-dark">
                {settings?.facebookUrl && (
                  <li><a href={settings.facebookUrl} className="hover:text-gold-dark">Facebook</a></li>
                )}
                {settings?.twitterUrl && (
                  <li><a href={settings.twitterUrl} className="hover:text-gold-dark">X (Twitter)</a></li>
                )}
                {settings?.instagramUrl && (
                  <li><a href={settings.instagramUrl} className="hover:text-gold-dark">Instagram</a></li>
                )}
                {settings?.youtubeUrl && (
                  <li><a href={settings.youtubeUrl} className="hover:text-gold-dark">YouTube</a></li>
                )}
                {!settings?.facebookUrl && !settings?.twitterUrl && !settings?.instagramUrl && !settings?.youtubeUrl && (
                  <li className="text-navy-dark/50">Social links will appear here once added.</li>
                )}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h2 className="mb-4 font-heading text-lg font-bold text-navy">General inquiries</h2>
            <ContactForm />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
