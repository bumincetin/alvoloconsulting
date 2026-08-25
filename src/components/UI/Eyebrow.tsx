import type { ReactNode } from "react";
import clsx from "clsx";

interface EyebrowProps {
  children: ReactNode;
  /** Optional ordinal shown before the label, e.g. "01" */
  index?: string;
  /** Accent for the status dot */
  accent?: "azure" | "emerald" | "gold";
  className?: string;
}

const DOT: Record<NonNullable<EyebrowProps["accent"]>, string> = {
  azure: "bg-azure shadow-[0_0_12px_rgba(0,102,255,0.9)]",
  emerald: "bg-emerald shadow-[0_0_12px_rgba(0,229,153,0.9)]",
  gold: "bg-gold shadow-[0_0_12px_rgba(212,175,55,0.9)]",
};

/** Monospace telemetry label used as a section / block eyebrow. */
export default function Eyebrow({ children, index, accent = "emerald", className }: EyebrowProps) {
  return (
    <div
      className={clsx(
        "inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/55 sm:text-[11px]",
        className,
      )}
    >
      <span aria-hidden="true" className={clsx("h-1.5 w-1.5 shrink-0 rounded-full", DOT[accent])} />
      {index ? <span className="text-white/30">{index}</span> : null}
      <span>{children}</span>
    </div>
  );
}
