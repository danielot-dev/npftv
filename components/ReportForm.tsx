"use client";

import { useState } from "react";
import { sendReportEmails } from "@/lib/emailjs";

const INCIDENT_TYPES = [
  "Theft / Burglary",
  "Assault",
  "Armed Robbery",
  "Cybercrime / Online Fraud",
  "Kidnapping",
  "Corruption / Misconduct",
  "Traffic Incident",
  "Domestic Violence",
  "Other",
];

export default function ReportForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      incidentType: String(formData.get("incidentType") ?? ""),
      location: String(formData.get("location") ?? ""),
      message: String(formData.get("message") ?? ""),
      anonymous,
    };

    try {
      const res = await fetch("/api/report", {
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

      // Best-effort — the report is already saved even if email sending fails
      await sendReportEmails(data);

      setStatus("success");
      form.reset();
      setAnonymous(false);
    } catch {
      setErrorMessage("Could not submit your report. Check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-royal/50 bg-white px-6 py-8 text-center">
        <h3 className="font-heading text-lg font-bold text-navy">Report submitted</h3>
        <p className="mt-2 text-sm text-navy-dark/75">
          Thank you for your report. It has been received and will be reviewed by our team. If this is
          an emergency in progress, please call 112 now.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-semibold text-royal-dark hover:text-royal"
        >
          Submit another report
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="flex items-center gap-2 border border-navy/10 bg-white px-4 py-3 text-sm text-navy-dark">
        <input
          type="checkbox"
          checked={anonymous}
          onChange={(e) => setAnonymous(e.target.checked)}
        />
        Report anonymously (your name and contact details will not be required)
      </label>

      {!anonymous && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-navy">
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required={!anonymous}
              className="mt-1 w-full border border-navy/20 bg-white px-3 py-2.5 text-navy-dark outline-none focus:border-royal"
            />
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
        </div>
      )}

      {!anonymous && (
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-navy">
            Email (optional — so we can follow up)
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="mt-1 w-full border border-navy/20 bg-white px-3 py-2.5 text-navy-dark outline-none focus:border-royal"
          />
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="incidentType" className="block text-sm font-medium text-navy">
            Type of incident
          </label>
          <select
            id="incidentType"
            name="incidentType"
            required
            defaultValue=""
            className="mt-1 w-full border border-navy/20 bg-white px-3 py-2.5 text-navy-dark outline-none focus:border-royal"
          >
            <option value="" disabled>
              Select a category
            </option>
            {INCIDENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-navy">
            Location of incident
          </label>
          <input
            id="location"
            name="location"
            type="text"
            required
            placeholder="e.g. Wuse Zone 4, Abuja"
            className="mt-1 w-full border border-navy/20 bg-white px-3 py-2.5 text-navy-dark outline-none focus:border-royal"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-navy">
          What happened
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder="Include date, time, and any details that could help — vehicle description, number of people involved, etc."
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
        {status === "loading" ? "Submitting…" : "Submit report"}
      </button>

      <p className="text-xs text-navy-dark/50">
        This form is for non-emergency reports. If a crime is in progress or life is at risk, call the
        emergency line immediately — do not wait for a response here.
      </p>
    </form>
  );
}
