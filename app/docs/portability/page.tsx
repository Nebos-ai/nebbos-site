import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/content/brand";
import { GOVERNANCE_PILLARS } from "@/content/canonical-claims";
import { DOC_STYLES } from "@/components/docs/doc-styles";

/**
 * app/docs/portability/page.tsx — the continuous-portability doctrine.
 *
 * Assembles from GOVERNANCE_PILLARS[3]. Names the "export runs on every
 * deploy, not on offboarding day" claim and describes the shape of the
 * export bundle and how an operator verifies it independently.
 */

export const metadata: Metadata = {
  title: `Portability & export · ${BRAND.name} docs`,
  description:
    "Export runs on every deploy, not on offboarding day. If the escape hatch didn't work last Thursday, we find out on Thursday.",
};

const PORTABILITY_PILLAR = GOVERNANCE_PILLARS[3];

interface BundleSection {
  name: string;
  desc: string;
}

const BUNDLE: BundleSection[] = [
  {
    name: "Structured data",
    desc: "Every operator-scoped row from every substrate table you touched, emitted as JSON Lines with stable field names. One file per table. Schemas cited alongside; if a schema changed inside the export window, the change is documented in the bundle.",
  },
  {
    name: "The audit chain",
    desc: "Every audit-chain entry scoped to the operator identities in the export, with hash-verification receipt. An outside inspector can replay the receipt without ever calling the platform again.",
  },
  {
    name: "The knowledge graph",
    desc: "The operator's slice of the knowledge graph — Pearl memory, insight rows, playbook selections, prediction traces. Emitted as a stable-shape JSON with per-node provenance.",
  },
  {
    name: "Attachments",
    desc: "Uploaded documents, PDFs, images, meeting recordings — the raw bytes, preserving their original filenames and content-types. Each with a manifest row that names its provenance in the structured data.",
  },
  {
    name: "The Cradle key material",
    desc: "For operators at Host tier and above, a re-provisioning packet that lets the operator re-mount their Pearl memory on a fresh Cradle. The packet is issued only when the operator authenticates on a Cradle they currently hold.",
  },
];

export default function PortabilityPage() {
  return (
    <div className="doc-shell">
      <nav className="doc-crumbs">
        <Link href="/docs">Docs</Link> <span>·</span>{" "}
        <span>Portability &amp; export</span>
      </nav>
      <header className="doc-head">
        <div className="doc-eyebrow">Operations · 03</div>
        <h1 className="doc-title">Portability &amp; export.</h1>
        <p className="doc-lede">{PORTABILITY_PILLAR.body}</p>
      </header>

      <section className="doc-section">
        <h2>Every deploy runs the export</h2>
        <p>
          The Nebbos deploy pipeline runs a full export as part of its
          rollout &mdash; against a scoped set of test identities, with the
          same code path a real operator export would use, with the same
          bundle format an inspector would read. If the export path breaks,
          the deploy fails. Portability is not a feature the platform
          intends to have; it is a check the platform runs on itself before
          shipping anything else.
        </p>
        <p>
          The consequence: on any given day, the export has worked within the
          past few hours, on the same code that is running the operator&rsquo;s
          production traffic. Continuous exercise means when an operator
          decides to move, the move is a data pull, not a project.
        </p>
      </section>

      <section className="doc-section">
        <h2>The bundle shape</h2>
        <p>
          An operator-triggered export produces a single archive with five
          sections. Each section&rsquo;s files are described by an accompanying
          manifest; the manifest is what an inspector reads first.
        </p>
        {BUNDLE.map((b) => (
          <div key={b.name} className="doc-term">
            <div className="doc-term-t">{b.name}</div>
            <div className="doc-term-d">{b.desc}</div>
          </div>
        ))}
      </section>

      <section className="doc-section">
        <h2>How you verify without asking us</h2>
        <p>
          Every bundle ships with a{" "}
          <code>verify.sh</code> script that walks the audit-chain segment
          inside the bundle, recomputes every hash, and compares to the
          signed receipt embedded in the bundle metadata. The script depends
          on nothing Nebbos-specific &mdash; POSIX shell,{" "}
          <code>sha256sum</code>, and a JSON parser. An inspector runs it,
          reads the output, and knows whether the export they hold is the
          export the platform signed.
        </p>
        <p>
          The bundle format is documented separately in the export manifest
          itself &mdash; every field the manifest carries is defined in the
          manifest, so a bundle can be read by a party that has never touched
          Nebbos&rsquo; source.
        </p>
      </section>

      <section className="doc-section">
        <h2>What isn&rsquo;t in the bundle</h2>
        <p>
          Nebbos&rsquo; own operational data &mdash; internal weights, shared
          model artefacts, other operators&rsquo; scopes &mdash; is not in
          the bundle, because the operator never had a claim to those. The
          bundle is exactly what the operator owned and can prove they owned.
        </p>
        <p>
          See <Link href="/docs/audit-chain">The audit chain</Link> for how
          the chain verifies without the platform&rsquo;s help, and{" "}
          <Link href="/docs/row-level-isolation">Row-level isolation</Link>{" "}
          for how the scope boundary is enforced at the substrate.
        </p>
      </section>

      <footer className="doc-footer">
        <Link href="/docs/row-level-isolation">← Row-level isolation</Link>
        <Link href="/docs/cradle-provisioning">Cradle provisioning →</Link>
      </footer>

      <style>{DOC_STYLES}</style>
    </div>
  );
}
