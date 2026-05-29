import Link from "next/link";
import Image from "next/image";
import type { SiteConfig } from "@prisma/client";
import { BrandMark } from "@/components/BrandLogo";
import { IconWhatsApp } from "@/components/Icons";
import { whatsappHref } from "@/lib/site";

const nav = [
  // "About" removed — homepage already serves as About-style landing for the event.
  // To restore later: { href: "/about", label: "About" },
  { href: "/what-we-do", label: "What we do" },
  { href: "/career", label: "Career" },
  { href: "/events/upcoming", label: "Events" },
  { href: "/events/past", label: "Past" },
  { href: "/gallery", label: "Gallery" },
  { href: "/social-work", label: "Social work" },
  { href: "/community", label: "Community" },
  { href: "/donate", label: "Donate" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader({ config }: { config: SiteConfig }) {
  const wa = whatsappHref(
    config.whatsappCountryCode,
    config.whatsappLocalNumber,
    "Hello, I’d like to connect with Voice of India."
  );

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-white p-1 ring-1 ring-stone-200 transition group-hover:ring-stone-300">
            {config.logoUrl ? (
              <Image
                src={config.logoUrl}
                alt={`${config.orgName} logo`}
                width={48}
                height={48}
                className="h-full w-full object-contain"
                unoptimized
              />
            ) : (
              <BrandMark className="h-full w-full" />
            )}
          </span>
          <div className="min-w-0 leading-tight">
            <span className="font-display block truncate text-base font-semibold tracking-tight text-stone-900 sm:text-lg">
              {config.orgName}
            </span>
            <span className="hidden text-[11px] font-medium uppercase tracking-[0.18em] text-stone-500 sm:block">
              Inspire · Motivate · Support
            </span>
          </div>
        </Link>

        <nav className="flex max-w-[100vw] flex-1 flex-wrap items-center justify-end gap-x-0 gap-y-2 sm:gap-x-1">
          <div className="flex max-w-full flex-1 justify-end overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden">
            <div className="flex min-w-min items-center gap-0.5 pr-1 text-[13px] font-medium text-stone-600 sm:text-sm">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative whitespace-nowrap rounded-md px-3 py-2 transition-colors hover:text-[#1e40af]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="ml-1 inline-flex shrink-0 items-center gap-1.5 rounded-md bg-[#1e40af] px-4 py-2 text-[13px] font-semibold text-white shadow-sm transition hover:bg-[#1e3a8a]"
          >
            <IconWhatsApp className="h-4 w-4" />
            WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
