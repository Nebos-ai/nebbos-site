import Link from "next/link";
import type { CSSProperties } from "react";
import { NebbosMark } from "@nebbos/brand/logo";
import { BRAND } from "@/content/brand";
import { RevealWords } from "@/components/motion/RevealWords";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Eyebrow, Section, deck, headline } from "@/components/marketing/primitives";
import { cn } from "@/lib/cn";

/**
 * MarketingDepartments · sections/MarketingDepartments.tsx · v2 · 2026-09-23
 *
 * Same four Pearls, same copy (BRAND.flagshipDepartments). v2 lays them
 * out as an asymmetric bento (7/5 over 5/7) so the four departments read
 * as distinct rooms rather than a row of identical tiles. Each card is a
 * spotlight surface tinted in its Pearl colour, with the flower-of-life
 * mark as an oversized watermark.
 */

const TINTS = [
  "var(--color-platform)",
  "var(--color-app)",
  "var(--color-mcp)",
  "var(--color-cradle)",
];

const SPANS = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

export function MarketingDepartments() {
  return (
    <Section labelledBy="mkt-depts-h">
      <Reveal as="header" className="flex max-w-3xl flex-col items-start gap-6">
        <Eyebrow>Departments</Eyebrow>
        <h2 id="mkt-depts-h" className={cn(headline, "text-[clamp(2.25rem,4.8vw,4rem)]")}>
          <RevealWords>A Pearl for every department.</RevealWords>
        </h2>
        <p className={deck}>
          One brain per department. It reads the signals your team
          already emits, drafts the actions, and asks you to approve.
          Your team stops doing the operations and starts leading them.
        </p>
      </Reveal>

      <Stagger className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-5" step={0.1}>
        {BRAND.flagshipDepartments.map((dept, i) => {
          const wide = i === 0 || i === 3;
          return (
            <StaggerItem key={dept.name} className={cn(SPANS[i])}>
              <Link
                href="/solutions"
                style={{ "--spot": TINTS[i], "--tint": TINTS[i] } as CSSProperties}
                className="spotlight group relative isolate flex h-full min-h-[300px] flex-col overflow-hidden rounded-bezel bg-ground-2 p-7 ring-1 ring-rule ring-inset transition-[translate,box-shadow] duration-700 ease-out-expo hover:-translate-y-1.5 hover:shadow-[0_40px_80px_-40px_var(--tint)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:p-8 lg:min-h-[340px]"
              >
                {/* Tinted light from the top edge + oversized watermark mark */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-2/3 bg-[radial-gradient(120%_80%_at_20%_0%,color-mix(in_srgb,var(--tint)_28%,transparent),transparent_70%)] opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute -z-10 text-[var(--tint)] opacity-[0.13] transition-transform duration-[1.4s] ease-fluid group-hover:scale-110",
                    wide ? "-bottom-24 -right-16" : "-bottom-20 -right-20",
                  )}
                >
                  <NebbosMark size={wide ? 320 : 260} />
                </span>
                {wide && <span aria-hidden className="grid-field pointer-events-none absolute inset-0 -z-10 opacity-60" />}

                <span
                  className="relative grid size-12 place-items-center rounded-[0.9rem] bg-[var(--tint)] text-white shadow-[0_12px_30px_-8px_var(--tint),inset_0_1px_0_rgb(255_255_255/0.35)] transition-[scale,box-shadow] duration-700 ease-out-expo group-hover:scale-[1.06] group-hover:shadow-[0_16px_40px_-6px_var(--tint),inset_0_1px_0_rgb(255_255_255/0.35)]"
                  aria-hidden
                >
                  <NebbosMark size={26} />
                </span>
                <div className="relative mt-auto pt-16">
                  <p className="m-0 font-code text-[11px] font-medium uppercase tracking-label text-ink-3">Pearl</p>
                  <h3 className="m-0 mt-2 font-display text-[clamp(1.75rem,2.6vw,2.4rem)] font-medium tracking-tight text-ink">
                    {dept.name}
                  </h3>
                  <p className="m-0 mt-2 max-w-[34ch] text-[15px] leading-relaxed text-ink-2">{dept.outcome}</p>
                </div>
                <span className="relative mt-7 inline-flex items-center gap-2 self-start rounded-pill bg-white/[0.05] py-1.5 pl-4 pr-1.5 font-code text-[11px] font-medium uppercase tracking-label text-ink ring-1 ring-rule ring-inset transition-colors group-hover:bg-white/[0.09]">
                  See
                  <span
                    className="grid size-6 place-items-center rounded-pill bg-[var(--tint)] text-[12px] text-white transition-transform duration-500 ease-fluid group-hover:translate-x-0.5"
                    aria-hidden
                  >
                    →
                  </span>
                </span>
              </Link>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
