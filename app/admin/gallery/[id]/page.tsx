import Link from "next/link";
import { notFound } from "next/navigation";
import {
  addGalleryImageAction,
  deleteGalleryImageAction,
  updateAlbumAction,
} from "@/app/admin/actions";
import { ImageUpload } from "@/components/ImageUpload";
import { prisma } from "@/lib/prisma";

export default async function AdminGalleryAlbumPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ ok?: string }>;
}) {
  const { id } = await params;
  const sp = await searchParams;
  const albumId = Number(id);
  if (Number.isNaN(albumId)) notFound();

  const album = await prisma.galleryAlbum.findUnique({
    where: { id: albumId },
    include: { images: { orderBy: [{ sortOrder: "asc" }, { id: "asc" }] } },
  });
  if (!album) notFound();

  return (
    <div className="min-h-screen bg-stone-100">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <Link href="/admin/gallery" className="text-sm text-amber-900 hover:underline">
          ← All albums
        </Link>
        <h1 className="mt-4 font-display text-3xl font-semibold text-stone-900">Edit album</h1>
        {sp.ok ? <p className="mt-2 text-sm text-emerald-700">Saved.</p> : null}
        <form action={updateAlbumAction} className="mt-8 space-y-4 rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
          <input type="hidden" name="id" value={album.id} />
          <div>
            <label className="text-xs font-semibold uppercase text-stone-500" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              name="title"
              defaultValue={album.title}
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase text-stone-500" htmlFor="slug">
              Slug
            </label>
            <input
              id="slug"
              name="slug"
              defaultValue={album.slug}
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase text-stone-500" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              defaultValue={album.description ?? ""}
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
            />
          </div>
          <ImageUpload
            label="Cover image"
            name="coverUrl"
            defaultValue={album.coverUrl ?? ""}
            previewAspect="video"
          />
          <button type="submit" className="rounded-full bg-stone-900 px-5 py-2 text-sm font-semibold text-white hover:bg-stone-800">
            Save album
          </button>
        </form>

        <h2 className="mt-14 font-display text-xl font-semibold text-stone-900">Photos</h2>
        <div className="mt-6 space-y-6">
          {album.images.map((img) => (
            <div
              key={img.id}
              className="flex flex-col gap-4 rounded-xl border border-stone-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt="" className="h-28 w-40 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs text-stone-500">{img.url}</p>
                {img.caption ? <p className="mt-1 text-sm text-stone-700">{img.caption}</p> : null}
                <form action={deleteGalleryImageAction} className="mt-3">
                  <input type="hidden" name="id" value={img.id} />
                  <input type="hidden" name="albumId" value={album.id} />
                  <button type="submit" className="text-sm text-red-600 hover:underline">
                    Remove
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-dashed border-amber-400/60 bg-amber-50/50 p-8">
          <h3 className="font-display text-lg font-semibold text-stone-900">Add photo</h3>
          <form action={addGalleryImageAction} className="mt-4 space-y-4">
            <input type="hidden" name="albumId" value={album.id} />
            <ImageUpload label="Photo" name="url" defaultValue="" previewAspect="video" />
            <div>
              <label className="text-xs font-semibold uppercase text-stone-500" htmlFor="caption">
                Caption (optional)
              </label>
              <input id="caption" name="caption" className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900" />
            </div>
            <button type="submit" className="rounded-full bg-amber-700 px-5 py-2 text-sm font-semibold text-white hover:bg-amber-800">
              Add photo
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
