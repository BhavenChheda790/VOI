import Link from "next/link";
import { GoldDivider, LotusDot } from "@/components/Accents";
import { SectionDivider } from "@/components/BrandMotif";
import { InfiniteImageMarquee } from "@/components/InfiniteImageMarquee";
import { IconWhatsApp } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { getSiteConfig, whatsappHref } from "@/lib/site";

export const dynamic = "force-dynamic";
export const metadata = { title: "Serving the Community" };

const communityImages = Array.from({ length: 10 }, (_, i) => ({
  src: `/images/community/community-${String(i + 1).padStart(2, "0")}.jpg`,
  alt: `Voice of India USA community moment ${i + 1}`,
}));

const values = [
  {
    label: "Compassion",
    body: "Standing with our community during the toughest moments.",
  },
  {
    label: "Unity",
    body: "Diverse families, one shared diaspora. We rise together.",
  },
  {
    label: "Support",
    body: "Food, resources, and a helping hand — practical, no strings.",
  },
];

export default async function ServingTheCommunityPage() {
  const config = await getSiteConfig();
  const reachOutWa = whatsappHref(
    config.whatsappCountryCode,
    config.whatsappLocalNumber,
    "Hello, I'd like to ask about support / resources from Voice of India USA."
  );

  return (
    <>
      {/* ============== HERO ============== */}
      <section className="relative overflow-hidden border-b border-stone-200 bg-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1e40af] via-[#f59e0b] to-[#1e40af]" />
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:py-20">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#1e40af]/15 bg-[#1e40af]/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1e40af]">
            <LotusDot className="h-3.5 w-3.5" />
            Serving the Community
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-stone-900 sm:text-5xl">
            Where compassion meets action
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-600">
            At {config.orgName}, we believe the true strength of a community is shown through
            <strong className="text-stone-900"> compassion, unity, and support</strong> for one
            another during times of need.
          </p>
        </div>
      </section>

      {/* ============== THREE VALUES ============== */}
      <section className="bg-stone-50/40">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-5 sm:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.label} delay={i * 100}>
                <div className="h-full rounded-2xl border border-stone-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-[#d97706]/40 hover:shadow-md">
                  <p className="font-display text-[11px] font-bold uppercase tracking-[0.32em] text-[#d97706]">
                    {v.label}
                  </p>
                  <p className="mt-3 leading-relaxed text-stone-700">{v.body}</p>
                  <span
                    aria-hidden
                    className="mt-4 block h-px w-10 bg-gradient-to-r from-[#d97706]/60 to-transparent"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============== GRATITUDE TO VOLUNTEERS ============== */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
          <Reveal>
            <SectionDivider className="mx-auto mb-10 text-[#d97706]" />
            <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d97706]">
              Our volunteers, our heart
            </p>
            <h2 className="mt-2 text-center font-display text-3xl font-semibold leading-tight text-stone-900 sm:text-4xl">
              Small acts of kindness, real impact
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-stone-700">
              We are grateful for the incredible <strong>volunteers and community members</strong>{" "}
              who continue to come together to help families by providing essential support, food,
              and resources. Small acts of kindness can make a meaningful difference in
              someone&apos;s life.
            </p>
          </Reveal>
        </div>

        {/* community photo marquee */}
        <Reveal delay={120}>
          <div className="relative bg-[#1e3a8a] pb-16 pt-2">
            <InfiniteImageMarquee images={communityImages} speedSeconds={50} />
          </div>
        </Reveal>
      </section>

      {/* ============== OUR MISSION ============== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fffaf0] via-white to-[#fffbeb]">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d97706]">
              Our mission, our promise
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold leading-tight text-stone-900 sm:text-4xl">
              Standing together, always
            </h2>
            <GoldDivider className="mt-6" />
            <p className="mx-auto mt-8 max-w-2xl font-display text-xl leading-relaxed text-stone-800 sm:text-2xl">
              “Our mission remains rooted in <span className="text-[#1e3a8a]">uplifting the
              community</span>, <span className="text-[#1e3a8a]">preserving our cultural values</span>,
              and <span className="text-[#d97706]">standing together</span> whenever support is
              needed.”
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============== REACH OUT CTA ============== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#172554] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#fbbf24]/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-[#fbbf24]/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#fbbf24]">
            Need help?
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
            If you or someone you know needs support, reach out.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-stone-200">
            Together, we can continue building a stronger and more connected community.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={reachOutWa}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition hover:bg-emerald-700"
            >
              <IconWhatsApp className="h-4 w-4" />
              Reach out on WhatsApp
            </a>
            <a
              href={`mailto:${config.contactEmail}?subject=${encodeURIComponent("Community support request")}`}
              className="inline-flex items-center gap-2 rounded-full bg-[#f59e0b] px-6 py-3 text-sm font-bold uppercase tracking-wider text-stone-900 shadow-lg transition hover:bg-[#d97706] hover:text-white"
            >
              Email us
            </a>
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Help us serve
            </Link>
          </div>
          <p className="mt-8 text-xs text-stone-300">
            <a
              href={`mailto:${config.contactEmail}`}
              className="font-semibold text-white underline decoration-stone-500 underline-offset-2 hover:decoration-[#fbbf24]"
            >
              {config.contactEmail}
            </a>{" "}
            ·{" "}
            <a
              href={`tel:+${config.whatsappCountryCode}${config.whatsappLocalNumber}`}
              className="font-semibold text-white underline decoration-stone-500 underline-offset-2 hover:decoration-[#fbbf24]"
            >
              +{config.whatsappCountryCode} {config.whatsappLocalNumber}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
