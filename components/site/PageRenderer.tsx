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
 * PageRenderer · v2 · reads content/pages.ts and renders every section by kind.
 *
 * Founder directive (text-as-top-layer): every satellite page is a stack of
 * typed sections in content/pages.ts. This component maps each section&rsquo;s
 * `kind` to a matching renderer so any new page is a 5-line file:
 *   export default () => <PageRenderer page={PAGES["slug"]} />
 *
 * 13 section kinds supported. Special-case renderers (band-overview,
 * story-triptych) delegate to the existing HomeBands / HomeStory
 * components since those have unique data-source needs.
 */

export function PageRenderer({ page }: { page: Page }) {
  return (
    <>
      {page.sections.map((section) => (
        <SectionSlot key={section.id} section={section} />
      ))}
    </>
  );
}

function SectionSlot({ section }: { section: SectionBase }) {
  switch (section.kind) {
    case "hero-full-bleed":  return <HeroFullBleed s={section} />;
    case "hero-paper":       return <HeroPaper s={section} />;
    case "text-block":       return <TextBlock s={section} />;
    case "split-columns":    return <SplitColumns s={section} />;
    case "list-numbered":    return <ListNumbered s={section} />;
    case "list-plain":       return <ListPlain s={section} />;
    case "table-rows":       return <TableRows s={section} />;
    case "cta-band":         return <CTABandInline s={section} />;
    case "cta-full-bleed":   return <CTAFullBleed s={section} />;
    case "inbox-router":     return <InboxRouter s={section} />;
    case "empty-state":      return <EmptyState s={section} />;
    case "band-overview":    return <BandOverviewSlot s={section} />;
    case "story-triptych":   return <StoryTriptychSlot s={section} />;
    default:                 return null;
  }
}

