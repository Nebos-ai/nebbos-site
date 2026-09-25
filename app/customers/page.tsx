import type { Metadata } from "next";
import { NebbosMark } from "@nebbos/brand/logo";
import { PageHero } from "@/components/marketing/PageHero";
import { PearlMosaic } from "@/components/marketing/PearlMosaic";
import { ClosingCta } from "@/components/marketing/ClosingCta";
import { Eyebrow, GhostCta, PrimaryCta, Section, headline } from "@/components/marketing/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Customers · Nebbos",
  description:
    "Nebbos is used inside the business that builds it. Case studies land here as external customers sign off publicly.",
};

/**
 * /customers · 2026-09-18 · v3 · mkt-native rebuild + dogfood-only framing
 *
 * v2 (2026-09-12) claimed deployment inside U.S. school-district
 * operations. That was the same class of unverifiable external claim
 * the home page retracted in 73af932 (2026-09-18) — retracted here
 * for consistency with the claims-registry doctrine (peer PR #108).
 *
 * v3 replaces:
 *   - shape: v3 FullBleedScene + section--paper → mkt-hero + mkt-section
 *   - copy: external-customer claim → dogfood-only framing (the
 *     business that builds Nebbos is running on it today)
 *
 * When external customers land, this page swaps to per-customer case
 * study cards. Until then, honesty about the deployment shape.
 */

const h2 = cn(headline, "text-[clamp(2.25rem,4.8vw,4rem)]");

export default function CustomersIndexPage() {
  return (
    <>
      <PageHero
        id="cus-h"
        eyebrow="Customers"
        title="Running inside the business that builds it."
        deck={
          <>
            Nebbos is used every day by the team that builds it. The
            platform, its Pearls, its Cradle. Case studies from external
            customers land here as each customer signs off publicly.
            Until then, the shape of the work is real; the names arrive
            with permission.
          </>
        }
        ctas={
          <>
            <PrimaryCta href="/how">See how it is built</PrimaryCta>
            <GhostCta href="/demo">Book a demo</GhostCta>
          </>
        }
        visual={<PearlMosaic />}
      />

      {/* THE SHAPE TODAY · statement panel */}
      <Section labelledBy="cus-shape">
        <Reveal className="bezel">
          <div className="bezel-core relative overflow-hidden p-8 md:p-14">
            <span aria-hidden className="grid-field pointer-events-none absolute inset-0 opacity-60" />
            <span
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-accent/20 blur-[110px]"
            />
            <header className="relative flex max-w-4xl flex-col items-start gap-6">
              <Eyebrow>The shape today</Eyebrow>
              <h2 id="cus-shape" className={h2}>
                A Pearl per department. Approved from the operator&rsquo;s
                phone.
              </h2>
              <p className="m-0 max-w-[58ch] text-pretty font-display text-[clamp(1.15rem,1.7vw,1.4rem)] leading-relaxed text-ink-2">
                A Pearl scoped to each department, deployed behind the
                systems that department already runs. Every consequential
                action passes through named-operator approval. Every action
                lands as an append-only audit event. That is the shape
                running inside the business that builds Nebbos.
              </p>
            </header>
          </div>
        </Reveal>
      </Section>

      {/* CASE STUDIES · split card */}
      <Section labelledBy="cus-when" className="pt-0 md:pt-0 lg:pt-0">
        <Reveal className="bezel" amount={0.2}>
          <div className="bezel-core grid gap-8 overflow-hidden p-8 md:grid-cols-[1fr_1.5fr] md:gap-12 md:p-12">
            <aside className="relative flex flex-col items-start gap-4">
              <Eyebrow>Case studies</Eyebrow>
              <h3 id="cus-when" className="m-0 font-display text-[clamp(1.6rem,2.6vw,2.25rem)] font-medium leading-[1.1] tracking-tight text-ink">
                Written when the customer says yes.
              </h3>
            </aside>
            <div className="prose-mkt relative">
              <p>
                Every case study on this page names a real customer,
                describes a real deployment, and lands only after the
                customer has read and approved the language. No composite
                accounts. No aggregated numbers. If it&rsquo;s on this
                page, the operator quoted has signed off in writing.
              </p>
              <p>
                Until customers reach that point, this page tells you
                what the shape of the work is, not who is running it.
                That is the trade-off. It stays that way.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      <ClosingCta
        id="cus-close"
        lead={
          <span aria-hidden className="inline-flex text-ink">
            <NebbosMark size={40} />
          </span>
        }
        eyebrow="Talk to us"
        title="See the same shape on your operation."
        deck={
          <>
            Thirty minutes. Bring one department. We show you a Pearl
            running against a workload the same shape as yours.
          </>
        }
        primary={{ href: "/demo", label: "Book a demo" }}
        secondary={{ href: "/products", label: "See the products" }}
      />
    </>
  );
}
