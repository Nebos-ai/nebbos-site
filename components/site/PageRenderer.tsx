import { Fragment, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { NebbosMark } from "@nebbos/brand/logo";
import type { Page, SectionBase } from "@/content/pages";
import { CONTACT, mailto } from "@/content/contact";
import { FACTS } from "@/content/facts";
import { BRAND } from "@/content/brand";
import { PageHero as Hero } from "@/components/marketing/PageHero";
import { PearlMosaic } from "@/components/marketing/PearlMosaic";
import { ClosingCta } from "@/components/marketing/ClosingCta";
import { Eyebrow, GhostCta, PrimaryCta, Section, deck as deckClass, headline } from "@/components/marketing/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ScrollBeam } from "@/components/motion/ScrollBeam";
import { cn } from "@/lib/cn";

/**
 * PageRenderer · v7 · 2026-09-23 · Tailwind + Motion redesign
 *
 * Renders every content/pages.ts page (solutions verticals, trust,
 * security, compliance, sovereignty, about, careers, docs, changelog,
 * status, press, legal) in the same language as the home and product
 * pages. Visual only: copy, section order and the sales-density cap are
 * unchanged; every string (including trusted CMS HTML) renders verbatim.
 *
 * Kept from v6: the Pearl-colour cycle per accented section, the three
 * rotating text-block shapes (banner / card / mirror card) so copy-only
 * runs never read as the same block twice, and the mark + chip anchor on
 * every section header.
 *
 * v7 shapes:
 *   hero          PageHero + PearlMosaic
 *   text-block    banner (tinted statement panel) · bezel split card · mirror
 *   list-numbered alternates: 2-column numbered cards · single-column
 *                 rail with a scroll-filled beam (so runs of lists vary)
 *   list-plain    tinted tile grid
 *   split-columns sticky heading + tile grid
 *   table-rows    fact cards
 *   case-study    split bezel card
 *   inbox-router  header-style menu rows
 *   cta           shared ClosingCta with the section's Pearl tile
 */

const PRODUCT_KEYS = ["platform", "app", "mcp", "cradle"] as const;
type ProductKey = (typeof PRODUCT_KEYS)[number];

const TINT: Record<ProductKey, string> = {
  platform: "var(--color-platform)",
  app: "var(--color-app)",
  mcp: "var(--color-mcp)",
  cradle: "var(--color-cradle)",
};

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
            <SectionSlot section={section} pearl={pearl} index={idx} />
          </Fragment>
        );
      })}
    </>
  );
}

type SlotProps = { section: SectionBase; pearl: ProductKey; index: number };

function SectionSlot({ section, pearl, index }: SlotProps) {
  switch (section.kind) {
    case "hero-full-bleed":
    case "hero-paper":
    case "empty-state":
      return <PageHero s={section} />;
    case "text-block":     return <TextBlock s={section} pearl={pearl} index={index} />;
    case "split-columns":  return <SplitColumns s={section} pearl={pearl} />;
    case "list-numbered":  return <ListNumbered s={section} pearl={pearl} index={index} />;
    case "list-plain":     return <ListPlain s={section} pearl={pearl} />;
    case "table-rows":     return <TableRows s={section} pearl={pearl} />;
    case "case-study":     return <CaseStudy s={section} pearl={pearl} />;
    case "cta-band":
    case "cta-full-bleed": return <ClosingCTA s={section} pearl={pearl} />;
    case "inbox-router":   return <InboxRouter s={section} pearl={pearl} />;
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

const tintStyle = (pearl: ProductKey) => ({ "--tint": TINT[pearl], "--spot": TINT[pearl] }) as CSSProperties;
const h2Class = cn(headline, "text-[clamp(2rem,4.2vw,3.5rem)]");

function MarkTile({ size = "md" }: { size?: "sm" | "md" }) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center bg-[var(--tint)] text-white shadow-[0_12px_30px_-8px_var(--tint),inset_0_1px_0_rgb(255_255_255/0.35)]",
        size === "md" ? "size-11 rounded-[0.85rem]" : "size-9 rounded-[0.7rem]",
      )}
      aria-hidden
    >
      <NebbosMark size={size === "md" ? 24 : 20} />
    </span>
  );
}

