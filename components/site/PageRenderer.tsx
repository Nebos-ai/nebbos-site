import { Fragment } from "react";
import Link from "next/link";
import { NebbosMark } from "@nebbos/brand/logo";
import type { Page, SectionBase } from "@/content/pages";
import { CONTACT, mailto } from "@/content/contact";
import { FACTS } from "@/content/facts";
import { BRAND } from "@/content/brand";

/**
 * PageRenderer · v6 · 2026-09-18 · visual-density pass
 *
 * v5 (earlier today) rewrote every section slot to emit mkt-* shapes
 * — that fixed the register break (colors + typography now match the
 * home). Founder walked the site 2026-09-18 T15:03 UTC and said:
 * "we need to have the same level of design style across the entire
 * website" — the register matched but the DENSITY did not. Home has
 * flower tiles, card grids, colored accents, animated mockups;
 * catchalls were text-block-after-text-block with hairline seps only.
 *
 * v6 lifts the design language, one file:
 *   1. Every section tracks a Pearl-color index (cycling platform →
 *      app → mcp → cradle) so accents feel intentional across pages.
 *   2. ListPlain / ListNumbered render as TILE GRIDS — each item a
 *      per-Pearl-color card with a flower app-icon, title, body — the
 *      same visual language the home departments row uses.
 *   3. Text-blocks get a small colored SIDE RAIL + Pearl chip eyebrow
 *      so even copy-only sections carry visual identity.
 *   4. Heroes get a right-side FLOWER MOSAIC anchor (four small tiles)
 *      so pages open with a designed hero, not a wall of type.
 *   5. Case-studies pick up a colored quote-mark and full card shape.
 *   6. Closing CTAs get a per-page Pearl-color halo.
 *
 * Content preserved verbatim; every added element is decorative
 * (aria-hidden) and cannot mask copy. WCAG 2.2 AA color-contrast
 * holds because all tile chrome sits on --mkt-ground and text tokens
 * stay at their audited alphas.
 */

const PRODUCT_KEYS = ["platform", "app", "mcp", "cradle"] as const;
type ProductKey = (typeof PRODUCT_KEYS)[number];

function pearlAt(index: number): ProductKey {
  return PRODUCT_KEYS[index % PRODUCT_KEYS.length]!;
}

const HERO_KINDS = new Set(["hero-full-bleed", "hero-paper", "empty-state"]);
const CTA_KINDS = new Set(["cta-full-bleed", "cta-band"]);
const NON_ACCENTED = new Set(["cta-full-bleed", "cta-band", "hero-full-bleed", "hero-paper", "empty-state"]);

/* Sales-density cap · founder-directed 2026-09-19:
   "we have to remember this is a sales marketing site we dont need
    to have every piece of detail there like the we are trying to
    justify anything we are selling the product showing the product."
   Text-blocks are prose. After the first N, more prose reads as
   justification. The rendering layer drops text-blocks past this
   cap. content/pages.ts stays intact (no merge conflict with peer
   copy-rewrite branches; SHOW-cards like list-numbered / list-plain
   / case-study / inbox-router / table-rows / CTAs / heroes are all
   kept — those SHOW the product, they don't argue for it. */
const SALES_TEXTBLOCK_CAP = 3;

export function PageRenderer({ page }: { page: Page }) {
  let blockCounter = 0;
  let textBlockSeen = 0;
  return (
    <>
      {page.sections.map((section) => {
        // Cap text-blocks per page. Skip silently past the cap;
        // do NOT increment the block counter for skipped sections
        // so Pearl-color cycling stays continuous across the
        // surviving sections.
        if (section.kind === "text-block") {
          if (textBlockSeen >= SALES_TEXTBLOCK_CAP) return null;
          textBlockSeen += 1;
        }
        const wantsAccent = !NON_ACCENTED.has(section.kind);
        const pearl = pearlAt(blockCounter);
        const idx = blockCounter;
        if (wantsAccent) blockCounter += 1;
        return (
          <Fragment key={section.id}>
            <SectionSlot section={section} pearl={pearl} accent={wantsAccent} index={idx} />
          </Fragment>
        );
      })}
    </>
  );
}

type SlotProps = { section: SectionBase; pearl: ProductKey; accent: boolean; index: number };

function SectionSlot({ section, pearl, accent, index }: SlotProps) {
  switch (section.kind) {
    case "hero-full-bleed":
    case "hero-paper":
    case "empty-state":
      return <PageHero s={section} />;
    case "text-block":     return <TextBlock s={section} pearl={pearl} accent={accent} index={index} />;
    case "split-columns":  return <SplitColumns s={section} pearl={pearl} accent={accent} />;
    case "list-numbered":  return <ListNumbered s={section} pearl={pearl} accent={accent} />;
    case "list-plain":     return <ListPlain s={section} pearl={pearl} accent={accent} />;
    case "table-rows":     return <TableRows s={section} pearl={pearl} accent={accent} />;
    case "case-study":     return <CaseStudy s={section} pearl={pearl} />;
    case "cta-band":
    case "cta-full-bleed": return <ClosingCTA s={section} pearl={pearl} />;
    case "inbox-router":   return <InboxRouter s={section} pearl={pearl} accent={accent} />;
    case "band-overview":  return null;
    case "story-triptych": return null;
    default:               return null;
  }
}

