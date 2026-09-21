"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled page error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col bg-offwhite">
      <header className="border-b border-gold/40 bg-white px-4 py-3 lg:px-8">
        <Link href="/" className="font-heading text-lg font-bold text-navy">
          NPF <span className="text-gold-dark">TV</span>
        </Link>
      </header>

      <main className="mx-auto flex flex-1 max-w-2xl flex-col items-center justify-center px-4 text-center">
        <p className="font-condensed text-sm font-semibold uppercase tracking-wide text-crimson">
          Something went wrong
        </p>
        <h1 className="mt-2 font-heading text-2xl font-extrabold text-navy lg:text-3xl">
          We hit a snag loading this page
        </h1>
        <p className="mt-3 max-w-md text-navy-dark/70">
          This has been logged. Please try again, or head back to the homepage if the problem
          continues.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={reset}
            className="rounded-md bg-navy px-5 py-2.5 font-heading text-sm font-semibold text-white transition hover:bg-navy-light"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="rounded-md border border-navy/20 px-5 py-2.5 font-heading text-sm font-semibold text-navy transition hover:border-navy"
          >
            Back to Homepage
          </Link>
        </div>
      </main>
    </div>
  );
}
