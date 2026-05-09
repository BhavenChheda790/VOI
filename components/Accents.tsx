/**
 * Restrained brand accents — small, tasteful Indian-cultural cues
 * combined with the blue + gold palette. Use sparingly.
 */

/** Gold horizontal divider with a small center dot — adds visual rhythm between sections. */
export function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} role="presentation">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#d97706]/60 sm:w-24" />
      <span className="block h-2 w-2 rotate-45 bg-[#d97706]" aria-hidden />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#d97706]/60 sm:w-24" />
    </div>
  );
}

/** Tiny lotus dot — a single subtle motif (used as bullet or label icon). */
export function LotusDot({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 4 C 14 8, 14 12, 12 14 C 10 12, 10 8, 12 4 Z"
        fill="#1e40af"
      />
      <path
        d="M5 10 C 9 11, 11 13, 12 14 C 10 14, 7 13, 5 10 Z"
        fill="#f59e0b"
      />
      <path
        d="M19 10 C 15 11, 13 13, 12 14 C 14 14, 17 13, 19 10 Z"
        fill="#f59e0b"
      />
      <circle cx="12" cy="14" r="1.5" fill="#d97706" />
    </svg>
  );
}

/** Small geometric corner motif — single subtle ornament for cards/sections. */
export function CornerMotif({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 60" fill="none" aria-hidden>
      <path
        d="M0 30 Q 30 30 30 0"
        stroke="#1e40af"
        strokeOpacity="0.25"
        strokeWidth="1.4"
        fill="none"
      />
      <path
        d="M0 22 Q 22 22 22 0"
        stroke="#d97706"
        strokeOpacity="0.4"
        strokeWidth="1.2"
        fill="none"
      />
      <circle cx="22" cy="22" r="2" fill="#f59e0b" />
    </svg>
  );
}
