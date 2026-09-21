import VideoForm from "@/components/admin/VideoForm";
import { createVideo } from "@/lib/actions/videoActions";

export default function NewVideoPage() {
  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-bold text-navy">New Video</h1>
      <VideoForm action={createVideo} />
    </div>
  );
}
