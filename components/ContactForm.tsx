"use client";

import { useState } from "react";
import { sendContactEmails } from "@/lib/emailjs";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setErrorMessage(body.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      // Best-effort — the message is already saved even if email sending fails
      await sendContactEmails({
        name: String(data.name ?? ""),
        email: String(data.email ?? ""),
        phone: data.phone ? String(data.phone) : undefined,
        subject: String(data.subject ?? ""),
        message: String(data.message ?? ""),
      });

      setStatus("success");
      form.reset();
    } catch {
      setErrorMessage("Could not send your message. Check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-royal/50 bg-white px-6 py-8 text-center">
        <h3 className="font-heading text-lg font-bold text-navy">Message sent</h3>
        <p className="mt-2 text-sm text-navy-dark/75">
          Thank you for reaching out. Your message has been received and will be reviewed by our team.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-semibold text-royal-dark hover:text-royal"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-navy">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1 w-full border border-navy/20 bg-white px-3 py-2.5 text-navy-dark outline-none focus:border-royal"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-navy">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full border border-navy/20 bg-white px-3 py-2.5 text-navy-dark outline-none focus:border-royal"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-navy">
          Phone (optional)
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="mt-1 w-full border border-navy/20 bg-white px-3 py-2.5 text-navy-dark outline-none focus:border-royal"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-navy">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          className="mt-1 w-full border border-navy/20 bg-white px-3 py-2.5 text-navy-dark outline-none focus:border-royal"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-navy">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-1 w-full border border-navy/20 bg-white px-3 py-2.5 text-navy-dark outline-none focus:border-royal"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-signal" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-navy px-6 py-2.5 font-heading text-sm font-semibold text-white transition hover:bg-navy-light disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send message"}
      </button>

      <p className="text-xs text-navy-dark/50">
        This form is for general inquiries only. For emergencies, use the contact details above — do not
        wait for a response here.
      </p>
    </form>
  );
}
