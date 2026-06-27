import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
};

/** Standard interior-page hero with the brand glow accent. */
export function PageHero({ eyebrow, title, lead, children }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div
        className="glow"
        style={{ width: 480, height: 480, background: "var(--blue-deep)", top: -160, right: -110 }}
        aria-hidden
      />
      <div className="container" style={{ position: "relative" }}>
        <p className="eyebrow">{eyebrow}</p>
        <h1 style={{ marginTop: 20, maxWidth: "20ch" }}>{title}</h1>
        {lead ? (
          <p className="lead" style={{ marginTop: 24 }}>
            {lead}
          </p>
        ) : null}
        {children ? <div style={{ marginTop: 32 }}>{children}</div> : null}
      </div>
    </section>
  );
}
