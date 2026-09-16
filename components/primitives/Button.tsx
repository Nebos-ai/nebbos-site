import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

/**
 * <Button> · Design substrate v3 · primitive
 *
 * The ONE button vocabulary on nebbos.ai. Every call-to-action passes
 * through this component. Retires bespoke inline-styled <Link>s that
 * proliferated across product pages / hero sections / CTAs prior to
 * substrate v3.
 *
 * Two variants:
 *   - primary — solid ground, ink foreground OR paper foreground on
 *              dark scrims (auto-adjusts via .btn--onDark modifier)
 *   - ghost   — no ground, just underline. Text-CTA replacement.
 *
 * Renders as <Link> when `href` is set, <button> otherwise. Uses
 * next/link for internal routes — automatically prefetched, uses
 * View Transitions API on nav.
 *
 * Consumes only tokens via .btn class. Zero inline styling.
 *
 * Usage:
 *   <Button href="/contact">Contact sales</Button>
 *   <Button variant="ghost" href="/demo">Book a demo</Button>
 *   <Button variant="ghost" href="/products/platform" tone="onDark">Learn more</Button>
 *   <Button onClick={() => setOpen(true)}>Open menu</Button>
 */

export type ButtonVariant = "primary" | "ghost";
export type ButtonTone = "onPaper" | "onDark";

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  /** Adjusts foreground/border colors when button sits over a dark scrim. */
  tone?: ButtonTone;
  className?: string;
};

type ButtonAsLink = CommonProps & {
  href: string;
  onClick?: never;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href">;

type ButtonAsButton = CommonProps & {
  href?: never;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children" | "type" | "onClick">;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button(props: ButtonProps) {
  const { variant = "primary", tone = "onPaper", className, children, ...rest } = props;
  const classes = ["btn", `btn--${variant}`, `btn--${tone}`, className].filter(Boolean).join(" ");

  if ("href" in props && props.href !== undefined) {
    const { href, ...linkRest } = rest as { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <Link href={href} className={classes} {...linkRest}>
        <span className="btn__label">{children}</span>
        <span aria-hidden className="btn__chevron">›</span>
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      <span className="btn__label">{children}</span>
      <span aria-hidden className="btn__chevron">›</span>
    </button>
  );
}
