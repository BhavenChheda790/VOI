"use client";

import { useEffect, useState } from "react";

type Props = {
  words: string[];
  /** how long each word stays visible (ms) */
  intervalMs?: number;
  className?: string;
};

/**
 * Cycles through a list of words with a fade + slide-up entrance per word.
 * Honors prefers-reduced-motion: stays on the first word.
 */
export function RotatingWord({ words, intervalMs = 2200, className = "" }: Props) {
  const [i, setI] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const onChange = () => setReduced(m.matches);
    m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setI((v) => (v + 1) % words.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [reduced, words.length, intervalMs]);

  // Compute the widest word so the surrounding layout doesn't shift while words
  // rotate. We render an invisible sizer with the longest word.
  const widest = words.reduce((a, b) => (a.length >= b.length ? a : b), "");

  return (
    <span className={`relative inline-block align-baseline ${className}`}>
      {/* invisible width sizer */}
      <span className="invisible whitespace-nowrap" aria-hidden>
        {widest}
      </span>
      {/* visible rotating word */}
      <span
        key={i}
        className="voi-rotating-word absolute inset-0 whitespace-nowrap"
        aria-live="polite"
      >
        {words[i]}
      </span>
    </span>
  );
}
