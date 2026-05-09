import Link from "next/link";
import {
  createEventAction,
  deleteEventAction,
  updateEventAction,
} from "@/app/admin/actions";
import { ImageUpload } from "@/components/ImageUpload";
import { prisma } from "@/lib/prisma";

function toLocalInput(d: Date | null) {
  if (!d) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  const x = new Date(d);
  return `${x.getFullYear()}-${pad(x.getMonth() + 1)}-${pad(x.getDate())}T${pad(x.getHours())}:${pad(x.getMinutes())}`;
}

export default async function AdminEventsPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string }>;
}) {
  const sp = await searchParams;
  const events = await prisma.event.findMany({
    orderBy: [{ kind: "asc" }, { startAt: "desc" }],
  });

  return (
    <div className="min-h-screen bg-stone-100">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <Link href="/admin" className="text-sm text-amber-900 hover:underline">
          ← Dashboard
        </Link>
        <h1 className="mt-4 font-display text-3xl font-semibold text-stone-900">Events</h1>
        {sp.ok ? <p className="mt-2 text-sm text-emerald-700">Saved.</p> : null}
        <div className="mt-10 space-y-12">
          {events.map((e) => (
            <div key={e.id} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <h2 className="font-display text-lg font-semibold text-stone-900">{e.title}</h2>
                <form action={deleteEventAction}>
                  <input type="hidden" name="id" value={e.id} />
                  <button type="submit" className="text-sm text-red-600 hover:underline">
                    Delete
                  </button>
                </form>
              </div>
              <form action={updateEventAction} className="mt-6 grid gap-4">
                <input type="hidden" name="id" value={e.id} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <LabeledInput label="Title" name="title" defaultValue={e.title} />
                  <LabeledInput label="Slug (URL)" name="slug" defaultValue={e.slug} />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase text-stone-500">Kind</label>
                  <select
                    name="kind"
                    defaultValue={e.kind}
                    className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
                  >
                    <option value="UPCOMING">Upcoming</option>
                    <option value="PAST">Past</option>
                  </select>
                </div>
                <LabeledInput label="Summary" name="summary" defaultValue={e.summary} />
                <div>
                  <label className="text-xs font-semibold uppercase text-stone-500" htmlFor={`body-${e.id}`}>
                    Body (Markdown)
                  </label>
                  <textarea
                    id={`body-${e.id}`}
                    name="body"
                    rows={6}
                    defaultValue={e.body}
                    className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 font-mono text-sm"
                  />
                </div>
                <LabeledInput label="Location" name="location" defaultValue={e.location ?? ""} />
                <LabeledInput
                  label="Ticket / registration URL (optional)"
                  name="ticketUrl"
                  defaultValue={e.ticketUrl ?? ""}
                />
                <ImageUpload
                  label="Event image"
                  name="imageUrl"
                  defaultValue={e.imageUrl ?? ""}
                  previewAspect="video"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold uppercase text-stone-500" htmlFor={`start-${e.id}`}>
                      Start
                    </label>
                    <input
                      id={`start-${e.id}`}
                      type="datetime-local"
                      name="startAt"
                      defaultValue={toLocalInput(e.startAt)}
                      className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase text-stone-500" htmlFor={`end-${e.id}`}>
                      End
                    </label>
                    <input
                      id={`end-${e.id}`}
                      type="datetime-local"
                      name="endAt"
                      defaultValue={toLocalInput(e.endAt)}
                      className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
                    />
                  </div>
                </div>
                <button type="submit" className="w-fit rounded-full bg-stone-900 px-5 py-2 text-sm font-semibold text-white hover:bg-stone-800">
                  Update event
                </button>
              </form>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-dashed border-amber-400/60 bg-amber-50/50 p-8">
          <h2 className="font-display text-xl font-semibold text-stone-900">Add event</h2>
          <form action={createEventAction} className="mt-6 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <LabeledInput label="Title" name="title" defaultValue="" required />
              <LabeledInput label="Slug (optional)" name="slug" defaultValue="" placeholder="auto from title" />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-stone-500">Kind</label>
              <select name="kind" className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900">
                <option value="UPCOMING">Upcoming</option>
                <option value="PAST">Past</option>
              </select>
            </div>
            <LabeledInput label="Summary" name="summary" defaultValue="" />
            <div>
              <label className="text-xs font-semibold uppercase text-stone-500">Body (Markdown)</label>
              <textarea name="body" rows={5} className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 font-mono text-sm" />
            </div>
            <LabeledInput label="Location" name="location" defaultValue="" />
            <LabeledInput label="Ticket / registration URL (optional)" name="ticketUrl" defaultValue="" />
            <ImageUpload label="Event image" name="imageUrl" defaultValue="" previewAspect="video" />
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold uppercase text-stone-500">Start</label>
                <input type="datetime-local" name="startAt" className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2" />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase text-stone-500">End</label>
                <input type="datetime-local" name="endAt" className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2" />
              </div>
            </div>
            <button type="submit" className="w-fit rounded-full bg-amber-700 px-5 py-2 text-sm font-semibold text-white hover:bg-amber-800">
              Create event
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
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue: string;
  required?: boolean;
  placeholder?: string;
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
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
      />
    </div>
  );
}