/* Shared section header · mark tile + eyebrow chip meta row + h2.
   Founder-caught 2026-09-19 T11:38 UTC: every section header carries the
   same [mark] + [chip] meta row so pages feel anchored everywhere. */
function SectionHead({
  id,
  eyebrow,
  title,
  align = "start",
  children,
}: {
  id: string;
  eyebrow?: string;
  title?: string;
  align?: "start" | "center";
  children?: ReactNode;
}) {
  if (!eyebrow && !title) return null;
  return (
    <Reveal as="header" className={cn("flex max-w-3xl flex-col gap-6", align === "center" ? "mx-auto items-center text-center" : "items-start")}>
      <div className="flex items-center gap-3">
        <MarkTile size="sm" />
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      </div>
      {title && <h2 id={id} className={h2Class} dangerouslySetInnerHTML={{ __html: title }} />}
      {children}
    </Reveal>
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
    <>
      {primary &&
        (primary.variant === "ghost" || primary.variant === "ghost-light" ? (
          <GhostCta href={primary.href} arrow>
            {primary.label}
          </GhostCta>
        ) : (
          <PrimaryCta href={primary.href}>{primary.label}</PrimaryCta>
        ))}
      {secondary &&
        (secondary.variant === "primary" || secondary.variant === "solid-light" ? (
          <PrimaryCta href={secondary.href} arrow={false}>
            {secondary.label}
          </PrimaryCta>
        ) : (
          <GhostCta href={secondary.href}>{secondary.label}</GhostCta>
        ))}
    </>
  );
}

/* ── Hero · PageHero + Pearl mosaic ──────────────────────────────── */

function PageHero({ s }: { s: SectionBase }) {
  const eb = cleanEyebrow(s.eyebrow);
  const hasCtas = !!(s.ctaPrimary || s.ctaSecondary);
  return (
    <Hero
      id={`h-${s.id}`}
      eyebrow={eb}
      titleHtml={s.h1}
      deckHtml={s.deck}
      ctas={hasCtas ? <CTAButtons primary={s.ctaPrimary} secondary={s.ctaSecondary} /> : undefined}
      visual={<PearlMosaic />}
    />
  );
}

/* ── Text block · three rotating shapes ───────────────────────────
     index % 3 === 0 → banner statement (tinted panel, centred display)
     index % 3 === 1 → split card (anchor LEFT, copy right)
     index % 3 === 2 → mirror card (copy LEFT, anchor right)
   Deterministic per section position so pages look the same on reload. */

function TextBlock({ s, pearl, index }: { s: SectionBase; pearl: ProductKey; index: number }) {
  const shape = index % 3;
  if (shape === 0) return <TextBlockBanner s={s} pearl={pearl} />;
  return <TextBlockCard s={s} pearl={pearl} mirror={shape === 2} />;
}

