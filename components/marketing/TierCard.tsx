import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { TierKey } from "@/content/products";
import { cn } from "@/lib/cn";

/**
 * TierCard · one L1 / L2 / L3 tier. The level meter (one, two or three
 * lit bars) draws the doctrine that each tier strictly composes the one
 * below it. Renders as a link when `href` is set.
 */

const LEVEL: Record<TierKey, number> = { L1: 1, L2: 2, L3: 3 };

export function TierMeter({ tier, tint }: { tier: TierKey; tint: string }) {
  const n = LEVEL[tier];
  return (
    <span className="flex items-end gap-1" aria-hidden>
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className="w-1.5 rounded-full transition-colors duration-500"
          style={{
            height: 6 + i * 5,
            background: i <= n ? tint : "rgb(255 255 255 / 0.1)",
            boxShadow: i <= n ? `0 0 10px -2px ${tint}` : undefined,
          }}
        />
      ))}
    </span>
  );
}

export function TierCard({
  tier,
  label,
  children,
  footer,
  href,
  tint = "var(--color-accent)",
  id,
  className,
}: {
  tier: TierKey;
  label: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  href?: string;
  tint?: string;
  id?: string;
  className?: string;
}) {
  const body = (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 rounded-t-[inherit] bg-[radial-gradient(90%_100%_at_20%_0%,color-mix(in_srgb,var(--tint)_22%,transparent),transparent_70%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="relative flex items-center justify-between">
        <p className="m-0 font-code text-[11px] font-medium uppercase tracking-label text-tint">{tier}</p>
        <TierMeter tier={tier} tint={tint} />
      </div>
      <p className="relative m-0 mt-4 font-display text-lg font-medium tracking-tight text-ink">{label}</p>
      {children && <div className="relative mt-3 flex flex-col gap-2 text-[14px] leading-relaxed text-ink-3">{children}</div>}
      {footer && <div className="relative mt-auto pt-6">{footer}</div>}
    </>
  );
  const cls = cn(
    "spotlight group relative flex h-full flex-col rounded-[1.4rem] bg-ground-2 p-6 ring-1 ring-rule ring-inset transition-[translate,box-shadow] duration-700 ease-out-expo",
    href &&
      "hover:-translate-y-1 hover:shadow-[0_30px_60px_-36px_var(--tint)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
    className,
  );
  const style = { "--tint": tint, "--spot": tint } as CSSProperties;
  return href ? (
    <Link id={id} href={href} className={cls} style={style}>
      {body}
    </Link>
  ) : (
    <div id={id} className={cls} style={style}>
      {body}
    </div>
  );
}
