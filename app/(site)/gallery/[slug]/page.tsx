import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function GalleryAlbumPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const album = await prisma.galleryAlbum.findUnique({
    where: { slug },
    include: { images: { orderBy: [{ sortOrder: "asc" }, { id: "asc" }] } },
  });
  if (!album) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Link href="/gallery" className="text-sm font-medium text-amber-900 hover:underline">
        ← All albums
      </Link>
      <h1 className="mt-6 font-display text-4xl font-semibold text-stone-900">{album.title}</h1>
      {album.description ? <p className="mt-3 max-w-2xl text-stone-600">{album.description}</p> : null}
      <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {album.images.map((img) => (
          <figure key={img.id} className="mb-4 break-inside-avoid overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-stone-900/5">
            <div className="relative aspect-[4/3] w-full">
              <Image
                unoptimized
                src={img.url}
                alt={img.caption ?? ""}
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 33vw"
              />
            </div>
            {img.caption ? (
              <figcaption className="px-3 py-2 text-xs text-stone-600">{img.caption}</figcaption>
            ) : null}
          </figure>
        ))}
      </div>
    </div>
  );
}
