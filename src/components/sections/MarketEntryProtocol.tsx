"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Check } from "lucide-react";
import clsx from "clsx";
import Eyebrow from "@/components/UI/Eyebrow";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { gsap, ScrollTrigger, BEZIER } from "@/lib/motion/gsap";
import { ACCENT_HEX } from "@/lib/geo/cities";
import { protocolContent, type ProtocolPhase } from "@/lib/content/protocol";
import type { Locale } from "@/lib/translations";

const PHASE_ACCENT = [ACCENT_HEX.azure, ACCENT_HEX.gold, ACCENT_HEX.emerald, ACCENT_HEX.azure];

interface MarketEntryProtocolProps {
  locale: Locale;
}

/**
 * Pinned four-phase protocol.
 *
 * ≥1024px + no reduced-motion: the stage is pinned for 4 × 100vh of scroll (GSAP ScrollTrigger,
 * scrubbed). Scroll progress selects the active phase; completed phases collapse into compact
 * badges (shared-layout morph), the active phase expands with its technical specification.
 * <1024px or reduced-motion: a vertical, fully expanded list — no pinning, no scroll-jacking.
 */
export default function MarketEntryProtocol({ locale }: MarketEntryProtocolProps) {
  const t = protocolContent[locale];
  const phases = t.phases;
  const { reducedMotion, scrollTo, ready } = useSmoothScroll();
  const baseId = useId();

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage || !ready) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      setPinned(true);
      let last = -1;
      const st = ScrollTrigger.create({
        trigger: section,
        pin: stage,
        start: "top top",
        end: () => `+=${phases.length * window.innerHeight}`,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (barRef.current) gsap.set(barRef.current, { scaleX: self.progress });
          const idx = Math.min(phases.length - 1, Math.floor(self.progress * phases.length));
          if (idx !== last) {
            last = idx;
            setActive(idx);
          }
        },
      });
      triggerRef.current = st;
      const refreshId = window.requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => {
        window.cancelAnimationFrame(refreshId);
        st.kill();
        triggerRef.current = null;
        setPinned(false);
      };
    });

    return () => mm.revert();
  }, [ready, phases.length]);

  const jumpTo = useCallback(
    (index: number) => {
      const st = triggerRef.current;
      if (!st) {
        setActive(index);
        return;
      }
      const target = st.start + ((index + 0.5) / phases.length) * (st.end - st.start);
      scrollTo(target, { offset: 0, duration: 1.1 });
    },
    [phases.length, scrollTo],
  );

  return (
    <section ref={sectionRef} id="protocol" className="relative border-t border-line bg-obsidian text-white" aria-labelledby={`${baseId}-heading`}>
      <div ref={stageRef} className={clsx("relative flex flex-col justify-center py-24 lg:min-h-screen lg:py-0")}>
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow index="02" accent="gold">
                {t.eyebrow}
              </Eyebrow>
              <h2 id={`${baseId}-heading`} className="mt-5 font-display text-[clamp(2rem,4.2vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
                {t.heading}
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/60">{t.sub}</p>
            </div>
            <div className="lg:col-span-5 lg:justify-self-end lg:text-right">
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">{t.progressLabel}</div>
              <div className="mt-2 font-display text-3xl font-semibold tabular-nums tracking-[-0.03em]">
                <span style={{ color: PHASE_ACCENT[active] }}>{phases[active].index}</span>
                <span className="text-white/30"> / {phases[phases.length - 1].index}</span>
              </div>
              <div className="mt-3 h-px w-full overflow-hidden bg-white/10 lg:w-72 lg:justify-self-end">
                <div ref={barRef} className="h-full w-full origin-left bg-white" style={{ transform: pinned ? undefined : `scaleX(${(active + 1) / phases.length})` }} />
              </div>
            </div>
          </div>

          {/* Desktop pinned stage */}
          <div className={clsx("mt-10 gap-8 lg:grid-cols-12", reducedMotion ? "hidden" : "hidden lg:grid")}>
            <LayoutGroup id={`${baseId}-protocol`}>
              <div className="lg:col-span-5">
                {/* Completed badges */}
                <div className="flex min-h-[2.5rem] flex-wrap gap-2">
                  <AnimatePresence initial={false}>
                    {phases.slice(0, active).map((phase, i) => (
                      <motion.button
                        key={phase.index}
                        layoutId={`${baseId}-phase-${phase.index}`}
                        type="button"
                        onClick={() => jumpTo(i)}
                        transition={{ duration: 0.45, ease: BEZIER.inOut }}
                        className="inline-flex items-center gap-2 rounded-full border border-line bg-titanium/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-white/70 backdrop-blur hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                        aria-label={`${phase.index} ${phase.title} — ${t.completedLabel}`}
                      >
                        <Check className="h-3 w-3" strokeWidth={2} style={{ color: PHASE_ACCENT[i] }} />
                        {phase.index} · {phase.badge}
                      </motion.button>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Rail */}
                <ol className="mt-6 space-y-2">
                  {phases.map((phase, i) => {
                    if (i < active) return null;
                    const isActive = i === active;
                    return (
                      <motion.li key={phase.index} layoutId={`${baseId}-phase-${phase.index}`} transition={{ duration: 0.45, ease: BEZIER.inOut }} className="relative">
                        <button
                          type="button"
                          onClick={() => jumpTo(i)}
                          aria-current={isActive ? "step" : undefined}
                          className={clsx(
                            "flex w-full items-start gap-5 rounded-2xl border px-5 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
                            isActive ? "border-white/15 bg-titanium/80 backdrop-blur" : "border-transparent text-white/40 hover:text-white/70",
                          )}
                        >
                          <span className="font-mono text-[11px] tracking-[0.25em]" style={{ color: isActive ? PHASE_ACCENT[i] : undefined }}>
                            {phase.index}
                          </span>
                          <span className="flex-1">
                            <span className={clsx("block font-display text-lg font-semibold tracking-[-0.02em]", isActive ? "text-white" : "")}>{phase.title}</span>
                            <AnimatePresence initial={false}>
                              {isActive ? (
                                <motion.span
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.35, ease: BEZIER.out }}
                                  className="block overflow-hidden"
                                >
                                  <span className="mt-2 block text-[13.5px] leading-relaxed text-white/60">{phase.summary}</span>
                                  <span className="mt-3 block font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                                    {t.durationLabel} · <span className="text-white/75">{phase.duration}</span>
                                  </span>
                                </motion.span>
                              ) : null}
                            </AnimatePresence>
                          </span>
                        </button>
                      </motion.li>
                    );
                  })}
                </ol>
              </div>
            </LayoutGroup>

            {/* Spec panel */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={phases[active].index}
                  initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                  transition={{ duration: 0.4, ease: BEZIER.out }}
                >
                  <SpecPanel phase={phases[active]} accent={PHASE_ACCENT[active]} t={t} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile / reduced-motion vertical list */}
          <ol className={clsx("mt-10 space-y-4", !reducedMotion && "lg:hidden")}>
            {phases.map((phase, i) => (
              <li key={phase.index}>
                <div className="rounded-2xl border border-line bg-titanium/80 p-5 backdrop-blur">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] tracking-[0.25em]" style={{ color: PHASE_ACCENT[i] }}>
                      {phase.index}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">{phase.duration}</span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-semibold tracking-[-0.02em]">{phase.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-white/60">{phase.summary}</p>
                </div>
                <div className="mt-2">
                  <SpecPanel phase={phase} accent={PHASE_ACCENT[i]} t={t} compact />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function SpecPanel({
  phase,
  accent,
  t,
  compact = false,
}: {
  phase: ProtocolPhase;
  accent: string;
  t: (typeof protocolContent)["en"];
  compact?: boolean;
}) {
  return (
    <div className={clsx("relative overflow-hidden rounded-3xl border border-line bg-titanium/70 backdrop-blur", compact ? "p-5" : "p-8")}>
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
      {!compact ? (
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">
              {phase.index} · {phase.badge}
            </div>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.02em] text-white">{phase.title}</h3>
          </div>
          <div className="text-right font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
            {t.durationLabel}
            <div className="mt-1 text-white/85">{phase.duration}</div>
          </div>
        </div>
      ) : null}

      <dl className={clsx("grid gap-px overflow-hidden rounded-xl border border-line bg-line", compact ? "mt-0" : "mt-6", "sm:grid-cols-3")}>
        {phase.specs.map((s) => (
          <div key={s.k} className="bg-obsidian/70 px-4 py-3">
            <dt className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/40">{s.k}</dt>
            <dd className="mt-1 text-[12.5px] leading-snug text-white/80">{s.v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">{t.deliverablesLabel}</div>
          <ul className="mt-3 space-y-2">
            {phase.deliverables.map((d) => (
              <li key={d} className="flex items-start gap-2.5 text-[13px] text-white/80">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: accent }} />
                {d}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">{t.authoritiesLabel}</div>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {phase.authorities.map((a) => (
              <li key={a} className="rounded-md border border-line bg-obsidian/60 px-2 py-1 font-mono text-[10px] tracking-[0.06em] text-white/65">
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
