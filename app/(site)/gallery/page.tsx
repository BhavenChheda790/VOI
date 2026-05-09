import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata = { title: "Gallery" };

export default async function GalleryIndexPage() {
  const albums = await prisma.galleryAlbum.findMany({
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
    include: { _count: { select: { images: true } } },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl font-semibold text-stone-900">Gallery</h1>
      <p className="mt-3 max-w-2xl text-stone-600">Moments from programs, cultural nights, and community gatherings.</p>
      <div className="mt-12 grid gap-10 sm:grid-cols-2">
        {albums.map((a) => (
          <Link
            key={a.id}
            href={`/gallery/${a.slug}`}
            className="group overflow-hidden rounded-2xl border border-amber-900/10 bg-white shadow-sm transition hover:shadow-md"
          >
            <div className="relative aspect-[16/10]">
              {a.coverUrl ? (
                <Image
                  unoptimized
                  src={a.coverUrl}
                  alt=""
                  fill
                  className="object-cover transition group-hover:scale-[1.02]"
                  sizes="(max-width:768px) 100vw, 50vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-amber-50 text-stone-400">No cover</div>
              )}
            </div>
            <div className="p-6">
              <h2 className="font-display text-xl font-semibold text-stone-900 group-hover:text-amber-900">{a.title}</h2>
              {a.description ? <p className="mt-2 text-sm text-stone-600 line-clamp-2">{a.description}</p> : null}
              <p className="mt-3 text-xs text-stone-500">{a._count.images} photos</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
