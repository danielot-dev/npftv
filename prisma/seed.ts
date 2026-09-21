import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@npftv.net";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "ChangeMe123!";

  const passwordHash = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: "NPF TV Admin",
      email: adminEmail,
      passwordHash,
      role: "ADMIN",
    },
  });

  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      emergencyPhone: "112",
      emergencyEmail: "info@npftv.net",
      facebookUrl: "https://facebook.com/nigeriapoliceforce",
      twitterUrl: "https://x.com/PoliceNG",
      youtubeUrl: "https://youtube.com/@npftv",
    },
  });

  // ---- Demo content, so the public site isn't empty on first run ----
  // Safe to delete via the admin dashboard once real content is added.

  const news = [
    {
      title: "IGP Commissions New Rapid Response Squad Vehicles in Abuja",
      slug: "igp-commissions-rapid-response-vehicles",
      excerpt:
        "The Inspector-General of Police flagged off 50 new patrol vehicles to strengthen rapid response capacity across the Federal Capital Territory.",
      body: "The Inspector-General of Police today commissioned 50 new patrol vehicles equipped with modern communication systems, aimed at cutting emergency response times across Abuja and its satellite towns.\n\nSpeaking at the flag-off ceremony, the IGP emphasized the Force's commitment to community-focused policing and rapid emergency response. The vehicles will be distributed across the six area commands in the FCT.\n\nThis initiative forms part of a broader modernization programme covering vehicle fleets, communication infrastructure, and officer training nationwide.",
      category: "Operations",
      featured: true,
    },
    {
      title: "Community Policing Forum Holds Town Hall in Lagos",
      slug: "community-policing-forum-lagos-town-hall",
      excerpt:
        "Residents and officers met to discuss neighbourhood safety concerns as part of the ongoing community policing initiative.",
      body: "The Lagos State Police Command hosted a town hall meeting bringing together residents, community leaders, and senior officers to discuss local safety concerns and strengthen police-community relations.\n\nTopics ranged from traffic safety to reporting mechanisms for suspicious activity. The Force reiterated its open-door policy for community engagement.",
      category: "Community",
    },
    {
      title: "Anti-Kidnapping Unit Rescues Three Abduction Victims in Kaduna",
      slug: "anti-kidnapping-unit-rescues-victims-kaduna",
      excerpt:
        "A coordinated operation by the Anti-Kidnapping Unit led to the safe rescue of three victims and the arrest of suspects.",
      body: "Officers of the Anti-Kidnapping Unit, acting on credible intelligence, conducted a rescue operation that led to the safe recovery of three abduction victims in Kaduna State.\n\nInvestigations are ongoing, and the Force has assured the public of continued efforts to dismantle criminal networks operating in the region.",
      category: "Investigation",
    },
    {
      title: "Police Recruit Training Academy Graduates New Cohort",
      slug: "recruit-training-academy-graduates-cohort",
      excerpt: "Over 2,000 newly trained officers passed out to begin deployment nationwide.",
      body: "The Force's training academy held a passing-out parade for over 2,000 newly trained officers, who will be deployed to commands across the country following months of physical, tactical, and legal training.",
      category: "General",
    },
  ];

  for (const n of news) {
    await prisma.newsArticle.upsert({
      where: { slug: n.slug },
      update: {},
      create: { ...n, status: "PUBLISHED", publishedAt: new Date(), authorId: admin.id },
    });
  }

  const programs = [
    {
      name: "Morning Parade",
      slug: "morning-parade",
      description: "A daily roundup of overnight incidents, force directives, and the day ahead.",
      dayOfWeek: "Monday",
      time: "7:00 AM",
    },
    {
      name: "Community Watch",
      slug: "community-watch",
      description: "A weekly programme spotlighting community policing efforts across Nigeria.",
      dayOfWeek: "Wednesday",
      time: "8:00 PM",
    },
    {
      name: "Beat & Beyond",
      slug: "beat-and-beyond",
      description: "Documentary-style features following officers on active duty nationwide.",
      dayOfWeek: "Saturday",
      time: "6:00 PM",
    },
  ];

  const createdPrograms = [];
  for (const p of programs) {
    const program = await prisma.program.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
    createdPrograms.push(program);
  }

  const videos = [
    {
      title: "Morning Parade: Weekly Security Briefing",
      slug: "morning-parade-weekly-briefing",
      description: "This week's security briefing covering major operations and public advisories.",
      youtubeId: "jNQXAC9IVRw",
      category: "Programs",
      featured: true,
      programId: createdPrograms[0].id,
    },
    {
      title: "Community Watch: Policing in Port Harcourt",
      slug: "community-watch-port-harcourt",
      description: "A look at community policing initiatives in Rivers State.",
      youtubeId: "jNQXAC9IVRw",
      category: "Community",
      featured: true,
      programId: createdPrograms[1].id,
    },
    {
      title: "Beat & Beyond: Life at the Marine Police Unit",
      slug: "beat-beyond-marine-police",
      description: "Following officers of the Marine Police Unit on a routine river patrol.",
      youtubeId: "jNQXAC9IVRw",
      category: "Documentary",
      featured: true,
      programId: createdPrograms[2].id,
    },
    {
      title: "IGP Press Briefing: Q3 Crime Statistics",
      slug: "igp-press-briefing-q3-statistics",
      description: "The Inspector-General presents quarterly crime statistics and force strategy.",
      youtubeId: "jNQXAC9IVRw",
      category: "Press",
      featured: true,
    },
  ];

  for (const v of videos) {
    await prisma.video.upsert({
      where: { slug: v.slug },
      update: {},
      create: { ...v, status: "PUBLISHED", publishedAt: new Date(), uploaderId: admin.id },
    });
  }

  const album = await prisma.galleryAlbum.upsert({
    where: { slug: "police-day-celebrations" },
    update: {},
    create: {
      title: "Police Day Celebrations",
      slug: "police-day-celebrations",
      description: "Highlights from this year's Police Day celebrations held nationwide.",
      eventDate: new Date(),
      status: "PUBLISHED",
    },
  });

  await prisma.galleryImage.deleteMany({ where: { albumId: album.id } });
  await prisma.galleryImage.createMany({
    data: [1, 2, 3, 4].map((i) => ({
      albumId: album.id,
      url: `https://picsum.photos/seed/npftv-${i}/800/800`,
      order: i,
    })),
  });

  await prisma.pressRelease.upsert({
    where: { slug: "official-statement-fuel-tanker-incident" },
    update: {},
    create: {
      title: "Official Statement on Fuel Tanker Incident, Ogun State",
      slug: "official-statement-fuel-tanker-incident",
      summary:
        "The Force clarifies the circumstances surrounding a fuel tanker incident and confirms an investigation is underway.",
      body: "The Nigeria Police Force wishes to clarify the circumstances surrounding the fuel tanker incident reported along the Lagos-Ibadan expressway.\n\nInitial findings indicate mechanical failure as a contributing factor. A full investigation is underway, and the Force is coordinating with relevant agencies to ensure road safety measures are reviewed.\n\nFurther updates will be issued as the investigation progresses.",
      status: "PUBLISHED",
      publishedAt: new Date(),
      authorId: admin.id,
    },
  });

  await prisma.announcement.upsert({
    where: { id: "seed-announcement-1" },
    update: {},
    create: {
      id: "seed-announcement-1",
      title: "Emergency lines remain open 24/7 nationwide — dial 112 for immediate assistance",
      body: "The Nigeria Police Force reminds the public that the 112 emergency line and all state command lines remain staffed around the clock, including weekends and public holidays.",
      priority: 10,
      status: "PUBLISHED",
      publishedAt: new Date(),
      authorId: admin.id,
    },
  });

  await prisma.announcement.upsert({
    where: { id: "seed-announcement-2" },
    update: {},
    create: {
      id: "seed-announcement-2",
      title: "Recruitment portal for the 2026 intake opens next month — watch this space",
      body: "The Nigeria Police Force will open its recruitment portal for the 2026 intake next month. Full eligibility criteria and application steps will be published here and on official social media channels ahead of the opening date.",
      priority: 5,
      status: "PUBLISHED",
      publishedAt: new Date(),
      authorId: admin.id,
    },
  });

  await prisma.liveStream.upsert({
    where: { id: "singleton-stream" },
    update: {},
    create: {
      id: "singleton-stream",
      title: "NPF TV Live Broadcast",
      youtubeId: "jNQXAC9IVRw",
      isLive: false,
      scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  });

  console.log(`Seeded admin user: ${admin.email}`);
  console.log(`Seeded demo content: ${news.length} news articles, ${videos.length} videos, ${programs.length} programs, 1 gallery album, 1 press release, 2 announcements.`);
  console.log(`IMPORTANT: change the admin password immediately after first login.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
