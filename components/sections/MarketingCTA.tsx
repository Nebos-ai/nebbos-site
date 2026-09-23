import { NebbosMark } from "@nebbos/brand/logo";
import { RevealWords } from "@/components/motion/RevealWords";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow, GhostCta, PrimaryCta, deck, headline } from "@/components/marketing/primitives";
import { cn } from "@/lib/cn";

/**
 * MarketingCTA · sections/MarketingCTA.tsx · v2 · 2026-09-23
 *
 * The closing ask. Direct, two paths: Book a demo is primary; See the
 * products is the second read for those not yet ready to talk.
 *
 * v2: the close is one luminous panel — a slow border beam, an accent
 * bloom rising from below and the flower-of-life mark as a still
 * watermark behind the headline. Centered on purpose: it is the page's final
 * single message.
 */

export function MarketingCTA() {
  return (
    <section className="mkt relative px-4 py-20 sm:px-6 md:py-28" aria-labelledby="mkt-close-h">
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
              <Eyebrow>See it on your operation</Eyebrow>
              <h2 id="mkt-close-h" className={cn(headline, "text-[clamp(2.5rem,6vw,5rem)] leading-[0.98]")}>
                <RevealWords>Put a Pearl on your hardest department.</RevealWords>
              </h2>
              <p className={cn(deck, "max-w-[46ch]")}>
                Thirty minutes. Pick one department. We map it, name the Pearl,
                and show you the first Monday it would run.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <PrimaryCta href="/demo">Book a demo</PrimaryCta>
                <GhostCta href="/products">See the products</GhostCta>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
