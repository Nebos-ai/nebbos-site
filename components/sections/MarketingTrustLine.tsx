import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

/**
 * MarketingTrustLine · sections/MarketingTrustLine.tsx · v2 · 2026-09-23
 *
 * One quiet line where the compliance strip used to be: signal "yes, we
 * know CISOs will read this" and link to the depth on /trust.
 *
 * v2: the line sits on a single glass rail with a slow border beam, so
 * it reads as a seal between the story and the proof.
 */

export function MarketingTrustLine() {
  return (
    <aside className="mkt relative px-4 sm:px-6" aria-label="Trust anchor">
      <Reveal className="mx-auto max-w-[1240px]">
        <div className="beam-border rounded-bezel [--beam-color:rgb(255_107_30/0.8)]">
          <div className="flex flex-col items-start gap-5 rounded-bezel bg-ground-2/80 px-7 py-7 ring-1 ring-rule ring-inset md:flex-row md:items-center md:justify-between md:gap-10 md:px-10">
            <p className="m-0 max-w-[62ch] text-pretty font-display text-lg leading-snug text-ink-2 md:text-xl">
              Your data, your keys, your hardware. Never trained on. Every
              action to an audit trail your CISO can walk end to end.
            </p>
            <Link
              href="/trust"
              className="group inline-flex shrink-0 items-center gap-3 whitespace-nowrap rounded-pill bg-accent/10 py-1.5 pl-5 pr-1.5 font-code text-[11px] font-medium uppercase tracking-label text-accent ring-1 ring-accent/30 ring-inset transition-colors duration-300 hover:bg-accent/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              See the trust center
              <span
                className="grid size-8 place-items-center rounded-pill bg-accent text-[13px] text-ground transition-transform duration-500 ease-fluid group-hover:translate-x-0.5"
                aria-hidden
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </Reveal>
    </aside>
  );
}
