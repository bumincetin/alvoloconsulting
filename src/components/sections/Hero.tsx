"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, CalendarClock } from "lucide-react";
import SplitType from "split-type";
import clsx from "clsx";
import { gsap, EASE } from "@/lib/motion/gsap";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import GlobeFallback from "@/components/canvas/GlobeFallback";
import Eyebrow from "@/components/UI/Eyebrow";
import { useConsultation } from "@/components/providers/ConsultationProvider";
import { heroContent } from "@/lib/content/hero";
import { ACCENT_HEX, CITIES, CITY_ORDER, formatCoords, type CityId } from "@/lib/geo/cities";
import type { Locale } from "@/lib/translations";

const TradeGlobeCanvas = dynamic(() => import("@/components/canvas/TradeGlobeCanvas"), {
  ssr: false,
  loading: () => <GlobeFallback />,
});

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Responsive framing for the Trade Globe.
 * Desktop: a large disc bleeding off the bottom-right, with the MIL–ROM–IST corridor rotated
 * into the upper-left of the disc so it sits above the telemetry panel.
 * Mobile: tighter camera, corridor centred in a shorter canvas.
 */
const GLOBE_PRESET = {
  desktop: { cameraDistance: 2.6, focus: { lat: 5, lon: 30 }, offset: [0.05, -0.45] as [number, number], labelScale: 1.7 },
  mobile: { cameraDistance: 2.4, focus: { lat: 42, lon: 19 }, offset: [0, -0.15] as [number, number], labelScale: 1.1 },
};

interface HeroProps {
  locale: Locale;
}

