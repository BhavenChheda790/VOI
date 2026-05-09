import Link from "next/link";
import Image from "next/image";
import { LotusDot } from "@/components/Accents";
import { IconArrowRight } from "@/components/Icons";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata = { title: "Upcoming events" };

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

export default async function UpcomingEventsPage() {
  const events = await prisma.event.findMany({
    where: { kind: "UPCOMING", published: true },
    orderBy: [{ sortOrder: "asc" }, { startAt: "asc" }],
  });

  return (
    <>
      <section className="relative overflow-hidden border-b border-stone-200 bg-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1e40af] via-[#f59e0b] to-[#1e40af]" />
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#1e40af]/15 bg-[#1e40af]/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1e40af]">
            <LotusDot className="h-3.5 w-3.5" />
            Coming up
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-stone-900 sm:text-5xl">
            Upcoming events
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-stone-600">
            Garba nights, women-in-business summits, and cultural fundraisers — join our community and help power
            programs that uplift women and students across the USA.
          </p>
        </div>
      </section>

      <section className="bg-stone-50/40">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
          {events.length === 0 ? (
            <div className="mx-auto max-w-xl rounded-xl border border-dashed border-stone-300 bg-white p-10 text-center">
              <p className="font-display text-lg text-stone-900">
                No upcoming events yet — check back soon.
              </p>
              <p className="mt-2 text-sm text-stone-500">
                Follow us on Instagram or Facebook for the next event announcement.
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {events.map((e) => (
                <article
                  key={e.id}
                  className="group grid overflow-hidden rounded-xl border border-stone-200 bg-white transition hover:border-stone-300 hover:shadow-sm md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]"
                >
                  <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[240px]">
                    {e.imageUrl ? (
                      <Image
                        unoptimized
                        src={e.imageUrl}
                        alt=""
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width:768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-stone-100 text-stone-400">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center rounded-md bg-[#1e40af]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1e40af]">
                        {formatRange(e.startAt, e.endAt)}
                      </span>
                      {e.location ? (
                        <span className="text-xs text-stone-500">📍 {e.location}</span>
                      ) : null}
                    </div>
                    <h2 className="mt-3 font-display text-2xl font-semibold leading-tight text-stone-900">
                      {e.title}
                    </h2>
                    <p className="mt-2 leading-relaxed text-stone-600">{e.summary}</p>
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <Link
                        href={`/events/${e.slug}`}
                        className="inline-flex w-fit items-center gap-2 rounded-md bg-[#1e40af] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1e3a8a]"
                      >
                        Event details
                        <IconArrowRight className="h-4 w-4" />
                      </Link>
                      {e.ticketUrl ? (
                        <a
                          href={e.ticketUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex w-fit items-center gap-2 rounded-md border border-amber-700 bg-amber-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-800"
                        >
                          Book ticket
                          <IconArrowRight className="h-4 w-4" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
