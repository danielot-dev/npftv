import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import VideoForm from "@/components/admin/VideoForm";
import { updateVideo } from "@/lib/actions/videoActions";

export default async function EditVideoPage({ params }: { params: { id: string } }) {
  const video = await prisma.video.findUnique({ where: { id: params.id } });
  if (!video) notFound();

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-bold text-navy">Edit Video</h1>
      <VideoForm action={updateVideo.bind(null, video.id)} defaultValues={video} />
    </div>
  );
}
