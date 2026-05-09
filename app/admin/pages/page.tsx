import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminPagesIndex() {
  const pages = await prisma.page.findMany({ orderBy: { slug: "asc" } });

  return (
    <div className="min-h-screen bg-stone-100">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <Link href="/admin" className="text-sm text-amber-900 hover:underline">
          ← Dashboard
        </Link>
        <h1 className="mt-4 font-display text-3xl font-semibold text-stone-900">Pages</h1>
        <p className="mt-2 text-sm text-stone-600">
          Markdown supported. Slugs map to public URLs (e.g. <code className="rounded bg-stone-200 px-1">about</code> → /about).
        </p>
        <ul className="mt-8 space-y-2">
          {pages.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/admin/pages/${p.slug}`}
                className="flex items-center justify-between rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-900 shadow-sm hover:border-amber-300"
              >
                <span className="font-medium">{p.title}</span>
                <span className="text-xs text-stone-500">/{p.slug}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
