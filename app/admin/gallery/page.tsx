import Link from "next/link";
import { createAlbumAction } from "@/app/admin/actions";
import { ImageUpload } from "@/components/ImageUpload";
import { prisma } from "@/lib/prisma";

export default async function AdminGalleryPage() {
  const albums = await prisma.galleryAlbum.findMany({
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
    include: { _count: { select: { images: true } } },
  });

  return (
    <div className="min-h-screen bg-stone-100">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <Link href="/admin" className="text-sm text-amber-900 hover:underline">
          ← Dashboard
        </Link>
        <h1 className="mt-4 font-display text-3xl font-semibold text-stone-900">Gallery</h1>
        <ul className="mt-8 space-y-2">
          {albums.map((a) => (
            <li key={a.id}>
              <Link
                href={`/admin/gallery/${a.id}`}
                className="flex items-center justify-between rounded-xl border border-stone-200 bg-white px-4 py-3 shadow-sm hover:border-amber-300"
              >
                <span className="font-medium">{a.title}</span>
                <span className="text-xs text-stone-500">
                  {a._count.images} photos · /gallery/{a.slug}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-2xl border border-dashed border-amber-400/60 bg-amber-50/50 p-8">
          <h2 className="font-display text-xl font-semibold text-stone-900">New album</h2>
          <form action={createAlbumAction} className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase text-stone-500" htmlFor="new-title">
                Title
              </label>
              <input
                id="new-title"
                name="title"
                required
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-stone-500" htmlFor="new-slug">
                Slug (optional)
              </label>
              <input id="new-slug" name="slug" className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900" />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-stone-500" htmlFor="new-desc">
                Description
              </label>
              <textarea id="new-desc" name="description" rows={3} className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2" />
            </div>
            <ImageUpload label="Cover image" name="coverUrl" defaultValue="" previewAspect="video" />
            <button type="submit" className="rounded-full bg-amber-700 px-5 py-2 text-sm font-semibold text-white hover:bg-amber-800">
              Create album
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
