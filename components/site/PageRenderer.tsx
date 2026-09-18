import { Fragment } from "react";
import Link from "next/link";
import type { Page, SectionBase } from "@/content/pages";
import { CONTACT, mailto } from "@/content/contact";
import { FACTS } from "@/content/facts";
import { BRAND } from "@/content/brand";

/**
 * PageRenderer · v5 · 2026-09-18 · mkt-native rewrite
 *
 * v3/v4 rendered every section from content/pages.ts using v3 substrate
 * classes (`section--paper`, `container`, `block__title`, `hero-paper`,
 * etc.) that carry a corporate-parent aesthetic — cream paper, serif
 * italic hero decks, editorial Roman numerals. When the marketing
 * register (mkt-*) shipped for the home + product pages, the catchall
 * routes stayed on the v3 shapes with only a color-swap (.mkt-mode
 * wrapper) — which flipped tokens but kept the SHAPE unchanged. Result:
 * /security, /sovereignty, /trust and every /solutions/* + /legal/*
 * route still visually read as the corporate parent's editorial site.
 *
 * v5 rewrites every SectionSlot to produce mkt-* shapes. One file
 * change upgrades ~15 catchall routes to look like the same site as
 * the home / products / pricing surfaces. Founder-directed 2026-09-18:
 * "get the rest of the site working and looking like its the same
 * site." Content preserved verbatim; only the JSX + classes change.
 *
 * Section imagery (SceneStill / FullBleedScene from the v3 stock-photo
 * asset packs) is intentionally dropped from catchall pages — the mkt
 * register uses zero stock imagery on the home; catchalls now follow
 * the same discipline (mkt-panel backgrounds + Nebbos flower + product
 * color tint carry the visual identity). Per-page bespoke visuals are
 * a subsequent wave and land as native route files, not through this
 * renderer.
 */

const HERO_KINDS = new Set(["hero-full-bleed", "hero-paper", "empty-state"]);
const CTA_KINDS = new Set(["cta-full-bleed", "cta-band"]);

export function PageRenderer({ page }: { page: Page }) {
  return (
    <>
      {page.sections.map((section) => (
        <Fragment key={section.id}>
          <SectionSlot section={section} />
        </Fragment>
      ))}
    </>
  );
}

function SectionSlot({ section }: { section: SectionBase }) {
  switch (section.kind) {
    case "hero-full-bleed":
    case "hero-paper":
    case "empty-state":
      return <PageHero s={section} />;
    case "text-block":     return <TextBlock s={section} />;
    case "split-columns":  return <SplitColumns s={section} />;
    case "list-numbered":  return <ListNumbered s={section} />;
    case "list-plain":     return <ListPlain s={section} />;
    case "table-rows":     return <TableRows s={section} />;
    case "case-study":     return <CaseStudy s={section} />;
    case "cta-band":
    case "cta-full-bleed": return <ClosingCTA s={section} />;
    case "inbox-router":   return <InboxRouter s={section} />;
    case "band-overview":  return null;    // home-only, rendered bespoke
    case "story-triptych": return null;    // home-only, rendered bespoke
    default:               return null;
  }
}

/* ── Helpers ──────────────────────────────────────────────────────── */

// Strip the "01 · " numeric prefix from eyebrows — the v3 chapter
// numerals were part of the editorial register we're retiring. Only
// the label side survives on the mkt register.
function cleanEyebrow(eyebrow?: string): string | undefined {
  if (!eyebrow) return undefined;
  const parts = eyebrow.split(" · ");
  if (parts.length >= 2 && /^\d{1,3}$/.test(parts[0]?.trim() ?? "")) {
    return parts.slice(1).join(" · ") || undefined;
  }
  return eyebrow;
}

function CTAButtons({
  primary,
  secondary,
}: {
  primary?: SectionBase["ctaPrimary"];
  secondary?: SectionBase["ctaSecondary"];
}) {
  if (!primary && !secondary) return null;
  return (
    <div className="mkt-hero__ctas">
      {primary && (
        <Link
          href={primary.href}
          className={`mkt-cta ${primary.variant === "ghost" || primary.variant === "ghost-light" ? "mkt-cta--ghost" : "mkt-cta--primary"}`}
        >
          {primary.label}
          <span className="mkt-cta__arrow" aria-hidden>→</span>
        </Link>
      )}
      {secondary && (
        <Link
          href={secondary.href}
          className={`mkt-cta ${secondary.variant === "primary" || secondary.variant === "solid-light" ? "mkt-cta--primary" : "mkt-cta--ghost"}`}
        >
          {secondary.label}
        </Link>
      )}
    </div>
  );
}

/* ── Hero (all pages: text-only, mkt-hero shape) ─────────────────── */

