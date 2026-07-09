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
  imageUrl?: string | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
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
  imageUrl,
  ctaLabel,
  ctaUrl,
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
      /* ignore */
    }
  }

  if (!open) return null;

  const hasCta = ctaLabel && ctaUrl;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[100] flex items-end justify-center px-4 py-6 sm:items-center"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close"
        onClick={close}
        className="absolute inset-0 cursor-default bg-stone-950/75 backdrop-blur-md transition"
      />

      {/* Modal */}
      <div className="voi-popup-shell relative flex w-full max-w-md max-h-[92vh] flex-col overflow-hidden rounded-3xl bg-stone-950 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] ring-1 ring-[#fbbf24]/30 animate-[voiPopFadeUp_0.5s_cubic-bezier(0.22,1,0.36,1)]">
        {/* Gold gradient border glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(251,191,36,0.5), transparent 40%, transparent 60%, rgba(251,191,36,0.4)) border-box",
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "1px",
          }}
        />

        {/* Close button */}
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 rounded-full bg-black/40 p-2 text-white shadow-lg ring-1 ring-white/20 backdrop-blur transition hover:bg-black/60 hover:ring-white/40"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden>
            <path d="M5.3 5.3a1 1 0 0 1 1.4 0L10 8.6l3.3-3.3a1 1 0 1 1 1.4 1.4L11.4 10l3.3 3.3a1 1 0 0 1-1.4 1.4L10 11.4l-3.3 3.3a1 1 0 0 1-1.4-1.4L8.6 10 5.3 6.7a1 1 0 0 1 0-1.4z" />
          </svg>
        </button>

        <div className="relative overflow-y-auto">
          {hasCta && imageUrl ? (
            /* ===================== EVENT PROMO MODE ===================== */
            <>
              {/* Flyer image with dark bottom fade */}
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt={title}
                  className="block h-auto max-h-[55vh] w-full object-contain bg-stone-950"
                />
                {/* Bottom fade into dark body */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent"
                />
              </div>

              {/* Dark elegant body */}
              <div className="relative bg-stone-950 px-6 pb-7 pt-3 text-center text-white">
                {/* subtle gold particles */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -left-6 top-6 h-24 w-24 rounded-full bg-[#f59e0b]/20 blur-3xl"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-6 bottom-16 h-32 w-32 rounded-full bg-[#fbbf24]/10 blur-3xl"
                />

                {/* Upcoming pill */}
                <div className="relative inline-flex items-center gap-2 rounded-full border border-[#fbbf24]/40 bg-[#fbbf24]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-[#fbbf24] shadow-inner">
                  <span className="voi-pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-[#fbbf24]" />
                  Upcoming event
                </div>

                {/* Title */}
                <h2 className="relative mt-3 font-display text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                  {title}
                </h2>

                {/* Message with divider */}
                {message ? (
                  <>
                    <div className="relative my-3 flex items-center justify-center gap-3">
                      <span className="h-px w-8 bg-[#fbbf24]/40" />
                      <span aria-hidden className="rotate-45 text-xs text-[#fbbf24]">◆</span>
                      <span className="h-px w-8 bg-[#fbbf24]/40" />
                    </div>
                    <p className="relative mx-auto whitespace-pre-line text-sm leading-relaxed text-stone-300">
                      {message}
                    </p>
                  </>
                ) : null}

                {/* Primary CTA — shimmering gold button */}
                <a
                  href={ctaUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={close}
                  className="voi-book-btn group relative mt-6 flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl px-5 py-4 text-base font-extrabold uppercase tracking-widest text-stone-950 shadow-[0_10px_35px_-10px_rgba(245,158,11,0.8)] transition hover:-translate-y-0.5"
                  style={{
                    background:
                      "linear-gradient(135deg, #fde68a 0%, #fbbf24 25%, #f59e0b 50%, #d97706 75%, #fbbf24 100%)",
                    backgroundSize: "200% 200%",
                  }}
                >
                  {/* Shimmer sweep */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent group-hover:translate-x-full"
                    style={{ transition: "transform 1s ease-out" }}
                  />
                  <span className="relative text-xl leading-none">🎟️</span>
                  <span className="relative">{ctaLabel}</span>
                  <span className="relative text-xl leading-none">→</span>
                </a>

                {/* Reassurance line */}
                <p className="relative mt-4 flex items-center justify-center gap-1.5 text-[11px] text-stone-400">
                  <svg viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor" aria-hidden>
                    <path d="M10 2a4 4 0 0 0-4 4v2H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-1V6a4 4 0 0 0-4-4zm-2 6V6a2 2 0 1 1 4 0v2H8z" />
                  </svg>
                  Secure checkout on the official ticket page
                </p>

                {/* Maybe later */}
                <button
                  type="button"
                  onClick={close}
                  className="relative mt-3 text-xs font-medium text-stone-500 transition hover:text-stone-300"
                >
                  Maybe later
                </button>
              </div>

              {/* Bottom accent strip */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#1e40af] via-[#f59e0b] to-[#1e40af]" />
            </>
          ) : (
            /* ===================== POST-EVENT THANK-YOU MODE ===================== */
            <>
              <div className="relative overflow-hidden bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#172554] px-7 pb-16 pt-9 text-center text-white">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-[#f59e0b]/30 blur-3xl"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-10 top-10 h-32 w-32 rounded-full bg-[#fbbf24]/25 blur-3xl"
                />
                <p className="relative inline-flex items-center gap-1.5 rounded-full border border-[#fbbf24]/40 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#fbbf24] backdrop-blur">
                  <span>★</span>
                  With gratitude
                  <span>★</span>
                </p>
                <h2 className="relative mt-4 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                  {title}
                </h2>
                <p className="relative mx-auto mt-3 whitespace-pre-line text-sm leading-relaxed text-stone-200">
                  {message}
                </p>
              </div>

              {/* Logo medallion (overlapping) */}
              <div className="relative -mt-12 flex justify-center">
                <div className="relative">
                  <span
                    aria-hidden
                    className="absolute inset-0 -m-2 rounded-full bg-[#f59e0b]/30 blur-xl"
                  />
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white p-2 shadow-lg ring-4 ring-white">
                    <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#fff7ed] via-white to-[#fffbeb]">
                      {logoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={logoUrl}
                          alt={`${orgName} logo`}
                          className="h-full w-full object-contain"
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white px-7 pb-7 pt-4 text-center">
                <div className="mb-5 flex items-center justify-center gap-3">
                  <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#d97706]/60" />
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.32em] text-[#d97706]">
                    Donate Here
                  </span>
                  <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#d97706]/60" />
                </div>

                <Link
                  href="/donate"
                  onClick={close}
                  className="group relative flex items-center justify-between gap-3 overflow-hidden rounded-2xl border border-purple-200 bg-gradient-to-br from-white via-purple-50/40 to-purple-100/40 p-3.5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-purple-300 hover:shadow-md"
                >
                  <span aria-hidden className="pointer-events-none absolute inset-y-0 -left-px w-1 bg-purple-600" />
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 text-white shadow-sm">
                      <span className="font-display text-sm font-extrabold">Z</span>
                    </span>
                    <div className="min-w-0">
                      <p className="font-display text-xs font-bold text-stone-900">
                        Zelle® · No fees
                      </p>
                      <p className="mt-0.5 truncate text-[11px] font-semibold text-stone-700">
                        {zelleName}
                      </p>
                      <p className="text-[10px] text-stone-500">
                        <span className="font-mono">{zellePhone}</span>
                        {zelleEmail ? <> · {zelleEmail}</> : null}
                      </p>
                    </div>
                  </div>
                  <span aria-hidden className="text-lg text-purple-700">→</span>
                </Link>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={close}
                  className="group relative mt-2.5 flex items-center justify-between gap-3 overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-white via-emerald-50/40 to-emerald-100/40 p-3.5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
                >
                  <span aria-hidden className="pointer-events-none absolute inset-y-0 -left-px w-1 bg-emerald-600" />
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-sm">
                      <IconWhatsApp className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-display text-xs font-bold text-stone-900">
                        WhatsApp · Verified
                      </p>
                      <p className="mt-0.5 text-[11px] text-stone-600">
                        Chat with our team.
                      </p>
                    </div>
                  </div>
                  <span aria-hidden className="text-lg text-emerald-700">→</span>
                </a>

                <button
                  type="button"
                  onClick={close}
                  className="mt-4 text-xs font-medium text-stone-500 transition hover:text-stone-700"
                >
                  Maybe later
                </button>
              </div>

              <div className="h-1.5 w-full bg-gradient-to-r from-[#1e40af] via-[#f59e0b] to-[#1e40af]" />
            </>
          )}
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
          @keyframes voi-pulse-dot {
            0%,
            100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.4;
              transform: scale(1.4);
            }
          }
          .voi-pulse-dot {
            animation: voi-pulse-dot 1.6s ease-in-out infinite;
          }
          @keyframes voi-book-glow {
            0%,
            100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
          .voi-book-btn {
            animation: voi-book-glow 4s ease-in-out infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .voi-book-btn,
            .voi-pulse-dot {
              animation: none !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
