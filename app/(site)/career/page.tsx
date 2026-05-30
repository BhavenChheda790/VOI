import Link from "next/link";
import { GoldDivider, LotusDot } from "@/components/Accents";
import { IconArrowRight } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { getSiteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";
export const metadata = { title: "Career & Internships" };

const openings = [
  {
    title: "Summer Internship 2026",
    location: "California / Remote",
    type: "Summer · Part-time",
    description:
      "A structured summer internship for students pursuing careers in business, marketing, finance, or healthcare. We pair you with a corporate partner, mentor you throughout, and help you build real-world experience.",
    href: "/career/summer-internship-2026",
  },
];

export default async function CareerPage() {
  const config = await getSiteConfig();

  return (
    <>
      {/* ============== HERO ============== */}
      <section className="relative overflow-hidden border-b border-stone-200 bg-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1e40af] via-[#f59e0b] to-[#1e40af]" />
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-16">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#1e40af]/15 bg-[#1e40af]/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1e40af]">
            <LotusDot className="h-3.5 w-3.5" />
            Career & Internships
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-stone-900 sm:text-5xl">
            Your Future. Our Mission.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-600">
            We open doors. You build the future. {config.orgName} acts as a bridge between ambitious
            students and reputable corporations looking for emerging talent.
          </p>
        </div>
      </section>

      {/* ============== CURRENT OPENINGS ============== */}
      <section id="openings" className="bg-stone-50/60">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
          <Reveal>
            <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d97706]">
              Now hiring
            </p>
            <h2 className="mt-2 text-center font-display text-4xl font-extrabold leading-tight text-stone-900 sm:text-5xl">
              Current Openings
            </h2>
            <GoldDivider className="mt-6" />
          </Reveal>

          <div className="mt-12 space-y-4">
            {openings.map((o, i) => (
              <Reveal key={o.title} delay={i * 80}>
                <div className="grid gap-5 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-[#d97706]/30 hover:shadow-md sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8 sm:p-7">
                  <div>
                    <h3 className="font-display text-xl font-bold leading-tight text-stone-900 sm:text-2xl">
                      {o.title}
                    </h3>
                    <p className="mt-1.5 text-sm font-semibold text-[#1e3a8a]">
                      {o.location} · {o.type}
                    </p>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-600">
                      {o.description}
                    </p>
                  </div>
                  <Link
                    href={o.href}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#1e40af] px-8 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-md transition hover:from-[#1e40af] hover:to-[#1e3a8a] sm:min-w-[180px]"
                  >
                    View
                    <IconArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-10 text-center text-sm text-stone-600">
              <span className="text-[#d97706]">*</span> To apply for any other position or to send
              your CV directly, please email{" "}
              <a
                href={`mailto:${config.contactEmail}`}
                className="font-semibold text-[#1e40af] hover:underline"
              >
                {config.contactEmail}
              </a>
            </p>
          </Reveal>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-md bg-[#1e40af] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1e3a8a]"
            >
              Back home
              <IconArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-stone-300 px-5 py-2.5 text-sm font-semibold text-stone-700 transition hover:border-stone-400"
            >
              Have a question? Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