function PageHero({ s }: { s: SectionBase }) {
  const eb = cleanEyebrow(s.eyebrow);
  return (
    <section className="mkt mkt-section mkt-hero" aria-labelledby={`h-${s.id}`}>
      <div className="mkt-section__inner">
        <div className="mkt-hero__copy">
          {eb && <p className="mkt-eyebrow">{eb}</p>}
          {s.h1 && (
            <h1
              id={`h-${s.id}`}
              className="mkt-display"
              dangerouslySetInnerHTML={{ __html: s.h1 }}
            />
          )}
          {s.deck && (
            <p className="mkt-deck" dangerouslySetInnerHTML={{ __html: s.deck }} />
          )}
          <CTAButtons primary={s.ctaPrimary} secondary={s.ctaSecondary} />
        </div>
      </div>
    </section>
  );
}

/* ── Text block · eyebrow + h2 + prose ─────────────────────────── */

function TextBlock({ s }: { s: SectionBase }) {
  const eb = cleanEyebrow(s.eyebrow);
  return (
    <section className="mkt mkt-section" aria-labelledby={`h-${s.id}`}>
      <div className="mkt-section__inner">
        <header className="mkt-products__head">
          {eb && <p className="mkt-eyebrow">{eb}</p>}
          {s.h2 && (
            <h2
              id={`h-${s.id}`}
              className="mkt-h2"
              dangerouslySetInnerHTML={{ __html: s.h2 }}
            />
          )}
          {s.body && (
            <p className="mkt-deck" dangerouslySetInnerHTML={{ __html: s.body }} />
          )}
        </header>
      </div>
    </section>
  );
}

/* ── Split columns · heading + list ───────────────────────────── */

