import Link from "next/link";
import type { SiteConfig } from "@prisma/client";
import { IconArrowRight, IconWhatsApp } from "@/components/Icons";
import { whatsappHref } from "@/lib/site";

export function SiteFooter({ config }: { config: SiteConfig }) {
  const wa = whatsappHref(
    config.whatsappCountryCode,
    config.whatsappLocalNumber,
    "Hello, Voice of India."
  );

  return (
    <footer className="mt-auto border-t border-stone-200 bg-white text-stone-700">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="font-display text-xl font-semibold text-stone-900">{config.orgName}</p>
            <p className="mt-3 text-sm leading-relaxed text-stone-600">{config.footerTagline}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[#d97706]">
              Inspire · Motivate · Support
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Contact</p>
            <a
              href={`mailto:${config.contactEmail}`}
              className="group mt-3 flex items-center gap-2 text-sm text-stone-700 transition hover:text-stone-900"
            >
              {config.contactEmail}
              <IconArrowRight className="h-4 w-4 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
            </a>
            <a
              href={wa}
              className="mt-3 inline-flex items-center gap-2 rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              <IconWhatsApp className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Social</p>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              {config.instagramUrl ? (
                <a
                  href={config.instagramUrl}
                  className="text-stone-700 transition hover:text-stone-900"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
              ) : null}
              {config.facebookUrl ? (
                <a
                  href={config.facebookUrl}
                  className="text-stone-700 transition hover:text-stone-900"
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook
                </a>
              ) : null}
              <Link href="/admin/login" className="text-stone-400 transition hover:text-stone-600">
                Admin
              </Link>
            </div>
          </div>
        </div>
        <p className="mt-10 border-t border-stone-200 pt-6 text-center text-xs text-stone-500">
          © {new Date().getFullYear()} {config.orgName}. Not-for-profit.
        </p>
      </div>
    </footer>
  );
}
