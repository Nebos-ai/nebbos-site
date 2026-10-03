import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { NebbosMark } from "@nebbos/brand/logo";
import { cn } from "@/lib/cn";

/**
 * PearlCard · the tinted spotlight link card (product cross-links, the
 * solutions catalog): Pearl-colour top light, oversized watermark mark
 * that scales (never rotates) on hover, smooth 0.7s lift, "Open →" pill.
 */
export function PearlCard({
  href,
  tint,
  eyebrow,
  name,
  tagline,
  cta = "Open",
  featured = false,
  className,
}: {
  href: string;
  tint: string;
  eyebrow: ReactNode;
  name: ReactNode;
  tagline: ReactNode;
  cta?: ReactNode;
  featured?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      style={{ "--tint": tint, "--spot": tint } as CSSProperties}
      className={cn(
        "spotlight group relative isolate flex h-full min-h-[280px] flex-col overflow-hidden rounded-bezel bg-ground-2 p-7 ring-1 ring-rule ring-inset transition-[translate,box-shadow] duration-700 ease-out-expo hover:-translate-y-1.5 hover:shadow-[0_40px_80px_-40px_var(--tint)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-2/3 bg-[radial-gradient(120%_80%_at_20%_0%,color-mix(in_srgb,var(--tint)_26%,transparent),transparent_70%)]"
      />
      {featured && <span aria-hidden className="grid-field pointer-events-none absolute inset-0 -z-10 opacity-60" />}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -right-20 -z-10 text-[var(--tint)] opacity-[0.12] transition-transform duration-[1.4s] ease-fluid group-hover:scale-110"
      >
        <NebbosMark size={240} />
      </span>
      <span
        className="relative grid size-12 place-items-center rounded-[0.9rem] bg-[var(--tint)] text-white shadow-[0_12px_30px_-8px_var(--tint),inset_0_1px_0_rgb(255_255_255/0.35)] transition-[scale] duration-700 ease-out-expo group-hover:scale-[1.06]"
        aria-hidden
      >
        <NebbosMark size={26} />
      </span>
      <div className="relative mt-auto pt-12">
        <p className="m-0 font-code text-[11px] font-medium uppercase tracking-label text-ink-3">{eyebrow}</p>
        <h3 className="m-0 mt-2 font-display text-[clamp(1.6rem,2.2vw,2rem)] font-medium tracking-tight text-ink">{name}</h3>
        <p className="m-0 mt-2 text-[15px] leading-relaxed text-ink-2">{tagline}</p>
      </div>
      <span className="relative mt-6 inline-flex items-center gap-2 self-start rounded-pill bg-white/[0.05] py-1.5 pl-4 pr-1.5 font-code text-[11px] font-medium uppercase tracking-label text-ink ring-1 ring-rule ring-inset transition-colors group-hover:bg-white/[0.09]">
        {cta}
        <span className="grid size-6 place-items-center rounded-pill bg-[var(--tint)] text-[12px] text-white" aria-hidden>
          →
        </span>
      </span>
    </Link>
  );
}
