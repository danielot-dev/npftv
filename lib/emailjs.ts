import emailjs from "@emailjs/browser";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const CONTACT_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID;
const AUTOREPLY_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID;
const SUBSCRIBE_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_SUBSCRIBE_TEMPLATE_ID;
// Falls back to the general contact template if a dedicated report
// template hasn't been set up in EmailJS yet.
const REPORT_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_REPORT_TEMPLATE_ID || CONTACT_TEMPLATE_ID;

const isConfigured = Boolean(SERVICE_ID && PUBLIC_KEY);

/**
 * Sends the internal team notification + the auto-reply to the person who
 * submitted the contact form. Both emails are "best effort" — if EmailJS
 * isn't configured yet, or a send fails, we swallow the error so the form
 * still succeeds (the message is already saved to the database as a
 * backup record via /api/contact).
 */
export async function sendContactEmails(fields: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  if (!isConfigured) {
    console.warn("EmailJS is not configured — skipping email send. Message was still saved.");
    return;
  }

  const templateParams = {
    from_name: fields.name,
    from_email: fields.email,
    phone: fields.phone || "Not provided",
    subject: fields.subject,
    message: fields.message,
  };

  const sends: Promise<unknown>[] = [];

  if (CONTACT_TEMPLATE_ID) {
    sends.push(
      emailjs.send(SERVICE_ID!, CONTACT_TEMPLATE_ID, templateParams, { publicKey: PUBLIC_KEY! })
    );
  }
  if (AUTOREPLY_TEMPLATE_ID) {
    sends.push(
      emailjs.send(SERVICE_ID!, AUTOREPLY_TEMPLATE_ID, templateParams, { publicKey: PUBLIC_KEY! })
    );
  }

  const results = await Promise.allSettled(sends);
  results.forEach((r) => {
    if (r.status === "rejected") console.error("EmailJS send failed:", r.reason);
  });
}

/**
 * Sends the internal team notification for a submission from the Report
 * a Crime form. Best-effort, same as sendContactEmails — the report is
 * already saved to the database via /api/report even if this fails. No
 * auto-reply is sent here since reports may be filed anonymously.
 */
export async function sendReportEmails(fields: {
  name: string;
  email?: string;
  phone?: string;
  incidentType: string;
  location: string;
  message: string;
  anonymous: boolean;
}) {
  if (!isConfigured || !REPORT_TEMPLATE_ID) {
    console.warn("EmailJS is not configured — skipping email send. Report was still saved.");
    return;
  }

  const templateParams = {
    from_name: fields.anonymous ? "Anonymous" : fields.name,
    from_email: fields.email || "Not provided",
    phone: fields.phone || "Not provided",
    subject: `Crime Report: ${fields.incidentType}`,
    message: `Location: ${fields.location}\n\n${fields.message}`,
  };

  try {
    await emailjs.send(SERVICE_ID!, REPORT_TEMPLATE_ID, templateParams, { publicKey: PUBLIC_KEY! });
  } catch (err) {
    console.error("EmailJS report send failed:", err);
  }
}

/**
 * Sends the newsletter subscribe confirmation email, including the
 * unsubscribe link built from the subscriber's token.
 */
export async function sendSubscribeConfirmation(fields: { email: string; unsubscribeUrl: string }) {
  if (!isConfigured || !SUBSCRIBE_TEMPLATE_ID) {
    console.warn("EmailJS subscribe template not configured — skipping confirmation email.");
    return;
  }

  try {
    await emailjs.send(
      SERVICE_ID!,
      SUBSCRIBE_TEMPLATE_ID,
      { to_email: fields.email, unsubscribe_url: fields.unsubscribeUrl },
      { publicKey: PUBLIC_KEY! }
    );
  } catch (err) {
    console.error("EmailJS subscribe confirmation failed:", err);
  }
}
