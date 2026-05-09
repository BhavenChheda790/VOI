import Link from "next/link";
import Image from "next/image";
import { CornerMotif, GoldDivider, LotusDot } from "@/components/Accents";
import { CountUp } from "@/components/CountUp";
import {
  IconArrowRight,
  IconLotus,
  IconSpark,
  IconUsers,
  IconWhatsApp,
} from "@/components/Icons";
import { MarkdownBody } from "@/components/MarkdownBody";
import { prisma } from "@/lib/prisma";
import { getSiteConfig, whatsappHref } from "@/lib/site";

export const dynamic = "force-dynamic";

function formatRange(start: Date | null, end: Date | null) {
  if (!start) return "Date TBA";
  const o = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });
  if (!end) return o.format(start);
  return `${o.format(start)} – ${o.format(end)}`;
}

export default async function HomePage() {
  const [config, upcoming, past] = await Promise.all([
    getSiteConfig(),
    prisma.event.findMany({
      where: { kind: "UPCOMING", published: true },
      orderBy: [{ sortOrder: "asc" }, { startAt: "asc" }],
      take: 3,
    }),
    prisma.event.findMany({
      where: { kind: "PAST", published: true },
      orderBy: [{ startAt: "desc" }, { sortOrder: "asc" }],
      take: 4,
    }),
  ]);

  const donateWa = whatsappHref(
    config.whatsappCountryCode,
    config.whatsappLocalNumber,
    "Hello, I would like to donate to Voice of India."
  );

  const pillars = [
    {
      title: "Women in leadership",
      accent: "Shakti · Strength",
      text:
        "Mentorship from women leaders, leadership labs, and a community that helps you scale with confidence.",
      Icon: IconSpark,
    },
    {
      title: "Culture & community",
      accent: "Sanskriti · Heritage",
      text:
        "Garba, Diwali, and cultural fundraisers that celebrate our roots while supporting programs in California.",
      Icon: IconLotus,
    },
    {
      title: "Start-ups & students",
      accent: "Unnati · Progress",
      text:
        "Business planning, investor introductions, career guidance, and soft skills for the next generation.",
      Icon: IconUsers,
    },
  ];

  const impact = [
    { value: "1,200+", label: "Women mentored" },
    { value: "50+", label: "Cultural events hosted" },
    { value: "300+", label: "Students guided" },
    { value: "100%", label: "Community-funded" },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-stone-200 bg-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1e40af] via-[#f59e0b] to-[#1e40af]" />
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#1e40af]/15 bg-[#1e40af]/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1e40af]">
              <LotusDot className="h-3.5 w-3.5" />
              Inspire · Motivate · Support
            </p>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] text-stone-900 sm:text-5xl lg:text-[3.1rem]">
              {config.homeHeroTitle}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-stone-600">
              {config.homeHeroSubtitle}
            </p>
            <p className="mt-3 text-base font-medium text-[#1e40af]">
              Your small celebration with Voice of India becomes someone&apos;s big moment.
            </p>
            <div className="mt-6 rounded-lg border-l-4 border-[#f59e0b] bg-amber-50/60 p-4">
              <p className="text-base italic leading-snug text-stone-700">
                “{config.homeQuote}”
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-md bg-[#1e40af] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1e3a8a]"
              >
                Our story
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
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-stone-200 shadow-sm">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80"
                alt="Professional woman — representing empowerment and community leadership"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/75 via-stone-900/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className="font-display text-lg font-semibold text-white sm:text-xl">
                  Leadership with heart
                </p>
                <p className="mt-1 max-w-sm text-sm text-stone-200">
                  Programs that elevate women entrepreneurs and students across California.
                </p>
              </div>
            </div>
            <CornerMotif className="absolute -left-4 -top-4 hidden h-16 w-16 lg:block" />
            <CornerMotif className="absolute -bottom-4 -right-4 hidden h-16 w-16 rotate-180 lg:block" />
          </div>
        </div>
      </section>

      {/* IMPACT NUMBERS */}
      <section className="border-b border-stone-200 bg-[#1e3a8a] text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {impact.map((s) => (
              <div key={s.label} className="text-center sm:text-left">
                <CountUp
                  value={s.value}
                  className="block font-display text-3xl font-semibold text-[#fbbf24] sm:text-4xl"
                />
                <p className="mt-1 text-sm text-stone-300">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d97706]">
              What we do
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-stone-900 sm:text-4xl">
              Where culture meets empowerment
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-stone-600">
              Voice of India honors diaspora traditions while investing in women-led futures — through mentorship,
              celebration, and practical support for careers and ventures.
            </p>
            <GoldDivider className="mt-6" />
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pillars.map(({ Icon, accent, title, text }) => (
              <div
                key={title}
                className="group rounded-xl border border-stone-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#1e40af]/30 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-[#1e40af] to-[#1e3a8a] text-white shadow-sm">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d97706]">
                  {accent}
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold text-stone-900">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">{text}</p>
                <div className="mt-5 h-px w-12 bg-gradient-to-r from-[#d97706]/60 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HERITAGE STRIP — single subtle moment of cultural pride */}
      <section className="relative overflow-hidden border-b border-stone-200 bg-gradient-to-r from-[#fff7ed] via-white to-[#eff6ff]">
        <div className="mx-auto max-w-5xl px-4 py-12 text-center sm:px-6">
          <p className="font-display text-2xl font-semibold leading-relaxed text-stone-800 sm:text-3xl">
            Rooted in <span className="text-[#1e40af]">Indian values</span>.
            <br className="hidden sm:block" />
            Building futures across <span className="text-[#d97706]">California</span>.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-stone-600">
            From Garba nights to women-in-business summits — every event we host funds programs that mentor women,
            guide students, and lift first-generation entrepreneurs.
          </p>
          <GoldDivider className="mt-6" />
        </div>
      </section>

      {/* FEATURED EVENTS */}
      {upcoming.length > 0 ? (
        <section className="border-b border-stone-200 bg-stone-50/50">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d97706]">
                  Coming up
                </p>
                <h2 className="mt-2 font-display text-3xl font-semibold text-stone-900">
                  Join us at our next event
                </h2>
              </div>
              <Link
                href="/events/upcoming"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1e40af] transition hover:text-[#1e3a8a]"
              >
                All upcoming events
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {upcoming.map((e) => (
                <Link
                  key={e.id}
                  href={`/events/${e.slug}`}
                  className="group overflow-hidden rounded-xl border border-stone-200 bg-white transition hover:border-[#1e40af]/30 hover:shadow-sm"
                >
                  <div className="relative aspect-[16/10]">
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
                    <span className="inline-flex items-center rounded-md bg-[#1e40af]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1e40af]">
                      {formatRange(e.startAt, e.endAt)}
                    </span>
                    <h3 className="mt-3 font-display text-lg font-semibold leading-tight text-stone-900">
                      {e.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-stone-600">{e.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* WHERE YOUR SUPPORT GOES — donation-driving showcase */}
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d97706]">
              Your support changes lives
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-stone-900 sm:text-4xl">
              Where every donation goes
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-stone-600">
              We are 100% community-funded. Your contribution directly funds three causes — empowering women, lifting
              our people, and keeping our culture alive in the USA.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <CauseCard
              tag="Women empowerment"
              title="Lifting women into leadership"
              text="Mentorship circles, leadership labs, and funding introductions for women entrepreneurs. We've supported 1,200+ women so far."
              imageUrl="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&q=80"
              accentClass="bg-[#1e40af]"
              chipBg="bg-[#1e40af]/10"
              chipText="text-[#1e40af]"
            />
            <CauseCard
              tag="Helping our people"
              title="Mentoring students & first-gen builders"
              text="Career guidance, internship placements, and soft-skills training for students and first-generation entrepreneurs across California."
              imageUrl="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1200&q=80"
              accentClass="bg-emerald-600"
              chipBg="bg-emerald-50"
              chipText="text-emerald-700"
            />
            <CauseCard
              tag="Indian culture in USA"
              title="Garba, Diwali & community celebrations"
              text="Cultural fundraisers that keep our heritage alive in the diaspora — and fund every program we run, end to end."
              imageUrl="https://images.unsplash.com/photo-1604423043492-41becf86f6a9?w=1200&q=80"
              accentClass="bg-[#d97706]"
              chipBg="bg-amber-50"
              chipText="text-[#d97706]"
            />
          </div>

          {/* DONATE STRIP */}
          <div className="mt-12 overflow-hidden rounded-2xl bg-gradient-to-r from-[#1e3a8a] via-[#1e40af] to-[#1e3a8a] p-8 sm:p-10">
            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#fbbf24]">
                  A small celebration becomes someone&apos;s big moment
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl">
                  Your gift turns into a future.
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-stone-200 sm:text-base">
                  Every Garba ticket, every donation, every &ldquo;count me in&rdquo; — funds the next student,
                  the next woman entrepreneur, the next family finding community in California.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <a
                  href={donateWa}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-[#f59e0b] px-5 py-2.5 text-sm font-semibold text-stone-900 shadow-sm transition hover:bg-[#d97706] hover:text-white"
                >
                  <IconWhatsApp className="h-4 w-4" />
                  Donate on WhatsApp
                </a>
                <Link
                  href="/donate"
                  className="inline-flex items-center gap-2 rounded-md border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Other ways to give
                  <IconArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SPONSORSHIP TIERS — Bronze → Diamond */}
      <section className="border-b border-stone-200 bg-stone-50/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d97706]">
              Sponsorship tiers
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-stone-900 sm:text-4xl">
              Become a sponsor — leave a legacy
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-stone-600">
              Choose the tier that fits you. Every sponsor is recognized at our events, on our website, and in our
              annual community report.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {sponsorTiers.map((t) => (
              <SponsorTierCard key={t.name} tier={t} donateHref={donateWa} />
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-stone-500">
            Want to sponsor a specific event or program?{" "}
            <Link href="/contact" className="font-semibold text-[#1e40af] hover:underline">
              Contact us
            </Link>{" "}
            for custom partnerships.
          </p>
        </div>
      </section>

      {/* GAU SEVA — celebrate with seva */}
      <section className="relative overflow-hidden border-b border-stone-200 bg-gradient-to-br from-[#fff7ed] via-white to-[#f0fdf4]">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#f59e0b]/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 -bottom-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-stone-200 shadow-sm">
                <Image
                  unoptimized
                  src="https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=1200&q=80"
                  alt="A peaceful cow being fed — gau seva tradition"
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 45vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-900/70 via-stone-900/20 to-transparent p-5">
                  <p className="font-display text-lg font-semibold text-white">गौ सेवा · Gau Seva</p>
                  <p className="mt-1 text-xs text-stone-200">
                    A sacred tradition — feeding the cow brings blessings to your celebration.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
                Celebrate with seva
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold leading-tight text-stone-900 sm:text-4xl">
                Mark your special day with a blessing
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-stone-700">
                On your <strong>birthday</strong>, <strong>anniversary</strong>, or any joyful occasion — turn your
                celebration into seva. Sponsor cow feed, support animal care, or dedicate a small offering. We
                coordinate everything in India and send you a photo &amp; blessing certificate.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {gauSevaOptions.map((g) => (
                  <a
                    key={g.amount}
                    href={whatsappHref(
                      config.whatsappCountryCode,
                      config.whatsappLocalNumber,
                      `Hello, I'd like to sponsor ${g.title} (${g.amount}) as a celebration / Gau Seva offering.`
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-3 rounded-xl border border-stone-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-emerald-500/40 hover:shadow-md"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{g.icon}</span>
                        <p className="font-display text-base font-semibold text-stone-900">{g.title}</p>
                      </div>
                      <p className="mt-1 text-xs leading-snug text-stone-500">{g.note}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-xl font-semibold text-emerald-700">{g.amount}</p>
                      <p className="text-[10px] uppercase tracking-wider text-stone-400 group-hover:text-emerald-700">
                        Sponsor
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-6 rounded-lg border-l-4 border-emerald-500 bg-emerald-50/60 p-4">
                <p className="text-sm leading-relaxed text-stone-700">
                  <strong>How it works:</strong> Tap any amount above → WhatsApp opens with your offering. We arrange
                  the seva with our partner goshala in India and share a photo + name dedication on your special day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAST EVENTS — proof of community impact */}
      {past.length > 0 ? (
        <section className="border-b border-stone-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d97706]">
                  Moments remembered
                </p>
                <h2 className="mt-2 font-display text-3xl font-semibold text-stone-900">
                  A look at our past events
                </h2>
                <p className="mt-3 max-w-2xl text-stone-600">
                  Comedy nights, Garba celebrations, and concerts that brought our community together — and funded
                  programs that mentor women, students, and first-generation entrepreneurs.
                </p>
              </div>
              <Link
                href="/events/past"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1e40af] transition hover:text-[#1e3a8a]"
              >
                View all past events
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {past.map((e) => (
                <Link
                  key={e.id}
                  href={`/events/${e.slug}`}
                  className="group overflow-hidden rounded-xl border border-stone-200 bg-white transition hover:border-[#1e40af]/30 hover:shadow-sm"
                >
                  <div className="relative aspect-[4/3]">
                    {e.imageUrl ? (
                      <Image
                        unoptimized
                        src={e.imageUrl}
                        alt=""
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-stone-100 text-stone-400">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <span className="inline-flex items-center rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-600">
                      {formatRange(e.startAt, e.endAt)}
                    </span>
                    <h3 className="mt-2 font-display text-base font-semibold leading-snug text-stone-900">
                      {e.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-stone-600">{e.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* STORY MOMENT — emotional testimonial */}
      <section className="border-b border-stone-200 bg-gradient-to-br from-white via-[#fff7ed]/40 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-stone-200 shadow-sm">
                <Image
                  unoptimized
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=1000&q=80"
                  alt="A young woman smiling — community member supported by VOI"
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent" />
              </div>
              <CornerMotif className="absolute -left-3 -top-3 hidden h-14 w-14 lg:block" />
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d97706]">
                One celebration · One life changed
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold leading-tight text-stone-900 sm:text-4xl">
                &ldquo;I came for Garba. I left with my first mentor.&rdquo;
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-stone-700">
                When you celebrate with Voice of India, you&apos;re not just buying a ticket. You&apos;re funding the
                introduction that lands a student her first internship, the workshop where a young woman pitches her
                start-up for the first time, the dinner where two strangers become co-founders.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-l-4 border-[#1e40af] bg-white/70 px-5 py-4 shadow-sm">
                <div>
                  <p className="font-display text-base font-semibold text-stone-900">— Priya M.</p>
                  <p className="text-xs text-stone-500">Student → Software engineer · San Jose</p>
                </div>
                <Link
                  href="/community"
                  className="ml-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[#1e40af] transition hover:text-[#1e3a8a]"
                >
                  Read more stories
                  <IconArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION + JOIN CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch">
            <div className="flex flex-col justify-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d97706]">
                Mission &amp; vision
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-stone-900 sm:text-4xl">
                A community lifting each other up
              </h2>
              <div className="mt-6 space-y-4">
                <div className="rounded-lg border border-stone-200 p-5">
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1e40af]">
                    Mission
                  </h3>
                  <p className="mt-2 leading-relaxed text-stone-700">
                    To empower women, start-ups, and students through inclusive programs, mentorship, and community
                    events grounded in Indian values of <em>seva</em> and collective uplift.
                  </p>
                </div>
                <div className="rounded-lg border border-stone-200 p-5">
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d97706]">
                    Vision
                  </h3>
                  <p className="mt-2 leading-relaxed text-stone-700">
                    A confident diaspora where women lead boldly, young people thrive in meaningful careers, and our
                    culture is celebrated as a bridge to opportunity.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-[#1e3a8a] p-8 text-stone-100">
              <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[#f59e0b]/15 blur-3xl" />
              <div className="relative">
                <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">
                  Join the movement
                </h3>
                <div className="mt-4">
                  <MarkdownBody
                    tone="onDark"
                    content={`Explore **[what we do](/what-we-do)**, meet us at **[upcoming events](/events/upcoming)**, and browse our **[gallery](/gallery)**.`}
                  />
                </div>
                <p className="mt-4 text-sm text-stone-300">
                  Every donation funds women-empowerment programs, student mentorship, and cultural celebrations
                  that strengthen our diaspora.
                </p>
              </div>
              <div className="relative mt-8 flex flex-wrap gap-3">
                <Link
                  href="/donate"
                  className="inline-flex items-center gap-2 rounded-md bg-[#f59e0b] px-5 py-2.5 text-sm font-semibold text-stone-900 transition hover:bg-[#d97706] hover:text-white"
                >
                  Donate
                  <IconArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-md border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Connect with us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const gauSevaOptions = [
  {
    amount: "$11",
    title: "Gau Seva — one meal",
    note: "A day's fodder for one cow",
    icon: "🌾",
  },
  {
    amount: "$21",
    title: "Birthday blessing",
    note: "A week of feed in your name",
    icon: "🎂",
  },
  {
    amount: "$51",
    title: "Anniversary offering",
    note: "Pooja + special meal in your honor",
    icon: "🪔",
  },
  {
    amount: "$101",
    title: "Adopt-a-cow (month)",
    note: "Full care for one cow for 30 days",
    icon: "🐄",
  },
  {
    amount: "$251",
    title: "Animal rescue & care",
    note: "Medical treatment for an injured animal",
    icon: "🩺",
  },
  {
    amount: "$501",
    title: "Goshala patron",
    note: "Sponsor a goshala day — feeds 50+ cows",
    icon: "🌿",
  },
];

type SponsorTier = {
  name: string;
  amount: string;
  impact: string;
  perks: string[];
  /** Tailwind classes for the metallic gradient */
  gradient: string;
  /** Tailwind classes for the chip background + text */
  chipBg: string;
  chipText: string;
  /** Border tone for the card */
  border: string;
  /** Whether to mark as "popular" */
  highlight?: boolean;
};

const sponsorTiers: SponsorTier[] = [
  {
    name: "Bronze",
    amount: "$250",
    impact: "Funds 10 student workshop seats",
    perks: ["Name on website", "Event mention"],
    gradient: "from-[#b45309] via-[#92400e] to-[#78350f]",
    chipBg: "bg-amber-100",
    chipText: "text-[#92400e]",
    border: "border-amber-200",
  },
  {
    name: "Silver",
    amount: "$500",
    impact: "Connects 5 women with mentors",
    perks: ["Name on website", "Event mention", "2 event tickets"],
    gradient: "from-[#94a3b8] via-[#64748b] to-[#475569]",
    chipBg: "bg-slate-100",
    chipText: "text-slate-700",
    border: "border-slate-200",
  },
  {
    name: "Gold",
    amount: "$1,000",
    impact: "Underwrites a leadership lab",
    perks: ["Premium recognition", "4 event tickets", "Annual report feature"],
    gradient: "from-[#fbbf24] via-[#d97706] to-[#b45309]",
    chipBg: "bg-amber-50",
    chipText: "text-[#d97706]",
    border: "border-[#d97706]/30",
    highlight: true,
  },
  {
    name: "Platinum",
    amount: "$2,000",
    impact: "Sponsors a Garba or Diwali night",
    perks: ["Top-tier recognition", "8 event tickets", "Stage acknowledgement"],
    gradient: "from-[#e5e7eb] via-[#9ca3af] to-[#4b5563]",
    chipBg: "bg-stone-100",
    chipText: "text-stone-700",
    border: "border-stone-300",
  },
  {
    name: "Diamond",
    amount: "$5,000",
    impact: "Funds an entire program for the year",
    perks: ["Headline sponsor", "10 event tickets", "Custom partnership"],
    gradient: "from-[#60a5fa] via-[#3b82f6] to-[#1e40af]",
    chipBg: "bg-blue-50",
    chipText: "text-[#1e40af]",
    border: "border-[#1e40af]/30",
  },
];

function SponsorTierCard({ tier, donateHref }: { tier: SponsorTier; donateHref: string }) {
  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${tier.border} ${
        tier.highlight ? "ring-2 ring-[#d97706]/40 lg:scale-[1.03]" : ""
      }`}
    >
      {tier.highlight ? (
        <span className="absolute right-3 top-3 z-10 rounded-full bg-[#d97706] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-white shadow">
          Most popular
        </span>
      ) : null}

      <div className={`relative h-2 w-full bg-gradient-to-r ${tier.gradient}`} aria-hidden />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between">
          <span
            className={`inline-flex items-center rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${tier.chipBg} ${tier.chipText}`}
          >
            {tier.name}
          </span>
        </div>
        <p className="mt-4 font-display text-3xl font-semibold text-stone-900">{tier.amount}</p>
        <p className="mt-1 text-xs font-medium text-stone-500">{tier.impact}</p>

        <ul className="mt-4 space-y-1.5 text-xs text-stone-600">
          {tier.perks.map((p) => (
            <li key={p} className="flex items-start gap-1.5">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d97706]" aria-hidden />
              <span>{p}</span>
            </li>
          ))}
        </ul>

        <a
          href={donateHref}
          target="_blank"
          rel="noreferrer"
          className={`mt-5 inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-xs font-bold transition ${
            tier.highlight
              ? "bg-[#1e40af] text-white hover:bg-[#1e3a8a]"
              : "border border-stone-300 text-stone-700 hover:border-[#1e40af]/40 hover:text-[#1e40af]"
          }`}
        >
          Sponsor as {tier.name}
        </a>
      </div>
    </div>
  );
}

function CauseCard({
  tag,
  title,
  text,
  imageUrl,
  accentClass,
  chipBg,
  chipText,
}: {
  tag: string;
  title: string;
  text: string;
  imageUrl: string;
  accentClass: string;
  chipBg: string;
  chipText: string;
}) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          unoptimized
          src={imageUrl}
          alt=""
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
          sizes="(max-width:1024px) 100vw, 33vw"
        />
        <div className={`absolute inset-x-0 bottom-0 h-1 ${accentClass}`} aria-hidden />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span
          className={`inline-flex w-fit items-center rounded-md px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${chipBg} ${chipText}`}
        >
          {tag}
        </span>
        <h3 className="mt-3 font-display text-xl font-semibold leading-tight text-stone-900">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-stone-600">{text}</p>
      </div>
    </div>
  );
}
