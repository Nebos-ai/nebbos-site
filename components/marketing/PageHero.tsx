import type { CSSProperties, ReactNode } from "react";
import { SplitWords } from "@/components/patterns/SplitWords";
import { BackgroundBeams } from "@/components/motion/BackgroundBeams";
import { Eyebrow, deck as deckClass, headline } from "@/components/marketing/primitives";
import { cn } from "@/lib/cn";

/**
 * PageHero · the hero for every inner marketing page.
 *
 * Same language as the home hero: engineering grid, accent light beams,
 * words rising out of blur on first paint (pure CSS, LCP-safe), deck and
 * CTAs cascading in. `tint` recolours the top-left bloom (product pages);
 * `lead` renders above the eyebrow (e.g. a product mark tile); `visual`
 * turns the hero into a split with the visual on the right.
 */

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function PageHero({
  id,
  eyebrow,
  title,
  titleHtml,
  deck,
  deckHtml,
  deck2,
  ctas,
  lead,
  visual,
  tint = "var(--color-accent)",
}: {
  id: string;
  eyebrow?: ReactNode;
  /** Plain-text title (words rise individually). */
  title?: string;
  /** Trusted CMS HTML title (content/pages.ts); rises as one line. */
  titleHtml?: string;
  deck?: ReactNode;
  /** Trusted CMS HTML deck. */
  deckHtml?: string;
  /** Optional second deck paragraph (e.g. tagline + deck on tier pages). */
  deck2?: ReactNode;
  ctas?: ReactNode;
  lead?: ReactNode;
  visual?: ReactNode;
  tint?: string;
}) {
  return (
    <section
      className="mkt relative isolate -mt-[76px] overflow-hidden px-4 pt-[76px] sm:px-6"
      aria-labelledby={id}
      style={{ "--tint": tint } as CSSProperties}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-field absolute inset-0" />
        <BackgroundBeams className="opacity-60 [mask-image:radial-gradient(ellipse_80%_70%_at_30%_30%,#000_30%,transparent_80%)]" />
        <div className="absolute -left-40 -top-40 size-[680px] rounded-full bg-[var(--tint)] opacity-20 blur-[140px]" />
        <div className="absolute -right-32 top-24 size-[480px] rounded-full bg-platform/10 blur-[140px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ground" />
      </div>

      <div
        className={cn(
          "mx-auto grid w-full max-w-[1240px] items-center gap-14 pb-20 pt-20 md:pb-28 md:pt-28",
          visual && "lg:grid-cols-[1.2fr_1fr] lg:gap-12",
        )}
      >
        <div className="flex flex-col items-start gap-7">
          {lead && (
            <div className="rise-in" style={d(0)}>
              {lead}
            </div>
          )}
          {eyebrow && (
            <div className="rise-in" style={d(0)}>
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
          )}
          {title !== undefined && (
            <h1 id={id} className={cn(headline, "rise-words max-w-[18ch] text-[clamp(2.75rem,5.6vw,4.75rem)] leading-[1]")}>
              <SplitWords step={0.06}>{title}</SplitWords>
            </h1>
          )}
          {titleHtml !== undefined && (
            <h1
              id={id}
              className={cn(headline, "rise-in max-w-[20ch] text-[clamp(2.5rem,5.2vw,4.5rem)] leading-[1.02]")}
              style={d(60)}
              dangerouslySetInnerHTML={{ __html: titleHtml }}
            />
          )}
          {deck && (
            <p className={cn(deckClass, "rise-in max-w-[58ch]")} style={d(240)}>
              {deck}
            </p>
          )}
          {deckHtml && (
            <p
              className={cn(deckClass, "rise-in max-w-[58ch]")}
              style={d(240)}
              dangerouslySetInnerHTML={{ __html: deckHtml }}
            />
          )}
          {deck2 && (
            <p className={cn(deckClass, "rise-in -mt-3 max-w-[58ch]")} style={d(300)}>
              {deck2}
            </p>
          )}
          {ctas && (
            <div className="rise-in cta-row pt-1" style={d(360)}>
              {ctas}
            </div>
          )}
        </div>
        {visual && (
          <div className="rise-in-far relative" style={d(280)}>
            {visual}
          </div>
        )}
      </div>
    </section>
  );
}
