import Link from "next/link";
import Image from "next/image";
import MediaPlaceholder from "@/components/MediaPlaceholder";
import { formatDate } from "@/lib/format";

type AlbumCardItem = {
  slug: string;
  title: string;
  eventDate: Date | null;
  coverImage: string | null;
  images: { url: string }[];
};

export default function GalleryAlbumCard({ album }: { album: AlbumCardItem }) {
  const cover = album.coverImage || album.images[0]?.url;

  return (
    <Link href={`/gallery/${album.slug}`} className="glass glass-hover group block overflow-hidden rounded-2xl p-2">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl">
        {cover ? (
          <Image
            src={cover}
            alt={album.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <MediaPlaceholder className="h-full w-full" variant="royal" />
        )}
      </div>
      <h3 className="mt-3 px-1 font-heading text-base font-semibold text-navy group-hover:text-royal-dark">
        {album.title}
      </h3>
      <p className="px-1 pb-1 font-condensed text-xs text-navy-dark/50">{formatDate(album.eventDate)}</p>
    </Link>
  );
}
