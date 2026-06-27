import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Section>
      <p className="eyebrow">404</p>
      <h1 style={{ marginTop: 20, maxWidth: "16ch" }}>This signal didn&rsquo;t reach a page.</h1>
      <p className="mist" style={{ marginTop: 20, fontSize: 18, maxWidth: "48ch" }}>
        The page you&rsquo;re looking for isn&rsquo;t here. It may have moved, or never existed. Head
        back to the homepage or explore the platform.
      </p>
      <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <ButtonLink href="/" variant="primary">Back home →</ButtonLink>
        <ButtonLink href="/platform" variant="ghost">Explore the platform</ButtonLink>
      </div>
    </Section>
  );
}
