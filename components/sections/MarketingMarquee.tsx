/**
 * MarketingMarquee · sections/MarketingMarquee.tsx · v1 · 2026-09-18
 *
 * Infinite-scroll band of mono-uppercase attestation phrases. Award-tier
 * design signature — Linear, Vercel, Runlayer all use this shape. Reads
 * as "here are the properties Nebbos actually enforces" without any
 * being long enough to read as a sales pitch.
 *
 * Phrases are rendered 3× so the loop translates -33.33% and appears
 * seamless. Mask fades the edges so the loop doesn't reveal its seam.
 * One phrase per orbit is `--accent` so a warm orange dot pulses past
 * every ~6 phrases.
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
    <aside className="mkt mkt-marquee" aria-label="Nebbos properties">
      <div className="mkt-marquee__track">
        {orbit.map((p, i) => (
          <span
            key={i}
            className={`mkt-marquee__item ${p.accent ? "mkt-marquee__item--accent" : ""}`}
          >
            <span className="mkt-marquee__dot" aria-hidden />
            {p.text}
          </span>
        ))}
      </div>
    </aside>
  );
}
