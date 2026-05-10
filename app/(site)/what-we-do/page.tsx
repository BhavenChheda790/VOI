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
  // Two dancing figures
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden>
      <circle cx="10" cy="6" r="2.5" />
      <path d="M10 9.5c-1.7 0-2.8 1.2-3 3l-.7 4.5h2l.5 4-1.3 5h2L11 22l1.5 4h2L13.2 21l.5-4h2l-.7-4.5c-.2-1.8-1.3-3-3-3z" />
      <circle cx="22" cy="6" r="2.5" />
      <path d="M22 9.5c-1.7 0-2.8 1.2-3 3l-.7 4.5h2l.5 4-1.3 5h2L23 22l1.5 4h2L25.2 21l.5-4h2l-.7-4.5c-.2-1.8-1.3-3-3-3z" />
      <path
        d="M14 4 q2 -2 4 0"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PeopleIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="6" r="2.2" />
      <path d="M2 18c0-2.5 3-4 7-4s7 1.5 7 4v2H2v-2zm15-4c2.5 0 5 1 5 3v3h-5v-2c0-1.5-.7-2.7-1.7-3.6.6-.3 1.1-.4 1.7-.4z" />
    </svg>
  );
}

function WomanIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <circle cx="12" cy="6" r="3" />
      <path d="M12 11c-3 0-5 1.5-5 4v8h3v-6h4v6h3v-8c0-2.5-2-4-5-4z" />
    </svg>
  );
}

function NetworkIcon({ className = "h-7 w-7" }: { className?: string }) {
  // Champagne glass + sparkle (entertainment)
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M7 2h10l-1 6c0 2.5-2 4.5-4 4.7V18h3v2H9v-2h3v-5.3c-2-0.2-4-2.2-4-4.7L7 2zm2 2l.7 4h4.6L15 4H9z" />
      <path
        d="M19 4 l1 1 l1 -1 l-1 -1 z M20 8 l0.5 0.5 l0.5 -0.5 l-0.5 -0.5 z"
        fill="currentColor"
        opacity="0.7"
      />
    </svg>
  );
}