function TextBlockBanner({ s, pearl }: { s: SectionBase; pearl: ProductKey }) {
  const eb = cleanEyebrow(s.eyebrow);
  return (
    <section className="mkt relative px-4 py-16 sm:px-6 md:py-24" aria-labelledby={`h-${s.id}`} style={tintStyle(pearl)}>
      <Reveal className="mx-auto max-w-[1240px]">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-ground-2 px-6 py-16 text-center ring-1 ring-rule ring-inset md:px-16 md:py-24">
          <span aria-hidden className="grid-field pointer-events-none absolute inset-0 -z-10 opacity-70" />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_80%_at_50%_0%,color-mix(in_srgb,var(--tint)_24%,transparent),transparent_70%)]"
          />
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
            <div className="flex items-center gap-3">
              <MarkTile size="sm" />
              {eb && <Eyebrow>{eb}</Eyebrow>}
            </div>
            {s.h2 && (
              <h2
                id={`h-${s.id}`}
                className={cn(headline, "text-[clamp(2.25rem,5vw,4rem)] leading-[1.02]")}
                dangerouslySetInnerHTML={{ __html: s.h2 }}
              />
            )}
            {s.body && (
              <div className="prose-mkt mx-auto text-[17px] [&_p]:mx-auto" dangerouslySetInnerHTML={{ __html: s.body }} />
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function TextBlockCard({ s, pearl, mirror }: { s: SectionBase; pearl: ProductKey; mirror: boolean }) {
  const eb = cleanEyebrow(s.eyebrow);
  return (
    <Section labelledBy={`h-${s.id}`} className="py-16 md:py-24 lg:py-24">
      <Reveal className="bezel" amount={0.2}>
        <article
          className="bezel-core grid gap-8 overflow-hidden p-7 md:grid-cols-12 md:gap-10 md:p-12"
          style={tintStyle(pearl)}
        >
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute size-80 rounded-full bg-[var(--tint)] opacity-[0.16] blur-[100px]",
              mirror ? "-right-24 -top-24" : "-left-24 -top-24",
            )}
          />
          <aside className={cn("relative flex flex-col items-start gap-4 md:col-span-4", mirror && "md:order-2 md:items-end md:text-right")}>
            <MarkTile />
            {eb && <Eyebrow>{eb}</Eyebrow>}
          </aside>
          <div className={cn("relative flex flex-col gap-5 md:col-span-8", mirror && "md:order-1")}>
            {s.h2 && <h2 id={`h-${s.id}`} className={h2Class} dangerouslySetInnerHTML={{ __html: s.h2 }} />}
            {s.body && <div className="prose-mkt" dangerouslySetInnerHTML={{ __html: s.body }} />}
          </div>
        </article>
      </Reveal>
    </Section>
  );
}

/* ── Tile grid · shared tinted card grid for list-plain + split ────── */

