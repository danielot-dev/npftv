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
    <Link href={`/gallery/${album.slug}`} className="group block">
      <div className="relative aspect-square w-full overflow-hidden">
        {cover ? (
          <Image
            src={cover}
            alt={album.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <MediaPlaceholder className="h-full w-full" variant="royal" />
        )}
      </div>
      <h3 className="mt-3 font-heading text-base font-semibold text-navy group-hover:text-navy-light">
        {album.title}
      </h3>
      <p className="font-condensed text-xs text-navy-dark/50">{formatDate(album.eventDate)}</p>
    </Link>
  );
}
