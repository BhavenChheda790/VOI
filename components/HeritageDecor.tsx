/**
 * Heritage visuals — craft & textile cues (tuned to be clearly visible on screen).
 * Mandala, torana, paisley, peacock, diya, om — Indian ornamental vocabulary.
 */

export function HeritageWatermark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute left-1/2 top-1/2 z-0 h-[min(95vw,580px)] w-[min(95vw,580px)] -translate-x-1/2 -translate-y-1/2 text-[#1e40af] ${className}`}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="200" cy="200" r="188" stroke="currentColor" strokeWidth="2.5" opacity="0.28" />
      <circle cx="200" cy="200" r="158" stroke="currentColor" strokeWidth="1.5" opacity="0.22" strokeDasharray="10 14" />
      <circle cx="200" cy="200" r="122" stroke="#ca8a04" strokeWidth="2" opacity="0.4" />
      <circle cx="200" cy="200" r="88" stroke="currentColor" strokeWidth="1.5" opacity="0.32" />
      <circle cx="200" cy="200" r="62" stroke="#d97706" strokeWidth="1.5" opacity="0.22" strokeDasharray="8 10" />
      <circle cx="200" cy="200" r="24" fill="#d97706" fillOpacity="0.2" stroke="#1e40af" strokeWidth="2" strokeOpacity="0.45" />
    </svg>
  );
}

/**
 * Mandala — symmetric radial ornament for backgrounds or large accents.
 * Inspired by rangoli and traditional temple mandalas.
 */
