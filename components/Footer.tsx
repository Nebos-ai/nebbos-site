import Link from "next/link";
import { footerNav } from "@/lib/nav";
import { APP_URL } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container section">
        <div className="footer-grid">
          {footerNav.map((group) => (
            <div key={group.label} className="footer-col">
              <h4>{group.label}</h4>
              {group.links.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 56,
            paddingTop: 24,
            borderTop: "1px solid var(--hairline)",
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="mist" style={{ fontSize: 14 }}>
            <span className="brandmark" style={{ fontSize: 16 }}>
              nebbos
            </span>{" "}
            — Operations Intelligence. © {year} Nebbos.
          </div>
          <div style={{ display: "flex", gap: 20, fontSize: 14 }} className="mist">
            <a href={APP_URL} rel="noreferrer">
              Log in
            </a>
            <Link href="/status">Status</Link>
            <Link href="/legal/privacy">Privacy</Link>
            <Link href="/legal/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
