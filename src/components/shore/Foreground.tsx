"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

/**
 * Near-plane cut-outs.
 *
 * Each chapter section declares a stage of foreground pieces. Only the stage
 * of the chapter that currently owns the viewport is shown, fixed to the bottom
 * edge of the frame, above the layout and the nav (z 52) and under the vignette
 * and grain. When another chapter takes over, the previous stage blurs and
 * sinks for ~800ms before it is dropped. Pieces are inline SVG silhouettes
 * (cypress, olive, balustrade, minaret…) rather than PNG plates.
 */

export type ForegroundEntry = "up" | "left" | "right";

export interface ForegroundPiece {
  key: string;
  enter: ForegroundEntry;
  style: CSSProperties;
  className?: string;
  node: ReactNode;
}

interface Registry {
  register: (id: string, sectionEl: HTMLElement, pieces: ForegroundPiece[]) => () => void;
}

const ForegroundContext = createContext<Registry | null>(null);

interface Stage {
  id: string;
  section: HTMLElement;
  pieces: ForegroundPiece[];
}

export function ForegroundProvider({ children }: { children: ReactNode }) {
  const stagesRef = useRef<Map<string, Stage>>(new Map());
  const [version, setVersion] = useState(0);

  const registry = useMemo<Registry>(
    () => ({
      register: (id, sectionEl, pieces) => {
        stagesRef.current.set(id, { id, section: sectionEl, pieces });
        setVersion((v) => v + 1);
        return () => {
          stagesRef.current.delete(id);
          setVersion((v) => v + 1);
        };
      },
    }),
    [],
  );

  return (
    <ForegroundContext.Provider value={registry}>
      {children}
      <ForegroundSky stages={stagesRef} version={version} />
    </ForegroundContext.Provider>
  );
}

/** Declares a chapter's stage. Renders nothing in place — the sky draws it. */
export function ForegroundStage({ id, sectionRef, pieces }: { id: string; sectionRef: React.RefObject<HTMLElement | null>; pieces: ForegroundPiece[] }) {
  const registry = useContext(ForegroundContext);
  useEffect(() => {
    const el = sectionRef.current;
    if (!registry || !el) return;
    return registry.register(id, el, pieces);
  }, [registry, id, sectionRef, pieces]);
  return null;
}

function ForegroundSky({ stages, version }: { stages: React.MutableRefObject<Map<string, Stage>>; version: number }) {
  const [active, setActive] = useState<string | null>(null);
  const [retiring, setRetiring] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // the retiring stage sinks for ~800ms, then drops — independent of re-subscription
  useEffect(() => {
    if (!retiring) return;
    const id = window.setTimeout(() => setRetiring(null), 820);
    return () => window.clearTimeout(id);
  }, [retiring]);

  useEffect(() => {
    const list = Array.from(stages.current.values());
    if (!list.length) return;
    const ratios = new Map<string, number>();
    const byEl = new Map<Element, string>(list.map((s) => [s.section, s.id]));
    let current: string | null = null;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = byEl.get(entry.target);
          if (id) ratios.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });
        let best: string | null = null;
        let bestRatio = 0;
        ratios.forEach((r, id) => {
          if (r > bestRatio) {
            bestRatio = r;
            best = id;
          }
        });
        if (best === current) return;
        const prior = current;
        current = best;
        setActive(best);
        if (prior) setRetiring(prior);
      },
      { rootMargin: "-12% 0px -12% 0px", threshold: [0, 0.12, 0.32, 0.55] },
    );
    list.forEach((s) => io.observe(s.section));
    return () => io.disconnect();
  }, [stages, version]);

  if (!mounted) return null;
  const activeStage = active ? stages.current.get(active) : undefined;
  const retiringStage = retiring && retiring !== active ? stages.current.get(retiring) : undefined;

  return createPortal(
    <div id="fg-sky" aria-hidden="true">
      {retiringStage ? <StageLayer key={retiringStage.id} stage={retiringStage} mode="retiring" /> : null}
      {activeStage ? <StageLayer key={activeStage.id} stage={activeStage} mode="active" /> : null}
    </div>,
    document.body,
  );
}

function StageLayer({ stage, mode }: { stage: Stage; mode: "active" | "retiring" }) {
  // Enter on the next frame so the parked → active transition actually animates.
  // Keyed by stage id, the same node later flips active → retiring, so the sink has a from-state.
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (mode !== "active") return;
    const id = window.requestAnimationFrame(() => setOn(true));
    return () => window.cancelAnimationFrame(id);
  }, [mode]);
  return (
    <div className={clsx("fg", mode === "active" && on && "fg-active", mode === "retiring" && "fg-retiring")} data-fg={stage.id}>
      {stage.pieces.map((p, i) => (
        <span
          key={p.key}
          className={clsx("fg-el", p.className)}
          data-fg-in={p.enter}
          style={{ ...p.style, ["--fg-delay" as string]: `${i * 90}ms` }}
        >
          {p.node}
        </span>
      ))}
    </div>
  );
}
