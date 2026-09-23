import Link from "next/link";
import metrics from "@/content/platform-metrics.json";
import { NumberCounter } from "@/components/patterns/NumberCounter";
import { RevealWords } from "@/components/motion/RevealWords";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Eyebrow, Section, deck, headline } from "@/components/marketing/primitives";
import { cn } from "@/lib/cn";

/**
 * MarketingProof · sections/MarketingProof.tsx · v4 · 2026-09-23
 *
 * Doctrine unchanged from v3: dogfooding is the strongest proof and the
 * only claim here verifiable from the codebase itself (numbers sourced
 * live from platform-metrics.json). External-customer claims stay off
 * until a reference is approved.
 *
 * v4 visual layer: the headline stat becomes a large double-bezel
 * instrument panel (grid field, accent bloom, counting numerals), with
 * the four supporting stats as a 2×2 cluster beside it on desktop.
 */

const M = metrics;

const STRIP = [
  { value: M.shipped.automated_tests, format: "thousands" as const, label: "Automated checks keeping the system honest." },
  { value: M.shipped.commits_last_30d, label: "Improvements shipped in the last month." },
  { value: M.governed.doctrine_memories, label: "Institutional lessons the system consults on every decision." },
  { value: M.governed.enforcement_hooks, label: "Rules the system enforces so mistakes stop before they ship." },
];

export function MarketingProof() {
  return (
    <Section labelledBy="mkt-proof-h">
      <Reveal as="header" className="flex max-w-3xl flex-col items-start gap-6">
        <Eyebrow>Proof</Eyebrow>
        <h2 id="mkt-proof-h" className={cn(headline, "text-[clamp(2.25rem,4.8vw,4rem)]")}>
          <RevealWords>Built with itself.</RevealWords>
        </h2>
        <p className={deck}>
          The strongest proof of a platform is the operation that built
          it, running on the platform. Nebbos built Nebbos with Nebbos.
          Every number below is measured from this codebase directly.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-4 lg:grid-cols-12 lg:gap-5">
        <Reveal className="bezel lg:col-span-7">
          <div className="bezel-core relative flex h-full flex-col overflow-hidden p-8 md:p-10">
            <div aria-hidden className="grid-field pointer-events-none absolute inset-0 opacity-70" />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-accent/25 blur-[100px]"
            />
            <p className="relative m-0 font-code text-[11px] font-medium uppercase tracking-label text-ink-3">
              Built with Nebbos, by Nebbos
            </p>
            <p className="relative m-0 mt-8 bg-gradient-to-b from-ink via-ink to-ink/70 bg-clip-text font-display text-[clamp(4.5rem,11vw,9.5rem)] font-medium leading-[0.9] tracking-[-0.05em] text-transparent">
              <NumberCounter value={M.shipped.lines_of_code_millions * 1_000_000} format="millions" />
            </p>
            <p className="relative m-0 mt-auto max-w-[46ch] pt-10 text-[16px] leading-relaxed text-ink-2">
              The size of a modern operating system, built by one founder
              with a Pearl for every department. This website. The
              platform behind it. The internal tools. The calendar, the
              mail, the books, the roadmap. All Nebbos-built.
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col gap-4 lg:col-span-5 lg:gap-5">
          <Stagger className="grid flex-1 grid-cols-2 gap-3 sm:gap-4 lg:gap-5" step={0.08}>
            {STRIP.map((s) => (
              <StaggerItem
                key={s.label}
                className="spotlight relative flex flex-col justify-between gap-6 rounded-bezel bg-ground-2 p-5 ring-1 ring-rule ring-inset sm:p-6"
              >
                <p className="relative m-0 font-display text-[clamp(2rem,3.4vw,3rem)] font-medium leading-none tracking-[-0.03em] text-ink">
                  <NumberCounter value={s.value} format={s.format} />
                </p>
                <p className="relative m-0 text-[14px] leading-snug text-ink-3">{s.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal>
            <p className="m-0 w-full max-w-none rounded-[1.25rem] bg-white/[0.03] px-5 py-3.5 font-code text-[11px] uppercase leading-relaxed tracking-[0.14em] text-ink-3 ring-1 ring-rule ring-inset sm:rounded-pill">
              Measured this month. See{" "}
              <Link
                href="/how"
                className="font-medium text-accent transition-[font-weight,color] duration-200 hover:font-bold hover:text-[#ff8a4a] focus-visible:font-bold"
              >
                how it was built
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
