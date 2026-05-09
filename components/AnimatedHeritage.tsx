import type { CSSProperties } from "react";
import { DiyaLamp, Mandala, Paisley, PeacockFeather } from "@/components/HeritageDecor";

/**
 * Dramatic, animated heritage backdrop.
 * Place inside a `relative overflow-hidden` parent — it fills the parent absolutely.
 * All elements are pointer-events-none + aria-hidden.
 * Respects prefers-reduced-motion (handled in globals.css).
 */
export function AnimatedHeritageBackdrop({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {/* Aurora gradient — color-shifting mesh behind everything */}
      <div className="voi-aurora absolute -inset-24 opacity-70" />

      {/* Sweeping light rays from center */}
      <SunburstRays className="voi-ray-sweep absolute left-1/2 top-1/2 h-[180%] w-[180%] opacity-40" />

      {/* Self-drawing rangoli pattern — center */}
      <RangoliDraw className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 text-[#d97706] opacity-70" />

      {/* Color-pulsing halo mandalas */}
      <div className="voi-halo-pulse absolute -left-24 top-10 h-[28rem] w-[28rem] opacity-60">
        <Mandala className="h-full w-full text-[#1e40af]" />
      </div>
      <div
        className="voi-halo-pulse absolute -right-28 bottom-6 h-[30rem] w-[30rem] opacity-60"
        style={{ animationDelay: "2.5s" }}
      >
        <Mandala className="h-full w-full text-[#d97706]" />
      </div>
      <div
        className="voi-spin-slow absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 opacity-20"
      >
        <Mandala className="h-full w-full text-[#ca8a04]" />
      </div>

      {/* Glowing central ember — pulsing diya halo */}
      <span className="voi-glow-pulse absolute left-1/2 top-1/2 block h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fde68a]" />

      {/* Sparkle bursts — 8-pointed stars twinkling */}
      <SparkleBurst className="left-[10%] top-[22%] h-10 w-10" color="#fde68a" />
      <SparkleBurst className="left-[28%] top-[74%] h-7 w-7" color="#fbbf24" delay="0.8s" />
      <SparkleBurst className="right-[14%] top-[18%] h-8 w-8" color="#d97706" delay="1.6s" />
      <SparkleBurst className="right-[8%] top-[62%] h-10 w-10" color="#fde68a" delay="2.2s" />
      <SparkleBurst className="left-[42%] top-[12%] h-6 w-6" color="#ca8a04" delay="0.4s" />
      <SparkleBurst className="left-[68%] top-[82%] h-8 w-8" color="#f59e0b" delay="1.2s" />
      <SparkleBurst className="left-[6%] top-[56%] h-6 w-6" color="#166534" delay="2.8s" />

      {/* Twinkling diyas — scattered lights */}
      <AnimatedWrap className="left-[8%] top-[40%] h-12 w-12 voi-twinkle">
        <DiyaLamp className="h-full w-full" />
      </AnimatedWrap>
      <AnimatedWrap className="right-[10%] top-[30%] h-12 w-12 voi-twinkle" delay="1.4s">
        <DiyaLamp className="h-full w-full" />
      </AnimatedWrap>
      <AnimatedWrap className="left-[34%] top-[84%] h-10 w-10 voi-twinkle" delay="2.4s">
        <DiyaLamp className="h-full w-full" />
      </AnimatedWrap>

      {/* Swaying paisleys */}
      <AnimatedWrap className="left-[3%] top-[8%] h-24 w-20 voi-drift-side opacity-80">
        <Paisley className="h-full w-full" />
      </AnimatedWrap>
      <AnimatedWrap
        className="right-[3%] top-[78%] h-28 w-24 voi-drift-side opacity-80"
        delay="1.4s"
      >
        <Paisley className="h-full w-full -scale-x-100" />
      </AnimatedWrap>

      {/* Peacock feathers — sway on edges */}
      <AnimatedWrap className="-left-6 bottom-0 hidden h-72 w-28 voi-drift-side opacity-75 lg:block">
        <PeacockFeather className="h-full w-full" />
      </AnimatedWrap>
      <AnimatedWrap
        className="-right-6 top-2 hidden h-56 w-24 voi-drift-side opacity-65 lg:block"
        delay="2s"
      >
        <PeacockFeather className="h-full w-full -scale-x-100" />
      </AnimatedWrap>

      {/* BIG marigold petals rising — dramatic */}
      <BigPetal className="left-[6%] bottom-0 h-12 w-12" color="#d97706" />
      <BigPetal className="left-[18%] bottom-0 h-10 w-10" color="#d97706" delay="2.5s" />
      <BigPetal className="left-[32%] bottom-0 h-14 w-14" color="#f59e0b" delay="5s" />
      <BigPetal className="left-[46%] bottom-0 h-11 w-11" color="#ca8a04" delay="1s" />
      <BigPetal className="left-[58%] bottom-0 h-12 w-12" color="#d97706" delay="3.5s" />
      <BigPetal className="left-[72%] bottom-0 h-10 w-10" color="#d97706" delay="6s" />
      <BigPetal className="left-[86%] bottom-0 h-12 w-12" color="#f59e0b" delay="2s" />
      <BigPetal className="left-[94%] bottom-0 h-10 w-10" color="#ca8a04" delay="4.5s" />

      {/* Glowing ember dots */}
      <Ember className="left-[20%] top-[30%]" size="h-3 w-3" />
      <Ember className="left-[58%] top-[22%]" size="h-2.5 w-2.5" delay="1.5s" />
      <Ember className="right-[24%] top-[50%]" size="h-3.5 w-3.5" delay="2.8s" />
      <Ember className="left-[40%] top-[70%]" size="h-3 w-3" delay="0.8s" />
      <Ember className="right-[38%] top-[80%]" size="h-2.5 w-2.5" delay="2.2s" />
    </div>
  );
}

function AnimatedWrap({
  className = "",
  delay,
  children,
}: {
  className?: string;
  delay?: string;
  children: React.ReactNode;
}) {
  const style: CSSProperties | undefined = delay ? { animationDelay: delay } : undefined;
  return (
    <div className={`absolute ${className}`} style={style} aria-hidden>
      {children}
    </div>
  );
}

function BigPetal({
  className = "",
  color,
  delay,
}: {
  className?: string;
  color: string;
  delay?: string;
}) {
  const style: CSSProperties | undefined = delay ? { animationDelay: delay } : undefined;
  return (
    <svg
      className={`voi-big-petal absolute ${className}`}
      style={style}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
    >
      <defs>
        <radialGradient id={`pg-${color.replace("#", "")}`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fde68a" stopOpacity="0.95" />
          <stop offset="60%" stopColor={color} stopOpacity="0.9" />
          <stop offset="100%" stopColor={color} stopOpacity="0.5" />
        </radialGradient>
      </defs>
      <path
        d="M16 2 C 22 8, 26 16, 16 30 C 6 16, 10 8, 16 2 Z"
        fill={`url(#pg-${color.replace("#", "")})`}
        stroke={color}
        strokeWidth="0.6"
        strokeOpacity="0.7"
      />
      <path
        d="M16 8 C 18 12, 20 18, 16 24 C 12 18, 14 12, 16 8 Z"
        fill="#fde68a"
        fillOpacity="0.8"
      />
      <circle cx="16" cy="16" r="1.4" fill="#fef3c7" />
    </svg>
  );
}

function SparkleBurst({
  className = "",
  color,
  delay = "0s",
}: {
  className?: string;
  color: string;
  delay?: string;
}) {
  return (
    <svg
      className={`voi-sparkle absolute ${className}`}
      style={{ animationDelay: delay }}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M12 1 L13 10 L22 12 L13 14 L12 23 L11 14 L2 12 L11 10 Z"
        fill={color}
        fillOpacity="0.9"
      />
      <path
        d="M12 6 L13 11 L18 12 L13 13 L12 18 L11 13 L6 12 L11 11 Z"
        fill="#fde68a"
      />
    </svg>
  );
}

function Ember({
  className = "",
  size = "h-2.5 w-2.5",
  delay = "0s",
}: {
  className?: string;
  size?: string;
  delay?: string;
}) {
  return (
    <span
      className={`voi-ember absolute block rounded-full bg-[#fde68a] shadow-[0_0_20px_6px_rgba(253,230,138,0.65)] ${size} ${className}`}
      style={{ animationDelay: delay }}
      aria-hidden
    />
  );
}

function SunburstRays({ className = "" }: { className?: string }) {
  const rays = Array.from({ length: 24 });
  return (
    <svg
      className={`-translate-x-1/2 -translate-y-1/2 ${className}`}
      viewBox="-100 -100 200 200"
      fill="none"
      aria-hidden
    >
      <defs>
        <radialGradient id="voi-ray-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d97706" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
        </radialGradient>
      </defs>
      {rays.map((_, i) => {
        const rot = (360 / rays.length) * i;
        return (
          <path
            key={i}
            transform={`rotate(${rot})`}
            d="M-2 0 L0 -95 L2 0 Z"
            fill="url(#voi-ray-grad)"
          />
        );
      })}
    </svg>
  );
}

function RangoliDraw({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`voi-rangoli-draw ${className}`}
      viewBox="0 0 400 400"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path
        d="M200 60
           C 260 80, 320 140, 340 200
           C 320 260, 260 320, 200 340
           C 140 320, 80 260, 60 200
           C 80 140, 140 80, 200 60 Z"
      />
      <path
        d="M200 100
           Q 280 120, 300 200
           Q 280 280, 200 300
           Q 120 280, 100 200
           Q 120 120, 200 100 Z"
      />
      <path
        d="M200 140
           L 240 180 L 260 200 L 240 220 L 200 260
           L 160 220 L 140 200 L 160 180 L 200 140 Z"
      />
      <circle cx="200" cy="200" r="30" />
      <circle cx="200" cy="200" r="14" />
      <path
        d="M200 40 L200 80 M200 320 L200 360 M40 200 L80 200 M320 200 L360 200
           M88 88 L116 116 M284 284 L312 312 M88 312 L116 284 M284 116 L312 88"
        strokeWidth="2.2"
      />
      <circle cx="200" cy="50" r="6" fill="currentColor" />
      <circle cx="200" cy="350" r="6" fill="currentColor" />
      <circle cx="50" cy="200" r="6" fill="currentColor" />
      <circle cx="350" cy="200" r="6" fill="currentColor" />
    </svg>
  );
}
