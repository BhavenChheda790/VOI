import Link from "next/link";
import Image from "next/image";
import { LotusDot } from "@/components/Accents";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata = { title: "Past events" };

function formatRange(start: Date | null, end: Date | null) {
  if (!start) return "Date TBA";
  const o = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  if (!end) return o.format(start);
  return `${o.format(start)} – ${o.format(end)}`;
}

export default async function PastEventsPage() {
  const events = await prisma.event.findMany({
    where: { kind: "PAST", published: true },
    orderBy: [{ sortOrder: "asc" }, { startAt: "desc" }],
  });

  return (
    <>
      <section className="relative overflow-hidden border-b border-stone-200 bg-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1e40af] via-[#f59e0b] to-[#1e40af]" />
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#1e40af]/15 bg-[#1e40af]/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1e40af]">
            <LotusDot className="h-3.5 w-3.5" />
            Moments remembered
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-stone-900 sm:text-5xl">
            Past events
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-stone-600">
            Highlights from Garba nights, Diwali fundraisers, and women-in-business gatherings — celebrations that
            turned into scholarships, mentorship, and a stronger diaspora.
          </p>
        </div>
      </section>

      <section className="bg-stone-50/40">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          {events.length === 0 ? (
            <div className="mx-auto max-w-xl rounded-xl border border-dashed border-stone-300 bg-white p-10 text-center">
              <p className="font-display text-lg text-stone-900">No past events published yet.</p>
            </div>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((e) => (
                <li
                  key={e.id}
                  className="group overflow-hidden rounded-xl border border-stone-200 bg-white transition hover:border-stone-300 hover:shadow-sm"
                >
                  <div className="relative aspect-video">
                    {e.imageUrl ? (
                      <Image
                        unoptimized
                        src={e.imageUrl}
                        alt=""
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width:768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-stone-100 text-stone-400">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1e40af]">
                      {formatRange(e.startAt, e.endAt)}
                    </p>
                    <h2 className="mt-2 font-display text-lg font-semibold leading-tight text-stone-900">
                      {e.title}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-stone-600">{e.summary}</p>
                    <Link
                      href={`/events/${e.slug}`}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1e40af] transition hover:text-[#1e3a8a]"
                    >
                      Read more
                      <span aria-hidden></span>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
