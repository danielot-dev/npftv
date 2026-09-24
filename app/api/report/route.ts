import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const ReportSchema = z
  .object({
    name: z.string().max(120).optional().or(z.literal("")),
    email: z.string().email().optional().or(z.literal("")),
    phone: z.string().max(30).optional().or(z.literal("")),
    incidentType: z.string().min(2).max(80),
    location: z.string().min(2).max(200),
    message: z.string().min(10).max(4000),
    anonymous: z.boolean().optional(),
  })
  .refine((data) => data.anonymous || (data.name && data.name.length >= 2), {
    message: "Please provide your name, or choose to report anonymously.",
    path: ["name"],
  });

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = ReportSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form — some fields are missing or invalid." },
      { status: 400 }
    );
  }

  const { name, email, phone, incidentType, location, message, anonymous } = parsed.data;

  await prisma.contactMessage.create({
    data: {
      name: anonymous ? "Anonymous" : name || "Anonymous",
      email: email || "not-provided@npftv.net",
      phone: phone || null,
      subject: `Crime Report: ${incidentType}`,
      message,
      category: "Crime Report",
      location,
      anonymous: Boolean(anonymous),
    },
  });

  return NextResponse.json({ success: true });
}
