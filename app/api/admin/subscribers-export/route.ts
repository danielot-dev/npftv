import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const subscribers = await prisma.subscriber.findMany({
    where: { active: true },
    orderBy: { createdAt: "asc" },
    select: { email: true, createdAt: true },
  });

  const rows = [
    "email,subscribed_at",
    ...subscribers.map((s) => `${s.email},${s.createdAt.toISOString()}`),
  ];

  return new NextResponse(rows.join("\n"), {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="npftv-subscribers-${new Date()
        .toISOString()
        .slice(0, 10)}.csv"`,
    },
  });
}
