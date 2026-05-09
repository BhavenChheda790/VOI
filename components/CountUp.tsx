"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** Final value, e.g. "1,200+", "50+", "100%", "300" */
  value: string;
  /** Animation duration in ms */
  duration?: number;
  className?: string;
};

/**
 * Counts up from 0 to the numeric portion of `value` when the element
 * scrolls into view. Preserves any non-numeric prefix/suffix
 * (e.g. "+", "%", "$") and re-applies thousand-separator commas.
 */
export function CountUp({ value, duration = 1600, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);
  const [display, setDisplay] = useState(() => formatInitial(value));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const parsed = parseValue(value);
    if (parsed.target === null) {
      // Nothing numeric — just show the raw value.
      setDisplay(value);
      return;
    }

    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    const start = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      const t0 = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - t0) / duration);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        const n = Math.round(parsed.target! * eased);
        setDisplay(`${parsed.prefix}${formatNumber(n, parsed.useCommas)}${parsed.suffix}`);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            start();
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.3 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

function parseValue(value: string): {
  target: number | null;
  prefix: string;
  suffix: string;
  useCommas: boolean;
} {
  const m = value.match(/^([^\d-]*)(-?[\d,]+)([^\d]*)$/);
  if (!m) return { target: null, prefix: "", suffix: "", useCommas: false };
  const [, prefix, digits, suffix] = m;
  const useCommas = digits.includes(",");
  const n = Number(digits.replace(/,/g, ""));
  if (Number.isNaN(n)) return { target: null, prefix: "", suffix: "", useCommas: false };
  return { target: n, prefix, suffix, useCommas };
}

function formatInitial(value: string): string {
  const parsed = parseValue(value);
  if (parsed.target === null) return value;
  return `${parsed.prefix}0${parsed.suffix}`;
}

function formatNumber(n: number, withCommas: boolean): string {
  if (!withCommas) return String(n);
  return n.toLocaleString("en-US");
}
