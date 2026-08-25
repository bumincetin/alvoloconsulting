"use client";

import { useEffect, type ReactNode } from "react";
import clsx from "clsx";

/**
 * Scroll reveals in the Kage grammar: any element carrying `data-rv` starts
 * hidden and receives `.rv-in` when it enters the viewport, staggered 85ms per
 * sibling. Display headings are split into masked words with per-word delays.
 * CSS lives in globals.css (`[data-rv]`, `.mask-line`, `.word`).
 */
export function useReveals(rootRef: React.RefObject<HTMLElement | null>, skipSelector?: string): void {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-rv], .mask-line"));
    const groups = new Map<Element | null, HTMLElement[]>();
    items.forEach((el) => {
      const key = el.parentElement;
      const arr = groups.get(key) ?? [];
      arr.push(el);
      groups.set(key, arr);
    });
    groups.forEach((arr) => arr.forEach((el, i) => (el.dataset.rvd = String(i * 85))));

    const timers = new Set<number>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);
          const el = entry.target as HTMLElement;
          const delay = reduce ? 0 : parseFloat(el.dataset.rvd ?? "0");
          const id = window.setTimeout(() => el.classList.add("rv-in"), delay);
          timers.add(id);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.04 },
    );
    items.forEach((el) => {
      if (skipSelector && el.closest(skipSelector)) return;
      io.observe(el);
    });
    return () => {
      io.disconnect();
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [rootRef, skipSelector]);
}

/** A display heading whose words rise out of individual masks. */
export function WordReveal({
  lines,
  as: Tag = "h2",
  className,
  id,
  revealed = false,
}: {
  lines: string[];
  as?: "h1" | "h2";
  className?: string;
  id?: string;
  /** hero headings are revealed by the intro, not by scrolling */
  revealed?: boolean;
}) {
  const label = lines.join(" ");
  let wordIndex = 0;
  return (
    <Tag id={id} className={clsx("display", className)} aria-label={label}>
      {lines.map((line, li) => (
        <span key={li} className={clsx("mask-line word-reveal", revealed && "rv-in")} aria-hidden="true">
          {line.split(" ").map((word, wi) => {
            const delay = wordIndex++ * 72;
            return (
              <span key={`${li}-${wi}`}>
                <span className="word-mask">
                  <span className="word" style={{ ["--word-delay" as string]: `${delay}ms` }}>
                    {word}
                  </span>
                </span>
                {wi < line.split(" ").length - 1 ? " " : null}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}

/** `.sec-head` — "01 — Label ———— Alt" */
export function SectionHead({ index, label, alt }: { index: string; label: string; alt: string }) {
  return (
    <div className="sec-head" data-rv="fade">
      <span className="k">
        <b>{index}</b> — {label}
      </span>
      <span className="rule" />
      <span className="k alt-lang">{alt}</span>
    </div>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 14" fill="none" className={className} aria-hidden="true">
      <path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function Eyebrow({ children, dot = false }: { children: ReactNode; dot?: boolean }) {
  return (
    <div className="eyebrow" data-rv="fade">
      {dot ? <span className="dot" /> : null}
      {children}
    </div>
  );
}
