"use client";

import { useState } from "react";
import { subscribeToNewsletter } from "@/lib/actions/subscriberActions";
import { sendSubscribeConfirmation } from "@/lib/emailjs";

export default function SubscribeSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const result = await subscribeToNewsletter(email);

    if (!result.success) {
      setErrorMessage(result.error);
      setStatus("error");
      return;
    }

    const unsubscribeUrl = `https://npftv.net/unsubscribe?email=${encodeURIComponent(
      result.email
    )}&token=${result.token}`;

    // Best effort — subscription is already saved even if the email fails
    await sendSubscribeConfirmation({ email: result.email, unsubscribeUrl });

    setStatus("success");
    setEmail("");
  }

  return (
    <section className="bg-navy py-14">
      <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
        <p className="font-condensed text-sm font-semibold uppercase tracking-wide text-royal">
          Stay Informed
        </p>
        <h2 className="mt-2 font-heading text-2xl font-extrabold text-white lg:text-3xl">
          Subscribe for NPF TV Updates
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-white/70">
          Get breaking news, press releases, and programme schedules sent straight to your inbox.
        </p>

        {status === "success" ? (
          <p className="mt-6 rounded-md border border-royal/40 bg-white/5 px-4 py-3 text-sm text-royal-light">
            You&apos;re subscribed. Check your inbox for a confirmation email.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 rounded-md border border-white/20 bg-white/10 px-4 py-2.5 text-white placeholder-white/40 outline-none focus:border-royal"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-md bg-royal px-5 py-2.5 font-heading text-sm font-semibold text-ink transition hover:bg-royal-light disabled:opacity-60"
            >
              {status === "loading" ? "Subscribing…" : "Subscribe"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-3 text-sm text-signal-dark" role="alert">
            {errorMessage}
          </p>
        )}
      </div>
    </section>
  );
}
