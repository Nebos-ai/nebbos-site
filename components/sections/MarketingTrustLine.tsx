import Link from "next/link";

/**
 * MarketingTrustLine · sections/MarketingTrustLine.tsx · v1 · 2026-09-18
 *
 * One quiet line where the compliance strip used to be. Founder-directed:
 * the FIPS 140-3 / CC EAL5+ / SOC 2 alphabet soup was sausage —
 * institutional-buyer detail that belongs on /trust, not the home page.
 * The home just needs to signal "yes, we know CISOs will read this" and
 * link to the depth for those who need it.
 */

export function MarketingTrustLine() {
  return (
    <aside className="mkt mkt-trustline" aria-label="Trust anchor">
      <div className="mkt-trustline__inner">
        <p className="mkt-trustline__body">
          Your data, your keys, your hardware. Never trained on. Every
          action to an audit trail your CISO can walk end to end.
        </p>
        <Link href="/trust" className="mkt-trustline__link">
          See the trust center
          <span className="mkt-trustline__link-arrow" aria-hidden>→</span>
        </Link>
      </div>
    </aside>
  );
}
