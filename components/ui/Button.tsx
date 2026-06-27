import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost" | "light";

const variantClass: Record<Variant, string> = {
  primary: "btn btn-primary",
  ghost: "btn btn-ghost",
  light: "btn btn-light",
};

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  external?: boolean;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href" | "children">;

/** Brand-forward CTA rendered as a link. Marketing-local primitive (AD-2). */
export function ButtonLink({
  href,
  variant = "primary",
  external = false,
  children,
  ...rest
}: ButtonLinkProps) {
  const className = variantClass[variant];
  if (external || href.startsWith("http")) {
    return (
      <a href={href} className={className} rel="noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  );
}
