import Link from "next/link";
import {
  createChatFaqAction,
  deleteChatFaqAction,
  updateChatFaqAction,
} from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";

export default async function AdminChatFaqPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; e?: string }>;
}) {
  const sp = await searchParams;
  const faqs = await prisma.chatFaq.findMany({
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
  });

  return (
    <div className="min-h-screen bg-stone-100">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <Link href="/admin" className="text-sm text-amber-900 hover:underline">
          ← Dashboard
        </Link>
        <h1 className="mt-4 font-display text-3xl font-semibold text-stone-900">
          Site chat — FAQ
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-stone-600">
          Answers you add here are matched when visitors ask similar questions. Optional keywords (comma-separated)
          improve matching. Event questions also use ticket URLs and summaries from{" "}
          <Link href="/admin/events" className="text-amber-900 underline">
            Events
          </Link>
          .
        </p>
        {sp.ok ? <p className="mt-2 text-sm text-emerald-700">Saved.</p> : null}
        {sp.e === "required" ? (
          <p className="mt-2 text-sm text-red-600">Question and answer are required.</p>
        ) : null}

        <div className="mt-10 space-y-12">
          {faqs.map((f) => (
            <div
              key={f.id}
              className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <h2 className="font-display text-lg font-semibold text-stone-900">
                  {f.question}
                </h2>
                <form action={deleteChatFaqAction}>
                  <input type="hidden" name="id" value={f.id} />
                  <button type="submit" className="text-sm text-red-600 hover:underline">
                    Delete
                  </button>
                </form>
              </div>
              <form action={updateChatFaqAction} className="mt-6 grid gap-4">
                <input type="hidden" name="id" value={f.id} />
                <LabeledInput label="Question" name="question" defaultValue={f.question} required />
                <div>
                  <label className="text-xs font-semibold uppercase text-stone-500" htmlFor={`kw-${f.id}`}>
                    Keywords (optional)
                  </label>
                  <input
                    id={`kw-${f.id}`}
                    name="keywords"
                    defaultValue={f.keywords ?? ""}
                    placeholder="donate, zelle, give"
                    className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase text-stone-500" htmlFor={`ans-${f.id}`}>
                    Answer (Markdown ok)
                  </label>
                  <textarea
                    id={`ans-${f.id}`}
                    name="answer"
                    rows={5}
                    required
                    defaultValue={f.answer}
                    className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 font-mono text-sm text-stone-900"
                  />
                </div>
                <LabeledInput
                  label="Sort order"
                  name="sortOrder"
                  defaultValue={String(f.sortOrder)}
                />
                <label className="flex items-center gap-2 text-sm text-stone-800">
                  <input type="checkbox" name="published" value="on" defaultChecked={f.published} />
                  Published
                </label>
                <button
                  type="submit"
                  className="w-fit rounded-full bg-stone-900 px-5 py-2 text-sm font-semibold text-white hover:bg-stone-800"
                >
                  Update entry
                </button>
              </form>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-dashed border-amber-400/60 bg-amber-50/50 p-8">
          <h2 className="font-display text-xl font-semibold text-stone-900">Add FAQ</h2>
          <form action={createChatFaqAction} className="mt-6 grid gap-4">
            <LabeledInput label="Question" name="question" defaultValue="" required />
            <div>
              <label className="text-xs font-semibold uppercase text-stone-500">Keywords (optional)</label>
              <input
                name="keywords"
                placeholder="volunteer, help, join"
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-stone-500">Answer (Markdown ok)</label>
              <textarea
                name="answer"
                rows={5}
                required
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 font-mono text-sm"
              />
            </div>
            <LabeledInput label="Sort order" name="sortOrder" defaultValue="0" />
            <label className="flex items-center gap-2 text-sm text-stone-800">
              <input type="checkbox" name="published" value="on" defaultChecked />
              Published
            </label>
            <button
              type="submit"
              className="w-fit rounded-full bg-amber-700 px-5 py-2 text-sm font-semibold text-white hover:bg-amber-800"
            >
              Create entry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function LabeledInput({
  label,
  name,
  defaultValue,
  required,
}: {
  label: string;
  name: string;
  defaultValue: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase text-stone-500" htmlFor={`${name}-${label}`}>
        {label}
      </label>
      <input
        id={`${name}-${label}`}
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
      />
    </div>
  );
}
