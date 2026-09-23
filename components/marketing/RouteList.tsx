import Link from "next/link";
import { mailto } from "@/content/contact";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/**
 * RouteList · inbox routing rows (label · address · description · →) on a
 * bezel tray. Row hover matches the header's Products menu rows (the
 * source of truth): chip radius, soft fill, no ring.
 */
export function RouteList({
  routes,
  className,
}: {
  routes: { label: string; addr: string; desc: string }[];
  className?: string;
}) {
  return (
    <Reveal className={cn("bezel", className)} amount={0.1}>
      <ul className="bezel-core m-0 grid list-none gap-1 p-2 md:p-3">
        {routes.map((r) => (
          <li key={r.addr}>
            <Link
              href={mailto(r.addr)}
              className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 rounded-chip px-4 py-4 transition-colors duration-300 hover:bg-white/[0.05] focus-visible:bg-white/[0.05] focus-visible:outline-2 focus-visible:outline-accent md:grid-cols-[180px_1fr_auto] md:px-5"
            >
              <span className="font-code text-[11px] font-medium uppercase tracking-label text-ink-3">{r.label}</span>
              <div className="col-span-2 row-start-2 md:col-span-1 md:row-start-auto">
                <span className="block font-display text-[16px] font-medium text-ink">{r.addr}</span>
                <p className="m-0 mt-0.5 text-[14px] text-ink-3">{r.desc}</p>
              </div>
              <span className="row-start-1 text-ink-3 transition-colors group-hover:text-accent md:row-start-auto" aria-hidden>
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
