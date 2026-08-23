import { PlusMark } from "@/components/ui/PlusMark";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { SectionNumeral } from "@/components/ui/SectionNumeral";

/**
 * FRAME · Home / 02-04 · The three feature rows
 * PARENT · app/page.tsx (/)
 * PURPOSE · Three numbered claim → proof pairs, each own its own FeatureRow.
 *   02 · What it does — "It watches the work, not the people"
 *   03 · What you build — "One agent per department"
 *   04 · Why it matters — "Every other AI trains someone else's model"
 *
 * The centered plus divider between architecture and features is included
 * as part of THIS section so the composition in page.tsx stays clean.
 */
export function HomeFeatures() {
  return (
    <>
      <div className="section-divider-plus" aria-hidden>
        <PlusMark size="md" />
      </div>

      <FeatureRow
        eyebrow={<SectionNumeral n="02" label="What it does" />}
        title="It watches the work. Not the people."
        body={
          <p style={{ margin: 0 }}>
            Nebbos reads the signal your work already emits — decisions,
            handoffs, deadlines — and shows you what breaks next.
          </p>
        }
      />

      <FeatureRow
        reverse
        eyebrow={<SectionNumeral n="03" label="What you build" />}
        title={
          <>
            One <em style={{ fontStyle: "italic", color: "var(--gold)" }}>agent</em> per department.
          </>
        }
        body={
          <p style={{ margin: 0 }}>
            Pre-educated in your work. Learns independently. Yours to keep.
          </p>
        }
      />

      <FeatureRow
        eyebrow={<SectionNumeral n="04" label="Why it matters" />}
        title={
          <>
            Every other AI trains{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>someone else&rsquo;s</em>{" "}
            model.
          </>
        }
        body={
          <p style={{ margin: 0 }}>
            Nebbos trains yours. The intelligence, the memory, the moat — owned
            by you, portable to you, compounding every quarter.
          </p>
        }
      />
    </>
  );
}
