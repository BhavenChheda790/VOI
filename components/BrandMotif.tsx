/** Subtle decorative marks — minimal geometry for a modern NGO site. */

export function HeroOrnament({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M60 4c-4 0-8 4-8 8s4 8 8 8 8-4 8-8-4-8-8-8z"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.65"
      />
      <path d="M12 12h96" stroke="currentColor" strokeWidth="1.25" opacity="0.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3.5" fill="currentColor" opacity="0.45" />
      <circle cx="108" cy="12" r="3.5" fill="currentColor" opacity="0.45" />
    </svg>
  );
}

export function SectionDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-5 ${className}`} role="presentation">
      <span className="h-[3px] w-16 rounded-full bg-gradient-to-r from-transparent via-[#ca8a04] to-[#1e40af]/70 sm:w-36" />
      <span
        className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#d97706]/70 bg-gradient-to-br from-[#fde68a] to-[#f59e0b] text-[#1e3a8a] shadow-lg ring-4 ring-[#fff7ed]"
        aria-hidden
      >
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v5M12 17v5M2 12h5M17 12h5" strokeLinecap="round" />
          <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.15" />
        </svg>
      </span>
      <span className="h-[3px] w-16 rounded-full bg-gradient-to-l from-transparent via-[#ca8a04] to-[#1e40af]/70 sm:w-36" />
    </div>
  );
}

export function MeshBlob({
  className = "",
  color = "from-[#f59e0b]/20 to-[#1e40af]/10",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full bg-gradient-to-br blur-3xl ${color} ${className}`}
      aria-hidden
    />
  );
}
