import Link from "next/link";
import Image from "next/image";
import MediaPlaceholder from "@/components/MediaPlaceholder";
import { formatDate, youtubeThumbnail } from "@/lib/format";

type VideoCardItem = {
  slug: string;
  title: string;
  thumbnail: string | null;
  youtubeId: string;
  category: string;
  publishedAt: Date | null;
};

export default function VideoCard({ video }: { video: VideoCardItem }) {
  const thumbnailSrc = video.thumbnail || youtubeThumbnail(video.youtubeId);

  return (
    <Link href={`/videos/${video.slug}`} className="group block">
      <div className="relative aspect-video w-full overflow-hidden bg-navy">
        {thumbnailSrc ? (
          <Image
            src={thumbnailSrc}
            alt={video.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <MediaPlaceholder className="h-full w-full" />
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-navy-dark/0 transition group-hover:bg-navy-dark/20">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 opacity-0 transition group-hover:opacity-100">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="#0F2A4A">
              <path d="M4 2.5v11l9-5.5z" />
            </svg>
          </div>
        </div>
      </div>
      <p className="mt-3 font-condensed text-xs font-semibold uppercase tracking-wide text-royal-dark">
        {video.category}
      </p>
      <h3 className="mt-1 font-heading text-base font-semibold leading-snug text-navy group-hover:text-navy-light">
        {video.title}
      </h3>
      <p className="mt-1 font-condensed text-xs text-navy-dark/50">{formatDate(video.publishedAt)}</p>
    </Link>
  );
}
