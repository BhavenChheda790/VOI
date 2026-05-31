import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownBody } from "@/components/MarkdownBody";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await prisma.event.findUnique({ where: { slug } });
  if (!event || !event.published) notFound();

  const back = event.kind === "PAST" ? "/events/past" : "/events/upcoming";

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link href={back} className="text-sm font-medium text-amber-900 hover:underline">
        ← Back to {event.kind === "PAST" ? "past" : "upcoming"} events
      </Link>
      <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl">
        {event.imageUrl ? (
          <Image
            unoptimized
            src={event.imageUrl}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        ) : null}
      </div>
      <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-amber-900">{event.kind === "PAST" ? "Past" : "Upcoming"}</p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-stone-900">{event.title}</h1>
      {event.location ? <p className="mt-2 text-stone-600">{event.location}</p> : null}
      <p className="mt-4 text-lg text-stone-700">{event.summary}</p>
      {event.ticketUrl && event.kind !== "PAST" ? (
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={event.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-amber-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-800"
          >
            Book ticket
            <span aria-hidden></span>
          </a>
          <span className="text-xs text-stone-500">Opens the official ticket page in a new tab</span>
        </div>
      ) : null}
      <div className="mt-10">
        <MarkdownBody content={event.body} />
      </div>
    </article>
  );
}