export function Mandala({ className = "" }: { className?: string }) {
  const petals = Array.from({ length: 16 });
  return (
    <svg
      className={`pointer-events-none text-[#1e40af] ${className}`}
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden
    >
      <g opacity="0.9">
        <circle cx="100" cy="100" r="94" stroke="currentColor" strokeWidth="1" opacity="0.35" />
        <circle cx="100" cy="100" r="78" stroke="#ca8a04" strokeWidth="1" opacity="0.4" strokeDasharray="3 5" />
        <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
        <circle cx="100" cy="100" r="40" stroke="#d97706" strokeWidth="1" opacity="0.5" />
        <circle cx="100" cy="100" r="22" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
        <circle cx="100" cy="100" r="8" fill="#d97706" fillOpacity="0.55" />
        {petals.map((_, i) => {
          const rot = (360 / petals.length) * i;
          return (
            <g key={i} transform={`rotate(${rot} 100 100)`}>
              <path
                d="M100 14 Q108 38 100 62 Q92 38 100 14Z"
                fill="currentColor"
                fillOpacity="0.14"
                stroke="#ca8a04"
                strokeWidth="0.8"
                strokeOpacity="0.55"
              />
              <circle cx="100" cy="30" r="2.2" fill="#d97706" fillOpacity="0.65" />
            </g>
          );
        })}
        {petals.map((_, i) => {
          const rot = (360 / petals.length) * i + 360 / petals.length / 2;
          return (
            <g key={`inner-${i}`} transform={`rotate(${rot} 100 100)`}>
              <path
                d="M100 56 Q104 72 100 88 Q96 72 100 56Z"
                fill="#fde68a"
                fillOpacity="0.55"
                stroke="currentColor"
                strokeWidth="0.7"
                strokeOpacity="0.5"
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/**
 * Torana — a welcoming arch/door hanging used at entrances, weddings, festivals.
 * Place at top of sections for a "you're welcome here" feel.
 */
export function ToranaArch({ className = "" }: { className?: string }) {
  const hangs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <svg
      className={`pointer-events-none text-[#1e40af] ${className}`}
      viewBox="0 0 640 120"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M0 10 Q 320 80 640 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.55"
        fill="none"
      />
      <path
        d="M0 20 Q 320 90 640 20"
        stroke="#ca8a04"
        strokeWidth="1.2"
        strokeOpacity="0.75"
        strokeDasharray="4 6"
        fill="none"
      />
      {hangs.map((i) => {
        const x = 40 + i * 48;
        const arcY = 10 + Math.sin((i / 12) * Math.PI) * 65;
        return (
          <g key={i} transform={`translate(${x} ${arcY})`}>
            <line x1="0" y1="0" x2="0" y2="16" stroke="currentColor" strokeOpacity="0.45" strokeWidth="0.8" />
            {/* Marigold + mango leaf */}
            <path
              d="M-6 18 Q0 8 6 18 Q10 28 0 38 Q-10 28 -6 18 Z"
              fill="#166534"
              fillOpacity="0.7"
              stroke="#14532d"
              strokeWidth="0.5"
            />
            <circle cx="0" cy="22" r="4.5" fill="#d97706" fillOpacity="0.95" />
            <circle cx="0" cy="22" r="2" fill="#fde68a" />
          </g>
        );
      })}
      {/* Bells at ends */}
      <g transform="translate(6 10)">
        <circle cx="0" cy="16" r="6" fill="#d97706" fillOpacity="0.85" />
        <path d="M-4 22 L0 28 L4 22" stroke="#1e40af" strokeWidth="1" fill="none" />
      </g>
      <g transform="translate(634 10)">
        <circle cx="0" cy="16" r="6" fill="#d97706" fillOpacity="0.85" />
        <path d="M-4 22 L0 28 L4 22" stroke="#1e40af" strokeWidth="1" fill="none" />
      </g>
    </svg>
  );
}

/** Paisley (buta/boteh) — single motif, use in corners or as pattern unit. */
export function Paisley({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none text-[#1e40af] ${className}`}
      viewBox="0 0 80 100"
      fill="none"
      aria-hidden
    >
      <path
        d="M40 6 C 70 18, 78 52, 50 84 C 32 92, 14 86, 10 70 C 8 58, 18 46, 30 44 C 42 42, 52 52, 48 62 C 46 70, 38 72, 34 68"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeOpacity="0.75"
        fill="#fde68a"
        fillOpacity="0.4"
      />
      <path
        d="M40 14 C 60 26, 66 52, 48 74 C 36 80, 22 78, 20 68 C 20 60, 28 54, 34 54"
        stroke="#ca8a04"
        strokeWidth="1"
        strokeOpacity="0.8"
        fill="none"
      />
      <circle cx="40" cy="44" r="3" fill="#d97706" fillOpacity="0.85" />
      <circle cx="36" cy="60" r="1.8" fill="#ca8a04" fillOpacity="0.7" />
      <circle cx="46" cy="36" r="1.6" fill="#d97706" fillOpacity="0.65" />
    </svg>
  );
}

/** Peacock feather — emblem of Saraswati and Indian grace. */
export function PeacockFeather({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      viewBox="0 0 80 180"
      fill="none"
      aria-hidden
    >
      <path d="M40 175 L40 68" stroke="#14532d" strokeWidth="2" opacity="0.75" />
      {Array.from({ length: 14 }).map((_, i) => {
        const y = 70 + i * 7;
        return (
          <g key={i}>
            <line x1="40" y1={y} x2={28 - i * 0.4} y2={y - 4} stroke="#166534" strokeWidth="0.9" opacity="0.6" />
            <line x1="40" y1={y} x2={52 + i * 0.4} y2={y - 4} stroke="#166534" strokeWidth="0.9" opacity="0.6" />
          </g>
        );
      })}
      <ellipse cx="40" cy="40" rx="30" ry="38" fill="#166534" fillOpacity="0.2" />
      <ellipse cx="40" cy="40" rx="22" ry="30" fill="#1d4ed8" fillOpacity="0.25" />
      <ellipse cx="40" cy="42" rx="15" ry="22" fill="#ca8a04" fillOpacity="0.35" />
      <ellipse cx="40" cy="44" rx="9" ry="14" fill="#d97706" fillOpacity="0.9" />
      <ellipse cx="40" cy="46" rx="5" ry="9" fill="#1e3a8a" />
      <circle cx="40" cy="40" r="2" fill="#fde68a" />
    </svg>
  );
}

/** Diya — oil lamp, symbol of light & hope. */
export function DiyaLamp({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden
    >
      {/* Flame */}
      <path
        d="M40 6 C 44 14, 48 18, 44 26 C 42 30, 38 30, 36 26 C 32 18, 36 14, 40 6 Z"
        fill="#fcd34d"
      />
      <path
        d="M40 10 C 42 16, 45 18, 43 24 C 42 27, 38 27, 37 24 C 35 18, 38 16, 40 10 Z"
        fill="#f59e0b"
      />
      {/* Body */}
      <path
        d="M10 44 Q 40 36 70 44 L 64 60 Q 40 68 16 60 Z"
        fill="#d97706"
        stroke="#1e40af"
        strokeWidth="1.4"
      />
      <path
        d="M14 46 Q 40 42 66 46"
        stroke="#fde68a"
        strokeWidth="1.2"
        strokeOpacity="0.7"
        fill="none"
      />
      {/* Wick */}
      <rect x="38" y="36" width="4" height="6" fill="#1e3a8a" />
    </svg>
  );
}

/** Om (ॐ) — sacred syllable, used as subtle emblem. */
export function OmSymbol({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none text-[#1e40af] ${className}`}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
    >
      <text
        x="32"
        y="46"
        textAnchor="middle"
        fontSize="44"
        fontFamily="serif"
        fill="currentColor"
        fillOpacity="0.85"
        fontWeight="600"
      >
        ॐ
      </text>
    </svg>
  );
}

/** Kalash (sacred pot) — auspicious symbol at ceremonies. */
export function Kalash({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      viewBox="0 0 64 80"
      fill="none"
      aria-hidden
    >
      {/* Coconut */}
      <ellipse cx="32" cy="14" rx="7" ry="8" fill="#1e40af" />
      {/* Mango leaves */}
      <path d="M22 20 Q 18 10 14 20" stroke="#14532d" fill="#166534" fillOpacity="0.8" strokeWidth="1" />
      <path d="M42 20 Q 46 10 50 20" stroke="#14532d" fill="#166534" fillOpacity="0.8" strokeWidth="1" />
      <path d="M32 22 Q 26 8 20 18" stroke="#14532d" fill="#166534" fillOpacity="0.7" strokeWidth="1" />
      <path d="M32 22 Q 38 8 44 18" stroke="#14532d" fill="#166534" fillOpacity="0.7" strokeWidth="1" />
      {/* Pot */}
      <path
        d="M12 30 Q 32 24 52 30 L 54 36 Q 32 30 10 36 Z"
        fill="#d97706"
      />
      <path
        d="M10 36 Q 32 30 54 36 L 58 58 Q 50 72 32 72 Q 14 72 6 58 Z"
        fill="#d97706"
        stroke="#1e40af"
        strokeWidth="1.5"
      />
      <path d="M12 46 Q 32 40 52 46" stroke="#fde68a" strokeWidth="1.2" opacity="0.8" fill="none" />
      <path d="M14 54 Q 32 48 50 54" stroke="#fde68a" strokeWidth="1" opacity="0.65" fill="none" />
    </svg>
  );
}

/** Block-print border strip — recurring paisley/diamond motif. */
export function BlockPrintBorder({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative h-6 w-full ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 24'><g fill='%23c2410c' fill-opacity='0.65' stroke='%236b2737' stroke-width='0.6'><path d='M6 12 L12 4 L18 12 L12 20 Z'/><circle cx='30' cy='12' r='4'/><path d='M30 4 L34 12 L30 20 L26 12 Z' fill='none'/><path d='M42 12 L48 4 L54 12 L48 20 Z' fill='%23fde68a' fill-opacity='0.7'/></g></svg>")`,
        backgroundRepeat: "repeat-x",
        backgroundSize: "60px 24px",
      }}
      role="presentation"
    />
  );
}

/** High-contrast band — reads clearly between sections. */
export function HeritageTextileBand({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative border-y-2 border-[#d97706]/55 bg-gradient-to-r from-[#1e40af]/12 via-[#fff7ed] to-[#1e40af]/12 py-6 shadow-[inset_0_1px_0_rgba(253,230,138,0.5)] ${className}`}
      role="presentation"
    >
      <BlockPrintBorder className="absolute inset-x-0 top-0 opacity-80" />
      <BlockPrintBorder className="absolute inset-x-0 bottom-0 opacity-80" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 18px,
            rgba(30, 64, 175, 0.12) 18px,
            rgba(30, 64, 175, 0.12) 20px
          )`,
        }}
        aria-hidden
      />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <DiyaLamp className="h-8 w-8" />
          <p className="text-center font-display text-lg font-semibold tracking-wide text-[#1e3a8a] sm:text-xl">
            Heritage · Craft · Community
          </p>
          <DiyaLamp className="h-8 w-8" />
        </div>
        <svg className="h-10 w-full max-w-xl text-[#1e40af]" viewBox="0 0 400 40" fill="none" aria-hidden>
          <path d="M0 20h120M280 20H400" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
          <path
            d="M130 20l20-12 20 12-20 12-20-12z"
            stroke="#ca8a04"
            strokeWidth="2"
            fill="#fde68a"
            fillOpacity="0.45"
          />
          <path
            d="M170 20l20-12 20 12-20 12-20-12z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            opacity="0.5"
          />
          <path
            d="M210 20l20-12 20 12-20 12-20-12z"
            stroke="#ca8a04"
            strokeWidth="2"
            fill="#fde68a"
            fillOpacity="0.35"
          />
          <circle cx="200" cy="20" r="6" fill="#d97706" fillOpacity="0.55" />
        </svg>
        <p className="max-w-2xl text-center text-sm font-medium text-stone-700">
          Celebrating Indian culture in the USA — with programs for women, entrepreneurs, and students.
        </p>
      </div>
    </div>
  );
}

export function HeritageCornerFlourish({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none text-[#d97706] opacity-60 ${className}`}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
    >
      <path
        d="M8 56V20c0-6.6 5.4-12 12-12h24c6.6 0 12 5.4 12 12v36"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path d="M12 44c8-6 16-6 24 0" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
      <path d="M20 36 Q32 28 44 36" stroke="currentColor" strokeWidth="0.8" opacity="0.55" />
      <circle cx="32" cy="20" r="3" fill="currentColor" fillOpacity="0.35" />
      <path d="M32 12 L36 20 L32 28 L28 20 Z" fill="#d97706" fillOpacity="0.45" />
    </svg>
  );
}