function SplitColumns({ s }: { s: SectionBase }) {
  const eb = cleanEyebrow(s.eyebrow);
  return (
    <section className="mkt mkt-section" aria-labelledby={`h-${s.id}`}>
      <div className="mkt-section__inner">
        <div className="mkt-split">
          <div>
            {eb && <p className="mkt-eyebrow">{eb}</p>}
            {s.h2 && (
              <h2
                id={`h-${s.id}`}
                className="mkt-h2"
                dangerouslySetInnerHTML={{ __html: s.h2 }}
              />
            )}
            {s.deck && (
              <p className="mkt-deck" dangerouslySetInnerHTML={{ __html: s.deck }} />
            )}
          </div>
          <div>
            <PlainList items={s.items ?? []} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Numbered list (features, steps) ──────────────────────────── */

function ListNumbered({ s }: { s: SectionBase }) {
  const eb = cleanEyebrow(s.eyebrow);
  return (
    <section className="mkt mkt-section" aria-labelledby={`h-${s.id}`}>
      <div className="mkt-section__inner">
        <header className="mkt-products__head">
          {eb && <p className="mkt-eyebrow">{eb}</p>}
          {s.h2 && (
            <h2
              id={`h-${s.id}`}
              className="mkt-h2"
              dangerouslySetInnerHTML={{ __html: s.h2 }}
            />
          )}
        </header>
        <ol className="mkt-numlist">
          {(s.items ?? []).map((item, i) => (
            <li key={item.title} className="mkt-numlist__item">
              <span className="mkt-numlist__index" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="mkt-numlist__body">
                <div
                  className="mkt-numlist__title"
                  dangerouslySetInnerHTML={{ __html: item.title }}
                />
                {item.body && (
                  <p
                    className="mkt-numlist__desc"
                    dangerouslySetInnerHTML={{ __html: item.body }}
                  />
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── Plain list (values, ideas) ────────────────────────────────── */

function PlainList({ items }: { items: SectionBase["items"] }) {
  if (!items?.length) return null;
  return (
    <ul className="mkt-plainlist">
      {items.map((item) => (
        <li key={item.title} className="mkt-plainlist__item">
          <span
            className="mkt-plainlist__title"
            dangerouslySetInnerHTML={{ __html: item.title }}
          />
          {item.body && (
            <p
              className="mkt-plainlist__desc"
              dangerouslySetInnerHTML={{ __html: item.body }}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

function ListPlain({ s }: { s: SectionBase }) {
  const eb = cleanEyebrow(s.eyebrow);
  // v3 auto-injected FACTS.productLine when items were empty + h2 mentioned
  // "build" — preserved for content parity on legacy pages that relied on it.
  const items =
    (s.items ?? []).length === 0 && s.h2?.toLowerCase().includes("build")
      ? FACTS.productLine.map((title) => ({ title }))
      : (s.items ?? []);
  return (
    <section className="mkt mkt-section" aria-labelledby={`h-${s.id}`}>
      <div className="mkt-section__inner">
        <header className="mkt-products__head">
          {eb && <p className="mkt-eyebrow">{eb}</p>}
          {s.h2 && (
            <h2
              id={`h-${s.id}`}
              className="mkt-h2"
              dangerouslySetInnerHTML={{ __html: s.h2 }}
            />
          )}
        </header>
        <PlainList items={items} />
      </div>
    </section>
  );
}

/* ── Table rows · dt/dd pairs (facts / specs) ─────────────────── */

function TableRows({ s }: { s: SectionBase }) {
  const eb = cleanEyebrow(s.eyebrow);
  const rows: Array<[string, string]> = [
    ["Founded", String(FACTS.foundingYear)],
    ["Category", FACTS.category],
    ["US parent", `${BRAND.parentEntity} · ${BRAND.parentEntityLocation}`],
    ["AI unit", `${BRAND.aiEntity} · ${BRAND.aiEntityLocation}`],
    ["Serbian subsidiary", `${BRAND.legalEntity} · ${BRAND.legalEntityLocation}`],
    ["Team shape", FACTS.teamShape],
  ];
  return (
    <section className="mkt mkt-section" aria-labelledby={`h-${s.id}`}>
      <div className="mkt-section__inner">
        <header className="mkt-products__head">
          {eb && <p className="mkt-eyebrow">{eb}</p>}
          {s.h2 && (
            <h2
              id={`h-${s.id}`}
              className="mkt-h2"
              dangerouslySetInnerHTML={{ __html: s.h2 }}
            />
          )}
        </header>
        <dl className="mkt-rowstable">
          {rows.map(([label, value]) => (
            <div key={label} className="mkt-rowstable__row">
              <dt className="mkt-rowstable__label">{label}</dt>
              <dd className="mkt-rowstable__value">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ── Case study · aside + narrative body ───────────────────────── */

function CaseStudy({ s }: { s: SectionBase }) {
  const eb = cleanEyebrow(s.eyebrow);
  return (
    <section className="mkt mkt-section" aria-labelledby={`h-${s.id}`}>
      <div className="mkt-section__inner">
        <div className="mkt-case">
          <aside className="mkt-case__aside">
            <p className="mkt-eyebrow">{eb ?? "Case study"}</p>
            {s.h2 && (
              <h3
                id={`h-${s.id}`}
                className="mkt-case__subject"
                dangerouslySetInnerHTML={{ __html: s.h2 }}
              />
            )}
          </aside>
          {s.body && (
            <div
              className="mkt-case__body"
              dangerouslySetInnerHTML={{ __html: s.body }}
            />
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Closing CTA (band + full-bleed use one mkt shape) ──────────── */

function ClosingCTA({ s }: { s: SectionBase }) {
  const eb = cleanEyebrow(s.eyebrow);
  return (
    <section
      className="mkt mkt-section mkt-closing"
      aria-labelledby={`h-${s.id}`}
    >
      <div className="mkt-closing__inner">
        {eb && <p className="mkt-eyebrow">{eb}</p>}
        {s.h2 && (
          <h2
            id={`h-${s.id}`}
            className="mkt-display"
            dangerouslySetInnerHTML={{ __html: s.h2 }}
          />
        )}
        {s.deck && (
          <p className="mkt-deck" dangerouslySetInnerHTML={{ __html: s.deck }} />
        )}
        <CTAButtons primary={s.ctaPrimary} secondary={s.ctaSecondary} />
      </div>
    </section>
  );
}

/* ── Inbox router · label → email rows ────────────────────────── */

function InboxRouter({ s }: { s: SectionBase }) {
  const eb = cleanEyebrow(s.eyebrow);
  const inboxes = [
    { label: "General",     addr: CONTACT.general,     strap: "Sales, partnerships, misc." },
    { label: "Enterprise",  addr: CONTACT.enterprise,  strap: "SOWs, MSAs, procurement." },
    { label: "Engineering", addr: CONTACT.engineering, strap: "Developer + integration questions." },
    { label: "Security",    addr: CONTACT.security,    strap: "Vulnerability reports + incident notification." },
    { label: "Privacy",     addr: CONTACT.privacy,     strap: "Data-protection officer, GDPR, DSARs." },
    { label: "Legal",       addr: CONTACT.legal,       strap: "Policy questions, software-license questions." },
    { label: "Press",       addr: CONTACT.press,       strap: "Journalist / analyst inquiries." },
  ];
  return (
    <section className="mkt mkt-section" aria-labelledby={`h-${s.id}`}>
      <div className="mkt-section__inner">
        {(eb || s.h2) && (
          <header className="mkt-products__head">
            {eb && <p className="mkt-eyebrow">{eb}</p>}
            {s.h2 && (
              <h2
                id={`h-${s.id}`}
                className="mkt-h2"
                dangerouslySetInnerHTML={{ __html: s.h2 }}
              />
            )}
            {s.deck && (
              <p
                className="mkt-deck"
                dangerouslySetInnerHTML={{ __html: s.deck }}
              />
            )}
          </header>
        )}
        <ul className="mkt-inboxlist">
          {inboxes.map((inbox) => (
            <li key={inbox.addr}>
              <Link href={mailto(inbox.addr)} className="mkt-inboxlist__row">
                <div className="mkt-inboxlist__label">{inbox.label}</div>
                <div>
                  <div className="mkt-inboxlist__addr">{inbox.addr}</div>
                  <div className="mkt-inboxlist__strap">{inbox.strap}</div>
                </div>
                <div className="mkt-inboxlist__caret" aria-hidden>→</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Referenced only by the switch's HERO_KINDS / CTA_KINDS discriminators —
   keep these sets exported so a future SectionSlot audit can grep them. */
export { HERO_KINDS, CTA_KINDS };
