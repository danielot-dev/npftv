import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import GalleryAlbumForm from "@/components/admin/GalleryAlbumForm";
import AddImageForm from "@/components/admin/AddImageForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { updateAlbum, addImageToAlbum, deleteImage } from "@/lib/actions/galleryActions";

export default async function EditAlbumPage({ params }: { params: { id: string } }) {
  const album = await prisma.galleryAlbum.findUnique({
    where: { id: params.id },
    include: { images: { orderBy: { order: "asc" } } },
  });
  if (!album) notFound();

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <h1 className="mb-6 font-heading text-2xl font-bold text-navy">Edit Album</h1>
        <GalleryAlbumForm action={updateAlbum.bind(null, album.id)} defaultValues={album} />
      </div>

      <div>
        <h2 className="mb-6 font-heading text-2xl font-bold text-navy">
          Photos ({album.images.length})
        </h2>

        <div className="mb-6" key={album.images.length}>
          <AddImageForm action={addImageToAlbum.bind(null, album.id)} />
        </div>

        {album.images.length === 0 ? (
          <p className="rounded-lg border border-dashed border-navy/20 bg-white px-6 py-10 text-center text-sm text-navy-dark/60">
            No photos yet — add the first one above.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {album.images.map((image) => (
              <div key={image.id} className="group relative overflow-hidden rounded-lg border border-navy/10">
                <div className="relative aspect-square w-full bg-navy/5">
                  <Image src={image.url} alt={image.caption ?? ""} fill className="object-cover" />
                </div>
                {image.caption && (
                  <p className="truncate bg-white px-2 py-1 text-xs text-navy-dark/70">{image.caption}</p>
                )}
                <div className="absolute right-1.5 top-1.5 rounded bg-white/90 px-1.5 py-0.5 opacity-0 shadow transition group-hover:opacity-100">
                  <DeleteButton
                    action={deleteImage.bind(null, album.id, image.id)}
                    confirmMessage="Remove this photo from the album?"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
