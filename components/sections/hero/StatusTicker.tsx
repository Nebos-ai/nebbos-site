"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";

/**
 * StatusTicker · the floating status chip on the hero brain core. Cycles
 * through each Pearl's live state; holds on the first one under reduced
 * motion.
 */

type Status = { dept: string; status: string; tint: string };

export function StatusTicker({ items, interval = 2800 }: { items: Status[]; interval?: number }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || items.length < 2) return;
    const id = setInterval(() => setI((n) => (n + 1) % items.length), interval);
    return () => clearInterval(id);
  }, [reduce, items.length, interval]);

  const item = items[i] ?? items[0]!;

  return (
    <span className="relative inline-flex h-5 min-w-[11.5rem] items-center overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <m.span
          key={item.dept}
          initial={{ y: "110%", filter: "blur(4px)" }}
          animate={{ y: "0%", filter: "blur(0px)" }}
          exit={{ y: "-110%", filter: "blur(4px)" }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="inline-flex items-center gap-2 whitespace-nowrap"
        >
          <span className="size-2 rounded-[3px]" style={{ background: item.tint }} aria-hidden />
          <span className="text-ink">{item.dept}</span>
          <span className="text-ink-3">{item.status}</span>
        </m.span>
      </AnimatePresence>
    </span>
  );
}
