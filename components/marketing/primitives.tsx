import Link from "next/link";
import type { ReactNode } from "react";
import { NebbosMark } from "@nebbos/brand/logo";
import { cn } from "@/lib/cn";

/**
 * Marketing primitives · 2026-09 redesign (Tailwind v4 + Motion).
 *
 * Shape rule for the whole register: interactive = full pill, surfaces =
 * 28px bezel with a concentric inner core, chips = pill. One accent.
 */

export function Section({
  id,
  labelledBy,
  className,
  children,
  as: Tag = "section",
  ariaLabel,
}: {
  id?: string;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
  as?: "section" | "aside";
  ariaLabel?: string;
}) {
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      aria-label={ariaLabel}
      className={cn(
        "mkt relative px-4 py-20 sm:px-6 md:py-28 lg:py-32",
        className,
      )}
    >
      <div className="relative mx-auto w-full max-w-[1240px]">{children}</div>
    </Tag>
  );
}

/** Section eyebrow · the mark + chip anchor used above every headline. */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "m-0 inline-flex items-center gap-2 rounded-pill bg-white/[0.03] py-1.5 pl-2 pr-3.5 font-code text-[11px] font-medium uppercase tracking-label text-ink-3 ring-1 ring-rule ring-inset",
        className,
      )}
    >
      <span className="grid size-5 place-items-center rounded-pill bg-accent/15 text-accent">
        <NebbosMark size={12} />
      </span>
      {children}
    </p>
  );
}

/** Arrow well: stays put; on hover it takes the accent and the arrow turns ground-black. */
export const arrowWell =
  "grid size-9 place-items-center rounded-pill bg-ground text-ink transition-colors duration-300 ease-fluid group-hover:bg-accent group-hover:text-ground group-focus-visible:bg-accent group-focus-visible:text-ground";

/** Primary pill CTA with the arrow nested in its own well. */
export function PrimaryCta({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-3 whitespace-nowrap rounded-pill bg-ink py-1.5 pl-6 pr-1.5 font-display text-[15px] font-medium text-ground shadow-[0_10px_40px_-12px_rgb(255_107_30/0.55),inset_0_-2px_0_rgb(0_0_0/0.12)] transition-[scale,box-shadow] duration-300 ease-fluid active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      {children}
      <span className={arrowWell} aria-hidden>
        →
      </span>
    </Link>
  );
}

/** Secondary pill CTA · hairline ring; on hover it fills faintly, the ring
 *  warms to the accent and a soft orange glow lifts it off the ground. */
export function GhostCta({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex h-12 items-center whitespace-nowrap rounded-pill px-6 font-display text-[15px] font-medium text-ink ring-1 ring-rule-2 ring-inset transition-[background-color,box-shadow,scale] duration-300 ease-fluid hover:bg-white/[0.06] hover:shadow-[0_10px_36px_-14px_rgb(255_107_30/0.55)] hover:ring-accent/45 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      {children}
    </Link>
  );
}

export const headline =
  "m-0 font-display font-medium text-ink text-balance tracking-display leading-[1.02] [font-feature-settings:'ss01','ss02']";
export const deck =
  "m-0 max-w-[60ch] text-pretty font-display text-[17px] leading-relaxed text-ink-3 md:text-lg";
