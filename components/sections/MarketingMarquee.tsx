import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

/**
 * MarketingMarquee · sections/MarketingMarquee.tsx · v3 · 2026-09-23
 *
 * Infinite-scroll band of mono-uppercase attestation phrases. Reads as
 * "here are the properties Nebbos actually enforces" without any being
 * long enough to read as a sales pitch.
 *
 * v3: no frame. The phrases float on the ground, dissolve in and out
 * through a wide edge fade, and are separated by faint hairlines instead
 * of per-item dots. The band never pauses; hover only lifts the phrase
 * under the pointer. Phrases are rendered 3×; the track travels one copy (-33.33%)
 * per loop so the seam never shows. The only marquee on the page.
 */

const PHRASES = [
  { text: "Hardware-attested", accent: true },
  { text: "FIPS 140-3 Level 3" },
  { text: "Portable memory" },
  { text: "Never trained on" },
  { text: "Hash-chained audit" },
  { text: "Biometric approval", accent: true },
  { text: "On-device keypad" },
  { text: "Tamper-evident" },
  { text: "Air-gap capable" },
  { text: "TAA-compliant", accent: true },
  { text: "MIL-STD-810G" },
  { text: "Shell-isolated" },
];

export function MarketingMarquee() {
  const orbit = [...PHRASES, ...PHRASES, ...PHRASES];
  return (
    <aside className="mkt relative py-10" aria-label="Nebbos properties">
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_18%,#000_82%,transparent)]">
        <div
          className="animate-marquee flex w-max items-center"
          style={{ "--marquee-duration": "60s", "--marquee-shift": "-33.3333%" } as CSSProperties}
        >
          {orbit.map((p, i) => (
            <span key={i} className="flex shrink-0 items-center">
              <span className="h-3 w-px bg-white/10" aria-hidden />
              <span
                className={cn(
                  "px-8 font-code text-[12px] font-medium uppercase tracking-[0.16em] transition-colors duration-300",
                  p.accent ? "text-accent hover:text-[#ff8a4a]" : "text-ink-3 hover:text-ink",
                )}
              >
                {p.text}
              </span>
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
