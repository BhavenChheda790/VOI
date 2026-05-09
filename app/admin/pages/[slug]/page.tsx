import Link from "next/link";
import { notFound } from "next/navigation";
import { updatePageAction } from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";

export default async function AdminEditPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ ok?: string }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const page = await prisma.page.findUnique({ where: { slug } });
  if (!page) notFound();

  return (
    <div className="min-h-screen bg-stone-100">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <Link href="/admin/pages" className="text-sm text-amber-900 hover:underline">
          ← All pages
        </Link>
        <h1 className="mt-4 font-display text-3xl font-semibold text-stone-900">Edit: {page.title}</h1>
        {sp.ok ? <p className="mt-2 text-sm text-emerald-700">Saved.</p> : null}
        <form action={updatePageAction} className="mt-8 space-y-6 rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
          <input type="hidden" name="slug" value={page.slug} />
          <div>
            <label className="block text-xs font-semibold uppercase text-stone-500" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              name="title"
              defaultValue={page.title}
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-stone-500" htmlFor="content">
              Content (Markdown)
            </label>
            <textarea
              id="content"
              name="content"
              rows={20}
              defaultValue={page.content}
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 font-mono text-sm text-stone-900"
            />
          </div>
          <button type="submit" className="rounded-full bg-stone-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-stone-800">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
