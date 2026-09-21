import GalleryAlbumForm from "@/components/admin/GalleryAlbumForm";
import { createAlbum } from "@/lib/actions/galleryActions";

export default function NewAlbumPage() {
  return (
    <div>
      <h1 className="mb-2 font-heading text-2xl font-bold text-navy">New Album</h1>
      <p className="mb-6 text-sm text-navy-dark/60">
        Create the album first — you&apos;ll add photos to it on the next screen.
      </p>
      <GalleryAlbumForm action={createAlbum} submitLabel="Create Album & Add Photos" />
    </div>
  );
}
