import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

/**
 * Button · v2 primitive
 *
 * Two variants: primary (solid ink on paper, high contrast) and ghost
 * (ink border, transparent fill). Both accept href → renders as Next Link
 * OR onClick → renders as <button>. Institutional Reserve register — flat,
 * hairline border, mono-serif arrow flourish.
 *
 * Usage:
 *   <Button href="/demo" variant="primary">Book a demo</Button>
 *   <Button variant="ghost" onClick={...}>Learn more</Button>
 */

type Variant = "primary" | "ghost" | "solid-light" | "ghost-light";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  arrow?: boolean;
};

type LinkProps = BaseProps & {
  href: string;
  external?: boolean;
  onClick?: never;
  type?: never;
  disabled?: never;
};

type ButtonProps = BaseProps & {
  href?: never;
  external?: never;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

type Props = LinkProps | ButtonProps;

export function Button(props: Props) {
  const {
    variant = "primary",
    size = "md",
    arrow = true,
    children,
    className,
  } = props;

  const style = { ...baseStyle, ...sizeStyle[size], ...variantStyle[variant] };
  const content = (
    <>
      {children}
      {arrow && (
        <span aria-hidden style={{ fontFamily: "var(--font-serif)" }}>→</span>
      )}
    </>
  );

  if ("href" in props && props.href) {
    return (
      <Link
        href={props.href}
        target={props.external ? "_blank" : undefined}
        rel={props.external ? "noopener noreferrer" : undefined}
        className={className}
        style={style}
      >
        {content}
      </Link>
    );
  }

  const {
    onClick,
    type = "button",
    disabled,
  } = props as ButtonProps;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{ ...style, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1 }}
    >
      {content}
    </button>
  );
}

const baseStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  fontFamily: "var(--font-sans)",
  fontWeight: 500,
  textDecoration: "none",
  border: "1px solid transparent",
  transition:
    "background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)",
  letterSpacing: "-0.005em",
  whiteSpace: "nowrap",
};

const sizeStyle: Record<Size, CSSProperties> = {
  sm: { padding: "8px 14px", fontSize: 13 },
  md: { padding: "12px 20px", fontSize: 15 },
  lg: { padding: "16px 28px", fontSize: 17 },
};

const variantStyle: Record<Variant, CSSProperties> = {
  primary: {
    background: "var(--ink)",
    color: "var(--paper)",
    borderColor: "var(--ink)",
  },
  ghost: {
    background: "transparent",
    color: "var(--ink)",
    borderColor: "var(--ink)",
  },
  "solid-light": {
    background: "var(--paper)",
    color: "var(--ink)",
    borderColor: "var(--paper)",
  },
  "ghost-light": {
    background: "transparent",
    color: "var(--paper)",
    borderColor: "rgba(244, 241, 234, 0.5)",
  },
};

/** Alias export for compatibility with restored /platform pages
 *  that were authored to import { ButtonLink } from an earlier API. */
export { Button as ButtonLink };
