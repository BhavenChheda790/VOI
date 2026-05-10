import Image from "next/image";
import { getSiteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

/**
 * NOTE — Homepage temporarily replaced ahead of the upcoming event.
 * The original marketing homepage (hero, sponsor tiers, gau seva, past events,
 * mission, etc.) is preserved at:
 *
 *   web/app/(site)/_home-original.txt
 *
 * To restore: copy that file's contents back into this file. Or in git:
 *   git show 06719f1:app/\(site\)/page.tsx > app/\(site\)/page.tsx
 */
export default async function HomePage() {
  const config = await getSiteConfig();
  const websiteUrl = "https://voi24.org";

  return (
    <>
      {/* TOP BANNER — Logo, big title, tagline, INSPIRE • MOTIVATE • SUPPORT */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="grid items-center gap-8 lg:grid-cols-[auto_1fr_auto]">
            <div className="mx-auto h-32 w-32 shrink-0 sm:h-36 sm:w-36 lg:mx-0">
              <BrandSeal />
            </div>

            <div className="text-center lg:text-left">
              <h1 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-[#1e3a8a] sm:text-6xl lg:text-7xl">
                VOICE OF
                <br />
                INDIA <span className="text-[#d97706]">USA</span>
              </h1>
              <div className="mt-4 flex items-center justify-center gap-3 lg:justify-start">
                <span className="h-px w-12 bg-[#d97706]/60" />
                <span className="text-lg text-[#d97706]">★ ★ ★</span>
                <span className="h-px w-12 bg-[#d97706]/60" />
              </div>
            </div>

            <div className="border-t border-stone-200 pt-6 text-center lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 lg:text-left">
              <p className="font-display text-xl font-bold text-[#1e3a8a] sm:text-2xl">
                Empowering Community.
              </p>
              <p className="font-display text-xl font-bold text-[#1e3a8a] sm:text-2xl">
                Preserving Culture.
              </p>
              <p className="font-display text-xl font-bold text-[#d97706] sm:text-2xl">
                Inspiring Unity.
              </p>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6 sm:gap-12">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#1e3a8a] sm:text-sm">
              INSPIRE
            </span>
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#d97706]" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#1e3a8a] sm:text-sm">
              MOTIVATE
            </span>
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#d97706]" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#1e3a8a] sm:text-sm">
              SUPPORT
            </span>
          </div>
        </div>
      </section>

      {/* HERO — TOGETHER WE EMPOWER + photo collage */}
      <section className="relative bg-gradient-to-r from-[#1e3a8a] via-[#1e40af] to-[#1e3a8a] text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1.5fr] lg:items-center">
            <div>
              <h2 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl">
                TOGETHER,
                <br />
                WE <span className="text-[#fbbf24]">EMPOWER</span>.
                <br />
                WE <span className="text-[#fbbf24]">PRESERVE</span>.
                <br />
                WE <span className="text-[#fbbf24]">INSPIRE</span>.
              </h2>
              <p className="mt-6 max-w-md text-lg text-stone-200">
                Building a stronger community for a brighter future.
              </p>
            </div>

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
        </div>
      </section>

      {/* 5 PILLARS */}
      <section className="bg-[#1e3a8a] pb-20 pt-2 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            <Pillar
              title="COMMUNITY ENGAGEMENT"
              desc="Building meaningful connections"
              Icon={CommunityIcon}
            />
            <Pillar
              title="WOMEN EMPOWERMENT"
              desc="Empowering women to lead and grow"
              Icon={WomanIcon}
            />
            <Pillar
              title="YOUTH LEADERSHIP"
              desc="Inspiring and developing future leaders"
              Icon={YouthIcon}
            />
            <Pillar
              title="CULTURAL PRESERVATION"
              desc="Preserving our rich heritage and values"
              Icon={TempleIcon}
            />
            <Pillar
              title="CREATING IMPACT"
              desc="Creating positive change together"
              Icon={HeartIcon}
            />
          </div>
        </div>
      </section>

      {/* MISSION + QR + CONNECT */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:items-start">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1e3a8a]">
                <CommunityIcon size={20} color="#ffffff" />
              </div>
              <h3 className="font-display text-xl font-extrabold uppercase tracking-wide text-[#1e3a8a]">
                Our Mission
              </h3>
            </div>
            <p className="mt-4 leading-relaxed text-stone-700">
              Uplifting our community by preserving Indian culture and creating meaningful experiences
              that inspire unity, growth, and connection.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(websiteUrl)}`}
              alt="QR code linking to voi24.org"
              width={170}
              height={170}
              className="rounded shadow-sm"
            />
            <p className="mt-3 font-display text-base font-extrabold uppercase tracking-wide text-[#1e3a8a]">
              Scan to Connect
            </p>
            <p className="mt-1 max-w-[16rem] text-sm text-stone-600">
              Join us. Support us. Be a part of the change.
            </p>
          </div>

          <div>
            <h3 className="font-display text-xl font-extrabold uppercase tracking-wide text-[#1e3a8a]">
              Connect With Us
            </h3>
            <ul className="mt-4 space-y-3 text-stone-700">
              <li className="flex items-center gap-3">
                <span aria-hidden className="text-[#1e3a8a]">✉</span>
                <a
                  href={`mailto:${config.contactEmail}`}
                  className="hover:text-[#1e3a8a] hover:underline"
                >
                  {config.contactEmail}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span aria-hidden className="text-[#1e3a8a]">🌐</span>
                <a href={websiteUrl} className="hover:text-[#1e3a8a] hover:underline">
                  www.voi24.org
                </a>
              </li>
              {config.facebookUrl ? (
                <li className="flex items-center gap-3">
                  <span aria-hidden className="font-bold text-[#1e3a8a]">f</span>
                  <a
                    href={config.facebookUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#1e3a8a] hover:underline"
                  >
                    voiceofindiausa
                  </a>
                </li>
              ) : null}
              {config.instagramUrl ? (
                <li className="flex items-center gap-3">
                  <span aria-hidden className="text-[#1e3a8a]">📷</span>
                  <a
                    href={config.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#1e3a8a] hover:underline"
                  >
                    voiceofindiausa
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

// ============================================================
// Helper components
// ============================================================

function CollageImg({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-xl border-2 border-[#fbbf24]/40 shadow-lg">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width:640px) 50vw, 25vw"
      />
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
    <div className="text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#fbbf24]/70">
        <Icon size={28} />
      </div>
      <h3 className="mt-4 font-display text-sm font-extrabold uppercase tracking-wide">{title}</h3>
      <p className="mt-2 text-xs leading-relaxed text-stone-300">{desc}</p>
    </div>
  );
}

function BrandSeal() {
  return (
    <svg viewBox="0 0 144 144" className="h-full w-full" aria-label="Voice of India USA seal">
      <circle cx="72" cy="72" r="70" fill="#fff" stroke="#1e3a8a" strokeWidth="2" />
      <circle cx="72" cy="72" r="60" fill="none" stroke="#d97706" strokeWidth="1.5" />
      <path
        d="M72 96 C72 96, 50 78, 50 64 C50 56, 56 50, 62 50 C66 50, 70 53, 72 56 C74 53, 78 50, 82 50 C88 50, 94 56, 94 64 C94 78, 72 96, 72 96 Z"
        fill="#d97706"
      />
      <path
        d="M48 88 Q60 100, 72 100 Q84 100, 96 88 L96 100 Q72 112, 48 100 Z"
        fill="#1e3a8a"
      />
    </svg>
  );
}

function CommunityIcon({ size = 28, color = "#ffffff" }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={color}>
      <path d="M9 12c2.21 0 4-1.79 4-4S11.21 4 9 4 5 5.79 5 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm8-2c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 2c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.95v2h6v-2c0-2.66-4.33-4-7-4z" />
    </svg>
  );
}

function WomanIcon({ size = 28, color = "#ffffff" }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={color}>
      <circle cx="12" cy="4" r="2.5" />
      <path d="M14 7h-4c-2.21 0-4 1.79-4 4l-1 5h3v6h2v-6h4v6h2v-6h3l-1-5c0-2.21-1.79-4-4-4z" />
    </svg>
  );
}

function YouthIcon({ size = 28, color = "#ffffff" }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={color}>
      <circle cx="12" cy="6" r="3" />
      <path d="M12 11c-3 0-7 1.5-7 4.5V20h14v-4.5c0-3-4-4.5-7-4.5z" />
      <path d="M5 14c-1.5 0-3 0.7-3 2v3h3v-5z" opacity="0.7" />
      <path d="M19 14c1.5 0 3 0.7 3 2v3h-3v-5z" opacity="0.7" />
    </svg>
  );
}

function TempleIcon({ size = 28, color = "#ffffff" }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={color}>
      <path d="M12 2L2 7v2h20V7l-10-5zm-7 9v8H3v2h18v-2h-2v-8h-2v8h-2v-8h-2v8h-2v-8h-2v8H7v-8H5z" />
    </svg>
  );
}

function HeartIcon({ size = 28, color = "#ffffff" }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={color}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}