/* ── Helpers ──────────────────────────────────────────────────────── */

function cleanEyebrow(eyebrow?: string): string | undefined {
  if (!eyebrow) return undefined;
  const parts = eyebrow.split(" · ");
  if (parts.length >= 2 && /^\d{1,3}$/.test(parts[0]?.trim() ?? "")) {
    return parts.slice(1).join(" · ") || undefined;
  }
  return eyebrow;
}

function SectionRail({ pearl }: { pearl: ProductKey }) {
  return <span className={`mkt-section__rail mkt-section__rail--${pearl}`} aria-hidden />;
}

function EyebrowChip({ pearl, children }: { pearl: ProductKey; children: React.ReactNode }) {
  return (
    <p className={`mkt-eyebrow mkt-eyebrow-chip mkt-eyebrow-chip--${pearl}`}>
      <span className="mkt-eyebrow-chip__dot" aria-hidden />
      {children}
    </p>
  );
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

/* ── Hero · text + 4-tile flower mosaic anchor ───────────────────── */

function HeroMosaic() {
  return (
    <div className="mkt-hero__mosaic" aria-hidden>
      {PRODUCT_KEYS.map((k) => (
        <span key={k} className={`mkt-hero__tile mkt-hero__tile--${k}`}>
          <NebbosMark size={28} />
        </span>
      ))}
    </div>
  );
}

function PageHero({ s }: { s: SectionBase }) {
  const eb = cleanEyebrow(s.eyebrow);
  return (
    <section className="mkt mkt-section mkt-hero" aria-labelledby={`h-${s.id}`}>
      <div className="mkt-section__inner mkt-hero__row">
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
        <HeroMosaic />
      </div>
    </section>
  );
}

/* ── Text block · shape-rotating designed section ────────────────
   Text-blocks are the dominant catchall section kind. If they all
   render as the same 2-col card, pages read as "same card, different
   color" — visually monotonous even with Pearl-color cycling.
   Founder-caught 2026-09-19 (v7 followup): rhythm matters as much as
   density. v8 rotates through THREE shapes so pages break rhythm
   every couple of sections:

     index % 3 === 0 → BANNER statement (full-bleed Pearl-color
                       gradient band, centered big display type, no
                       card panel — reads as a chapter break)
     index % 3 === 1 → default card (numeral+flower LEFT, body right)
     index % 3 === 2 → mirror card (body LEFT, numeral+flower RIGHT)

   The rotation is deterministic per section position so pages
   always look the same across reloads. */

function TextBlock({ s, pearl, accent, index }: { s: SectionBase; pearl: ProductKey; accent: boolean; index: number }) {
  const shape = index % 3;
  if (shape === 0) return <TextBlockBanner s={s} pearl={pearl} index={index} />;
  return <TextBlockCard s={s} pearl={pearl} accent={accent} index={index} mirror={shape === 2} />;
}

/* Banner statement · full-bleed Pearl-color gradient band, centered
   display type, no card panel. Used as a "chapter break" every third
   text-block. Numeral is inline with the eyebrow chip, not oversized,
   so the STATEMENT does the visual work rather than the metadata. */

function TextBlockBanner({ s, pearl, index }: { s: SectionBase; pearl: ProductKey; index: number }) {
  const eb = cleanEyebrow(s.eyebrow);
  const num = String(index + 1).padStart(2, "0");
  return (
    <section className={`mkt mkt-section mkt-banner mkt-banner--${pearl}`} aria-labelledby={`h-${s.id}`}>
      <div className="mkt-banner__wash" aria-hidden />
      <div className="mkt-section__inner mkt-banner__inner">
        <div className="mkt-banner__meta">
          <span className={`mkt-banner__num mkt-banner__num--${pearl}`} aria-hidden>{num}</span>
          <span className={`mkt-tile__mark mkt-tile__mark--${pearl}`} aria-hidden>
            <NebbosMark />
          </span>
          {eb && <EyebrowChip pearl={pearl}>{eb}</EyebrowChip>}
        </div>
        {s.h2 && (
          <h2
            id={`h-${s.id}`}
            className="mkt-banner__title"
            dangerouslySetInnerHTML={{ __html: s.h2 }}
          />
        )}
        {s.body && (
          <div
            className="mkt-banner__body"
            dangerouslySetInnerHTML={{ __html: s.body }}
          />
        )}
      </div>
    </section>
  );
}

/* Card · numeral+flower on left (or right if mirror) + body on the
   opposite side. Default shape for two of every three text-blocks. */

function TextBlockCard({ s, pearl, accent, index, mirror }: { s: SectionBase; pearl: ProductKey; accent: boolean; index: number; mirror: boolean }) {
  const eb = cleanEyebrow(s.eyebrow);
  const num = String(index + 1).padStart(2, "0");
  return (
    <section className={`mkt mkt-section ${accent ? "mkt-section--accented" : ""}`} aria-labelledby={`h-${s.id}`}>
      {accent && <SectionRail pearl={pearl} />}
      <div className="mkt-section__inner">
        <article className={`mkt-textcard mkt-textcard--${pearl} ${mirror ? "mkt-textcard--mirror" : ""}`}>
          <aside className="mkt-textcard__aside">
            <span className={`mkt-textcard__num mkt-textcard__num--${pearl}`} aria-hidden>
              {num}
            </span>
            <span className={`mkt-tile__mark mkt-tile__mark--${pearl}`} aria-hidden>
              <NebbosMark />
            </span>
            {eb && <EyebrowChip pearl={pearl}>{eb}</EyebrowChip>}
          </aside>
          <div className="mkt-textcard__main">
            {s.h2 && (
              <h2
                id={`h-${s.id}`}
                className="mkt-h2"
                dangerouslySetInnerHTML={{ __html: s.h2 }}
              />
            )}
            {s.body && (
              <div
                className="mkt-textcard__body"
                dangerouslySetInnerHTML={{ __html: s.body }}
              />
            )}
          </div>
        </article>
      </div>
    </section>
  );
}

/* ── Split columns · heading + list tiles ─────────────────────── */

function SplitColumns({ s, pearl, accent }: { s: SectionBase; pearl: ProductKey; accent: boolean }) {
  const eb = cleanEyebrow(s.eyebrow);
  return (
    <section className={`mkt mkt-section ${accent ? "mkt-section--accented" : ""}`} aria-labelledby={`h-${s.id}`}>
      {accent && <SectionRail pearl={pearl} />}
      <div className="mkt-section__inner">
        <div className="mkt-split">
          <div>
            {eb && <EyebrowChip pearl={pearl}>{eb}</EyebrowChip>}
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
            <TileGrid items={s.items ?? []} basePearl={pearl} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Tile grid · shared visual card grid for list-plain + split ── */

function TileGrid({ items, basePearl }: { items: SectionBase["items"]; basePearl: ProductKey }) {
  if (!items?.length) return null;
  const baseIdx = PRODUCT_KEYS.indexOf(basePearl);
  return (
    <ul className="mkt-tilegrid">
      {items.map((item, i) => {
        const pearl = pearlAt(baseIdx + i);
        return (
          <li key={item.title} className={`mkt-tile mkt-tile--${pearl}`}>
            <span className={`mkt-tile__mark mkt-tile__mark--${pearl}`} aria-hidden>
              <NebbosMark size={24} />
            </span>
            <div className="mkt-tile__body">
              <p
                className="mkt-tile__title"
                dangerouslySetInnerHTML={{ __html: item.title }}
              />
              {item.body && (
                <p
                  className="mkt-tile__desc"
                  dangerouslySetInnerHTML={{ __html: item.body }}
                />
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/* ── Numbered list · big colored numeral + card ──────────────── */

function ListNumbered({ s, pearl, accent }: { s: SectionBase; pearl: ProductKey; accent: boolean }) {
  const eb = cleanEyebrow(s.eyebrow);
  const baseIdx = PRODUCT_KEYS.indexOf(pearl);
  return (
    <section className={`mkt mkt-section ${accent ? "mkt-section--accented" : ""}`} aria-labelledby={`h-${s.id}`}>
      {accent && <SectionRail pearl={pearl} />}
      <div className="mkt-section__inner">
        <header className="mkt-products__head">
          {eb && <EyebrowChip pearl={pearl}>{eb}</EyebrowChip>}
          {s.h2 && (
            <h2
              id={`h-${s.id}`}
              className="mkt-h2"
              dangerouslySetInnerHTML={{ __html: s.h2 }}
            />
          )}
        </header>
        <ol className="mkt-numcards">
          {(s.items ?? []).map((item, i) => {
            const p = pearlAt(baseIdx + i);
            return (
              <li key={item.title} className={`mkt-numcard mkt-numcard--${p}`}>
                <span className={`mkt-numcard__index mkt-numcard__index--${p}`} aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="mkt-numcard__body">
                  <div
                    className="mkt-numcard__title"
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  />
                  {item.body && (
                    <p
                      className="mkt-numcard__desc"
                      dangerouslySetInnerHTML={{ __html: item.body }}
                    />
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ── Plain list · same tile grid ─────────────────────────────── */

function ListPlain({ s, pearl, accent }: { s: SectionBase; pearl: ProductKey; accent: boolean }) {
  const eb = cleanEyebrow(s.eyebrow);
  const items =
    (s.items ?? []).length === 0 && s.h2?.toLowerCase().includes("build")
      ? FACTS.productLine.map((title) => ({ title }))
      : (s.items ?? []);
  return (
    <section className={`mkt mkt-section ${accent ? "mkt-section--accented" : ""}`} aria-labelledby={`h-${s.id}`}>
      {accent && <SectionRail pearl={pearl} />}
      <div className="mkt-section__inner">
        <header className="mkt-products__head">
          {eb && <EyebrowChip pearl={pearl}>{eb}</EyebrowChip>}
          {s.h2 && (
            <h2
              id={`h-${s.id}`}
              className="mkt-h2"
              dangerouslySetInnerHTML={{ __html: s.h2 }}
            />
          )}
        </header>
        <TileGrid items={items} basePearl={pearl} />
      </div>
    </section>
  );
}

/* ── Table rows · fact-card grid (3-col at ≥1080px) ─────────────── */

function TableRows({ s, pearl, accent }: { s: SectionBase; pearl: ProductKey; accent: boolean }) {
  const eb = cleanEyebrow(s.eyebrow);
  const baseIdx = PRODUCT_KEYS.indexOf(pearl);
  const rows: Array<[string, string]> = [
    ["Founded", String(FACTS.foundingYear)],
    ["Category", FACTS.category],
    ["US parent", `${BRAND.parentEntity} · ${BRAND.parentEntityLocation}`],
    ["AI unit", `${BRAND.aiEntity} · ${BRAND.aiEntityLocation}`],
    ["Serbian subsidiary", `${BRAND.legalEntity} · ${BRAND.legalEntityLocation}`],
    ["Team shape", FACTS.teamShape],
  ];
  return (
    <section className={`mkt mkt-section ${accent ? "mkt-section--accented" : ""}`} aria-labelledby={`h-${s.id}`}>
      {accent && <SectionRail pearl={pearl} />}
      <div className="mkt-section__inner">
        <header className="mkt-products__head">
          {eb && <EyebrowChip pearl={pearl}>{eb}</EyebrowChip>}
          {s.h2 && (
            <h2
              id={`h-${s.id}`}
              className="mkt-h2"
              dangerouslySetInnerHTML={{ __html: s.h2 }}
            />
          )}
        </header>
        <ul className="mkt-factgrid">
          {rows.map(([label, value], i) => {
            const p = pearlAt(baseIdx + i);
            return (
              <li key={label} className={`mkt-fact mkt-fact--${p}`}>
                <span className={`mkt-fact__label mkt-fact__label--${p}`}>{label}</span>
                <p className="mkt-fact__value">{value}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ── Case study · aside + body, per-Pearl framed card ─────────── */

function CaseStudy({ s, pearl }: { s: SectionBase; pearl: ProductKey }) {
  const eb = cleanEyebrow(s.eyebrow);
  return (
    <section className="mkt mkt-section" aria-labelledby={`h-${s.id}`}>
      <div className="mkt-section__inner">
        <div className={`mkt-case mkt-case--${pearl}`}>
          <aside className="mkt-case__aside">
            <span className={`mkt-case__mark mkt-case__mark--${pearl}`} aria-hidden>
              <NebbosMark size={28} />
            </span>
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

/* ── Closing CTA · per-Pearl haloed closing block ────────────── */

function ClosingCTA({ s, pearl }: { s: SectionBase; pearl: ProductKey }) {
  const eb = cleanEyebrow(s.eyebrow);
  return (
    <section
      className={`mkt mkt-section mkt-closing mkt-closing--${pearl}`}
      aria-labelledby={`h-${s.id}`}
    >
      <div className="mkt-closing__inner">
        <span aria-hidden className={`mkt-tile__mark mkt-tile__mark--${pearl}`} style={{ marginBottom: 24 }}>
          <NebbosMark size={28} />
        </span>
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

/* ── Inbox router · label → email rows (unchanged shape, accent) ── */

function InboxRouter({ s, pearl, accent }: { s: SectionBase; pearl: ProductKey; accent: boolean }) {
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
    <section className={`mkt mkt-section ${accent ? "mkt-section--accented" : ""}`} aria-labelledby={`h-${s.id}`}>
      {accent && <SectionRail pearl={pearl} />}
      <div className="mkt-section__inner">
        {(eb || s.h2) && (
          <header className="mkt-products__head">
            {eb && <EyebrowChip pearl={pearl}>{eb}</EyebrowChip>}
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

export { HERO_KINDS, CTA_KINDS };