/** Deterministic word split rendered on the server; each line is its own baseline mask. */
function MaskedLine({ text, index }: { text: string; index: number }) {
  const words = text.split(" ");
  return (
    <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em]" data-hero-line={index}>
      {words.map((word, i) => (
        <span key={`${index}-${i}`}>
          <span className="inline-block will-change-transform" data-hero-word>
            {word}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}

function useLocalClocks(locale: Locale) {
  const [times, setTimes] = useState<Record<"rome" | "istanbul", string>>({ rome: "--:--:--", istanbul: "--:--:--" });
  useEffect(() => {
    const fmt = (tz: string) =>
      new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: tz });
    const rome = fmt("Europe/Rome");
    const ist = fmt("Europe/Istanbul");
    const tick = () => {
      const now = new Date();
      setTimes({ rome: rome.format(now), istanbul: ist.format(now) });
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [locale]);
  return times;
}

export default function Hero({ locale }: HeroProps) {
  const content = heroContent[locale];
  const { reducedMotion, finePointer, scrollTo } = useSmoothScroll();
  const { open: openConsultation } = useConsultation();
  const clocks = useLocalClocks(locale);

  const rootRef = useRef<HTMLElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  const [selectedCity, setSelectedCity] = useState<CityId>("milan");
  const [hoveredCity, setHoveredCity] = useState<CityId | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  const activeCity = hoveredCity ?? selectedCity;
  const node = content.nodes.find((n) => n.id === activeCity) ?? content.nodes[0];
  const accent = ACCENT_HEX[CITIES[activeCity].accent];

  const labels = useMemo(
    () => Object.fromEntries(content.nodes.map((n) => [n.id, n.city])) as Record<CityId, string>,
    [content.nodes],
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  /* ---------------------------------------------------------------- */
  /* Kinetic entrance                                                   */
  /* ---------------------------------------------------------------- */
  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    const sub = subRef.current;
    if (!root || !sub) return;
    // Read the media query directly so the mask is applied before the first paint —
    // waiting for the provider's post-mount state would flash the un-animated headline.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let split: SplitType | null = null;
    let intro: gsap.core.Timeline | null = null;
    let cancelled = false;
    let introDone = false;
    let lastWidth = sub.offsetWidth;

    const ctx = gsap.context(() => {
      // Hide everything synchronously so nothing flashes before fonts settle.
      gsap.set(["[data-hero-line]", "[data-hero-fade]", "[data-hero-globe]", sub], { visibility: "hidden" });
    }, root);

    const build = () => {
      if (cancelled) return;
      ctx.add(() => {
        split = new SplitType(sub, { types: "lines,words", tagName: "span" });
        split.lines?.forEach((line) => {
          line.style.overflow = "hidden";
          line.style.paddingBottom = "0.12em";
          line.style.marginBottom = "-0.12em";
        });

        gsap.set(["[data-hero-line]", "[data-hero-fade]", "[data-hero-globe]", sub], { visibility: "visible" });

        intro = gsap.timeline({
          defaults: { ease: EASE.out },
          onComplete: () => {
            introDone = true;
          },
        });

        const lines = gsap.utils.toArray<HTMLElement>("[data-hero-line]", root);
        lines.forEach((line, i) => {
          intro!.from(line.querySelectorAll("[data-hero-word]"), { yPercent: 118, duration: 1.25, stagger: 0.045 }, 0.1 + i * 0.13);
        });

        split.lines?.forEach((line, i) => {
          intro!.from(line.querySelectorAll(".word"), { yPercent: 115, duration: 1, stagger: 0.012 }, 0.45 + i * 0.08);
        });

        intro.from("[data-hero-fade]", { autoAlpha: 0, y: 18, duration: 0.9, stagger: 0.08 }, 0.55);
        intro.from("[data-hero-globe]", { autoAlpha: 0, scale: 0.94, duration: 1.8, ease: EASE.expo }, 0.2);
      });
    };

    const fontsReady: Promise<unknown> = document.fonts?.ready ?? Promise.resolve();
    fontsReady.then(build);

    // Re-split the paragraph when its width changes (line breaks move) — only once the intro has settled.
    const ro = new ResizeObserver(() => {
      if (!introDone || !split) return;
      const width = sub.offsetWidth;
      if (width === lastWidth) return;
      lastWidth = width;
      split.split({ types: "lines,words", tagName: "span" });
      split.lines?.forEach((line) => {
        line.style.overflow = "hidden";
        line.style.paddingBottom = "0.12em";
        line.style.marginBottom = "-0.12em";
      });
    });
    ro.observe(sub);

    return () => {
      cancelled = true;
      ro.disconnect();
      intro?.kill();
      split?.revert();
      ctx.revert();
    };
  }, [locale]);

  const handleHover = useCallback((id: CityId | null) => setHoveredCity(id), []);
  const handleSelect = useCallback((id: CityId) => setSelectedCity(id), []);

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative isolate min-h-[100svh] overflow-hidden bg-obsidian text-white"
      aria-labelledby="hero-heading"
    >
      {/* Background grid + vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_30%_40%,black_20%,transparent_75%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-1/3 h-[40rem] w-[40rem] rounded-full bg-azure/10 blur-[160px]" />

      {/* WebGL corridor */}
      <div
        data-hero-globe
        className="absolute inset-x-0 top-0 h-[54svh] lg:inset-y-0 lg:left-auto lg:right-0 lg:h-full lg:w-[58vw]"
      >
        <TradeGlobeCanvas
          className="absolute inset-0"
          activeCity={activeCity}
          onCityHover={handleHover}
          onCitySelect={handleSelect}
          quality={isDesktop ? "high" : "low"}
          reducedMotion={reducedMotion}
          labels={labels}
          {...(isDesktop ? GLOBE_PRESET.desktop : GLOBE_PRESET.mobile)}
        />
        {/* Legibility ramps */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-obsidian via-obsidian/60 to-transparent lg:block lg:w-[38%]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-obsidian to-transparent lg:hidden" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto grid min-h-[100svh] w-full max-w-[1440px] grid-cols-1 gap-12 px-5 pb-16 pt-[50svh] sm:px-8 lg:grid-cols-12 lg:items-end lg:gap-8 lg:px-12 lg:pb-20 lg:pt-40">
        <div className="lg:col-span-7">
          <div data-hero-fade>
            <Eyebrow accent="emerald">{content.eyebrow}</Eyebrow>
          </div>

          <h1
            id="hero-heading"
            className="mt-7 font-display text-[clamp(2.55rem,6.1vw,6.35rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-white"
          >
            {content.headline.map((line, i) => (
              <MaskedLine key={i} text={line} index={i} />
            ))}
          </h1>

          <p ref={subRef} className="mt-7 max-w-xl text-[15px] leading-relaxed text-white/65 sm:text-base lg:text-[17px]">
            {content.sub}
          </p>

          <div data-hero-fade className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              data-cursor="magnetic"
              onClick={() => openConsultation({ source: content.ctaPrimary })}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-obsidian transition-colors hover:bg-emerald focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
            >
              <CalendarClock className="h-4 w-4" strokeWidth={1.5} />
              {content.ctaPrimary}
            </button>
            <button
              type="button"
              data-cursor="magnetic"
              onClick={() => scrollTo("#corridors")}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-white/85 backdrop-blur transition-colors hover:border-white/25 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              {content.ctaSecondary}
              <ArrowUpRight className="h-4 w-4 text-white/60" strokeWidth={1.5} />
            </button>
          </div>

          <dl data-hero-fade className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
            {content.pillars.map((p) => (
              <div key={p.label} className="bg-titanium/80 px-5 py-4 backdrop-blur">
                <dt className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">{p.label}</dt>
                <dd className="mt-2 text-[13px] leading-snug text-white/80">{p.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Telemetry panel */}
        <div data-hero-fade className="w-full lg:col-span-5 lg:justify-self-end lg:max-w-[26rem]">
          <div className="rounded-2xl border border-line bg-glass p-5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <Eyebrow accent={CITIES[activeCity].accent}>{content.telemetryTitle}</Eyebrow>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald/90">{content.corridorStatus}</span>
            </div>

            <div role="group" aria-label={content.telemetryTitle} className="mt-4 flex gap-1 rounded-full border border-line bg-obsidian/60 p-1">
              {CITY_ORDER.map((id) => {
                const isActive = id === activeCity;
                const cityAccent = ACCENT_HEX[CITIES[id].accent];
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setSelectedCity(id)}
                    onMouseEnter={() => setHoveredCity(id)}
                    onMouseLeave={() => setHoveredCity(null)}
                    onFocus={() => setHoveredCity(id)}
                    onBlur={() => setHoveredCity(null)}
                    className={clsx(
                      "relative flex-1 rounded-full px-3 py-2 font-mono text-[10px] uppercase tracking-[0.25em] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40",
                      isActive ? "text-white" : "text-white/45 hover:text-white/80",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="hero-city-pill"
                        className="absolute inset-0 rounded-full border"
                        style={{ borderColor: `${cityAccent}55`, backgroundColor: `${cityAccent}14` }}
                        transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                      />
                    ) : null}
                    <span className="relative">{CITIES[id].code}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 min-h-[11.5rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={node.id}
                  initial={reducedMotion ? false : { opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={reducedMotion ? undefined : { opacity: 0, y: -8, filter: "blur(4px)" }}
                  transition={{ duration: reducedMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <div>
                      <div className="font-display text-xl font-semibold tracking-[-0.02em] text-white">{node.city}</div>
                      <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.25em] text-white/45">{node.country}</div>
                    </div>
                    <div className="text-right font-mono text-[10px] tracking-[0.2em] text-white/40">
                      {formatCoords(CITIES[node.id].lat, CITIES[node.id].lon)}
                    </div>
                  </div>
                  <div className="mt-3 text-sm font-medium" style={{ color: accent }}>
                    {node.headline}
                  </div>
                  <dl className="mt-4 space-y-2 border-t border-line pt-4">
                    {node.rows.map((row) => (
                      <div key={row.k} className="grid grid-cols-[7.5rem_1fr] gap-3 text-[12.5px]">
                        <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">{row.k}</dt>
                        <dd className="text-white/80">{row.v}</dd>
                      </div>
                    ))}
                  </dl>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-line pt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
              <span>{content.localTime}</span>
              <span className="flex items-center gap-4 tabular-nums text-white/75">
                <span>
                  <span className="text-azure">MIL</span> {clocks.rome}
                </span>
                <span>
                  <span className="text-emerald">IST</span> {clocks.istanbul}
                </span>
              </span>
            </div>
          </div>
          {finePointer ? (
            <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-white/30 lg:text-right">{content.telemetryHint}</p>
          ) : null}
        </div>
      </div>

      {/* Bottom telemetry rail */}
      <div
        data-hero-fade
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden items-center justify-between border-t border-line px-12 py-4 font-mono text-[10px] uppercase tracking-[0.25em] text-white/35 lg:flex"
      >
        <span>
          {CITY_ORDER.map((id) => `${CITIES[id].code} ${formatCoords(CITIES[id].lat, CITIES[id].lon)}`).join("   ·   ")}
        </span>
        <span className="flex items-center gap-2">
          {content.scrollHint}
          <ArrowDown className={clsx("h-3.5 w-3.5", !reducedMotion && "animate-bounce")} strokeWidth={1.5} />
        </span>
      </div>
    </section>
  );
}
