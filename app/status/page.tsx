import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Chip } from "@/components/ui/Card";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Status",
  path: "/status",
  description: "Operational status of the Nebbos platform.",
});

const systems = [
  ["Platform / dashboard", "Operational"],
  ["Agent interface", "Operational"],
  ["Connectors / ingest", "Operational"],
  ["Marketing site", "Operational"],
];

export default function StatusPage() {
  return (
    <>
      <PageHero
        eyebrow="Status"
        title="System status."
        lead="A live status feed lands here once the production status provider is wired. Until then this page reflects a static, all-green placeholder."
      />
      <Section divider>
        <div style={{ display: "grid", gap: 12, maxWidth: 640 }}>
          {systems.map(([name, state]) => (
            <div
              key={name}
              className="panel"
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 24px" }}
            >
              <span>{name}</span>
              <Chip lead>{state}</Chip>
            </div>
          ))}
        </div>
        <p className="mono faint" style={{ marginTop: 24, fontSize: 12 }}>
          Placeholder — not a live status feed. Wire to the production status provider before relying on this page.
        </p>
      </Section>
    </>
  );
}
