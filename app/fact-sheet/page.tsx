import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/content/brand";
import { FACTS } from "@/content/facts";
import {
  PRODUCT_SURFACES,
  CORPORATE_STRUCTURE,
  PRODUCTION_CLAIM,
  COMPLIANCE_POSTURE,
} from "@/content/canonical-claims";
import metrics from "@/content/platform-metrics.json";

/**
 * app/fact-sheet/page.tsx — the one-page company fact sheet.
 *
 * Founder directive 2026-09-19: assemble the assets we're missing from
 * what we already have. Every field on this page reads from a canonical
 * substrate (brand.ts, facts.ts, canonical-claims.ts, platform-metrics.json).
 * When any substrate changes, this page re-renders correctly — no
 * hand-authored static copy to drift.
 *
 * AMS row: "Company fact sheet / at-a-glance" (need → have).
 */

export const metadata: Metadata = {
  title: `Fact sheet · ${BRAND.name}`,
  description:
    "The company on one page — corporate structure, product framing, compliance posture, and where it runs.",
};

export default function FactSheetPage() {
  return (
    <div className="fs-shell">
      <header className="fs-head">
        <div className="fs-eyebrow">Fact sheet</div>
        <h1 className="fs-title">{BRAND.name} at a glance.</h1>
        <p className="fs-lede">{BRAND.descriptionShort}</p>
      </header>

      <section className="fs-section">
        <h2 className="fs-h2">The company</h2>
        <dl className="fs-dl">
          <div>
            <dt>Founded</dt>
            <dd>{FACTS.foundingYear}</dd>
          </div>
          <div>
            <dt>Team shape</dt>
            <dd>{FACTS.teamShape}</dd>
          </div>
          <div>
            <dt>Jurisdiction</dt>
            <dd>{FACTS.jurisdiction}</dd>
          </div>
          <div>
            <dt>Category</dt>
            <dd>{FACTS.category}</dd>
          </div>
        </dl>
      </section>

      <section className="fs-section">
        <h2 className="fs-h2">Corporate structure</h2>
        <div className="fs-corp">
          <CorpTier
            label="Parent"
            name={CORPORATE_STRUCTURE.parent.name}
            location={CORPORATE_STRUCTURE.parent.location}
            role={CORPORATE_STRUCTURE.parent.role}
          />
          <CorpTier
            label="AI product unit"
            name={CORPORATE_STRUCTURE.aiUnit.name}
            location={CORPORATE_STRUCTURE.aiUnit.location}
            role={CORPORATE_STRUCTURE.aiUnit.role}
          />
          <CorpTier
            label="Operating"
            name={CORPORATE_STRUCTURE.operating.name}
            location={CORPORATE_STRUCTURE.operating.location}
            role={CORPORATE_STRUCTURE.operating.role}
          />
        </div>
      </section>

      <section className="fs-section">
        <h2 className="fs-h2">Product</h2>
        <p className="fs-body">
          Four surfaces. One substrate. Each piece is boring on its own —
          together they are the smallest thing you can ship to a regulator and
          still call intelligence.
        </p>
        <div className="fs-surfaces">
          {PRODUCT_SURFACES.map((s) => (
            <div key={s.name} className="fs-surface">
              <div className="fs-surface-label">{s.name}</div>
              <div className="fs-surface-line">{s.oneLiner}</div>
              <div className="fs-surface-body">{s.body}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="fs-section">
        <h2 className="fs-h2">Where it runs</h2>
        <dl className="fs-dl">
          <div>
            <dt>Category</dt>
            <dd>{PRODUCTION_CLAIM.category}</dd>
          </div>
          <div>
            <dt>Geography</dt>
            <dd>{PRODUCTION_CLAIM.geography}</dd>
          </div>
          <div>
            <dt>Audience</dt>
            <dd>{PRODUCTION_CLAIM.audience}</dd>
          </div>
          <div>
            <dt>Buyer</dt>
            <dd>{PRODUCTION_CLAIM.buyer}</dd>
          </div>
        </dl>
        <p className="fs-body-note">{PRODUCTION_CLAIM.disclosureRule}.</p>
      </section>

      <section className="fs-section">
        <h2 className="fs-h2">Compliance posture</h2>
        <div className="fs-comp">
          {COMPLIANCE_POSTURE.map((c) => (
            <div key={c.framework} className="fs-comp-row">
              <div className="fs-comp-fw">{c.framework}</div>
              <div className="fs-comp-st">{c.status}</div>
              <div className="fs-comp-note">{c.note}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="fs-section">
        <h2 className="fs-h2">The substrate, measured</h2>
        <dl className="fs-dl">
          <div>
            <dt>Lines of code</dt>
            <dd>{metrics.shipped.lines_of_code_millions}M</dd>
          </div>
          <div>
            <dt>Automated tests</dt>
            <dd>{metrics.shipped.automated_tests.toLocaleString()}</dd>
          </div>
          <div>
            <dt>Architecture specifications</dt>
            <dd>{metrics.governed.architecture_specs_ratified}</dd>
          </div>
          <div>
            <dt>Enforcement hooks</dt>
            <dd>{metrics.governed.enforcement_hooks}</dd>
          </div>
        </dl>
        <p className="fs-body-note">
          Snapshot as of {metrics.snapshot_at}. Every field carries a
          provenance line in <code>content/platform-metrics.json</code>.
        </p>
      </section>

      <footer className="fs-footer">
        <div>{FACTS.legalFooter}</div>
        <Link href="/">Home →</Link>
      </footer>

      <style>{FS_CSS}</style>
    </div>
  );
}

function CorpTier({
  label,
  name,
  location,
  role,
}: {
  label: string;
  name: string;
  location: string;
  role: string;
}) {
  return (
    <div className="fs-corp-tier">
      <div className="fs-corp-label">{label}</div>
      <div className="fs-corp-name">{name}</div>
      <div className="fs-corp-loc">{location}</div>
      <div className="fs-corp-role">{role}</div>
    </div>
  );
}

const FS_CSS = `
  .fs-shell {
    max-width: 1080px;
    margin: 0 auto;
    padding: clamp(48px, 6vw, 88px) clamp(24px, 5vw, 64px) 96px;
    color: #1D1C22;
  }
  @media (prefers-color-scheme: dark) {
    .fs-shell { color: #F4F4F6; }
  }
  .fs-head { margin-bottom: 48px; padding-bottom: 32px; border-bottom: 1px dashed rgba(0,0,0,0.15); }
  .fs-eyebrow {
    font-family: "JetBrains Mono", ui-monospace, monospace;
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(0,0,0,0.55);
    margin-bottom: 14px;
  }
  .fs-title {
    font-family: "Newsreader", Georgia, serif;
    font-size: clamp(38px, 5vw, 56px);
    line-height: 1;
    letter-spacing: -0.03em;
    font-weight: 700;
    margin: 0 0 18px;
    max-width: 20ch;
    text-wrap: balance;
  }
  .fs-lede {
    font-family: "Newsreader", Georgia, serif;
    font-size: 19px;
    line-height: 1.5;
    color: rgba(0,0,0,0.65);
    max-width: 60ch;
    margin: 0;
  }
  .fs-section { margin-top: 48px; }
  .fs-h2 {
    font-family: "Newsreader", Georgia, serif;
    font-size: 24px;
    letter-spacing: -0.018em;
    font-weight: 700;
    margin: 0 0 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(0,0,0,0.12);
  }
  .fs-body {
    font-family: "Newsreader", Georgia, serif;
    font-size: 16px;
    line-height: 1.55;
    color: rgba(0,0,0,0.75);
    max-width: 68ch;
    margin: 0 0 20px;
  }
  .fs-body-note {
    font-family: "JetBrains Mono", monospace;
    font-size: 11.5px;
    color: rgba(0,0,0,0.50);
    margin-top: 16px;
  }
  .fs-body-note code {
    background: rgba(0,0,0,0.05);
    padding: 1px 5px;
    border-radius: 3px;
  }
  .fs-dl {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px 40px;
    margin: 0;
  }
  @media (max-width: 700px) { .fs-dl { grid-template-columns: 1fr; } }
  .fs-dl > div { padding: 0; }
  .fs-dl dt {
    font-family: "JetBrains Mono", monospace;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(0,0,0,0.55);
    margin: 0 0 6px;
  }
  .fs-dl dd {
    font-family: "Newsreader", Georgia, serif;
    font-size: 18px;
    color: #1D1C22;
    margin: 0;
    line-height: 1.4;
  }
  .fs-corp {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
  }
  @media (max-width: 900px) { .fs-corp { grid-template-columns: 1fr; } }
  .fs-corp-tier {
    padding: 20px 22px;
    background: rgba(0,0,0,0.02);
    border-top: 3px solid #A36630;
    border-radius: 0 22px 0 0;
  }
  .fs-corp-label {
    font-family: "JetBrains Mono", monospace;
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #A36630;
    font-weight: 700;
    margin-bottom: 8px;
  }
  .fs-corp-name {
    font-family: "Newsreader", Georgia, serif;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.015em;
    line-height: 1.15;
    margin-bottom: 4px;
  }
  .fs-corp-loc {
    font-family: "JetBrains Mono", monospace;
    font-size: 11px;
    color: rgba(0,0,0,0.55);
    margin-bottom: 10px;
  }
  .fs-corp-role {
    font-size: 13px;
    color: rgba(0,0,0,0.70);
    line-height: 1.5;
  }
  .fs-surfaces {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
    margin-top: 24px;
  }
  @media (max-width: 900px) { .fs-surfaces { grid-template-columns: 1fr; } }
  .fs-surface {
    padding: 20px 22px;
    background: linear-gradient(152deg, #1D1D22 0%, #0E0E12 100%);
    color: #CBCCD2;
    border-radius: 0 22px 0 0;
  }
  .fs-surface-label {
    font-family: "JetBrains Mono", monospace;
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #F6A03F;
    font-weight: 700;
    margin-bottom: 10px;
  }
  .fs-surface-line {
    font-family: "Newsreader", Georgia, serif;
    font-size: 18px;
    font-weight: 700;
    color: #F6F6F8;
    letter-spacing: -0.01em;
    line-height: 1.2;
    margin-bottom: 8px;
  }
  .fs-surface-body {
    font-size: 12.5px;
    color: #CBCCD2;
    line-height: 1.55;
  }
  .fs-comp {
    display: flex;
    flex-direction: column;
  }
  .fs-comp-row {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr) minmax(0, 3fr);
    gap: 16px;
    padding: 14px 4px;
    border-bottom: 1px solid rgba(0,0,0,0.10);
    align-items: baseline;
  }
  @media (max-width: 800px) { .fs-comp-row { grid-template-columns: 1fr; gap: 6px; } }
  .fs-comp-fw {
    font-family: "Newsreader", Georgia, serif;
    font-size: 15px;
    font-weight: 700;
    color: #1D1C22;
  }
  .fs-comp-st {
    font-family: "JetBrains Mono", monospace;
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #A36630;
    font-weight: 700;
  }
  .fs-comp-note {
    font-size: 13px;
    color: rgba(0,0,0,0.70);
    line-height: 1.5;
  }
  .fs-footer {
    margin-top: 72px;
    padding-top: 24px;
    border-top: 1px solid rgba(0,0,0,0.12);
    display: flex;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
    font-family: "JetBrains Mono", monospace;
    font-size: 11px;
    letter-spacing: 0.06em;
    color: rgba(0,0,0,0.55);
    text-transform: uppercase;
  }
  .fs-footer a {
    color: #A36630;
    text-decoration: none;
    border-bottom: 1px dotted #A36630;
  }
`;
