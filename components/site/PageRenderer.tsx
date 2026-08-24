import Link from "next/link";
import type { Page, SectionBase } from "@/content/pages";
import { SectionNumeral } from "@/components/ui/SectionNumeral";
import { SceneStill } from "@/components/ui/SceneStill";
import { SceneOverlay, SceneMetadataPlate } from "@/components/ui/SceneOverlay";
import { Button } from "@/components/ui/Button";
import { CONTACT, mailto } from "@/content/contact";
import { FACTS } from "@/content/facts";
import { BRAND } from "@/content/brand";

/**
 * PageRenderer · v3 · reads content/pages.ts and renders every section by kind.
 *
 * Every renderer composes from CSS classes defined in app/globals.css — no
 * inline styles, no hex literals, no magic numbers. Design tokens are the
 * single source of truth; changing a token in globals moves every section on
 * every page in lockstep.
 *
 * Block-level sections (text-block, split-columns, list-numbered, list-plain,
 * table-rows, cta-band, inbox-router) receive a computed `blockIndex` so
 * paper / paper-2 backgrounds alternate per section — no more four-in-a-row
 * paper walls on 14-section vertical pages.
 *
 * Hero sections (hero-full-bleed, hero-paper, cta-full-bleed) own their
 * background and do not participate in alternation.
 */

const HERO_KINDS = new Set(["hero-full-bleed", "hero-paper", "cta-full-bleed"]);

export function PageRenderer({ page }: { page: Page }) {
  let blockIdx = 0;
  return (
    <>
      {page.sections.map((section) => {
        const isBlock = !HERO_KINDS.has(section.kind);
        const idx = isBlock ? blockIdx : -1;
        if (isBlock) blockIdx += 1;
        return <SectionSlot key={section.id} section={section} blockIndex={idx} />;
      })}
    </>
  );
}

type SlotProps = { section: SectionBase; blockIndex: number };

function SectionSlot({ section, blockIndex }: SlotProps) {
  switch (section.kind) {
    case "hero-full-bleed": return <HeroFullBleed s={section} />;
    case "hero-paper":      return <HeroPaper s={section} />;
    case "text-block":      return <TextBlock s={section} blockIndex={blockIndex} />;
    case "split-columns":   return <SplitColumns s={section} blockIndex={blockIndex} />;
    case "list-numbered":   return <ListNumbered s={section} blockIndex={blockIndex} />;
    case "list-plain":      return <ListPlain s={section} blockIndex={blockIndex} />;
    case "table-rows":      return <TableRows s={section} blockIndex={blockIndex} />;
    case "case-study":      return <CaseStudy s={section} blockIndex={blockIndex} />;
    case "cta-band":        return <CTABandInline s={section} blockIndex={blockIndex} />;
    case "cta-full-bleed":  return <CTAFullBleed s={section} />;
    case "inbox-router":    return <InboxRouter s={section} blockIndex={blockIndex} />;
    case "empty-state":     return <HeroPaper s={section} />;
    case "band-overview":   return null;
    case "story-triptych":  return null;
    default:                return null;
  }
}

/* ── Helpers ──────────────────────────────────────────────────────────── */

function bgClass(blockIndex: number): string {
  return blockIndex % 2 === 0 ? "section--paper" : "section--paper-2";
}

function eyebrowParts(eyebrow?: string): { n: string; label: string } | null {
  if (!eyebrow) return null;
  const parts = eyebrow.split(" · ");
  return { n: parts[0] ?? "00", label: parts.slice(1).join(" · ") || eyebrow };
}

function heroImage(s: SectionBase) {
  if (s.imageFamily) {
    return <SceneStill family={s.imageFamily} familyVariant={s.imageFamilyVariant ?? 1} shape="fullBleed" priority />;
  }
  if (s.imageV3) return <SceneStill v3Scene={s.imageV3} v3Variant={1} shape="fullBleed" priority />;
  if (s.imageV2) return <SceneStill v2Scene={s.imageV2} v2Variant={1} shape="fullBleed" priority />;
  if (s.imageScene) return <SceneStill scene={s.imageScene} variant={1} shape="fullBleed" priority />;
  if (s.imagePerspective) {
    return <SceneStill perspective={s.imagePerspective as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9} pVariant={1} shape="fullBleed" priority />;
  }
  return null;
}

