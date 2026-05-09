import Link from "next/link";
import { updateProofStatusAction } from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";

export default async function AdminProofsPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string }>;
}) {
  const sp = await searchParams;
  const proofs = await prisma.donationProof.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div className="min-h-screen bg-stone-100">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <Link href="/admin" className="text-sm text-amber-900 hover:underline">
          ← Dashboard
        </Link>
        <h1 className="mt-4 font-display text-3xl font-semibold text-stone-900">Donation proofs (WhatsApp)</h1>
        <p className="mt-2 max-w-2xl text-sm text-stone-600">
          Rows are created when the WhatsApp webhook receives messages or media. Match deposits in Zelle/bank before
          marking confirmed.
        </p>
        {sp.ok ? <p className="mt-2 text-sm text-emerald-700">Updated.</p> : null}
        <div className="mt-8 overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-stone-200 bg-stone-50 text-xs uppercase text-stone-500">
              <tr>
                <th className="px-4 py-3">When</th>
                <th className="px-4 py-3">WhatsApp</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Media</th>
                <th className="px-4 py-3">Bot</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {proofs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-stone-500">
                    No proofs yet. Configure the webhook and send a test message from WhatsApp.
                  </td>
                </tr>
              ) : (
                proofs.map((p) => (
                  <tr key={p.id} className="border-b border-stone-100 align-top">
                    <td className="px-4 py-3 text-stone-600 whitespace-nowrap">
                      {p.createdAt.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-stone-900">{p.waProfileName ?? "—"}</div>
                      <div className="text-xs text-stone-500">{p.waId}</div>
                    </td>
                    <td className="max-w-xs px-4 py-3 text-stone-700">
                      {p.lastMessage ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-xs text-stone-500">
                      {p.messageType ?? "—"}
                    </td>
                    <td className="px-4 py-3">
                      {p.mediaUrl ? (
                        <a href={p.mediaUrl} className="text-amber-900 underline" target="_blank" rel="noreferrer">
                          Open
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs">
                      <div className={p.botReplied ? "text-emerald-700" : "text-stone-400"}>
                        {p.botReplied ? "✓ greeted" : "—"}
                      </div>
                      <div className={p.donorNotified ? "text-emerald-700" : "text-stone-400"}>
                        {p.donorNotified ? "✓ notified" : "—"}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <form action={updateProofStatusAction} className="flex items-center gap-2">
                        <input type="hidden" name="id" value={p.id} />
                        <select
                          name="status"
                          defaultValue={p.status}
                          className="rounded border border-stone-300 px-2 py-1 text-stone-900"
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="REVIEWED">REVIEWED</option>
                          <option value="CONFIRMED">CONFIRMED</option>
                          <option value="REJECTED">REJECTED</option>
                        </select>
                        <button type="submit" className="text-xs font-semibold text-stone-700 hover:underline">
                          Save
                        </button>
                      </form>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
