import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  /** Draw a hairline divider on top. */
  divider?: boolean;
  className?: string;
};

/** Standard full-bleed marketing section with a centered container. */
export function Section({ children, divider = false, className = "" }: SectionProps) {
  return (
    <section className={divider ? "hairline-top" : ""}>
      <div className={`container section ${className}`.trim()}>{children}</div>
    </section>
  );
}

type EyebrowProps = { children: ReactNode };
export function Eyebrow({ children }: EyebrowProps) {
  return <p className="eyebrow">{children}</p>;
}
