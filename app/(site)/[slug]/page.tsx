import Link from "next/link";
import { notFound } from "next/navigation";
import { LotusDot } from "@/components/Accents";
import { IconWhatsApp } from "@/components/Icons";
import { MarkdownBody } from "@/components/MarkdownBody";
import { prisma } from "@/lib/prisma";
import { getSiteConfig, whatsappHref } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await prisma.page.findUnique({ where: { slug } });
  if (!page) return {};
  return { title: page.title };
}

export default async function ContentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await prisma.page.findUnique({ where: { slug } });
  if (!page) notFound();

  const needsConfig = slug === "donate" || slug === "contact";
  const config = needsConfig ? await getSiteConfig() : null;
  const donateWa = config
    ? whatsappHref(
        config.whatsappCountryCode,
        config.whatsappLocalNumber,
        "Hello, I would like to donate to Voice of India. Please share Zelle / bank details."
      )
    : null;
  const contactWa = config
    ? whatsappHref(
        config.whatsappCountryCode,
        config.whatsappLocalNumber,
        "Hello Voice of India, I'd like to get in touch."
      )
    : null;

  return (
    <>
      <section className="relative overflow-hidden border-b border-stone-200 bg-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1e40af] via-[#f59e0b] to-[#1e40af]" />
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-16">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#1e40af]/15 bg-[#1e40af]/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1e40af]">
            <LotusDot className="h-3.5 w-3.5" />
            Voice of India
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-stone-900 sm:text-5xl">
            {page.title}
          </h1>
          <div className="mt-6 flex items-center gap-2" aria-hidden>
            <span className="block h-2 w-2 rotate-45 bg-[#d97706]" />
            <span className="h-px w-24 bg-gradient-to-r from-[#d97706]/70 to-transparent" />
          </div>
        </div>
      </section>

      <article className="bg-stone-50/40">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          {slug === "donate" && donateWa && config ? (
            <div className="mb-10 rounded-xl border border-stone-200 bg-white p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d97706]">
                    Direct support
                  </p>
                  <h2 className="mt-1 font-display text-xl font-semibold text-stone-900">
                    Give on WhatsApp
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-stone-600">
                    Start a chat and our assistant instantly shares Zelle and bank details. Send your screenshot in the
                    same chat — our team will verify and send you a confirmation.
                  </p>
                </div>
                <a
                  href={donateWa}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                >
                  <IconWhatsApp className="h-4 w-4" />
                  Donate on WhatsApp
                </a>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <DetailPill label="Zelle" value={config.zelleEmail} />
                {config.bankName ? <DetailPill label="Bank" value={config.bankName} /> : null}
                {config.bankAccountName ? <DetailPill label="Account name" value={config.bankAccountName} /> : null}
                {config.bankAccountNumber ? <DetailPill label="Account #" value={config.bankAccountNumber} /> : null}
              </div>
              <p className="mt-5 text-xs italic text-stone-500">
                We never store card details on this site — donations are coordinated on WhatsApp with human
                verification of proofs.
              </p>
            </div>
          ) : null}

          {slug === "contact" && config ? (
            <div className="mb-10">
              <a
                href={`mailto:${config.contactEmail}`}
                className="group block rounded-xl border border-stone-200 bg-white p-5 transition hover:border-stone-300"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d97706]">Email</p>
                <p className="mt-2 font-display text-base text-stone-900 group-hover:underline">
                  {config.contactEmail}
                </p>
                <p className="mt-1 text-xs text-stone-500">We reply within 1–2 business days.</p>
              </a>
            </div>
          ) : null}

          <div className="rounded-xl border border-stone-200 bg-white p-6 sm:p-8">
            <MarkdownBody content={page.content} />
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-md bg-[#1e40af] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1e3a8a]"
            >
              Back home</Link>
            {slug !== "donate" ? (
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 rounded-md border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 transition hover:border-stone-400"
              >
                Support our mission</Link>
            ) : null}
          </div>
        </div>
      </article>
    </>
  );
}

function DetailPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-stone-200 bg-stone-50 p-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-500">{label}</p>
      <p className="mt-1 break-all text-sm font-medium text-stone-900">{value}</p>
    </div>
  );
}
