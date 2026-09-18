import { Fragment } from "react";
import Link from "next/link";
import type { Page, SectionBase } from "@/content/pages";
import { SectionNumeral } from "@/components/ui/SectionNumeral";
import { FullBleedScene } from "@/components/site/FullBleedScene";
import { SceneStill } from "@/components/ui/SceneStill";
import { Button } from "@/components/ui/Button";
import { SectionDivider } from "@/components/patterns/section-divider";
import { CONTACT, mailto } from "@/content/contact";
import { FACTS } from "@/content/facts";
import { BRAND } from "@/content/brand";

/**
 * PageRenderer · v4 · 2026-09-18 · section-composition doctrine applied
 *
 * v3 rendered every section from content/pages.ts using CSS classes with
 * automatic paper/paper-2 background alternation. That fixed ground-monotony
 * (Rule 5) but left the boundary between sections monotonous — every seam
 * a bare hairline, no cadence for the eye.
 *
 * v4 applies docs/design/section-composition.md:
 *   - Rule 3 · Boundary marker cadence — every ~third boundary between
 *     block sections carries a visible SectionDivider marker (chapter
 *     numeral derived from the section eyebrow + short strap).
 *   - Rule 5 · Ground alternation (already in v3 via bgClass).
 *
 * The cadence rule: for block sections at index 0, 3, 6, 9, ... the
 * boundary ABOVE gets a marker (except index 0, which sits directly under
 * the hero and needs no divider). Other block boundaries get a hairline
 * divider — invisible but explicit in the JSX so composition audits can
 * see every seam.
 *
 * Hero sections (hero-full-bleed, hero-paper, cta-full-bleed) still own
 * their own boundaries — no divider between them and adjacent sections.
 */

const HERO_KINDS = new Set(["hero-full-bleed", "hero-paper", "cta-full-bleed"]);
const CADENCE = 3; // Every 3rd block boundary carries a marker.

function chapterFromEyebrow(eyebrow?: string): string | undefined {
  if (!eyebrow) return undefined;
  // Eyebrow shape: "05 · Signals it watches" — take the numeric prefix.
  const match = eyebrow.match(/^\s*(\d{1,3})\s*·/);
  return match ? match[1] : undefined;
}

function strapFromEyebrow(eyebrow?: string): string | undefined {
  if (!eyebrow) return undefined;
  const parts = eyebrow.split(" · ");
  return parts.slice(1).join(" · ") || undefined;
}

export function PageRenderer({ page }: { page: Page }) {
  let blockIdx = 0;
  return (
    <>
      {page.sections.map((section, i) => {
        const isBlock = !HERO_KINDS.has(section.kind);
        const idx = isBlock ? blockIdx : -1;
        if (isBlock) blockIdx += 1;

        // Cadence divider: emit BEFORE this section when it is a block
        // section at cadence index (3, 6, 9, …). Skip index 0 (sits directly
        // under the hero — page-composition doctrine says the hero-to-first-
        // block seam is silent, not marked). Skip when the previous section
        // was a hero (self-owned boundary).
        const prev = page.sections[i - 1];
        const prevWasHero = prev ? HERO_KINDS.has(prev.kind) : false;
        const wantsMarker = isBlock && idx > 0 && idx % CADENCE === 0 && !prevWasHero;

        return (
          <Fragment key={section.id}>
            {wantsMarker ? (
              <SectionDivider
                chapter={chapterFromEyebrow(section.eyebrow)}
                strap={strapFromEyebrow(section.eyebrow)}
              />
            ) : null}
            <SectionSlot section={section} blockIndex={idx} />
          </Fragment>
        );
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

function sectionSceneSource(s: SectionBase) {
  if (s.imageFamily) return { imageFamily: s.imageFamily, imageFamilyVariant: s.imageFamilyVariant };
  if (s.imageV3) return { imageV3: s.imageV3 };
  if (s.imageV2) return { imageV2: s.imageV2 };
  if (s.imageScene) return { imageScene: s.imageScene, sceneVariant: 1 as const };
  if (s.imagePerspective) return { imagePerspective: s.imagePerspective };
  return undefined;
}

function ctaSceneSource(s: SectionBase) {
  if (s.imageFamily) return { imageFamily: s.imageFamily, imageFamilyVariant: s.imageFamilyVariant };
  if (s.imageV2) return { imageV2: s.imageV2 };
  if (s.imageScene) return { imageScene: s.imageScene, sceneVariant: 4 as const };
  if (s.imagePerspective) return { imagePerspective: s.imagePerspective };
  return undefined;
}

/* ── Hero: full-bleed image + overlaid h1 ─────────────────────────── */
function HeroFullBleed({ s }: { s: SectionBase }) {
  return (
    <FullBleedScene
      className="hero-fullbleed"
      scene={sectionSceneSource(s)}
      scrim="bottom"
      vignetteStrength={0.5}
      chapter="I"
      chapterLabel={s.eyebrow}
      chapterPosition="top-right"
      priority
    >
      <div className="container hero-fullbleed__inner">
        <div className="hero-fullbleed__frame">
          {s.h1 && <h1 className="hero-fullbleed__title" dangerouslySetInnerHTML={{ __html: s.h1 }} />}
          {s.deck && <p className="hero-fullbleed__deck" dangerouslySetInnerHTML={{ __html: s.deck }} />}
        </div>
      </div>
    </FullBleedScene>
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
  const hasImage = !!s.imageFamily;
  const content = (
    <div className="block-inner">
      {eb && <SectionNumeral n={eb.n} label={eb.label} />}
      {s.h2 && <h2 className="block__title" dangerouslySetInnerHTML={{ __html: s.h2 }} />}
      {s.body && <p className="block__body" dangerouslySetInnerHTML={{ __html: s.body }} />}
    </div>
  );
  return (
    <section className={`section ${bgClass(blockIndex)}`}>
      <div className="container">
        {hasImage ? (
          <div className={`split-frame ${blockIndex % 2 === 1 ? "split-frame--reverse" : ""}`}>
            <div className="split-frame__image">
              <SceneStill
                family={s.imageFamily!}
                familyVariant={s.imageFamilyVariant ?? 1}
                shape="fullBleed"
              />
            </div>
            <div className="split-frame__content">{content}</div>
          </div>
        ) : (
          content
        )}
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
    ["US parent", `${BRAND.parentEntity} · ${BRAND.parentEntityLocation}`],
    ["AI unit", `${BRAND.aiEntity} · ${BRAND.aiEntityLocation}`],
    ["Serbian subsidiary", `${BRAND.legalEntity} · ${BRAND.legalEntityLocation}`],
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
    <FullBleedScene
      className="cta-fullbleed"
      scene={ctaSceneSource(s)}
      scrim="left"
      vignetteStrength={0.5}
      chapter="VII"
      chapterLabel={s.eyebrow}
      chapterPosition="top-right"
    >
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
    </FullBleedScene>
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
