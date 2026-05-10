import Link from "next/link";
import { GoldDivider, LotusDot } from "@/components/Accents";
import { IconArrowRight, IconWhatsApp } from "@/components/Icons";
import { MarkdownBody } from "@/components/MarkdownBody";
import { Reveal } from "@/components/Reveal";
import { prisma } from "@/lib/prisma";
import { getSiteConfig, whatsappHref } from "@/lib/site";

export const dynamic = "force-dynamic";
export const metadata = { title: "Donate" };

export default async function DonatePage() {
  const config = await getSiteConfig();
  const page = await prisma.page.findUnique({ where: { slug: "donate" } });

  const donateWa = whatsappHref(
    config.whatsappCountryCode,
    config.whatsappLocalNumber,
    "Hello, I would like to donate to Voice of India."
  );

  // Zelle recipient (registered to phone number) — keep as constants for now;
  // can be moved to SiteConfig later.
  const zelleName = "VOICE OF INDIA CORPORATION";
  const zellePhone = "909-696-0066";

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-stone-200 bg-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1e40af] via-[#f59e0b] to-[#1e40af]" />
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-16">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#1e40af]/15 bg-[#1e40af]/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1e40af]">
            <LotusDot className="h-3.5 w-3.5" />
            Donate
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-stone-900 sm:text-5xl">
            Support our mission
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-600">
            Every gift fuels women empowerment, cultural programs, and student mentorship.
            Choose what works for you — Zelle, WhatsApp, or bank transfer.
          </p>
        </div>
      </section>

      {/* PAYMENT OPTIONS */}
      <section className="bg-stone-50/40">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* ============ ZELLE CARD ============ */}
            <Reveal>
              <div className="flex h-full flex-col rounded-2xl border border-purple-200 bg-white p-8 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-purple-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    Zelle®
                  </span>
                  <span className="text-xs text-stone-500">No fees · instant</span>
                </div>
                <h2 className="mt-4 font-display text-2xl font-bold text-stone-900">
                  Send money with Zelle®
                </h2>
                <p className="mt-2 text-stone-600">
                  Scan in your banking app to pay.
                </p>

                {/* QR */}
                <div className="mt-6 flex justify-center">
                  <div className="rounded-xl border-2 border-purple-100 bg-white p-3 shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/zelle-qr.png"
                      alt={`Zelle QR code for ${zelleName}`}
                      width={208}
                      height={208}
                      className="h-52 w-52 object-contain"
                    />
                  </div>
                </div>

                {/* Recipient */}
                <div className="mt-6 rounded-xl bg-purple-50 p-5 text-center">
                  <p className="font-display text-lg font-bold text-stone-900">
                    {zelleName}
                  </p>
                  <p className="mt-1 text-stone-700">
                    at <span className="font-mono text-purple-700">{zellePhone}</span>
                  </p>
                </div>

                {config.zelleEmail ? (
                  <p className="mt-4 text-center text-sm text-stone-600">
                    Or send to{" "}
                    <span className="font-medium text-stone-900">{config.zelleEmail}</span>
                  </p>
                ) : null}
              </div>
            </Reveal>

            {/* ============ WHATSAPP CARD ============ */}
            <Reveal delay={120}>
              <div className="flex h-full flex-col rounded-2xl border border-emerald-200 bg-white p-8 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    <IconWhatsApp className="h-3.5 w-3.5" />
                    WhatsApp
                  </span>
                  <span className="text-xs text-stone-500">Personal · verified</span>
                </div>
                <h2 className="mt-4 font-display text-2xl font-bold text-stone-900">
                  Donate on WhatsApp
                </h2>
                <p className="mt-2 text-stone-600">
                  Start a chat — our assistant shares Zelle, bank, and payment details. Send your
                  screenshot in the same chat so our team can verify and confirm your gift.
                </p>

                <div className="mt-6">
                  <a
                    href={donateWa}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                  >
                    <IconWhatsApp className="h-4 w-4" />
                    Open WhatsApp chat
                  </a>
                </div>

                <div className="mt-6 rounded-xl bg-emerald-50 p-5 text-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">
                    Voice of India USA
                  </p>
                  <p className="mt-1 font-mono text-emerald-900">
                    +{config.whatsappCountryCode} {formatUsPhone(config.whatsappLocalNumber)}
                  </p>
                </div>

                <p className="mt-auto pt-6 text-xs italic text-stone-500">
                  We never store card details on this site. Donations are coordinated with human
                  verification of every payment proof.
                </p>
              </div>
            </Reveal>
          </div>

          {/* ============ BANK TRANSFER (conditional) ============ */}
          {config.bankAccountNumber || config.bankName ? (
            <Reveal>
              <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-stone-700 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    Bank Transfer
                  </span>
                </div>
                <h2 className="mt-4 font-display text-2xl font-bold text-stone-900">
                  Direct deposit
                </h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {config.bankName ? (
                    <DetailPill label="Bank" value={config.bankName} />
                  ) : null}
                  {config.bankAccountName ? (
                    <DetailPill label="Account name" value={config.bankAccountName} />
                  ) : null}
                  {config.bankAccountNumber ? (
                    <DetailPill label="Account #" value={config.bankAccountNumber} />
                  ) : null}
                  {config.bankRoutingNumber ? (
                    <DetailPill label="Routing #" value={config.bankRoutingNumber} />
                  ) : null}
                </div>
                {config.paymentInstructions ? (
                  <p className="mt-5 rounded-lg border-l-4 border-[#d97706] bg-amber-50/60 p-4 text-sm text-stone-700">
                    {config.paymentInstructions}
                  </p>
                ) : null}
              </div>
            </Reveal>
          ) : null}

          {/* ============ MARKDOWN CONTENT FROM CMS ============ */}
          {page?.content ? (
            <Reveal>
              <div className="mt-10 rounded-2xl border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
                <MarkdownBody content={page.content} />
              </div>
            </Reveal>
          ) : null}

          <GoldDivider className="mt-12" />

          {/* ============ CTAs ============ */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
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
              Contact us
            </Link>
            <Link
              href="/events/upcoming"
              className="inline-flex items-center gap-2 rounded-md border border-stone-300 px-5 py-2.5 text-sm font-semibold text-stone-700 transition hover:border-stone-400"
            >
              See upcoming events
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function DetailPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-stone-200 bg-stone-50 p-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-500">
        {label}
      </p>
      <p className="mt-1 break-all text-sm font-medium text-stone-900">{value}</p>
    </div>
  );
}

function formatUsPhone(digits: string) {
  const d = digits.replace(/\D/g, "");
  if (d.length === 10) return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  return digits;
}
