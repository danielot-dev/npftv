import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import { getSiteSettings } from "@/lib/data";

export const metadata: Metadata = { title: "Crime Prevention" };

const TIP_CATEGORIES: { title: string; tips: string[] }[] = [
  {
    title: "Home & Property Safety",
    tips: [
      "Install visible, working locks on all doors and windows, and reinforce entry points.",
      "Get to know your neighbours — a watchful street is a safer street.",
      "Avoid publicising travel plans on social media until after you return.",
      "Keep valuables out of sight from windows and entryways.",
      "Report broken street lighting or suspicious loitering to your local station promptly.",
    ],
  },
  {
    title: "Personal & Road Safety",
    tips: [
      "Stay alert in crowded areas and keep bags and phones secured, not loosely held.",
      "Vary your routine and routes where possible, especially at night.",
      "Share your location or trip details with someone you trust when travelling alone.",
      "Keep vehicle doors locked and windows up in slow-moving traffic.",
      "Avoid poorly lit or isolated routes after dark; use well-travelled roads.",
    ],
  },
  {
    title: "Cybercrime & Fraud",
    tips: [
      "Never share your BVN, OTP, PIN, or bank card details over phone calls or messages.",
      "Verify unfamiliar job offers, investment schemes, and romance requests before sending money.",
      "Use strong, unique passwords and enable two-factor authentication on financial apps.",
      "Be cautious of urgent, high-pressure requests — a common tactic used by fraudsters.",
      "Report suspicious transactions to your bank immediately, then file a police report.",
    ],
  },
  {
    title: "Community Policing",
    tips: [
      "Attend or support your local Community Policing / Vigilante coordination meetings.",
      "Report suspicious activity promptly — early reports help prevent, not just respond.",
      "Encourage local businesses to install CCTV and share footage when incidents occur.",
      "Support youth and community engagement programs that reduce opportunities for crime.",
      "Work with, not around, your divisional police officers on local safety concerns.",
    ],
  },
];

export default async function CrimePreventionPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <SiteHeader />
      <PageHero
        eyebrow="Stay Safe"
        title="Crime Prevention"
        description="Practical guidance from the Nigeria Police Force to help you protect yourself, your family, and your community. Prevention starts with awareness — and with reporting what you see."
      />
      <main className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
        <div className="glass fade-in-up mb-10 rounded-2xl border-l-4 border-signal p-6">
          <h2 className="font-heading text-lg font-bold text-navy">See something? Say something.</h2>
          <p className="mt-2 text-sm text-navy-dark/75">
            For emergencies, call{" "}
            <span className="font-semibold text-signal">{settings?.emergencyPhone ?? "112"}</span>{" "}
            immediately. For non-emergency reports, use our{" "}
            <a href="/report" className="font-semibold text-navy hover:text-royal-dark">
              online report form
            </a>
            .
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {TIP_CATEGORIES.map((category) => (
            <div key={category.title} className="glass rounded-2xl p-6">
              <h2 className="mb-4 font-heading text-lg font-bold text-navy">{category.title}</h2>
              <ul className="space-y-3">
                {category.tips.map((tip) => (
                  <li key={tip} className="flex gap-3 text-sm text-navy-dark/80">
                    <span aria-hidden="true" className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-royal shadow-glow" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
