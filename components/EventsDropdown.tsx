"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const items = [
  { href: "/events/upcoming", label: "Upcoming events" },
  { href: "/events/past", label: "Past events" },
];

export function EventsDropdown() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click + Escape
  useEffect(() => {
    if (!open) return;
    function onPointer(e: PointerEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="group relative inline-flex items-center gap-1 whitespace-nowrap rounded-md px-3 py-2 text-[13px] font-medium text-stone-600 transition-colors hover:text-[#1e40af] sm:text-sm"
      >
        Our Events
        <svg
          viewBox="0 0 12 8"
          className={`h-2.5 w-2.5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <path d="M1 1.5l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute left-1/2 top-full z-50 min-w-[12rem] -translate-x-1/2 pt-1"
        >
          <ul className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-lg ring-1 ring-stone-900/5">
            {items.map((it) => (
              <li key={it.href}>
                <Link
                  href={it.href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="block whitespace-nowrap px-4 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-[#fff7ed] hover:text-[#1e40af]"
                >
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
