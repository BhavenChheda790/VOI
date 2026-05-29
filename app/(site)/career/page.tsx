import Link from "next/link";
import { GoldDivider, LotusDot } from "@/components/Accents";
import { IconArrowRight } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { getSiteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";
export const metadata = { title: "Career & Internships" };

// TODO: replace with your real Google Form link.
// Paste any https://docs.google.com/forms/... URL here.
const REGISTER_URL = "https://forms.gle/REPLACE_WITH_YOUR_FORM_ID";

const POSTER_PATH = "/images/internship-poster.jpg";

export default async function CareerPage() {
  const config = await getSiteConfig();

  return (
    <>
      {/* HERO */}
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

      {/* POSTER */}
      <section className="bg-stone-50/40">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={POSTER_PATH}
                alt="Voice of India USA — Internship Connections: We connect talent to opportunity"
                className="h-auto w-full"
              />
            </div>
          </Reveal>

          <GoldDivider className="mt-12" />

          {/* REGISTER CTA */}
          <Reveal>
            <div className="mt-12 rounded-2xl border border-[#1e40af]/15 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#172554] p-8 text-center text-white shadow-md sm:p-12">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#fbbf24]">
                Register your interest
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
                Ready to take the next step?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-stone-200">
                Tell us about you — qualifications, interests, the field you want to grow in. We&apos;ll
                review your application and match you with corporate partners.
              </p>

              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-md bg-[#f59e0b] px-6 py-3 text-sm font-bold uppercase tracking-wider text-stone-900 shadow-lg transition hover:bg-[#d97706] hover:text-white"
              >
                Register now
                <IconArrowRight className="h-4 w-4" />
              </a>

              <p className="mt-5 text-xs text-stone-300">
                Opens our registration form in a new tab.
              </p>
            </div>
          </Reveal>

          {/* QUICK INFO */}
          <Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <InfoCard title="Who can apply" body="Students and recent graduates pursuing careers in business, marketing, finance, and health care." />
              <InfoCard title="How matching works" body="We review qualifications, interests, and goals — then connect you with corporate partners that fit." />
              <InfoCard title="What you get" body="Real-world experience, mentorship, network, and a stronger career trajectory." />
            </div>
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

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#d97706]">
        {title}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-stone-700">{body}</p>
    </div>
  );
}
