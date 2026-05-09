import Link from "next/link";
import { loginAction } from "@/app/admin/actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ e?: string; err?: string }>;
}) {
  const sp = await searchParams;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-100 px-4">
      <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
        <h1 className="font-display text-2xl font-semibold text-stone-900">Admin sign in</h1>
        <p className="mt-2 text-sm text-stone-600">Voice of India content dashboard</p>
        {sp.e ? <p className="mt-4 text-sm text-red-600">Invalid email or password.</p> : null}
        {sp.err === "config" ? (
          <p className="mt-4 text-sm text-red-600">Set SESSION_SECRET in production (16+ characters).</p>
        ) : null}
        <form action={loginAction} className="mt-8 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-stone-500" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="username"
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
              defaultValue="admin@voi.local"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-stone-500" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-stone-900 py-2.5 text-sm font-semibold text-white hover:bg-stone-800"
          >
            Sign in
          </button>
        </form>
        <Link href="/" className="mt-6 block text-center text-sm text-amber-900 hover:underline">
          ← Back to site
        </Link>
      </div>
    </div>
  );
}
