import Image from "next/image";

type Props = {
  images: { src: string; alt: string }[];
  /** seconds for one full loop. Smaller = faster. Default 35s. */
  speedSeconds?: number;
};

/**
 * Infinite horizontal marquee.
 * - Renders the image list twice so when the first set scrolls off-screen the
 *   second set is already visible — no flash, no gap.
 * - Pauses on hover.
 * - Honors prefers-reduced-motion (animation pauses).
 */
export function InfiniteImageMarquee({ images, speedSeconds = 35 }: Props) {
  const doubled = [...images, ...images];

  return (
    <div
      className="voi-marquee group relative overflow-hidden"
      style={{
        ["--voi-marquee-duration" as string]: `${speedSeconds}s`,
      }}
    >
      {/* Edge fade masks */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#1e3a8a] to-transparent sm:w-24"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#172554] to-transparent sm:w-24"
      />

      <div className="voi-marquee-track flex w-max gap-4 py-1">
        {doubled.map((img, i) => (
          <div
            key={`${img.src}-${i}`}
            className="relative aspect-[3/4] h-64 w-48 shrink-0 overflow-hidden rounded-xl border-2 border-[#fbbf24]/40 shadow-lg ring-1 ring-white/10 sm:h-72 sm:w-56"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width:640px) 12rem, 14rem"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a8a]/30 to-transparent opacity-60" />
          </div>
        ))}
      </div>
    </div>
  );
}
