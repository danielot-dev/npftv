import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const ContactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(30).optional().or(z.literal("")),
  subject: z.string().min(2).max(150),
  message: z.string().min(10).max(4000),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = ContactSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form — some fields are missing or invalid." },
      { status: 400 }
    );
  }

  const { name, email, phone, subject, message } = parsed.data;

  await prisma.contactMessage.create({
    data: { name, email, phone: phone || null, subject, message },
  });

  return NextResponse.json({ success: true });
}
