"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IconWhatsApp } from "@/components/Icons";

const SESSION_KEY = "voi_event_popup_dismissed_v1";

type Props = {
  title: string;
  message: string;
  zelleName: string;
  zellePhone: string;
  zelleEmail: string;
  whatsappHref: string;
  logoUrl: string | null;
  orgName: string;
};

export function EventPopup({
  title,
  message,
  zelleName,
  zellePhone,
  zelleEmail,
  whatsappHref,
  logoUrl,
  orgName,
}: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(SESSION_KEY) === "1") return;
    const t = setTimeout(() => setOpen(true), 1000);
    return () => clearTimeout(t);
  }, []);

  function close() {
    setOpen(false);
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // ignore
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[100] flex items-end justify-center px-4 py-6 sm:items-center"
    >
      {/* Backdrop with deep blur */}
      <button
        type="button"
        aria-label="Close"
        onClick={close}
        className="absolute inset-0 cursor-default bg-stone-950/65 backdrop-blur-md transition"
      />

      {/* Modal */}
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-stone-900/10 animate-[voiPopFadeUp_0.5s_cubic-bezier(0.22,1,0.36,1)]">
        {/* ============== HERO HEADER ============== */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#172554] px-7 pb-16 pt-9 text-center text-white">
          {/* Decorative blurred blobs */}
          <span
            aria-hidden
            className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-[#f59e0b]/30 blur-3xl"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -right-10 top-10 h-32 w-32 rounded-full bg-[#fbbf24]/25 blur-3xl"
          />
          {/* Subtle dot pattern */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, #fff 1px, transparent 1.5px)",
              backgroundSize: "20px 20px",
            }}
          />

          {/* Sparkles */}
          <span aria-hidden className="absolute left-6 top-6 animate-[voiTwinkle_3s_ease-in-out_infinite]">
            <Sparkle />
          </span>
          <span
            aria-hidden
            className="absolute right-8 top-12 animate-[voiTwinkle_3s_ease-in-out_infinite]"
            style={{ animationDelay: "0.7s" }}
          >
            <Sparkle />
          </span>
          <span
            aria-hidden
            className="absolute left-12 bottom-20 animate-[voiTwinkle_3s_ease-in-out_infinite]"
            style={{ animationDelay: "1.4s" }}
          >
            <Sparkle small />
          </span>

          {/* Close button */}
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-3 top-3 rounded-full bg-white/10 p-1.5 text-white/80 backdrop-blur transition hover:bg-white/20 hover:text-white"
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor" aria-hidden>
              <path d="M5.3 5.3a1 1 0 0 1 1.4 0L10 8.6l3.3-3.3a1 1 0 1 1 1.4 1.4L11.4 10l3.3 3.3a1 1 0 0 1-1.4 1.4L10 11.4l-3.3 3.3a1 1 0 0 1-1.4-1.4L8.6 10 5.3 6.7a1 1 0 0 1 0-1.4z" />
            </svg>
          </button>

          {/* Tag */}
          <p className="relative inline-flex items-center gap-1.5 rounded-full border border-[#fbbf24]/40 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#fbbf24] backdrop-blur">
            <span className="text-sm leading-none">★</span>
            With gratitude
            <span className="text-sm leading-none">★</span>
          </p>

          {/* Title */}
          <h2 className="relative mt-4 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            {title}
          </h2>

          {/* Subtitle */}
          <p className="relative mx-auto mt-3 max-w-xs whitespace-pre-line text-sm leading-relaxed text-stone-200">
            {message}
          </p>
        </div>

        {/* ============== LOGO MEDALLION (overlapping) ============== */}
        <div className="relative -mt-12 flex justify-center">
          <div className="relative">
            {/* Soft glow */}
            <span
              aria-hidden
              className="absolute inset-0 -m-2 rounded-full bg-[#f59e0b]/30 blur-xl"
            />
            {/* White ring */}
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white p-2 shadow-lg ring-4 ring-white">
              <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#fff7ed] via-white to-[#fffbeb]">
                {logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={logoUrl}
                    alt={`${orgName} logo`}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <DiyaIcon />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ============== BODY ============== */}
        <div className="px-7 pb-7 pt-4 text-center">
          {/* Donate divider */}
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#d97706]/60" />
            <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.32em] text-[#d97706]">
              <DiyaInline />
              Donate Here
              <DiyaInline />
            </span>
            <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#d97706]/60" />
          </div>

          {/* Zelle CTA */}
          <Link
            href="/donate"
            onClick={close}
            className="group relative flex items-center justify-between gap-3 overflow-hidden rounded-2xl border border-purple-200 bg-gradient-to-br from-white via-purple-50/40 to-purple-100/40 p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-purple-300 hover:shadow-md"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-px w-1 bg-purple-600"
            />
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 text-white shadow-sm">
                <span className="font-display text-base font-extrabold">Z</span>
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-display text-sm font-bold text-stone-900">
                    Zelle®
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-700">
                    No fees · instant
                  </span>
                </div>
                <p className="mt-0.5 truncate text-xs font-semibold text-stone-700">
                  {zelleName}
                </p>
                <p className="text-[11px] text-stone-500">
                  <span className="font-mono">{zellePhone}</span>
                  {zelleEmail ? <> · {zelleEmail}</> : null}
                </p>
              </div>
            </div></Link>

          {/* WhatsApp CTA */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            onClick={close}
            className="group relative mt-3 flex items-center justify-between gap-3 overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-white via-emerald-50/40 to-emerald-100/40 p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-px w-1 bg-emerald-600"
            />
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-sm">
                <IconWhatsApp className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-display text-sm font-bold text-stone-900">
                    WhatsApp
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
                    Verified by team
                  </span>
                </div>
                <p className="mt-0.5 text-xs font-semibold text-stone-700">
                  Open chat to donate
                </p>
                <p className="text-[11px] text-stone-500">
                  We share Zelle, bank details, and confirm your gift.
                </p>
              </div>
            </div></a>

          <button
            type="button"
            onClick={close}
            className="mt-5 text-xs font-medium text-stone-500 transition hover:text-stone-700"
          >
            Maybe later
          </button>
        </div>

        {/* Bottom gold accent strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#1e40af] via-[#f59e0b] to-[#1e40af]" />
      </div>

      <style jsx>{`
        @keyframes voiPopFadeUp {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes voiTwinkle {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(0.95);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          [class*="voiPopFadeUp"],
          [class*="voiTwinkle"] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ============== Decorative bits ============== */

function Sparkle({ small = false }: { small?: boolean }) {
  const size = small ? "h-2 w-2" : "h-3 w-3";
  return (
    <span className="relative inline-block">
      <span
        className={`block ${size} rotate-45 bg-gradient-to-br from-[#fde68a] to-[#fbbf24] shadow-[0_0_8px_rgba(245,158,11,0.7)]`}
      />
    </span>
  );
}

function DiyaInline() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden>
      <path d="M12 3c-.6.9-1.5 2-1.5 3.2 0 1.1.7 1.8 1.5 2 .8-.2 1.5-.9 1.5-2C13.5 5 12.6 3.9 12 3z" />
      <path d="M5 12h14c0 .8-.4 1.6-1.1 2-1.4 1.5-3.3 2.5-5.5 2.5s-4.1-1-5.5-2.5C5.4 13.6 5 12.8 5 12z" />
      <path d="M3 11h18v.5H3z" />
    </svg>
  );
}

function DiyaIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12" aria-hidden>
      <defs>
        <linearGradient id="flameGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fde68a" />
          <stop offset="1" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <path
        d="M32 8c-3 4-6 9-6 14 0 4 2.5 7 6 8 3.5-1 6-4 6-8 0-5-3-10-6-14z"
        fill="url(#flameGrad)"
      />
      <path
        d="M14 36h36c0 3-1.5 5.5-4 7-4.5 4-10 6-14 6s-9.5-2-14-6c-2.5-1.5-4-4-4-7z"
        fill="#1e3a8a"
      />
      <path d="M10 33h44v3H10z" fill="#1e40af" />
    </svg>
  );
}
