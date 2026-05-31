"use client";

import Link from "next/link";
import { useRef } from "react";
import { IconWhatsApp } from "@/components/Icons";

type NavLink = { href: string; label: string };

type Props = {
  links: NavLink[];
  whatsappHref: string;
};

/**
 * Mobile hamburger menu — uses native <details> for toggling so the menu
 * works without JS, plus a small client-side handler that closes the menu
 * when the user taps a link, backdrop, or the X button.
 */
export function MobileMenu({ links, whatsappHref }: Props) {
  const ref = useRef<HTMLDetailsElement>(null);

  function close() {
    if (ref.current) ref.current.open = false;
  }

  return (
    <details ref={ref} className="voi-mobile-menu group/menu relative lg:hidden">
      {/* Hamburger trigger (becomes X when open) */}
      <summary
        aria-label="Open menu"
        className="inline-flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-md text-stone-700 outline-none transition hover:bg-stone-100 hover:text-[#1e40af] focus-visible:ring-2 focus-visible:ring-[#1e40af] [&::-webkit-details-marker]:hidden"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" className="group-open/menu:hidden" />
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" className="hidden group-open/menu:block" />
        </svg>
      </summary>

      {/* Backdrop — click to close */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={close}
        className="pointer-events-none fixed inset-0 z-[60] cursor-default bg-stone-950/55 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-open/menu:pointer-events-auto group-open/menu:opacity-100"
      />

      {/* Slide-in panel */}
      <aside
        id="mobile-nav-panel"
        className="fixed inset-y-0 right-0 z-[70] flex w-[85vw] max-w-sm translate-x-full flex-col bg-white shadow-2xl transition-transform duration-300 ease-out group-open/menu:translate-x-0"
      >
        <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
          <p className="font-display text-base font-semibold text-stone-900">Menu</p>
          <button
            type="button"
            aria-label="Close menu"
            onClick={close}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-stone-500 transition hover:bg-stone-100 hover:text-stone-900"
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor" aria-hidden>
              <path d="M5.3 5.3a1 1 0 0 1 1.4 0L10 8.6l3.3-3.3a1 1 0 1 1 1.4 1.4L11.4 10l3.3 3.3a1 1 0 0 1-1.4 1.4L10 11.4l-3.3 3.3a1 1 0 0 1-1.4-1.4L8.6 10 5.3 6.7a1 1 0 0 1 0-1.4z" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={close}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-stone-800 transition hover:bg-[#fff7ed] hover:text-[#1e40af]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-stone-200 p-4">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            onClick={close}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            <IconWhatsApp className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </aside>
    </details>
  );
}
