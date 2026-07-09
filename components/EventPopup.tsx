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
        className="absolute inset-0 cursor-default bg-stone-950/70 backdrop-blur-md transition"
      />

      {/* Modal */}
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-stone-900/10 animate-[voiPopFadeUp_0.5s_cubic-bezier(0.22,1,0.36,1)] max-h-[92vh] flex flex-col">
        {/* Close button (floats over image) */}
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 rounded-full bg-white/20 p-1.5 text-white shadow-lg backdrop-blur transition hover:bg-white/30"
        >
          <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor" aria-hidden>
            <path d="M5.3 5.3a1 1 0 0 1 1.4 0L10 8.6l3.3-3.3a1 1 0 1 1 1.4 1.4L11.4 10l3.3 3.3a1 1 0 0 1-1.4 1.4L10 11.4l-3.3 3.3a1 1 0 0 1-1.4-1.4L8.6 10 5.3 6.7a1 1 0 0 1 0-1.4z" />
          </svg>
        </button>

        <div className="overflow-y-auto">
          {/* ============== FLYER IMAGE (if provided) ============== */}
          {imageUrl ? (
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={title}
                className="block h-auto max-h-[45vh] w-full object-contain bg-stone-900"
              />
              {/* Bottom gradient into title area */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
            </div>
          ) : (
            /* No image — original navy hero as fallback */
            <div className="relative overflow-hidden bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#172554] px-7 pb-12 pt-9 text-center text-white">
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
                Event
                <span>★</span>
              </p>
              <h2 className="relative mt-4 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                {title}
              </h2>
              <p className="relative mx-auto mt-3 whitespace-pre-line text-sm leading-relaxed text-stone-200">
                {message}
              </p>
            </div>
          )}

          {/* ============== BODY ============== */}
          <div className="px-6 pb-6 pt-4 text-center">
            {/* Title + message (only when we have an image, otherwise they're in the hero) */}
            {imageUrl ? (
              <>
                <p className="inline-flex items-center gap-1.5 rounded-full border border-[#1e40af]/15 bg-[#1e40af]/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#1e40af]">
                  Upcoming event
                </p>
                <h2 className="mt-3 font-display text-2xl font-extrabold leading-tight text-stone-900 sm:text-3xl">
                  {title}
                </h2>
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-stone-600">
                  {message}
                </p>
              </>
            ) : null}

            {hasCta ? (
              <>
                {/* Primary CTA — event ticket link */}
                <a
                  href={ctaUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={close}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-[#f59e0b] via-[#d97706] to-[#b45309] px-5 py-4 text-base font-extrabold uppercase tracking-wider text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  🎟️ {ctaLabel}
                </a>
                <p className="mt-3 text-[11px] text-stone-500">
                  Opens the official ticket page in a new tab.
                </p>
              </>
            ) : (
              <>
                {/* No CTA — fall back to donate options */}
                <div className="my-5 flex items-center justify-center gap-3">
                  <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#d97706]/60" />
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.32em] text-[#d97706]">
                    Donate Here
                  </span>
                  <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#d97706]/60" />
                </div>

                {/* Zelle CTA */}
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

                {/* WhatsApp CTA */}
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
                        Chat with our team for tickets or to donate.
                      </p>
                    </div>
                  </div>
                  <span aria-hidden className="text-lg text-emerald-700">→</span>
                </a>
              </>
            )}

            <button
              type="button"
              onClick={close}
              className="mt-4 text-xs font-medium text-stone-500 transition hover:text-stone-700"
            >
              Maybe later
            </button>
          </div>
        </div>

        {/* Bottom accent strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#1e40af] via-[#f59e0b] to-[#1e40af]" />

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
        `}</style>
      </div>
    </div>
  );
}