function ctaImage(s: SectionBase) {
  if (s.imageFamily) {
    return <SceneStill family={s.imageFamily} familyVariant={s.imageFamilyVariant ?? 1} shape="fullBleed" />;
  }
  if (s.imageV2) return <SceneStill v2Scene={s.imageV2} v2Variant={1} shape="fullBleed" />;
  if (s.imageScene) return <SceneStill scene={s.imageScene} variant={4} shape="fullBleed" />;
  if (s.imagePerspective) {
    return <SceneStill perspective={s.imagePerspective as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9} pVariant={1} shape="fullBleed" />;
  }
  return null;
}

/* ── Hero: full-bleed image + overlaid h1 ─────────────────────────── */
function HeroFullBleed({ s }: { s: SectionBase }) {
  const eb = eyebrowParts(s.eyebrow);
  return (
    <section className="hero-fullbleed">
      {heroImage(s)}
      <SceneOverlay scrim="bottom" vignetteStrength={0.5} />
      {eb && <SceneMetadataPlate chapter="I" label={s.eyebrow ?? eb.label} position="top-right" />}
      <div className="container hero-fullbleed__inner">
        <div className="hero-fullbleed__frame">
          {s.h1 && <h1 className="hero-fullbleed__title" dangerouslySetInnerHTML={{ __html: s.h1 }} />}
          {s.deck && <p className="hero-fullbleed__deck" dangerouslySetInnerHTML={{ __html: s.deck }} />}
        </div>
      </div>
    </section>
  );
}

