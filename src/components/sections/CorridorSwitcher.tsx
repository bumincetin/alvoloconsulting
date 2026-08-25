"use client";

import Link from "next/link";
import { useCallback, useId, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import {
  ArrowRight,
  Boxes,
  Building2,
  Factory,
  IdCard,
  Landmark,
  Network,
  Route,
  Scale,
  type LucideIcon,
} from "lucide-react";
import clsx from "clsx";
import Eyebrow from "@/components/UI/Eyebrow";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { BEZIER } from "@/lib/motion/gsap";
import { ACCENT_HEX } from "@/lib/geo/cities";
import {
  CORRIDOR_MODES,
  corridorContent,
  corridorUi,
  type ChecklistCategory,
  type CorridorMode,
  type EngagementProfile,
  type ServiceIcon,
  type ServiceItem,
} from "@/lib/content/corridors";
import type { Locale } from "@/lib/translations";

const ICONS: Record<ServiceIcon, LucideIcon> = {
  building: Building2,
  scale: Scale,
  idcard: IdCard,
  landmark: Landmark,
  factory: Factory,
  boxes: Boxes,
  route: Route,
  network: Network,
};

const CATEGORY_COLOR: Record<ChecklistCategory, string> = {
  STATUTORY: ACCENT_HEX.azure,
  FISCAL: ACCENT_HEX.gold,
  IMMIGRATION: ACCENT_HEX.emerald,
  OPERATIONAL: "rgba(255,255,255,0.6)",
  COMMERCIAL: ACCENT_HEX.gold,
};

interface CorridorSwitcherProps {
  locale: Locale;
  defaultMode?: CorridorMode;
  /** Omit the section heading when the host page already provides one. */
  hideHeader?: boolean;
}

/* ------------------------------------------------------------------ */
/* Spotlight card (pointer-tracked radial highlight)                    */
/* ------------------------------------------------------------------ */

function SpotlightCard({
  accent,
  className,
  children,
  magnetic = true,
}: {
  accent: string;
  className?: string;
  children: React.ReactNode;
  magnetic?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };
  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      data-cursor={magnetic ? "magnetic" : undefined}
      style={{ "--accent": accent } as CSSProperties}
      className={clsx(
        "group relative overflow-hidden rounded-2xl border border-line bg-titanium/80 backdrop-blur transition-colors duration-300 hover:border-white/15",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(480px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--accent) 16%, transparent), transparent 60%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sub-blocks                                                           */
/* ------------------------------------------------------------------ */

function ServiceCard({ item, accent, deliverablesLabel }: { item: ServiceItem; accent: string; deliverablesLabel: string }) {
  const Icon = ICONS[item.icon];
  return (
    <SpotlightCard accent={accent} className="flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-obsidian/70"
          style={{ color: accent }}
        >
          <Icon className="h-5 w-5" strokeWidth={1.25} />
        </span>
      </div>
      <h4 className="mt-5 font-display text-lg font-semibold tracking-[-0.02em] text-white">{item.title}</h4>
      <p className="mt-2 text-[13.5px] leading-relaxed text-white/60">{item.description}</p>
      <div className="mt-auto pt-5">
        <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/35">{deliverablesLabel}</div>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {item.deliverables.map((d) => (
            <li key={d} className="rounded-md border border-line bg-obsidian/60 px-2 py-1 font-mono text-[10px] tracking-[0.08em] text-white/70">
              {d}
            </li>
          ))}
        </ul>
      </div>
    </SpotlightCard>
  );
}

function ProfileCard({ profile, accent }: { profile: EngagementProfile; accent: string }) {
  return (
    <SpotlightCard accent={accent} className="p-6" magnetic={false}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">{profile.sector}</span>
        <span className="rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-[0.2em]" style={{ color: accent, borderColor: `${accent}55` }}>
          {profile.route}
        </span>
      </div>
      <p className="mt-4 text-[14px] leading-relaxed text-white/85">{profile.brief}</p>
      <p className="mt-3 text-[13px] leading-relaxed text-white/55">{profile.outcome}</p>
      <dl className="mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-line bg-line">
        {profile.metrics.map((m) => (
          <div key={m.k} className="bg-obsidian/70 px-3 py-2.5">
            <dt className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/35">{m.k}</dt>
            <dd className="mt-1 text-[12px] font-medium text-white/85">{m.v}</dd>
          </div>
        ))}
      </dl>
    </SpotlightCard>
  );
}

