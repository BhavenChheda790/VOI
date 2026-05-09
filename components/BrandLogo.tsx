/**
 * Voice of India brand logo — SVG fallback used when SiteConfig.logoUrl is not set.
 * Two interlocking hands inside a split blue + gold circle, with curved tagline.
 */
export function BrandLogo({
  className = "",
  showTagline = true,
}: {
  className?: string;
  showTagline?: boolean;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Voice of India — Inspire · Motivate · Support"
      role="img"
    >
      <defs>
        <path
          id="voi-tagline-arc"
          d="M 30 100 A 70 70 0 0 1 170 100"
          fill="none"
        />
      </defs>

      {/* Split ring — blue top half, gold bottom half */}
      <path
        d="M 100 18 A 82 82 0 0 1 182 100"
        stroke="#1e40af"
        strokeWidth="9"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 100 18 A 82 82 0 0 0 18 100"
        stroke="#1e40af"
        strokeWidth="9"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 18 100 A 82 82 0 0 0 100 182"
        stroke="#f59e0b"
        strokeWidth="9"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 100 182 A 82 82 0 0 0 182 100"
        stroke="#f59e0b"
        strokeWidth="9"
        fill="none"
        strokeLinecap="round"
      />

      {/* Two hands — blue (giving from above) and gold (receiving from below) */}
      {/* Blue hand — coming from upper-right, curling down */}
      <path
        d="M 145 50
           C 165 70, 165 95, 140 110
           C 125 115, 110 110, 95 100
           C 90 95, 95 88, 102 92
           L 118 100
           C 122 102, 128 100, 130 96
           L 132 88
           C 134 82, 140 80, 144 84
           L 148 88
           C 152 92, 158 90, 158 84
           C 156 76, 152 64, 148 56
           Z"
        fill="#1e40af"
      />
      {/* Finger lines on blue hand */}
      <path
        d="M 110 95 L 122 102 M 116 88 L 128 95 M 124 82 L 136 88"
        stroke="#172554"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Gold hand — coming from lower-left, curling up */}
      <path
        d="M 55 150
           C 35 130, 35 105, 60 90
           C 75 85, 90 90, 105 100
           C 110 105, 105 112, 98 108
           L 82 100
           C 78 98, 72 100, 70 104
           L 68 112
           C 66 118, 60 120, 56 116
           L 52 112
           C 48 108, 42 110, 42 116
           C 44 124, 48 136, 52 144
           Z"
        fill="#f59e0b"
      />
      {/* Finger lines on gold hand */}
      <path
        d="M 90 105 L 78 98 M 84 112 L 72 105 M 76 118 L 64 112"
        stroke="#7c2d12"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.55"
      />

      {showTagline ? (
        <text
          fill="#f59e0b"
          fontSize="13.5"
          fontWeight="700"
          letterSpacing="2.5"
          fontFamily="var(--font-sans), ui-sans-serif, system-ui, sans-serif"
        >
          <textPath href="#voi-tagline-arc" startOffset="50%" textAnchor="middle">
            INSPIRE · MOTIVATE · SUPPORT
          </textPath>
        </text>
      ) : null}
    </svg>
  );
}

/**
 * Compact mark — just the split-ring + hands, no tagline. For headers/favicons.
 */
export function BrandMark({ className = "" }: { className?: string }) {
  return <BrandLogo className={className} showTagline={false} />;
}
