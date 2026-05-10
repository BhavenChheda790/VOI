"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IconArrowRight, IconLotus, IconWhatsApp } from "@/components/Icons";

const SESSION_KEY = "voi_event_popup_dismissed_v1";

type Props = {
  title: string;
  message: string;
  zelleName: string;
  zellePhone: string;
  zelleEmail: string;
  whatsappHref: string;
};

export function EventPopup({
  title,
  message,
  zelleName,
  zellePhone,
  zelleEmail,
  whatsappHref,
}: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(SESSION_KEY) === "1") return;
    const t = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(t);
  }, []);

  function close() {
    setOpen(false);
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // ignore (private mode etc)
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
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close"
        onClick={close}
        className="absolute inset-0 cursor-default bg-stone-950/55 backdrop-blur-sm transition"
      />

      {/* Modal */}
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-stone-200 animate-[fadeUp_0.4s_ease-out]">
        {/* Top accent strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#1e40af] via-[#f59e0b] to-[#1e40af]" />

        {/* Close button */}
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-4 rounded-full p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700"
        >
          <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor" aria-hidden>
            <path d="M5.3 5.3a1 1 0 0 1 1.4 0L10 8.6l3.3-3.3a1 1 0 1 1 1.4 1.4L11.4 10l3.3 3.3a1 1 0 0 1-1.4 1.4L10 11.4l-3.3 3.3a1 1 0 0 1-1.4-1.4L8.6 10 5.3 6.7a1 1 0 0 1 0-1.4z" />
          </svg>
        </button>

        {/* Body */}
        <div className="px-7 pb-7 pt-9 text-center">
          <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#fbbf24] via-[#d97706] to-[#b45309] shadow-md ring-4 ring-amber-100">
            <IconLotus className="h-7 w-7 text-white" />
          </div>

          <h2 className="mt-5 font-display text-2xl font-bold leading-tight text-[#1e3a8a] sm:text-3xl">
            {title}
          </h2>

          {message ? (
            <p className="mt-3 whitespace-pre-line text-stone-600">{message}</p>
          ) : null}

          {/* Donate divider */}
          <div className="my-7 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#d97706]/60" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d97706]">
              Donate Here
            </span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#d97706]/60" />
          </div>

          {/* Zelle */}
          <Link
            href="/donate"
            onClick={close}
            className="group flex items-center justify-between gap-3 rounded-xl border border-purple-200 bg-purple-50/60 p-4 text-left transition hover:border-purple-300 hover:bg-purple-50"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-purple-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  Zelle®
                </span>
                <span className="text-xs text-purple-700">No fees · instant</span>
              </div>
              <p className="mt-1.5 truncate font-display text-sm font-bold text-stone-900">
                {zelleName}
              </p>
              <p className="text-xs text-stone-600">
                at <span className="font-mono">{zellePhone}</span>
                {zelleEmail ? <> · {zelleEmail}</> : null}
              </p>
            </div>
            <IconArrowRight className="h-5 w-5 shrink-0 text-purple-700 transition group-hover:translate-x-0.5" />
          </Link>

          {/* WhatsApp */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            onClick={close}
            className="group mt-3 flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 text-left transition hover:border-emerald-300 hover:bg-emerald-50"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  <IconWhatsApp className="h-3 w-3" />
                  WhatsApp
                </span>
                <span className="text-xs text-emerald-700">Verified by team</span>
              </div>
              <p className="mt-1.5 font-display text-sm font-bold text-stone-900">
                Donate via WhatsApp chat
              </p>
              <p className="text-xs text-stone-600">
                We share Zelle, bank, and confirm your gift.
              </p>
            </div>
            <IconArrowRight className="h-5 w-5 shrink-0 text-emerald-700 transition group-hover:translate-x-0.5" />
          </a>

          <button
            type="button"
            onClick={close}
            className="mt-6 text-sm text-stone-500 transition hover:text-stone-700"
          >
            Maybe later
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
