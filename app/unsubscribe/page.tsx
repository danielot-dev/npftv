import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { unsubscribe } from "@/lib/actions/subscriberActions";

export const metadata = { title: "Unsubscribe" };

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: { email?: string; token?: string };
}) {
  const { email, token } = searchParams;
  const result = email && token ? await unsubscribe(email, token) : { success: false as const, error: "Missing unsubscribe details." };

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 text-center">
        <div className="glass fade-in-up w-full rounded-2xl px-8 py-10">
          {result.success ? (
            <>
              <h1 className="font-heading text-2xl font-bold text-navy">You&apos;ve been unsubscribed</h1>
              <p className="mt-3 text-sm text-navy-dark/70">
                You won&apos;t receive further NPF TV newsletter emails. You can re-subscribe any time
                from the homepage.
              </p>
            </>
          ) : (
            <>
              <h1 className="font-heading text-2xl font-bold text-navy">Couldn&apos;t unsubscribe</h1>
              <p className="mt-3 text-sm text-navy-dark/70">{result.error}</p>
            </>
          )}
          <Link href="/" className="mt-6 inline-block font-heading text-sm font-semibold text-royal-dark hover:text-royal">
            Back to Homepage
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
