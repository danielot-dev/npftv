import AnnouncementForm from "@/components/admin/AnnouncementForm";
import { createAnnouncement } from "@/lib/actions/announcementActions";

export default function NewAnnouncementPage() {
  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-bold text-navy">New Announcement</h1>
      <AnnouncementForm action={createAnnouncement} />
    </div>
  );
}
