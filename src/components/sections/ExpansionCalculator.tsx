"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, animate, motion } from "framer-motion";
import { ArrowUpRight, Check, FileDown } from "lucide-react";
import clsx from "clsx";
import Eyebrow from "@/components/UI/Eyebrow";
import { useConsultation } from "@/components/providers/ConsultationProvider";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { BEZIER } from "@/lib/motion/gsap";
import { ACCENT_HEX } from "@/lib/geo/cities";
import { calculatorContent } from "@/lib/content/calculator";
import {
  computeExpansion,
  formatCapital,
  type CompanySize,
  type ExpansionInput,
  type Jurisdiction,
  type Sector,
} from "@/lib/calc/expansion";
import type { Locale } from "@/lib/translations";

const SIZES: CompanySize[] = ["micro", "small", "scale"];
const SECTORS: Sector[] = ["tech", "manufacturing", "retail", "holding"];
const JURISDICTIONS: Jurisdiction[] = ["italy", "turkiye"];

interface ExpansionCalculatorProps {
  locale: Locale;
  /** Initial jurisdiction (e.g. the corridor page the planner is embedded in). */
  defaultJurisdiction?: Jurisdiction;
  /** Omit the section heading when the host page already provides one. */
  hideHeader?: boolean;
}

/** Tween a numeric readout between values (skips when reduced motion). */
function AnimatedNumber({ value, reducedMotion, className }: { value: number; reducedMotion: boolean; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const previous = useRef(value);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion) {
      el.textContent = String(value);
      previous.current = value;
      return;
    }
    const controls = animate(previous.current, value, {
      duration: 0.6,
      ease: BEZIER.out,
      onUpdate: (v) => {
        el.textContent = String(Math.round(v));
      },
    });
    previous.current = value;
    return () => controls.stop();
  }, [value, reducedMotion]);
  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}