/** Schematic IT ⇄ TR route with directional dash flow. */
function RouteDiagram({ mode, accent, label, reducedMotion }: { mode: CorridorMode; accent: string; label: string; reducedMotion: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 320 64" className="h-16 w-full max-w-xs" aria-hidden="true">
        <defs>
          <linearGradient id={`corridor-grad-${mode}`} x1="0" x2="1">
            <stop offset="0" stopColor={ACCENT_HEX.azure} />
            <stop offset="1" stopColor={ACCENT_HEX.emerald} />
          </linearGradient>
        </defs>
        <path d="M44 40 C 110 -6, 210 -6, 276 40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <path
          d="M44 40 C 110 -6, 210 -6, 276 40"
          fill="none"
          stroke={`url(#corridor-grad-${mode})`}
          strokeWidth="1.5"
          strokeDasharray="6 10"
          strokeLinecap="round"
          className={clsx(!reducedMotion && "corridor-dash")}
          style={{ animationDirection: mode === "inbound" ? "reverse" : "normal" }}
        />
        <circle cx="44" cy="40" r="4" fill={ACCENT_HEX.azure} />
        <circle cx="44" cy="40" r="9" fill="none" stroke={ACCENT_HEX.azure} strokeOpacity="0.35" />
        <circle cx="276" cy="40" r="4" fill={ACCENT_HEX.emerald} />
        <circle cx="276" cy="40" r="9" fill="none" stroke={ACCENT_HEX.emerald} strokeOpacity="0.35" />
        <text x="44" y="60" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="9" letterSpacing="2" fill="rgba(255,255,255,0.5)">
          MIL / ROM
        </text>
        <text x="276" y="60" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="9" letterSpacing="2" fill="rgba(255,255,255,0.5)">
          IST
        </text>
      </svg>
      <span className="hidden font-mono text-[10px] uppercase tracking-[0.28em] sm:block" style={{ color: accent }}>
        {label}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                              */
/* ------------------------------------------------------------------ */

export default function CorridorSwitcher({ locale, defaultMode = "inbound", hideHeader = false }: CorridorSwitcherProps) {
  const [mode, setMode] = useState<CorridorMode>(defaultMode);
  const { reducedMotion } = useSmoothScroll();
  const ui = corridorUi[locale];
  const content = corridorContent[locale][mode];
  const accent = ACCENT_HEX[content.accent];
  const baseId = useId();
  const tabRefs = useRef<Record<CorridorMode, HTMLButtonElement | null>>({ inbound: null, outbound: null });

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight" && e.key !== "Home" && e.key !== "End") return;
      e.preventDefault();
      const idx = CORRIDOR_MODES.indexOf(mode);
      let next = idx;
      if (e.key === "ArrowLeft") next = (idx - 1 + CORRIDOR_MODES.length) % CORRIDOR_MODES.length;
      if (e.key === "ArrowRight") next = (idx + 1) % CORRIDOR_MODES.length;
      if (e.key === "Home") next = 0;
      if (e.key === "End") next = CORRIDOR_MODES.length - 1;
      const target = CORRIDOR_MODES[next];
      setMode(target);
      tabRefs.current[target]?.focus();
    },
    [mode],
  );

  const enter = reducedMotion ? { opacity: 1 } : { opacity: 0, y: 22, filter: "blur(6px)" };
  const exit = reducedMotion ? { opacity: 1 } : { opacity: 0, y: -14, filter: "blur(6px)" };
  const transition = { duration: reducedMotion ? 0 : 0.5, ease: BEZIER.out };

  return (
    <section id="corridors" className="relative border-t border-line bg-obsidian py-24 text-white lg:py-36" aria-labelledby={`${baseId}-heading`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.25] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            {!hideHeader ? (
              <>
                <Eyebrow index="01" accent={content.accent}>
                  {ui.eyebrow}
                </Eyebrow>
                <h2 id={`${baseId}-heading`} className="mt-5 font-display text-[clamp(2rem,4.2vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
                  {ui.heading}
                </h2>
                <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/60">{ui.sub}</p>
              </>
            ) : (
              <h2 id={`${baseId}-heading`} className="sr-only">
                {ui.heading}
              </h2>
            )}
          </div>
          <div className="lg:col-span-5 lg:justify-self-end">
            <RouteDiagram mode={mode} accent={accent} label={content.routeLabel} reducedMotion={reducedMotion} />
          </div>
        </div>

        {/* Segmented control */}
        <div className="mt-12">
          <div
            role="tablist"
            aria-label={ui.switcherAria}
            className="relative inline-grid w-full grid-cols-1 gap-1 rounded-[1.6rem] border border-line bg-titanium/80 p-1.5 backdrop-blur sm:w-auto sm:grid-cols-2 sm:rounded-full"
          >
            {CORRIDOR_MODES.map((m) => {
              const c = corridorContent[locale][m];
              const active = m === mode;
              const tabAccent = ACCENT_HEX[c.accent];
              return (
                <button
                  key={m}
                  ref={(el) => {
                    tabRefs.current[m] = el;
                  }}
                  role="tab"
                  id={`${baseId}-tab-${m}`}
                  aria-selected={active}
                  aria-controls={`${baseId}-panel-${m}`}
                  tabIndex={active ? 0 : -1}
                  data-cursor="magnetic"
                  onClick={() => setMode(m)}
                  onKeyDown={onKeyDown}
                  className={clsx(
                    "relative isolate rounded-full px-5 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:min-w-[17rem]",
                    active ? "text-white" : "text-white/55 hover:text-white/85",
                  )}
                >
                  {active ? (
                    <motion.span
                      layoutId="corridor-pill"
                      className="absolute inset-0 -z-10 rounded-full border bg-white/[0.06]"
                      style={{ borderColor: `${tabAccent}66`, boxShadow: `0 0 40px -10px ${tabAccent}66, inset 0 0 0 1px ${tabAccent}22` }}
                      transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 34 }}
                    />
                  ) : null}
                  <span className="block font-mono text-[9.5px] uppercase tracking-[0.26em]" style={{ color: active ? tabAccent : undefined }}>
                    {c.tabHint}
                  </span>
                  <span className="mt-1 block text-[14px] font-medium">{c.tabLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Morphing content */}
        <LayoutGroup id={`${baseId}-corridor`}>
          <motion.div layout transition={{ duration: reducedMotion ? 0 : 0.5, ease: BEZIER.inOut }} className="mt-10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mode}
                role="tabpanel"
                id={`${baseId}-panel-${mode}`}
                aria-labelledby={`${baseId}-tab-${mode}`}
                initial={enter}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={exit}
                transition={transition}
              >
                {/* Intro band */}
                <div className="grid gap-6 border-b border-line pb-10 lg:grid-cols-12">
                  <h3 className="font-display text-[clamp(1.4rem,2.4vw,2rem)] font-semibold leading-tight tracking-[-0.02em] text-white lg:col-span-6">
                    {content.title}
                  </h3>
                  <p className="text-[14.5px] leading-relaxed text-white/60 lg:col-span-6">{content.summary}</p>
                </div>

                {/* Services + checklist */}
                <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-8">
                  <div className="lg:col-span-7">
                    <Eyebrow accent={content.accent}>{ui.servicesLabel}</Eyebrow>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      {content.services.map((s) => (
                        <ServiceCard key={s.title} item={s} accent={accent} deliverablesLabel={ui.deliverables} />
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <Eyebrow accent={content.accent}>{ui.checklistLabel}</Eyebrow>
                    <ol className="mt-5 overflow-hidden rounded-2xl border border-line bg-titanium/60 backdrop-blur">
                      {content.checklist.map((item, i) => (
                        <li
                          key={item.code}
                          className={clsx("grid grid-cols-[3.4rem_1fr] gap-x-3 px-5 py-4", i > 0 && "border-t border-line")}
                        >
                          <span className="pt-0.5 font-mono text-[10px] tracking-[0.2em]" style={{ color: accent }}>
                            {item.code}
                          </span>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[13.5px] font-medium text-white/90">{item.label}</span>
                              <span
                                className="rounded-sm border px-1.5 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.22em]"
                                style={{ color: CATEGORY_COLOR[item.category], borderColor: `${CATEGORY_COLOR[item.category]}55` }}
                              >
                                {ui.categories[item.category]}
                              </span>
                            </div>
                            <p className="mt-1 text-[12.5px] leading-relaxed text-white/50">{item.note}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* Engagement profiles */}
                <div className="mt-14">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <Eyebrow accent={content.accent}>{ui.profilesLabel}</Eyebrow>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">{ui.profilesDisclaimer}</span>
                  </div>
                  <div className="mt-5 grid gap-4 lg:grid-cols-2">
                    {content.profiles.map((p) => (
                      <ProfileCard key={p.sector} profile={p} accent={accent} />
                    ))}
                  </div>
                </div>

                {/* Dossier CTA */}
                <div className="mt-10 flex justify-start">
                  <Link
                    href={`/${locale}${content.dossierHref}`}
                    data-cursor="magnetic"
                    className="group inline-flex items-center gap-3 rounded-full border border-line bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-white/90 transition-colors hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                  >
                    {content.dossierLabel}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} style={{ color: accent }} />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}
