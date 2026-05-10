import Link from "next/link";
import { GoldDivider, LotusDot } from "@/components/Accents";
import { IconArrowRight, IconWhatsApp } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { getSiteConfig, whatsappHref } from "@/lib/site";

export const dynamic = "force-dynamic";
export const metadata = { title: "What We Do" };

export default async function WhatWeDoPage() {
  const config = await getSiteConfig();
  const donateWa = whatsappHref(
    config.whatsappCountryCode,
    config.whatsappLocalNumber,
    "Hello, I'd like to support Voice of India."
  );

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-stone-200 bg-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1e40af] via-[#f59e0b] to-[#1e40af]" />
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-16">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#1e40af]/15 bg-[#1e40af]/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1e40af]">
            <LotusDot className="h-3.5 w-3.5" />
            What We Do
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-stone-900 sm:text-5xl">
            Programs that bring our community together
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-600">
            Four pillars that celebrate our heritage, strengthen our diaspora, and create meaningful
            impact across California.
          </p>
        </div>
      </section>

      {/* WHAT WE DO CARD — matches the printed flyer */}
      <section className="bg-stone-50/40">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="relative rounded-2xl border border-stone-200 bg-white p-8 shadow-sm sm:p-12">
            {/* Title chip — overlaps card top */}
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
              <span className="inline-flex items-center rounded-md bg-gradient-to-br from-[#1e40af] to-[#1e3a8a] px-7 py-2.5 font-display text-sm font-bold uppercase tracking-[0.28em] text-white shadow-lg ring-2 ring-white">
                What We Do
              </span>
            </div>

            <ul className="mt-6 space-y-10 sm:mt-8">
              {offerings.map((o, i) => (
                <Reveal key={o.title} delay={i * 100}>
                  <li className="flex items-start gap-5 sm:gap-6">
                    {/* Gold circle icon */}
                    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#fbbf24] via-[#d97706] to-[#b45309] text-white shadow-md ring-1 ring-[#fbbf24]/40 sm:h-16 sm:w-16">
                      <o.Icon className="h-7 w-7 sm:h-8 sm:w-8" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-xl font-bold leading-tight text-stone-900 sm:text-2xl">
                        {o.title}
                      </h3>
                      <p className="mt-1.5 leading-relaxed text-stone-600 sm:text-lg">{o.desc}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          <GoldDivider className="mt-14" />

          <p className="mt-10 text-center text-stone-600">
            Want to know what&apos;s next? Browse our upcoming events or get in touch.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/events/upcoming"
              className="inline-flex items-center gap-2 rounded-md bg-[#1e40af] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1e3a8a]"
            >
              See upcoming events
              <IconArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={donateWa}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
              <IconWhatsApp className="h-4 w-4" />
              Support on WhatsApp
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-stone-300 px-5 py-2.5 text-sm font-semibold text-stone-700 transition hover:border-stone-400"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ============================================================
   Offerings + icons
   ============================================================ */

const offerings = [
  {
    title: "Cultural Events",
    desc: "Celebrating our rich heritage through festivals, traditions & arts",
    Icon: CulturalIcon,
  },
  {
    title: "Community Engagement",
    desc: "Building a stronger, more connected community",
    Icon: PeopleIcon,
  },
  {
    title: "Women Empowerment",
    desc: "Supporting and uplifting women entrepreneurs and leaders",
    Icon: WomanIcon,
  },
  {
    title: "Networking & Entertainment",
    desc: "Creating memorable experiences that bring people together",
    Icon: NetworkIcon,
  },
];

function CulturalIcon({ className = "h-7 w-7" }: { className?: string }) {
  // Diya (oil lamp) — quintessential Indian festival symbol
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      {/* Flame */}
      <path d="M12 3c-.6.9-1.5 2-1.5 3.2 0 1.1.7 1.8 1.5 2 .8-.2 1.5-.9 1.5-2C13.5 5 12.6 3.9 12 3z" />
      {/* Lamp bowl */}
      <path d="M4 12c0 .8.4 1.6 1.1 2L4 16h2.5c1.4 1.5 3.3 2.5 5.5 2.5s4.1-1 5.5-2.5H20l-1.1-2c.7-.4 1.1-1.2 1.1-2H4z" />
      {/* Bowl base */}
      <path d="M3 11h18c0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1z" />
      {/* Wick */}
      <path d="M11.5 8h1v3h-1z" />
    </svg>
  );
}

function PeopleIcon({ className = "h-7 w-7" }: { className?: string }) {
  // Group of 3 people clearly visible — community
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      {/* Center person */}
      <circle cx="12" cy="6" r="2.6" />
      <path d="M12 9.5c-2.4 0-4 1.4-4 3.5v6h8v-6c0-2.1-1.6-3.5-4-3.5z" />
      {/* Left person */}
      <circle cx="5" cy="7.5" r="2" />
      <path d="M5 10.5c-1.8 0-3 1-3 2.7V19h3.5v-5.7c0-.7.2-1.3.5-1.8-.3-.3-.6-.5-1-1z" />
      {/* Right person */}
      <circle cx="19" cy="7.5" r="2" />
      <path d="M19 10.5c1.8 0 3 1 3 2.7V19h-3.5v-5.7c0-.7-.2-1.3-.5-1.8.3-.3.6-.5 1-1z" />
    </svg>
  );
}

function WomanIcon({ className = "h-7 w-7" }: { className?: string }) {
  // Female silhouette with distinctive A-line dress + hair
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      {/* Hair behind head */}
      <path d="M8.5 5.5c0-2 1.5-3.5 3.5-3.5s3.5 1.5 3.5 3.5v2.5h-7V5.5z" opacity="0.85" />
      {/* Head */}
      <circle cx="12" cy="6" r="2.6" />
      {/* Triangle dress */}
      <path d="M12 9.2c-1.4 0-2.5.7-3 2L6 19h3l1-3v6h4v-6l1 3h3l-3-7.8c-.5-1.3-1.6-2-3-2z" />
    </svg>
  );
}

function NetworkIcon({ className = "h-7 w-7" }: { className?: string }) {
  // Two clinking champagne flutes — celebration / networking
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      {/* Left glass (tilted right) */}
      <path d="M4.5 3l1.2 5.5c.3 1.4 1.2 2.5 2.5 2.9l-1 7.6L5.5 20v1.5h6V20l-1.7-1 1-7.6c1.3-.4 2.2-1.5 2.5-2.9L14.5 3h-10z" />
      <path d="M5.7 4.5l.6 2.5h6.4l.6-2.5z" fill="white" opacity="0.4" />
      {/* Right glass (tilted left, flipped) */}
      <path
        d="M19.5 3l-1.2 5.5c-.3 1.4-1.2 2.5-2.5 2.9l1 7.6 1.7 1v1.5h-6V20l1.7-1-1-7.6c-1.3-.4-2.2-1.5-2.5-2.9L9.5 3h10z"
        opacity="0.55"
      />
    </svg>
  );
}