/* ── Hero: paper (text-only, no image) ─────────────────────────────── */
function HeroPaper({ s }: { s: SectionBase }) {
  if (s.imageFamily || s.imageV3 || s.imageV2 || s.imageScene || s.imagePerspective) {
    return <HeroFullBleed s={s} />;
  }
  const eb = eyebrowParts(s.eyebrow);
  return (
    <section className="hero-paper">
      <div className="container-narrow">
        {eb && <SectionNumeral n={eb.n} label={eb.label} />}
        {s.h1 && <h1 className="hero-paper__title" dangerouslySetInnerHTML={{ __html: s.h1 }} />}
        {s.deck && <p className="hero-paper__deck" dangerouslySetInnerHTML={{ __html: s.deck }} />}
        {s.ctaPrimary && (
          <div className="hero-paper__cta">
            <Button href={s.ctaPrimary.href} variant={s.ctaPrimary.variant ?? "primary"} size="lg">
              {s.ctaPrimary.label}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Text block · numbered section-h2 + body ─────────────────────── */
function TextBlock({ s, blockIndex }: { s: SectionBase; blockIndex: number }) {
  const eb = eyebrowParts(s.eyebrow);
  return (
    <section className={`section ${bgClass(blockIndex)}`}>
      <div className="container">
        <div className="block-inner">
          {eb && <SectionNumeral n={eb.n} label={eb.label} />}
          {s.h2 && <h2 className="block__title" dangerouslySetInnerHTML={{ __html: s.h2 }} />}
          {s.body && <p className="block__body" dangerouslySetInnerHTML={{ __html: s.body }} />}
        </div>
      </div>
    </section>
  );
}

/* ── Split · two-column with heading + items list ─────────────────── */
function SplitColumns({ s, blockIndex }: { s: SectionBase; blockIndex: number }) {
  const eb = eyebrowParts(s.eyebrow);
  return (
    <section className={`section ${bgClass(blockIndex)}`}>
      <div className="container">
        <div className="split">
          <div>
            {eb && <SectionNumeral n={eb.n} label={eb.label} />}
            {s.h2 && <h2 className="block__title" dangerouslySetInnerHTML={{ __html: s.h2 }} />}
            {s.deck && <p className="block__deck" dangerouslySetInnerHTML={{ __html: s.deck }} />}
          </div>
          <div>
            <PlainList items={s.items ?? []} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── List: numbered ──────────────────────────────────────────────── */
function ListNumbered({ s, blockIndex }: { s: SectionBase; blockIndex: number }) {
  const eb = eyebrowParts(s.eyebrow);
  return (
    <section className={`section ${bgClass(blockIndex)}`}>
      <div className="container">
        <div className="block-inner">
          {eb && <SectionNumeral n={eb.n} label={eb.label} />}
          {s.h2 && <h2 className="block__title" dangerouslySetInnerHTML={{ __html: s.h2 }} />}
          <ol className="list-numbered">
            {(s.items ?? []).map((item, i) => (
              <li key={item.title} className="list-numbered__item">
                <span className="list-numbered__index">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div className="list-numbered__title" dangerouslySetInnerHTML={{ __html: item.title }} />
                  {item.body && <p className="list-numbered__body" dangerouslySetInnerHTML={{ __html: item.body }} />}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function PlainList({ items }: { items: SectionBase["items"] }) {
  if (!items?.length) return null;
  return (
    <ul className="list-plain">
      {items.map((item) => (
        <li key={item.title} className="list-plain__item" dangerouslySetInnerHTML={{ __html: item.title }} />
      ))}
    </ul>
  );
}

/* ── List: plain (no numbers) ─────────────────────────────────────── */
function ListPlain({ s, blockIndex }: { s: SectionBase; blockIndex: number }) {
  const eb = eyebrowParts(s.eyebrow);
  const items = (s.items ?? []).length === 0 && s.h2?.toLowerCase().includes("build")
    ? FACTS.productLine.map((title) => ({ title }))
    : (s.items ?? []);
  return (
    <section className={`section ${bgClass(blockIndex)}`}>
      <div className="container">
        <div className="block-inner">
          {eb && <SectionNumeral n={eb.n} label={eb.label} />}
          {s.h2 && <h2 className="block__title" dangerouslySetInnerHTML={{ __html: s.h2 }} />}
          <PlainList items={items} />
        </div>
      </div>
    </section>
  );
}

/* ── Table rows · label + value pairs (facts, specs) ─────────────── */
function TableRows({ s, blockIndex }: { s: SectionBase; blockIndex: number }) {
  const eb = eyebrowParts(s.eyebrow);
  const rows: Array<[string, string]> = [
    ["Founded", String(FACTS.foundingYear)],
    ["Category", FACTS.category],
    ["Legal entity", BRAND.legalEntity],
    ["Jurisdiction", FACTS.jurisdiction],
    ["Team shape", FACTS.teamShape],
  ];
  return (
    <section className={`section ${bgClass(blockIndex)}`}>
      <div className="container">
        <div className="block-inner">
          {eb && <SectionNumeral n={eb.n} label={eb.label} />}
          {s.h2 && <h2 className="block__title" dangerouslySetInnerHTML={{ __html: s.h2 }} />}
          <dl className="rows-table">
            {rows.map(([label, value]) => (
              <div key={label} className="rows-table__row">
                <dt className="rows-table__dt">{label}</dt>
                <dd className="rows-table__dd">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ── Case study · aside + quoted-italic narrative ─────────────────── */
function CaseStudy({ s, blockIndex }: { s: SectionBase; blockIndex: number }) {
  const eb = eyebrowParts(s.eyebrow);
  return (
    <section className={`section ${bgClass(blockIndex)}`}>
      <div className="container">
        <div className="case-study-layout">
          <aside className="case-study__aside">
            <div className="case-study__eyebrow">
              {eb ? `${eb.n} · ${eb.label}` : "Case study"}
            </div>
            {s.h2 && <h3 className="case-study__subject" dangerouslySetInnerHTML={{ __html: s.h2 }} />}
          </aside>
          {s.body && <div className="case-study__body" dangerouslySetInnerHTML={{ __html: s.body }} />}
        </div>
      </div>
    </section>
  );
}

/* ── CTA band (inline, paper) ─────────────────────────────────────── */
function CTABandInline({ s, blockIndex }: { s: SectionBase; blockIndex: number }) {
  return (
    <section className={`section section--cta ${bgClass(blockIndex)}`}>
      <div className="container cta-band-inline">
        {s.h2 && <p className="cta-band-inline__title" dangerouslySetInnerHTML={{ __html: s.h2 }} />}
        <div className="cta-band-inline__actions">
          {s.ctaPrimary && (
            <Button href={s.ctaPrimary.href} variant={s.ctaPrimary.variant ?? "primary"} size="lg">
              {s.ctaPrimary.label}
            </Button>
          )}
          {s.ctaSecondary && (
            <Button href={s.ctaSecondary.href} variant={s.ctaSecondary.variant ?? "ghost"} size="lg">
              {s.ctaSecondary.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── CTA full-bleed (over an image) ──────────────────────────────── */
function CTAFullBleed({ s }: { s: SectionBase }) {
  return (
    <section className="cta-fullbleed">
      {ctaImage(s)}
      <SceneOverlay scrim="left" vignetteStrength={0.5} />
      {s.eyebrow && <SceneMetadataPlate chapter="VII" label={s.eyebrow} position="top-right" />}
      <div className="container cta-fullbleed__inner">
        <div className="cta-fullbleed__frame">
          {s.h2 && <h2 className="cta-fullbleed__title" dangerouslySetInnerHTML={{ __html: s.h2 }} />}
          {s.deck && <p className="cta-fullbleed__deck" dangerouslySetInnerHTML={{ __html: s.deck }} />}
          <div className="cta-fullbleed__actions">
            {s.ctaPrimary && (
              <Button href={s.ctaPrimary.href} variant={s.ctaPrimary.variant ?? "solid-light"} size="lg">
                {s.ctaPrimary.label}
              </Button>
            )}
            {s.ctaSecondary && (
              <Button href={s.ctaSecondary.href} variant={s.ctaSecondary.variant ?? "ghost-light"} size="lg" arrow={false}>
                {s.ctaSecondary.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Inbox router (contact / demo) ───────────────────────────────── */
function InboxRouter({ s, blockIndex }: { s: SectionBase; blockIndex: number }) {
  const eb = eyebrowParts(s.eyebrow);
  const inboxes = [
    { label: "General",     addr: CONTACT.general,    strap: "Sales, partnerships, misc." },
    { label: "Enterprise",  addr: CONTACT.enterprise, strap: "SOWs, MSAs, DPAs, procurement." },
    { label: "Engineering", addr: CONTACT.engineering, strap: "Developer + integration questions." },
    { label: "Security",    addr: CONTACT.security,   strap: "Vulnerability reports + incident notification." },
    { label: "Privacy",     addr: CONTACT.privacy,    strap: "Data-protection officer, GDPR, DSARs." },
    { label: "Legal",       addr: CONTACT.legal,      strap: "DPA / policy questions." },
    { label: "Press",       addr: CONTACT.press,      strap: "Journalist / analyst inquiries." },
  ];
  return (
    <section className={`section ${bgClass(blockIndex)}`}>
      <div className="container">
        {(eb || s.h2) && (
          <div className="block-inner block-inner--framed">
            {eb && <SectionNumeral n={eb.n} label={eb.label} />}
            {s.h2 && <h2 className="block__title" dangerouslySetInnerHTML={{ __html: s.h2 }} />}
            {s.deck && <p className="block__deck" dangerouslySetInnerHTML={{ __html: s.deck }} />}
          </div>
        )}
        <ul className="inbox-list">
          {inboxes.map((inbox) => (
            <li key={inbox.addr}>
              <Link href={mailto(inbox.addr)} className="inbox-list__row">
                <div className="inbox-list__label">{inbox.label}</div>
                <div>
                  <div className="inbox-list__addr">{inbox.addr}</div>
                  <div className="inbox-list__strap">{inbox.strap}</div>
                </div>
                <div aria-hidden className="inbox-list__caret">→</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
