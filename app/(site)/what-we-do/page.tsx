import Link from "next/link";
import { GoldDivider, LotusDot } from "@/components/Accents";
import { IconWhatsApp } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { getSiteConfig, whatsappHref } from "@/lib/site";

export const dynamic = "force-dynamic";
export const metadata = { title: "What We Do" };

const stats = [
  { value: "257", label: "Women mentored" },
  { value: "64", label: "Students supported" },
  { value: "50+", label: "Events hosted" },
  { value: "24", label: "Corporate partners" },
];

const pillars = [
  {
    n: "01",
    title: "Women Empowerment",
    body: "Mentorship, training, and startup support that helps women build sustainable businesses and financial independence.",
  },
  {
    n: "02",
    title: "Youth & Student Mentorship",
    body: "Guidance, networking, and leadership programs for the next generation — including our Internship Connections program linking students with corporate partners.",
    learnMoreHref: "/career",
  },
  {
    n: "03",
    title: "Cultural Celebration",
    body: "Events that preserve Indian heritage, language, and traditions while welcoming the wider community.",
  },
  {
    n: "04",
    title: "Community Engagement",
    body: "Connecting families across the diaspora through gatherings that turn into lasting relationships.",
  },
  {
    n: "05",
    title: "Social Impact",
    body: "Supported women-owned businesses in raising over $50,000 in sales revenue — turning every gathering into measurable change.",
  },
];

export default async function WhatWeDoPage() {
  const config = await getSiteConfig();
  const donateWa = whatsappHref(
    config.whatsappCountryCode,
    config.whatsappLocalNumber,
    "Hello, I'd like to support Voice of India."
  );

  return (
    <>
      {/* ============== HERO ============== */}
      <section className="relative overflow-hidden border-b border-stone-200 bg-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1e40af] via-[#f59e0b] to-[#1e40af]" />
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#1e40af]/15 bg-[#1e40af]/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1e40af]">
            <LotusDot className="h-3.5 w-3.5" />
            What we stand for
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-stone-900 sm:text-5xl">
            Five pillars, one community
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-600">
            We turn cultural celebration into real opportunity — for women, students, and families
            across California.
          </p>
        </div>
      </section>

      {/* ============== IMPACT STATS ============== */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
              <div className="grid divide-stone-200 sm:grid-cols-4 sm:divide-x">
                {stats.map((s) => (
                  <div key={s.label} className="border-b border-stone-200 p-6 text-center sm:border-b-0">
                    <p className="font-display text-3xl font-extrabold leading-none text-[#1e3a8a] sm:text-4xl">
                      {s.value}
                    </p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============== 5 PILLARS ============== */}
      <section className="bg-stone-50/40">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <Reveal>
            <div className="text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d97706]">
                The five pillars
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold leading-tight text-stone-900 sm:text-4xl">
                How we create impact
              </h2>
              <GoldDivider className="mt-6" />
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal key={p.n} delay={i * 80}>
                <article className="group relative h-full rounded-2xl border border-stone-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-[#d97706]/40 hover:shadow-md">
                  {/* Gold accent corner */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-7 top-7 font-display text-2xl font-bold text-[#d97706]/30 transition group-hover:text-[#d97706]/50"
                  >
                    {p.n}
                  </span>

                  <p className="font-display text-sm font-extrabold tracking-wider text-[#d97706]">
                    {p.n}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold leading-tight text-stone-900 sm:text-2xl">
                    {p.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-stone-600">{p.body}</p>

                  {p.learnMoreHref ? (
                    <Link
                      href={p.learnMoreHref}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#d97706] transition hover:text-[#b45309] hover:underline"
                    >
                      Learn more</Link>
                  ) : null}

                  {/* Animated bottom underline */}
                  <span
                    aria-hidden
                    className="mt-5 block h-px w-12 bg-gradient-to-r from-[#d97706]/60 to-transparent transition-all duration-300 group-hover:w-24"
                  />
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-10 text-center text-sm text-stone-600">
              Want to be part of it? Join an upcoming event or get in touch.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/events/upcoming"
                className="inline-flex items-center gap-2 rounded-md bg-[#1e40af] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1e3a8a]"
              >
                See upcoming events</Link>
              <Link
                href="/career"
                className="inline-flex items-center gap-2 rounded-md border border-stone-300 px-5 py-2.5 text-sm font-semibold text-stone-700 transition hover:border-stone-400"
              >
                Career & internships
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
          </Reveal>
        </div>
      </section>
    </>
  );
}
