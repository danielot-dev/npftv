import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
        <p className="font-condensed text-sm font-semibold uppercase tracking-wide text-royal-dark">
          404
        </p>
        <h1 className="mt-2 font-heading text-3xl font-extrabold text-navy lg:text-4xl">
          Page not found
        </h1>
        <p className="mt-3 max-w-md text-navy-dark/70">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved. Try one of
          the links below, or head back to the homepage.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-md bg-navy px-5 py-2.5 font-heading text-sm font-semibold text-white transition hover:bg-navy-light"
          >
            Back to Homepage
          </Link>
          <Link
            href="/news"
            className="rounded-md border border-navy/20 px-5 py-2.5 font-heading text-sm font-semibold text-navy transition hover:border-navy"
          >
            Browse News
          </Link>
          <Link
            href="/search"
            className="rounded-md border border-navy/20 px-5 py-2.5 font-heading text-sm font-semibold text-navy transition hover:border-navy"
          >
            Search the Site
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
