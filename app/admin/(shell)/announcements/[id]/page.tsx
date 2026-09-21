import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AnnouncementForm from "@/components/admin/AnnouncementForm";
import { updateAnnouncement } from "@/lib/actions/announcementActions";

export default async function EditAnnouncementPage({ params }: { params: { id: string } }) {
  const announcement = await prisma.announcement.findUnique({ where: { id: params.id } });
  if (!announcement) notFound();

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-bold text-navy">Edit Announcement</h1>
      <AnnouncementForm
        action={updateAnnouncement.bind(null, announcement.id)}
        defaultValues={announcement}
      />
    </div>
  );
}
