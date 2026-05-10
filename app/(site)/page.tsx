import Image from "next/image";
import Link from "next/link";
import { CornerMotif, GoldDivider, LotusDot } from "@/components/Accents";
import { BrandLogo } from "@/components/BrandLogo";
import { HeroOrnament, MeshBlob, SectionDivider } from "@/components/BrandMotif";
import { IconArrowRight, IconLotus } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { getSiteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

/**
 * NOTE — Homepage temporarily replaced ahead of the upcoming event.
 * Original marketing homepage preserved at:
 *   web/app/(site)/_home-original.txt
 * Restore by copying the file's contents back into this file.
 */
export default async function HomePage() {
  const config = await getSiteConfig();

  return (
    <>
      {/* ============== TOP BANNER ============== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#fff7ed] via-[#fffbeb] to-white">
        {/* Aurora gradient + soft blobs */}
        <div aria-hidden className="voi-aurora absolute inset-0" />
        <MeshBlob className="-left-24 top-10 h-80 w-80" color="from-[#f59e0b]/20 to-[#1e40af]/10" />
        <MeshBlob className="-right-32 -top-20 h-[28rem] w-[28rem]" color="from-[#1e40af]/15 to-[#f59e0b]/15" />
        <MeshBlob className="bottom-0 left-1/3 h-72 w-72" color="from-[#fbbf24]/25 to-transparent" />

        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[auto_1fr_auto]">
            {/* Logo with animated halo */}
            <div className="relative mx-auto shrink-0 lg:mx-0">
              {/* Pulsing halo behind logo */}
              <div
                aria-hidden
                className="voi-halo-pulse absolute inset-0 -m-10 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.4)_0%,rgba(30,64,175,0.18)_45%,transparent_70%)] blur-2xl"
              />
              {/* Slow rotating ray sweep */}
              <div
                aria-hidden
                className="voi-ray-sweep pointer-events-none absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 opacity-40"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0deg, rgba(245,158,11,0.25) 30deg, transparent 60deg, transparent 180deg, rgba(245,158,11,0.18) 210deg, transparent 240deg)",
                  borderRadius: "50%",
                }}
              />
              {/* Sparkles */}
              <Sparkle className="-top-2 left-2" delay="0s" />
              <Sparkle className="-right-1 top-6" delay="1.4s" />
              <Sparkle className="-bottom-1 right-4" delay="0.7s" />
              <Sparkle className="-left-2 bottom-8" delay="2.1s" />

              {/* Logo (floating gently) */}
              <div className="voi-float-slow relative h-44 w-44 sm:h-52 sm:w-52 lg:h-56 lg:w-56">
                {config.logoUrl ? (
                  <Image
                    src={config.logoUrl}
                    alt={`${config.orgName} logo`}
                    fill
                    priority
                    sizes="(max-width:640px) 11rem, 14rem"
                    className="object-contain drop-shadow-[0_12px_28px_rgba(30,58,138,0.3)]"
                  />
                ) : (
                  <BrandLogo className="h-full w-full drop-shadow-md" />
                )}
              </div>
            </div>

            {/* Title (fade-up entrance) */}
            <div className="text-center lg:text-left">
              <p className="voi-animate-fade-up inline-flex items-center gap-2 rounded-full border border-[#1e40af]/15 bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1e40af] shadow-sm backdrop-blur">
                <LotusDot className="h-3.5 w-3.5" />
                California 501(c)(3) — diaspora community
              </p>
              <h1 className="voi-animate-fade-up voi-delay-1 mt-5 font-display text-5xl font-extrabold leading-[0.92] tracking-tight text-[#1e3a8a] sm:text-6xl lg:text-7xl">
                VOICE OF
                <br />
                INDIA{" "}
                <span className="bg-gradient-to-br from-[#f59e0b] via-[#d97706] to-[#b45309] bg-clip-text text-transparent">
                  USA
                </span>
              </h1>
              <div className="voi-animate-fade-up voi-delay-2 mt-6 flex items-center justify-center gap-3 lg:justify-start">
                <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#d97706]/70" />
                <span className="text-lg text-[#d97706]">★ ★ ★</span>
                <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#d97706]/70" />
              </div>
            </div>

            {/* Tagline column */}
            <div className="voi-animate-fade-up voi-delay-3 relative border-t border-stone-200 pt-6 text-center lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0 lg:text-left">
              <p className="font-display text-xl font-bold leading-snug text-[#1e3a8a] sm:text-2xl">
                Empowering Community.
              </p>
              <p className="mt-1 font-display text-xl font-bold leading-snug text-[#1e3a8a] sm:text-2xl">
                Preserving Culture.
              </p>
              <p className="mt-1 font-display text-xl font-bold leading-snug text-[#d97706] sm:text-2xl">
                Inspiring Unity.
              </p>
            </div>
          </div>

          {/* INSPIRE • MOTIVATE • SUPPORT pills */}
          <div className="voi-animate-fade-up voi-delay-4 mt-14 flex items-center justify-center gap-5 sm:gap-10">
            <Pill text="INSPIRE" />
            <Diamond />
            <Pill text="MOTIVATE" />
            <Diamond />
            <Pill text="SUPPORT" />
          </div>
        </div>

        {/* Curved transition into hero */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -bottom-1 h-12 bg-gradient-to-b from-transparent to-[#1e3a8a]"
          style={{ clipPath: "ellipse(75% 100% at 50% 100%)" }}
        />
      </section>

      {/* ============== HERO IMPACT ============== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#172554] text-white">
        <MeshBlob className="-top-32 right-1/3 h-96 w-96" color="from-[#fbbf24]/15 to-transparent" />
        <MeshBlob className="-bottom-40 -left-20 h-96 w-96" color="from-[#1e40af]/30 to-[#fbbf24]/10" />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 1.5px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="grid gap-14 lg:grid-cols-[1.05fr_1.4fr] lg:items-center">
            <Reveal>
              <HeroOrnament className="mb-6 h-6 w-32 text-[#fbbf24]/70" />
              <h2 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl">
                TOGETHER,
                <br />
                WE <span className="text-[#fbbf24]">EMPOWER</span>.
                <br />
                WE <span className="text-[#fbbf24]">PRESERVE</span>.
                <br />
                WE <span className="text-[#fbbf24]">INSPIRE</span>.
              </h2>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-stone-200">
                Building a stronger community for a brighter future — through cultural celebration,
                women-led leadership, and student mentorship across California.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/events/upcoming"
                  className="inline-flex items-center gap-2 rounded-md bg-[#f59e0b] px-5 py-2.5 text-sm font-semibold text-stone-900 shadow-sm transition hover:bg-[#d97706] hover:text-white"
                >
                  See upcoming events
                  <IconArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/donate"
                  className="inline-flex items-center gap-2 rounded-md border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Support our mission
                </Link>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative">
                <CornerMotif className="absolute -left-4 -top-4 hidden h-14 w-14 lg:block" />
                <CornerMotif className="absolute -bottom-4 -right-4 hidden h-14 w-14 rotate-180 lg:block" />
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <CollageImg
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80"
                    alt="Women collaborating"
                  />
                  <CollageImg
                    src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80"
                    alt="Hands joined together"
                  />
                  <CollageImg
                    src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=600&q=80"
                    alt="Family"
                  />
                  <CollageImg
                    src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80"
                    alt="Volunteers"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============== 5 PILLARS ============== */}
      <section className="relative overflow-hidden bg-[#fffbeb]/50">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Reveal>
            <div className="text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d97706]">
                What we stand for
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-stone-900 sm:text-4xl">
                Five pillars, one community
              </h2>
              <GoldDivider className="mt-6" />
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <Pillar title={p.title} desc={p.desc} Icon={p.Icon} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============== OUR MISSION ============== */}
      <section className="relative bg-white">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
          <Reveal>
            <SectionDivider className="mb-10 text-[#d97706]" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d97706]">
              Our Mission
            </p>
            <p className="mt-6 font-display text-2xl font-medium leading-relaxed text-stone-800 sm:text-3xl">
              “Uplifting our community by preserving Indian culture and creating
              meaningful experiences that inspire <span className="text-[#1e3a8a]">unity</span>,
              <span className="text-[#1e3a8a]"> growth</span>, and
              <span className="text-[#d97706]"> connection</span>.”
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-md bg-[#1e40af] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1e3a8a]"
              >
                Read our story
                <IconArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-stone-300 px-5 py-2.5 text-sm font-semibold text-stone-700 transition hover:border-stone-400"
              >
                Get involved
              </Link>
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 rounded-md border border-stone-300 px-5 py-2.5 text-sm font-semibold text-stone-700 transition hover:border-stone-400"
              >
                Browse gallery
              </Link>
            </div>
            <p className="mt-8 text-sm text-stone-500">
              <IconLotus className="mr-1 inline h-4 w-4 text-[#d97706]" />
              {config.orgName} — {config.tagline}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ============================================================
   Helper components
   ============================================================ */

function Sparkle({ className = "", delay = "0s" }: { className?: string; delay?: string }) {
  return (
    <span
      aria-hidden
      className={`voi-sparkle absolute h-2.5 w-2.5 ${className}`}
      style={{ animationDelay: delay }}
    >
      <span className="block h-full w-full rotate-45 bg-gradient-to-br from-[#fde68a] via-[#fbbf24] to-[#d97706] shadow-[0_0_8px_rgba(245,158,11,0.7)]" />
    </span>
  );
}

function Pill({ text }: { text: string }) {
  return (
    <span className="font-display text-sm font-bold uppercase tracking-[0.32em] text-[#1e3a8a] sm:text-base">
      {text}
    </span>
  );
}

function Diamond() {
  return (
    <span aria-hidden className="relative flex h-3 w-3 items-center justify-center">
      <span className="absolute inset-0 rotate-45 rounded-[2px] bg-[#d97706]" />
      <span className="absolute inset-0 -m-1 rotate-45 rounded-[2px] border border-[#d97706]/30" />
    </span>
  );
}

function CollageImg({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="group relative aspect-[3/4] overflow-hidden rounded-xl border-2 border-[#fbbf24]/40 shadow-lg ring-1 ring-white/10 transition duration-500 hover:border-[#fbbf24]/80 hover:shadow-xl">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition duration-700 group-hover:scale-[1.05]"
        sizes="(max-width:640px) 50vw, 25vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a8a]/30 to-transparent opacity-60" />
    </div>
  );
}

type IconComponent = (props: { size?: number; color?: string }) => React.ReactElement;

function Pillar({
  title,
  desc,
  Icon,
}: {
  title: string;
  desc: string;
  Icon: IconComponent;
}) {
  return (
    <div className="group relative flex flex-col items-center rounded-xl border border-stone-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-[#d97706]/40 hover:shadow-md">
      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#1e40af] to-[#1e3a8a] text-white shadow-md ring-4 ring-[#fbbf24]/30 transition group-hover:ring-[#fbbf24]/60">
        <Icon size={28} />
      </div>
      <h3 className="mt-5 font-display text-sm font-extrabold uppercase tracking-wide text-stone-900">
        {title}
      </h3>
      <p className="mt-2 text-xs leading-relaxed text-stone-600">{desc}</p>
      <span
        aria-hidden
        className="mt-4 h-px w-10 bg-gradient-to-r from-transparent via-[#d97706]/60 to-transparent transition group-hover:w-16"
      />
    </div>
  );
}

/* ============== Pillar icons ============== */

function CommunityIcon({ size = 28, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={color}>
      <path d="M9 12c2.21 0 4-1.79 4-4S11.21 4 9 4 5 5.79 5 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm8-2c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 2c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.95v2h6v-2c0-2.66-4.33-4-7-4z" />
    </svg>
  );
}

function WomanIcon({ size = 28, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={color}>
      <circle cx="12" cy="4" r="2.5" />
      <path d="M14 7h-4c-2.21 0-4 1.79-4 4l-1 5h3v6h2v-6h4v6h2v-6h3l-1-5c0-2.21-1.79-4-4-4z" />
    </svg>
  );
}

function YouthIcon({ size = 28, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={color}>
      <circle cx="12" cy="6" r="3" />
      <path d="M12 11c-3 0-7 1.5-7 4.5V20h14v-4.5c0-3-4-4.5-7-4.5z" />
      <circle cx="6" cy="9" r="2" opacity="0.7" />
      <circle cx="18" cy="9" r="2" opacity="0.7" />
    </svg>
  );
}

function TempleIcon({ size = 28, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={color}>
      <path d="M12 2L2 7v2h20V7l-10-5zm-7 9v8H3v2h18v-2h-2v-8h-2v8h-2v-8h-2v8h-2v-8h-2v8H7v-8H5z" />
    </svg>
  );
}

function HeartIcon({ size = 28, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={color}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

const pillars = [
  {
    title: "Community Engagement",
    desc: "Building meaningful connections across the diaspora",
    Icon: CommunityIcon,
  },
  {
    title: "Women Empowerment",
    desc: "Empowering women to lead, learn, and grow",
    Icon: WomanIcon,
  },
  {
    title: "Youth Leadership",
    desc: "Inspiring and developing the next generation of leaders",
    Icon: YouthIcon,
  },
  {
    title: "Cultural Preservation",
    desc: "Preserving our rich heritage, language, and values",
    Icon: TempleIcon,
  },
  {
    title: "Creating Impact",
    desc: "Turning every gathering into measurable change",
    Icon: HeartIcon,
  },
];