function TileGrid({ items, basePearl, cols = 3 }: { items: SectionBase["items"]; basePearl: ProductKey; cols?: 2 | 3 }) {
  if (!items?.length) return null;
  const baseIdx = PRODUCT_KEYS.indexOf(basePearl);
  return (
    <Stagger
      as="ul"
      className={cn("m-0 grid list-none gap-4 p-0 sm:grid-cols-2", cols === 3 && "lg:grid-cols-3")}
      step={0.06}
    >
      {items.map((item, i) => {
        const pearl = pearlAt(baseIdx + i);
        return (
          <StaggerItem
            key={item.title}
            as="li"
            className="spotlight relative flex flex-col gap-4 overflow-hidden rounded-[1.4rem] bg-ground-2 p-6 ring-1 ring-rule ring-inset"
          >
            <div style={tintStyle(pearl)} className="contents">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(90%_100%_at_15%_0%,color-mix(in_srgb,var(--tint)_20%,transparent),transparent_70%)]"
              />
              <span className="relative">
                <MarkTile size="sm" />
              </span>
              <div className="relative flex flex-col gap-2">
                <p className="m-0 font-display text-lg font-medium tracking-tight text-ink" dangerouslySetInnerHTML={{ __html: item.title }} />
                {item.body && (
                  <p className="m-0 text-[14px] leading-relaxed text-ink-3" dangerouslySetInnerHTML={{ __html: item.body }} />
                )}
              </div>
            </div>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}

/* ── Split columns · sticky heading + tile grid ─────────────────── */

function SplitColumns({ s, pearl }: { s: SectionBase; pearl: ProductKey }) {
  const eb = cleanEyebrow(s.eyebrow);
  return (
    <Section labelledBy={`h-${s.id}`}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10" style={tintStyle(pearl)}>
        <div className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <SectionHead id={`h-${s.id}`} eyebrow={eb} title={s.h2}>
            {s.deck && <p className={deckClass} dangerouslySetInnerHTML={{ __html: s.deck }} />}
          </SectionHead>
        </div>
        <div className="lg:col-span-7">
          <TileGrid items={s.items ?? []} basePearl={pearl} cols={2} />
        </div>
      </div>
    </Section>
  );
}

/* ── Numbered list · alternating shapes ──────────────────────────
     even accent index → 2-column numbered cards
     odd accent index  → single-column rail with a scroll-filled beam
   Solution pages carry four or five numbered lists in a row; alternating
   keeps consecutive lists from reading as the same block. */

function ListNumbered({ s, pearl, index }: { s: SectionBase; pearl: ProductKey; index: number }) {
  const eb = cleanEyebrow(s.eyebrow);
  const baseIdx = PRODUCT_KEYS.indexOf(pearl);
  const rail = index % 2 === 1;
  return (
    <Section labelledBy={`h-${s.id}`}>
      <div style={tintStyle(pearl)} className={cn(rail && "grid gap-12 lg:grid-cols-12 lg:gap-10")}>
        <div className={cn(rail && "lg:sticky lg:top-32 lg:col-span-5 lg:self-start")}>
          <SectionHead id={`h-${s.id}`} eyebrow={eb} title={s.h2} />
        </div>
        <div className={cn("relative", rail ? "lg:col-span-7" : "mt-14")}>
          {rail && <ScrollBeam className="left-[27px]" />}
          <Stagger
            as="ol"
            className={cn("relative m-0 grid list-none gap-4 p-0", !rail && "lg:grid-cols-2 lg:gap-x-5")}
            step={0.06}
          >
            {(s.items ?? []).map((item, i) => {
              const p = pearlAt(baseIdx + i);
              return (
                <StaggerItem key={item.title} as="li" className="relative grid grid-cols-[56px_1fr] gap-4">
                  <span
                    style={tintStyle(p)}
                    className={cn(
                      "relative z-10 grid size-14 place-items-center rounded-[1.1rem] bg-ground-3 font-code text-[15px] font-medium tabular-nums text-tint ring-1 ring-[color-mix(in_srgb,var(--tint)_40%,transparent)] ring-inset",
                      rail && "shadow-[0_0_0_6px_var(--color-ground)]",
                    )}
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div style={tintStyle(p)} className="spotlight relative rounded-[1.4rem] bg-ground-2 p-6 ring-1 ring-rule ring-inset">
                    <div
                      className="relative font-display text-lg font-medium tracking-tight text-ink"
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    />
                    {item.body && (
                      <p
                        className="relative m-0 mt-2 text-[15px] leading-relaxed text-ink-2"
                        dangerouslySetInnerHTML={{ __html: item.body }}
                      />
                    )}
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </Section>
  );
}

/* ── Plain list · tinted tile grid ───────────────────────────────── */

function ListPlain({ s, pearl }: { s: SectionBase; pearl: ProductKey }) {
  const eb = cleanEyebrow(s.eyebrow);
  const items =
    (s.items ?? []).length === 0 && s.h2?.toLowerCase().includes("build")
      ? FACTS.productLine.map((title) => ({ title }))
      : (s.items ?? []);
  return (
    <Section labelledBy={`h-${s.id}`}>
      <div style={tintStyle(pearl)}>
        <SectionHead id={`h-${s.id}`} eyebrow={eb} title={s.h2} />
        <div className="mt-14">
          <TileGrid items={items} basePearl={pearl} />
        </div>
      </div>
    </Section>
  );
}

/* ── Table rows · fact cards ─────────────────────────────────────── */

function TableRows({ s, pearl }: { s: SectionBase; pearl: ProductKey }) {
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
    <Section labelledBy={`h-${s.id}`}>
      <div style={tintStyle(pearl)}>
        <SectionHead id={`h-${s.id}`} eyebrow={eb} title={s.h2} />
        <Stagger as="ul" className="m-0 mt-14 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3" step={0.06}>
          {rows.map(([label, value], i) => {
            const p = pearlAt(baseIdx + i);
            return (
              <StaggerItem
                key={label}
                as="li"
                className="spotlight relative flex min-h-[150px] flex-col justify-between gap-6 rounded-[1.4rem] bg-ground-2 p-6 ring-1 ring-rule ring-inset"
              >
                <span style={tintStyle(p)} className="relative font-code text-[11px] font-medium uppercase tracking-label text-tint">
                  {label}
                </span>
                <p className="relative m-0 font-display text-xl font-medium leading-snug tracking-tight text-ink">{value}</p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </Section>
  );
}

/* ── Case study · split bezel card ───────────────────────────────── */

function CaseStudy({ s, pearl }: { s: SectionBase; pearl: ProductKey }) {
  const eb = cleanEyebrow(s.eyebrow);
  return (
    <Section labelledBy={`h-${s.id}`} className="py-16 md:py-24 lg:py-24">
      <Reveal className="bezel" amount={0.2}>
        <div className="bezel-core grid gap-8 overflow-hidden p-7 md:grid-cols-[1fr_1.6fr] md:gap-12 md:p-12" style={tintStyle(pearl)}>
          <span
            aria-hidden
            className="pointer-events-none absolute -left-24 -bottom-24 size-80 rounded-full bg-[var(--tint)] opacity-[0.18] blur-[100px]"
          />
          <aside className="relative flex flex-col items-start gap-4">
            <MarkTile />
            <Eyebrow>{eb ?? "Case study"}</Eyebrow>
            {s.h2 && (
              <h3
                id={`h-${s.id}`}
                className="m-0 font-display text-[clamp(1.6rem,2.6vw,2.25rem)] font-medium leading-[1.1] tracking-tight text-ink"
                dangerouslySetInnerHTML={{ __html: s.h2 }}
              />
            )}
          </aside>
          {s.body && <div className="prose-mkt relative" dangerouslySetInnerHTML={{ __html: s.body }} />}
        </div>
      </Reveal>
    </Section>
  );
}

/* ── Closing CTA · shared panel with the section's Pearl tile ─────── */

function ClosingCTA({ s, pearl }: { s: SectionBase; pearl: ProductKey }) {
  const eb = cleanEyebrow(s.eyebrow);
  return (
    <div style={tintStyle(pearl)}>
      <ClosingCta
        id={`h-${s.id}`}
        lead={<MarkTile />}
        eyebrow={eb}
        titleHtml={s.h2}
        deckHtml={s.deck}
        ctas={s.ctaPrimary || s.ctaSecondary ? <CTAButtons primary={s.ctaPrimary} secondary={s.ctaSecondary} /> : undefined}
      />
    </div>
  );
}

/* ── Inbox router · header-style menu rows ───────────────────────── */

function InboxRouter({ s, pearl }: { s: SectionBase; pearl: ProductKey }) {
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
    <Section labelledBy={`h-${s.id}`}>
      <div style={tintStyle(pearl)}>
        <SectionHead id={`h-${s.id}`} eyebrow={eb} title={s.h2}>
          {s.deck && <p className={deckClass} dangerouslySetInnerHTML={{ __html: s.deck }} />}
        </SectionHead>
        <Reveal className="bezel mt-14" amount={0.1}>
          <ul className="bezel-core m-0 grid list-none gap-1 p-2 md:p-3">
            {inboxes.map((inbox) => (
              <li key={inbox.addr}>
                <Link
                  href={mailto(inbox.addr)}
                  className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 rounded-chip px-4 py-4 transition-colors duration-300 hover:bg-white/[0.05] focus-visible:bg-white/[0.05] focus-visible:outline-2 focus-visible:outline-accent md:grid-cols-[180px_1fr_auto] md:px-5"
                >
                  <div className="font-code text-[11px] font-medium uppercase tracking-label text-ink-3">{inbox.label}</div>
                  <div className="col-span-2 row-start-2 md:col-span-1 md:row-start-auto">
                    <div className="font-display text-[16px] font-medium text-ink">{inbox.addr}</div>
                    <div className="mt-0.5 text-[14px] text-ink-3">{inbox.strap}</div>
                  </div>
                  <div className="row-start-1 text-ink-3 transition-colors group-hover:text-accent md:row-start-auto" aria-hidden>
                    →
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

export { HERO_KINDS, CTA_KINDS };