function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
  accent,
  columns,
}: {
  label: string;
  options: { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  accent: string;
  columns: number;
}) {
  const id = useId();
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (index + 1) % options.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (index - 1 + options.length) % options.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = options.length - 1;
    else return;
    e.preventDefault();
    onChange(options[next].id);
    const group = e.currentTarget.parentElement;
    (group?.children[next] as HTMLElement | undefined)?.focus();
  };
  return (
    <div>
      <div id={id} className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">
        {label}
      </div>
      <div role="radiogroup" aria-labelledby={id} className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
        {options.map((opt, index) => {
          const active = opt.id === value;
          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={active}
              tabIndex={active ? 0 : -1}
              onKeyDown={(e) => onKeyDown(e, index)}
              onClick={() => onChange(opt.id)}
              data-cursor="magnetic"
              className={clsx(
                "rounded-xl border px-3 py-3 text-left text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
                active ? "border-transparent text-white" : "border-line bg-obsidian/40 text-white/60 hover:border-white/20 hover:text-white/90",
              )}
              style={active ? { backgroundColor: `${accent}1f`, boxShadow: `inset 0 0 0 1px ${accent}88` } : undefined}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ExpansionCalculator({ locale, defaultJurisdiction = "italy", hideHeader = false }: ExpansionCalculatorProps) {
  const t = calculatorContent[locale];
  const { open } = useConsultation();
  const { reducedMotion } = useSmoothScroll();
  const baseId = useId();

  const [input, setInput] = useState<ExpansionInput>({ size: "small", sector: "manufacturing", jurisdiction: defaultJurisdiction });
  const result = useMemo(() => computeExpansion(input), [input]);
  const accent = input.jurisdiction === "italy" ? ACCENT_HEX.azure : ACCENT_HEX.emerald;
  const entity = t.entities[result.entity];
  const savings = t.savings[result.savings.key];
  const intlLocale = locale === "tr" ? "tr-TR" : locale === "it" ? "it-IT" : "en-GB";

  const dossier = useMemo(() => {
    const lines = [
      `${t.dossierIntro}:`,
      `• ${t.inputs.size}: ${t.inputs.sizeOptions[input.size]}`,
      `• ${t.inputs.sector}: ${t.inputs.sectorOptions[input.sector]}`,
      `• ${t.inputs.jurisdiction}: ${t.inputs.jurisdictionOptions[input.jurisdiction]}`,
      "",
      `• ${t.outputs.entity}: ${entity.name}`,
      `• ${t.outputs.timeline}: ${result.timelineWeeks[0]}–${result.timelineWeeks[1]} ${t.outputs.weeks}`,
      `• ${t.outputs.capital}: ${formatCapital(result.capital.amount, result.capital.currency, intlLocale)}`,
      `• ${t.outputs.savings}: ${savings.headline} (${result.savings.range[0]}–${result.savings.range[1]}%)`,
      "",
      `${t.outputs.checklist}:`,
      ...result.checklist.map((key) => `  – ${t.checklist[key]}`),
    ];
    return lines.join("\n");
  }, [t, input, entity.name, result, savings.headline, intlLocale]);

  const sizeIndex = SIZES.indexOf(input.size);

  return (
    <section id="planner" className="relative border-t border-line bg-obsidian py-24 text-white lg:py-36" aria-labelledby={`${baseId}-heading`}>
      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-[36rem] w-[36rem] translate-x-1/3 rounded-full blur-[180px]" style={{ backgroundColor: `${accent}14`, transition: "background-color 600ms" }} />

      <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {!hideHeader ? (
          <div className="max-w-2xl">
            <Eyebrow index="03" accent={input.jurisdiction === "italy" ? "azure" : "emerald"}>
              {t.eyebrow}
            </Eyebrow>
            <h2 id={`${baseId}-heading`} className="mt-5 font-display text-[clamp(2rem,4.2vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
              {t.heading}
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-white/60">{t.sub}</p>
          </div>
        ) : (
          <h2 id={`${baseId}-heading`} className="sr-only">
            {t.heading}
          </h2>
        )}

        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Inputs */}
          <div className="rounded-3xl border border-line bg-titanium/80 p-6 backdrop-blur lg:col-span-5 lg:p-8">
            <div>
              <div className="mb-3 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">
                <label htmlFor={`${baseId}-size`}>{t.inputs.size}</label>
                <span className="text-white/80">{t.inputs.sizeOptions[input.size]}</span>
              </div>
              <input
                id={`${baseId}-size`}
                type="range"
                min={0}
                max={SIZES.length - 1}
                step={1}
                value={sizeIndex}
                onChange={(e) => setInput((prev) => ({ ...prev, size: SIZES[Number(e.target.value)] }))}
                className="hud-range w-full"
                style={{ "--accent": accent, "--progress": `${(sizeIndex / (SIZES.length - 1)) * 100}%` } as React.CSSProperties}
                aria-valuetext={t.inputs.sizeOptions[input.size]}
              />
              <div className="mt-2 flex justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
                {SIZES.map((s) => (
                  <span key={s} className={clsx(s === input.size && "text-white/80")}>
                    {t.inputs.sizeOptions[s].split(" ")[0]}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <Segmented
                label={t.inputs.sector}
                options={SECTORS.map((s) => ({ id: s, label: t.inputs.sectorOptions[s] }))}
                value={input.sector}
                onChange={(sector) => setInput((prev) => ({ ...prev, sector }))}
                accent={accent}
                columns={2}
              />
            </div>

            <div className="mt-8">
              <Segmented
                label={t.inputs.jurisdiction}
                options={JURISDICTIONS.map((j) => ({ id: j, label: t.inputs.jurisdictionOptions[j] }))}
                value={input.jurisdiction}
                onChange={(jurisdiction) => setInput((prev) => ({ ...prev, jurisdiction }))}
                accent={accent}
                columns={2}
              />
            </div>

            <p className="mt-8 border-t border-line pt-5 font-mono text-[10px] leading-relaxed tracking-[0.08em] text-white/35">{t.disclaimer}</p>
          </div>

          {/* Outputs */}
          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <OutputCard label={t.outputs.entity} accent={accent}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={result.entity}
                    initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reducedMotion ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: reducedMotion ? 0 : 0.25 }}
                  >
                    <div className="font-display text-4xl font-semibold tracking-[-0.03em]">{entity.name}</div>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-white/55">{entity.note}</p>
                  </motion.div>
                </AnimatePresence>
              </OutputCard>

              <OutputCard label={t.outputs.timeline} accent={accent}>
                <div className="flex items-baseline gap-2 font-display text-4xl font-semibold tracking-[-0.03em]">
                  <AnimatedNumber value={result.timelineWeeks[0]} reducedMotion={reducedMotion} />
                  <span className="text-white/35">–</span>
                  <AnimatedNumber value={result.timelineWeeks[1]} reducedMotion={reducedMotion} />
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/45">{t.outputs.weeks}</span>
                </div>
                <div className="mt-4">
                  <div className="mb-1.5 flex justify-between font-mono text-[9px] uppercase tracking-[0.22em] text-white/40">
                    <span>{t.outputs.complexity}</span>
                    <span className="text-white/75">{t.outputs.complexityLevels[result.complexity - 1]}</span>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <span key={n} className="h-1.5 flex-1 rounded-full transition-colors duration-500" style={{ backgroundColor: n <= result.complexity ? accent : "rgba(255,255,255,0.08)" }} />
                    ))}
                  </div>
                </div>
              </OutputCard>

              <OutputCard label={t.outputs.capital} accent={accent}>
                <div className="font-display text-3xl font-semibold tracking-[-0.03em] tabular-nums">
                  {formatCapital(result.capital.amount, result.capital.currency, intlLocale)}
                </div>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                  {t.outputs.capitalNote} · {t.outputs.minimum} {formatCapital(result.capital.statutoryMinimum, result.capital.currency, intlLocale)}
                </p>
              </OutputCard>

              <OutputCard label={t.outputs.savings} accent={accent}>
                <div className="flex items-baseline gap-1 font-display text-3xl font-semibold tracking-[-0.03em]">
                  <AnimatedNumber value={result.savings.range[0]} reducedMotion={reducedMotion} />
                  <span className="text-white/35">–</span>
                  <AnimatedNumber value={result.savings.range[1]} reducedMotion={reducedMotion} />
                  <span className="text-xl text-white/60">%</span>
                </div>
                <div className="mt-1 text-[13px] font-medium" style={{ color: accent }}>
                  {savings.headline}
                </div>
                <p className="mt-1.5 text-[12px] leading-relaxed text-white/50">{savings.basis}</p>
              </OutputCard>
            </div>

            {/* Checklist */}
            <div className="mt-4 rounded-2xl border border-line bg-titanium/60 p-6 backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">{t.outputs.checklist}</span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-white/45">{result.checklist.length}</span>
              </div>
              <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                <AnimatePresence initial={false}>
                  {result.checklist.map((key) => (
                    <motion.li
                      key={key}
                      layout={!reducedMotion}
                      initial={reducedMotion ? false : { opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={reducedMotion ? undefined : { opacity: 0, x: 8 }}
                      transition={{ duration: reducedMotion ? 0 : 0.25 }}
                      className="flex items-start gap-2.5 text-[13px] leading-snug text-white/75"
                    >
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={1.75} style={{ color: accent }} />
                      {t.checklist[key]}
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                data-cursor="magnetic"
                onClick={() => open({ source: t.dossierSubject, service: "enterprise", message: dossier })}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-obsidian transition-colors hover:bg-emerald focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
              >
                <FileDown className="h-4 w-4" strokeWidth={1.5} />
                {t.cta}
                <ArrowUpRight className="h-4 w-4 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
              </button>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">{t.ctaHint}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OutputCard({ label, accent, children }: { label: string; accent: string; children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-titanium/80 p-6 backdrop-blur">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px opacity-60" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
      <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">{label}</div>
      <div className="mt-4">{children}</div>
    </div>
  );
}
