import Link from "next/link";
import Image from "next/image";
import type { SiteConfig } from "@prisma/client";
import { BrandMark } from "@/components/BrandLogo";
import { EventsDropdown } from "@/components/EventsDropdown";
import { IconWhatsApp } from "@/components/Icons";
import { MobileMenu } from "@/components/MobileMenu";
import { whatsappHref } from "@/lib/site";

// Desktop nav (used at lg+ screens). On mobile the hamburger menu takes over.
const desktopNav = [
  { href: "/what-we-do", label: "What we do" },
  { kind: "events-dropdown" as const },
  { href: "/gallery", label: "Gallery" },
  { href: "/serving-the-community", label: "Serving the Community" },
  { href: "/donate", label: "Donate" },
  { href: "/career", label: "Career" },
  { href: "/contact", label: "Contact" },
];

// Flat list used by the mobile drawer (Events is exploded into its 2 children).
const mobileNav = [
  { href: "/", label: "Home" },
  { href: "/what-we-do", label: "What we do" },
  { href: "/events/upcoming", label: "Upcoming events" },
  { href: "/events/past", label: "Past events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/serving-the-community", label: "Serving the Community" },
  { href: "/donate", label: "Donate" },
  { href: "/career", label: "Career & Internships" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader({ config }: { config: SiteConfig }) {
  const wa = whatsappHref(
    config.whatsappCountryCode,
    config.whatsappLocalNumber,
    "Hello, I’d like to connect with Voice of India."
  );

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        {/* Logo + org name */}
        <Link href="/" className="group flex min-w-0 items-center gap-3">
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1 ring-1 ring-stone-200 transition group-hover:ring-stone-300 sm:h-12 sm:w-12">
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
            <span className="font-display block truncate text-sm font-semibold tracking-tight text-stone-900 sm:text-base lg:text-lg">
              {config.orgName}
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-stone-500 sm:block sm:text-[11px]">
              Inspire · Motivate · Support
            </span>
          </div>
        </Link>

        {/* Desktop nav (lg+) */}
        <nav className="hidden lg:flex lg:items-center lg:gap-1">
          <div className="flex items-center gap-0.5 text-sm font-medium text-stone-600">
            {desktopNav.map((item, i) =>
              "kind" in item ? (
                <EventsDropdown key={`dropdown-${i}`} />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="whitespace-nowrap rounded-md px-3 py-2 transition-colors hover:text-[#1e40af]"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="ml-2 inline-flex shrink-0 items-center gap-1.5 rounded-md bg-[#1e40af] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1e3a8a]"
          >
            <IconWhatsApp className="h-4 w-4" />
            WhatsApp
          </a>
        </nav>

        {/* Mobile hamburger (< lg) */}
        <MobileMenu links={mobileNav} whatsappHref={wa} />
      </div>
    </header>
  );
}
