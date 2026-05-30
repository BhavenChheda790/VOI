import Link from "next/link";
import type { SiteConfig } from "@prisma/client";
import { IconArrowRight, IconWhatsApp } from "@/components/Icons";
import { whatsappHref } from "@/lib/site";

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/what-we-do", label: "What we do" },
  { href: "/career", label: "Career & Internships" },
  { href: "/events/upcoming", label: "Upcoming events" },
  { href: "/events/past", label: "Past events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/social-work", label: "Social work" },
  { href: "/community", label: "Community" },
  { href: "/donate", label: "Donate" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter({ config }: { config: SiteConfig }) {
  const wa = whatsappHref(
    config.whatsappCountryCode,
    config.whatsappLocalNumber,
    "Hello, Voice of India."
  );

  return (
    <footer className="mt-auto border-t border-stone-200 bg-white text-stone-700">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* BRAND — spans wider on desktop */}
          <div className="lg:col-span-4">
            <p className="font-display text-xl font-semibold text-stone-900">
              {config.orgName}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-stone-600">
              {config.footerTagline}
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.18em] text-[#d97706]">
              Inspire · Motivate · Support
            </p>
          </div>

          {/* EXPLORE — full nav menu */}
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
              Explore
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {exploreLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-stone-700 transition hover:text-[#1e40af] hover:underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
              Contact
            </p>
            <a
              href={`mailto:${config.contactEmail}`}
              className="group mt-4 flex items-center gap-2 text-sm text-stone-700 transition hover:text-stone-900"
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

          {/* SOCIAL */}
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
              Social
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm">
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
            </div>
          </div>
        </div>

        <p className="mt-12 border-t border-stone-200 pt-6 text-center text-xs text-stone-500">
          © {new Date().getFullYear()} {config.orgName}. California 501(c)(3) Not-for-profit.
        </p>
      </div>
    </footer>
  );
}
