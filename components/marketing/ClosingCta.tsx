import type { ReactNode } from "react";
import { NebbosMark } from "@nebbos/brand/logo";
import { RevealWords } from "@/components/motion/RevealWords";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow, GhostCta, PrimaryCta, deck as deckClass, headline } from "@/components/marketing/primitives";
import { cn } from "@/lib/cn";

/**
 * ClosingCta · the luminous closing panel shared by every marketing page:
 * slow border beam, accent bloom from below, the flower-of-life mark as a
 * still watermark. Centered on purpose: it is each page's final message.
 */
export function ClosingCta({
  id,
  eyebrow,
  title,
  titleHtml,
  deck,
  deckHtml,
  ctas,
  primary,
  secondary,
  lead,
}: {
  id: string;
  eyebrow: ReactNode;
  title?: string;
  /** Trusted CMS HTML title / deck (content/pages.ts). */
  titleHtml?: string;
  deck?: ReactNode;
  deckHtml?: string;
  /** Overrides primary/secondary with custom CTA elements. */
  ctas?: ReactNode;
  primary?: { href: string; label: ReactNode };
  secondary?: { href: string; label: ReactNode };
  /** Optional element above the eyebrow (e.g. a product mark tile). */
  lead?: ReactNode;
}) {
  return (
    <section className="mkt relative px-4 py-20 sm:px-6 md:py-28" aria-labelledby={id}>
      <Reveal className="mx-auto max-w-[1240px]">
        <div className="beam-border rounded-[2.25rem]">
          <div className="relative isolate overflow-hidden rounded-[2.25rem] bg-ground-2 px-6 py-20 text-center ring-1 ring-rule ring-inset md:px-16 md:py-28">
            <div aria-hidden className="grid-field pointer-events-none absolute inset-0 -z-10" />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-48 left-1/2 -z-10 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-accent/30 blur-[120px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 text-ink opacity-[0.028]"
            >
              <NebbosMark size={560} />
            </div>

            <div className="mx-auto flex max-w-3xl flex-col items-center gap-7">
              {lead}
              {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
              {title !== undefined && (
                <h2 id={id} className={cn(headline, "text-[clamp(2.5rem,6vw,5rem)] leading-[0.98]")}>
                  <RevealWords>{title}</RevealWords>
                </h2>
              )}
              {titleHtml !== undefined && (
                <h2
                  id={id}
                  className={cn(headline, "text-[clamp(2.25rem,5.4vw,4.5rem)] leading-[1]")}
                  dangerouslySetInnerHTML={{ __html: titleHtml }}
                />
              )}
              {deck && <p className={cn(deckClass, "max-w-[46ch]")}>{deck}</p>}
              {deckHtml && <p className={cn(deckClass, "max-w-[46ch]")} dangerouslySetInnerHTML={{ __html: deckHtml }} />}
              {(ctas || primary || secondary) && (
                <div className="cta-row pt-2">
                  {ctas ?? (
                    <>
                      {primary && <PrimaryCta href={primary.href}>{primary.label}</PrimaryCta>}
                      {secondary && <GhostCta href={secondary.href}>{secondary.label}</GhostCta>}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
