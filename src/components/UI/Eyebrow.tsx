import type { ReactNode } from "react";
import clsx from "clsx";

interface EyebrowProps {
  children: ReactNode;
  /** Optional ordinal shown before the label, e.g. "01" */
  index?: string;
  accent?: "azure" | "emerald" | "gold";
  className?: string;
}

/** Tracked small-caps label in the chapter grammar — `NN — Label` with the ordinal in vermilion. */
export default function Eyebrow({ children, index, className }: EyebrowProps) {
  return (
    <div className={clsx("k inline-flex items-baseline gap-2", className)}>
      {index ? <b>{index}</b> : null}
      {index ? <span aria-hidden="true">—</span> : null}
      <span>{children}</span>
    </div>
  );
}