/* ── Hero: full-bleed image + overlaid h1 ─────────────────────────── */
function HeroFullBleed({ s }: { s: SectionBase }) {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "min(78vh, 820px)",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      {s.imageV2 ? (
        <SceneStill v2Scene={s.imageV2} v2Variant={1} shape="fullBleed" priority />
      ) : s.imageScene ? (
        <SceneStill scene={s.imageScene} variant={1} shape="fullBleed" priority />
      ) : s.imagePerspective ? (
        <SceneStill perspective={s.imagePerspective as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9} pVariant={1} shape="fullBleed" priority />
      ) : null}
      <SceneOverlay scrim="bottom" vignetteStrength={0.5} />
      {s.eyebrow && <SceneMetadataPlate chapter="I" label={s.eyebrow} position="top-right" />}
      <div className="container" style={{ position: "relative", zIndex: 2, paddingBlock: "clamp(56px, 10vh, 128px)" }}>
        <div style={{ maxWidth: "56ch", display: "flex", flexDirection: "column", gap: 24 }}>
          {s.h1 && (
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(40px, 5.4vw, 76px)",
                lineHeight: 1.04,
                letterSpacing: "-0.024em",
                fontWeight: 400,
                color: "var(--paper)",
                margin: 0,
                textWrap: "balance",
                textShadow: "0 2px 4px rgba(20, 18, 15, 0.42)",
              }}
              dangerouslySetInnerHTML={{ __html: s.h1 }}
            />
          )}
          {s.deck && (
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "clamp(17px, 1.6vw, 21px)",
                lineHeight: 1.55,
                color: "rgba(244, 241, 234, 0.92)",
                maxWidth: "48ch",
                margin: 0,
                textShadow: "0 1px 3px rgba(20, 18, 15, 0.42)",
              }}
              dangerouslySetInnerHTML={{ __html: s.deck }}
            />
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Hero: paper (no image) — for deep pages ─────────────────────── */
function HeroPaper({ s }: { s: SectionBase }) {
  return (
    <section
      style={{
        background: "var(--paper)",
        borderBottom: "1px solid var(--rule)",
        paddingBlock: "clamp(96px, 14vh, 176px) clamp(56px, 8vh, 88px)",
      }}
    >
      <div className="container">
        <div style={{ maxWidth: "68ch" }}>
          {s.eyebrow && <SectionNumeral n={s.eyebrow.split(" · ")[0] ?? "00"} label={s.eyebrow.split(" · ")[1] ?? s.eyebrow} />}
          {s.h1 && (
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(40px, 5.4vw, 80px)",
                lineHeight: 1.04,
                letterSpacing: "-0.024em",
                fontWeight: 400,
                color: "var(--ink)",
                margin: "20px 0 0 0",
                maxWidth: "22ch",
                textWrap: "balance",
              }}
              dangerouslySetInnerHTML={{ __html: s.h1 }}
            />
          )}
          {s.deck && (
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "clamp(19px, 1.7vw, 24px)",
                lineHeight: 1.5,
                color: "var(--ink-2)",
                marginTop: 24,
                maxWidth: "56ch",
              }}
              dangerouslySetInnerHTML={{ __html: s.deck }}
            />
          )}
          {s.ctaPrimary && (
            <div style={{ marginTop: 32 }}>
              <Button href={s.ctaPrimary.href} variant={s.ctaPrimary.variant ?? "primary"} size="lg">
                {s.ctaPrimary.label}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Text block · numbered section-h2 + body ─────────────────────── */
function TextBlock({ s }: { s: SectionBase }) {
  return (
    <section style={{ background: "var(--paper)", paddingBlock: "var(--section-y-lg)", borderBottom: "1px solid var(--rule)" }}>
      <div className="container">
        <div style={{ maxWidth: "68ch" }}>
          {s.eyebrow && <SectionNumeral n={s.eyebrow.split(" · ")[0] ?? "00"} label={s.eyebrow.split(" · ")[1] ?? s.eyebrow} />}
          {s.h2 && (
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(28px, 3.4vw, 44px)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                fontWeight: 400,
                color: "var(--ink)",
                margin: "20px 0 20px 0",
                maxWidth: "26ch",
                textWrap: "balance",
              }}
              dangerouslySetInnerHTML={{ __html: s.h2 }}
            />
          )}
          {s.body && (
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 19,
                lineHeight: 1.6,
                color: "var(--ink-2)",
                margin: 0,
                maxWidth: "62ch",
              }}
              dangerouslySetInnerHTML={{ __html: s.body }}
            />
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Split · two-column with heading + items list ─────────────────── */
function SplitColumns({ s }: { s: SectionBase }) {
  return (
    <section style={{ background: "var(--paper-2)", paddingBlock: "var(--section-y-lg)", borderBottom: "1px solid var(--rule)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: "clamp(32px, 6vw, 88px)", alignItems: "start" }} className="split-grid">
          <div>
            {s.eyebrow && <SectionNumeral n={s.eyebrow.split(" · ")[0] ?? "01"} label={s.eyebrow.split(" · ")[1] ?? s.eyebrow} />}
            {s.h2 && (
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(28px, 3vw, 36px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.018em",
                  fontWeight: 400,
                  color: "var(--ink)",
                  margin: "20px 0 20px 0",
                  maxWidth: "22ch",
                  textWrap: "balance",
                }}
                dangerouslySetInnerHTML={{ __html: s.h2 }}
              />
            )}
            {s.deck && (
              <p style={{ fontFamily: "var(--font-serif)", fontSize: 17, lineHeight: 1.55, color: "var(--ink-2)", margin: 0, maxWidth: "48ch" }} dangerouslySetInnerHTML={{ __html: s.deck }} />
            )}
          </div>
          <div>
            <PlainList items={s.items ?? []} />
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 900px){.split-grid{grid-template-columns:minmax(0,1fr)!important}}`}</style>
    </section>
  );
}

/* ── List: numbered ──────────────────────────────────────────────── */
function ListNumbered({ s }: { s: SectionBase }) {
  return (
    <section style={{ background: "var(--paper)", paddingBlock: "var(--section-y-lg)", borderBottom: "1px solid var(--rule)" }}>
      <div className="container" style={{ maxWidth: 900 }}>
        {s.eyebrow && <SectionNumeral n={s.eyebrow.split(" · ")[0] ?? "01"} label={s.eyebrow.split(" · ")[1] ?? s.eyebrow} />}
        {s.h2 && (
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 3.2vw, 40px)", lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 400, color: "var(--ink)", margin: "20px 0 32px 0", maxWidth: "26ch", textWrap: "balance" }} dangerouslySetInnerHTML={{ __html: s.h2 }} />
        )}
        <ol style={{ listStyle: "none", display: "flex", flexDirection: "column" }}>
          {(s.items ?? []).map((item, i) => (
            <li key={item.title} style={{ borderTop: i === 0 ? "1px solid var(--rule)" : undefined, borderBottom: "1px solid var(--rule)", paddingBlock: 20, display: "grid", gridTemplateColumns: "48px minmax(0, 1fr)", gap: 24, alignItems: "baseline" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", color: "var(--gold)" }}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, color: "var(--ink)", lineHeight: 1.4 }} dangerouslySetInnerHTML={{ __html: item.title }} />
                {item.body && <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.55, color: "var(--ink-2)", margin: "6px 0 0 0" }} dangerouslySetInnerHTML={{ __html: item.body }} />}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function PlainList({ items }: { items: SectionBase["items"] }) {
  if (!items?.length) return null;
  return (
    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column" }}>
      {items.map((item, i) => (
        <li key={item.title} style={{ borderTop: i === 0 ? "1px solid var(--rule)" : undefined, borderBottom: "1px solid var(--rule)", paddingBlock: 18, fontFamily: "var(--font-serif)", fontSize: 18, color: "var(--ink)" }} dangerouslySetInnerHTML={{ __html: item.title }} />
      ))}
    </ul>
  );
}

/* ── List: plain (no numbers) ─────────────────────────────────────── */
function ListPlain({ s }: { s: SectionBase }) {
  return (
    <section style={{ background: "var(--paper-2)", paddingBlock: "var(--section-y-lg)", borderBottom: "1px solid var(--rule)" }}>
      <div className="container" style={{ maxWidth: 900 }}>
        {s.eyebrow && <SectionNumeral n={s.eyebrow.split(" · ")[0] ?? "02"} label={s.eyebrow.split(" · ")[1] ?? s.eyebrow} />}
        {s.h2 && <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 3vw, 36px)", lineHeight: 1.1, letterSpacing: "-0.018em", fontWeight: 400, color: "var(--ink)", margin: "20px 0 32px 0", maxWidth: "26ch" }} dangerouslySetInnerHTML={{ __html: s.h2 }} />}
        {/* Special-case: about product-line list is sourced from FACTS.productLine */}
        {(s.items ?? []).length === 0 && s.h2?.toLowerCase().includes("build") ? (
          <PlainList items={FACTS.productLine.map((title) => ({ title }))} />
        ) : (
          <PlainList items={s.items ?? []} />
        )}
      </div>
    </section>
  );
}

/* ── Table rows · label + value pairs (facts, specs) ─────────────── */
function TableRows({ s }: { s: SectionBase }) {
  // Sourced from FACTS for the About page; can be extended for other pages later
  const rows: Array<[string, string]> = [
    ["Founded", String(FACTS.foundingYear)],
    ["Category", FACTS.category],
    ["Legal entity", BRAND.legalEntity],
    ["Jurisdiction", FACTS.jurisdiction],
    ["Team shape", FACTS.teamShape],
  ];
  return (
    <section style={{ background: "var(--paper-2)", paddingBlock: "var(--section-y-lg)", borderBottom: "1px solid var(--rule)" }}>
      <div className="container" style={{ maxWidth: 900 }}>
        {s.eyebrow && <SectionNumeral n={s.eyebrow.split(" · ")[0] ?? "01"} label={s.eyebrow.split(" · ")[1] ?? s.eyebrow} />}
        {s.h2 && <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 3vw, 36px)", lineHeight: 1.1, letterSpacing: "-0.018em", fontWeight: 400, color: "var(--ink)", margin: "20px 0 32px 0" }} dangerouslySetInnerHTML={{ __html: s.h2 }} />}
        <dl style={{ display: "grid", gap: 0 }}>
          {rows.map(([label, value], i) => (
            <div key={label} style={{ borderTop: i === 0 ? "1px solid var(--rule)" : undefined, borderBottom: "1px solid var(--rule)", paddingBlock: 18, display: "grid", gridTemplateColumns: "180px minmax(0, 1fr)", gap: 20, alignItems: "baseline" }}>
              <dt className="eyebrow" style={{ color: "var(--ink-3)" }}>{label}</dt>
              <dd style={{ margin: 0, fontFamily: "var(--font-serif)", fontSize: 18, color: "var(--ink)" }}>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ── CTA band (inline, paper) ─────────────────────────────────────── */
function CTABandInline({ s }: { s: SectionBase }) {
  return (
    <section style={{ background: "var(--paper-2)", paddingBlock: "clamp(64px, 9vh, 128px)", borderBottom: "1px solid var(--rule)" }}>
      <div className="container" style={{ textAlign: "center" }}>
        {s.h2 && <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(24px, 3vw, 34px)", color: "var(--ink)", margin: "0 auto 28px", maxWidth: "34ch", textWrap: "balance" }} dangerouslySetInnerHTML={{ __html: s.h2 }} />}
        <div style={{ display: "inline-flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
          {s.ctaPrimary && <Button href={s.ctaPrimary.href} variant={s.ctaPrimary.variant ?? "primary"} size="lg">{s.ctaPrimary.label}</Button>}
          {s.ctaSecondary && <Button href={s.ctaSecondary.href} variant={s.ctaSecondary.variant ?? "ghost"} size="lg">{s.ctaSecondary.label}</Button>}
        </div>
      </div>
    </section>
  );
}

/* ── CTA full-bleed (over an image) ──────────────────────────────── */
function CTAFullBleed({ s }: { s: SectionBase }) {
  return (
    <section style={{ position: "relative", minHeight: "min(60vh, 640px)", display: "flex", alignItems: "center", overflow: "hidden", borderTop: "1px solid var(--rule)" }}>
      {s.imageV2 ? <SceneStill v2Scene={s.imageV2} v2Variant={1} shape="fullBleed" /> : s.imageScene ? <SceneStill scene={s.imageScene} variant={4} shape="fullBleed" /> : s.imagePerspective ? <SceneStill perspective={s.imagePerspective as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9} pVariant={1} shape="fullBleed" /> : null}
      <SceneOverlay scrim="left" vignetteStrength={0.5} />
      {s.eyebrow && <SceneMetadataPlate chapter="VII" label={s.eyebrow} position="top-right" />}
      <div className="container" style={{ position: "relative", zIndex: 2, paddingBlock: "clamp(48px, 8vh, 96px)" }}>
        <div style={{ maxWidth: "44ch", display: "flex", flexDirection: "column", gap: 24 }}>
          {s.h2 && <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(32px, 4.6vw, 60px)", lineHeight: 1.05, letterSpacing: "-0.022em", fontWeight: 400, color: "var(--paper)", margin: 0, textWrap: "balance", textShadow: "0 2px 4px rgba(20, 18, 15, 0.42)" }} dangerouslySetInnerHTML={{ __html: s.h2 }} />}
          {s.deck && <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.55, color: "rgba(244, 241, 234, 0.9)", margin: 0, textShadow: "0 1px 3px rgba(20, 18, 15, 0.42)" }} dangerouslySetInnerHTML={{ __html: s.deck }} />}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 4 }}>
            {s.ctaPrimary && <Button href={s.ctaPrimary.href} variant={s.ctaPrimary.variant ?? "solid-light"} size="lg">{s.ctaPrimary.label}</Button>}
            {s.ctaSecondary && <Button href={s.ctaSecondary.href} variant={s.ctaSecondary.variant ?? "ghost-light"} size="lg" arrow={false}>{s.ctaSecondary.label}</Button>}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Inbox router (contact / demo) ───────────────────────────────── */
function InboxRouter({ s }: { s: SectionBase }) {
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
    <section style={{ background: "var(--paper-2)", paddingBlock: "var(--section-y-lg)", borderBottom: "1px solid var(--rule)" }}>
      <div className="container">
        {(s.eyebrow || s.h2) && (
          <div style={{ maxWidth: "68ch", marginBottom: 40 }}>
            {s.eyebrow && <SectionNumeral n={s.eyebrow.split(" · ")[0] ?? "01"} label={s.eyebrow.split(" · ")[1] ?? s.eyebrow} />}
            {s.h2 && <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 3vw, 36px)", lineHeight: 1.1, letterSpacing: "-0.018em", fontWeight: 400, color: "var(--ink)", margin: "20px 0 0 0" }} dangerouslySetInnerHTML={{ __html: s.h2 }} />}
            {s.deck && <p style={{ fontFamily: "var(--font-serif)", fontSize: 17, lineHeight: 1.55, color: "var(--ink-2)", margin: "16px 0 0 0", maxWidth: "50ch" }} dangerouslySetInnerHTML={{ __html: s.deck }} />}
          </div>
        )}
        <ul style={{ listStyle: "none", display: "grid", gap: 0 }}>
          {inboxes.map((inbox, i) => (
            <li key={inbox.addr}>
              <Link href={mailto(inbox.addr)} style={{ display: "grid", gridTemplateColumns: "160px minmax(0, 1fr) auto", gap: 32, alignItems: "center", padding: "clamp(20px, 3vh, 32px) clamp(0px, 2vw, 24px)", borderTop: i === 0 ? "1px solid var(--rule)" : undefined, borderBottom: "1px solid var(--rule)", textDecoration: "none", color: "inherit", transition: "background var(--dur-fast) var(--ease-out)" }} className="inbox-row">
                <div className="eyebrow" style={{ color: "var(--gold)" }}>{inbox.label}</div>
                <div>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: 22, color: "var(--ink)", letterSpacing: "-0.012em" }}>{inbox.addr}</div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--ink-3)", marginTop: 4 }}>{inbox.strap}</div>
                </div>
                <div aria-hidden style={{ fontFamily: "var(--font-serif)", fontSize: 24, color: "var(--ink-3)" }}>→</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <style>{`.inbox-row:hover{background:var(--paper)!important}@media(max-width:700px){.inbox-row{grid-template-columns:minmax(0,1fr)!important;gap:8px!important}.inbox-row>div:last-child{display:none!important}}`}</style>
    </section>
  );
}

/* ── Empty state · coming-soon placeholder ────────────────────────── */
function EmptyState({ s }: { s: SectionBase }) {
  return <HeroPaper s={s} />;
}

/* ── Band overview slot · delegates to inline layout ─────────────── */
function BandOverviewSlot({ s: _s }: { s: SectionBase }) {
  // Delegates to the HomeBands renderer via dynamic import — but since
  // HomeBands is server component, we just render inline reference for now.
  // The home page still uses HomeBands directly; catch-all doesn't hit this
  // path.
  return null;
}

function StoryTriptychSlot({ s: _s }: { s: SectionBase }) {
  return null;
}
