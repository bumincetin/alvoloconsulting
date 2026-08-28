"use client";

import clsx from "clsx";
import { pad2 } from "@/lib/brief/engine";

interface ProgressRailProps {
  steps: string[];
  /** -1 intro · 0…n-1 a step · n the proposal */
  current: number;
  proposalLabel: string;
  /** "Step 2 of 5" — already filled */
  nowLabel: string;
  ariaLabel: string;
}

/** Step names with thin rules that fill as you go; sticky on desktop, a row of hairlines on mobile. */
export default function ProgressRail({ steps, current, proposalLabel, nowLabel, ariaLabel }: ProgressRailProps) {
  const items = [...steps, proposalLabel];
  const currentTitle = current >= 0 && current < items.length ? items[current] : "";
  return (
    <nav className="brief-rail" aria-label={ariaLabel}>
      <p className="brief-rail-now k" aria-hidden="true">
        <span>{nowLabel}</span>
        {currentTitle ? <span className="brief-rail-now-t">— {currentTitle}</span> : null}
      </p>
      <ol className="brief-rail-list">
        {items.map((label, i) => {
          const isProposal = i === steps.length;
          const state = i < current ? "is-done" : i === current ? "is-current" : "is-upcoming";
          return (
            <li key={label} className={clsx("brief-rail-item", state, isProposal && "is-proposal")} aria-current={i === current ? "step" : undefined}>
              <span className="brief-rail-ix">{isProposal ? "—" : pad2(i + 1)}</span>
              <span className="brief-rail-lab">{label}</span>
              <span className="brief-rail-track" aria-hidden="true">
                <i />
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
