"use client";

import clsx from "clsx";
import { anchorFor, useChapterUi } from "./chapters";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

/** Chapter progress rail — one rule per `[data-cam]` section, fixed at the right edge. */
export default function Rail({ names }: { names: string[] }) {
  const { active, count } = useChapterUi();
  const { scrollTo } = useSmoothScroll();
  return (
    <nav className="rail" id="rail" aria-label="Chapters">
      {Array.from({ length: count }, (_, i) => (
        <button key={i} type="button" className={clsx(i === active && "on")} title={names[i]} aria-label={names[i] ?? `Chapter ${i + 1}`} onClick={() => scrollTo(anchorFor(i), { offset: 0 })}>
          <i />
        </button>
      ))}
    </nav>
  );
}
