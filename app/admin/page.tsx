import Link from "next/link";
import { logoutAction } from "@/app/admin/actions";

const links = [
  { href: "/admin/site", label: "Site & home settings" },
  { href: "/admin/pages", label: "Pages (About, Donate, …)" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/chat-faq", label: "Site chat (FAQ)" },
  { href: "/admin/gallery", label: "Gallery albums" },
  { href: "/admin/proofs", label: "WhatsApp donation proofs" },
];

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-stone-100">
      <header className="border-b border-stone-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <h1 className="font-display text-xl font-semibold text-stone-900">VOI admin</h1>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-amber-900 hover:underline">
              View site
            </Link>
            <form action={logoutAction}>
              <button type="submit" className="text-sm font-medium text-stone-600 hover:text-stone-900">
                Log out
              </button>
            </form>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-4xl px-6 py-10">
        <p className="text-stone-600">Choose a section to edit. Changes appear on the public site immediately.</p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="block rounded-xl border border-stone-200 bg-white p-5 text-stone-900 shadow-sm hover:border-amber-300"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
