"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Mail, MessageCircle, Minus } from "lucide-react";
import clsx from "clsx";
import Eyebrow from "@/components/UI/Eyebrow";
import { useConsultation } from "@/components/providers/ConsultationProvider";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { BEZIER } from "@/lib/motion/gsap";
import { ACCENT_HEX } from "@/lib/geo/cities";
import { pricingContent, type MatrixValue, type PricingTier, type TierId } from "@/lib/content/pricing";
import { CONTACT } from "@/lib/content/footer";
import type { Locale } from "@/lib/translations";

const TIER_ACCENT: Record<TierId, string> = {
  essential: ACCENT_HEX.azure,
  professional: ACCENT_HEX.emerald,
  enterprise: ACCENT_HEX.gold,
};
const TIER_IDS: TierId[] = ["essential", "professional", "enterprise"];

interface PricingSectionProps {
  locale: Locale;
  /** Omit the section heading when the host page already provides one. */
  hideHeader?: boolean;
}

export default function PricingSection({ locale, hideHeader = false }: PricingSectionProps) {
  const t = pricingContent[locale];
  const { open } = useConsultation();
  const { reducedMotion } = useSmoothScroll();
  const baseId = useId();
  const [openGroups, setOpenGroups] = useState<Record<number, boolean>>({ 0: true });

  const whatsappHref = (tier: PricingTier) => `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(t.whatsappMessage[tier.id])}`;

  return (
    <section id="engagement" className="relative border-t border-line bg-obsidian py-24 text-white lg:py-36" aria-labelledby={`${baseId}-heading`}>
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-emerald/[0.06] blur-[160px]" />

      <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {!hideHeader ? (
          <div className="max-w-2xl">
            <Eyebrow index="04" accent="emerald">
              {t.eyebrow}
            </Eyebrow>
            <h2 id={`${baseId}-heading`} className="mt-5 font-display text-[clamp(2rem,4.2vw,3.6rem)] font-normal uppercase leading-[1.05] tracking-[-0.012em]">
              {t.heading}
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-white/60">{t.sub}</p>
          </div>
        ) : (
          <h2 id={`${baseId}-heading`} className="sr-only">
            {t.heading}
          </h2>
        )}

        {/* Slabs */}
        <div className="mt-12 grid gap-4 lg:grid-cols-3 lg:items-end lg:gap-6">
          {t.tiers.map((tier) => {
            const accent = TIER_ACCENT[tier.id];
            return (
              <article
                key={tier.id}
                data-cursor="magnetic"
                className={clsx(
                  "relative flex flex-col overflow-hidden rounded-3xl border p-7 backdrop-blur-xl lg:p-8",
                  tier.featured ? "border-emerald/40 bg-glass shadow-[0_40px_120px_-40px_rgba(0,229,153,0.35)] lg:-translate-y-4" : "border-line bg-titanium/70",
                )}
                aria-labelledby={`${baseId}-${tier.id}`}
              >
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
                {tier.featured ? (
                  <span className="absolute right-6 top-6 rounded-full border border-emerald/50 bg-emerald/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-emerald">
                    {t.featuredBadge}
                  </span>
                ) : null}

                <div className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: accent }}>
                  {tier.name}
                </div>
                <div id={`${baseId}-${tier.id}`} className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-5xl font-normal tracking-[-0.02em]">{tier.price}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">{tier.cadence}</span>
                </div>
                <p className="mt-3 text-[13.5px] leading-relaxed text-white/60">{tier.tagline}</p>

                <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[13px] text-white/80">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={1.75} style={{ color: accent }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-2">
                  <a
                    href={whatsappHref(tier)}
                    target="_blank"
                    rel="noreferrer"
                    className={clsx(
                      "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
                      tier.featured ? "bg-white text-obsidian hover:bg-emerald" : "border border-line bg-white/[0.04] text-white hover:bg-white/[0.08]",
                    )}
                  >
                    <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
                    {tier.cta}
                  </a>
                  <button
                    type="button"
                    onClick={() => open({ source: tier.name, service: tier.serviceId, message: `${t.emailSubject[tier.id]}\n\n` })}
                    className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-white/55 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                  >
                    <Mail className="h-3.5 w-3.5" strokeWidth={1.5} />
                    {t.email}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
        <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">{t.vatNote}</p>

        {/* Matrix */}
        <div className="mt-16">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Eyebrow accent="gold">{t.matrixLabel}</Eyebrow>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">{t.matrixHint}</span>
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-line bg-titanium/60 backdrop-blur">
            {/* Column header */}
            <div className="hidden grid-cols-[1.6fr_1fr_1fr_1fr] gap-4 border-b border-line px-6 py-3 font-mono text-[9px] uppercase tracking-[0.25em] text-white/40 sm:grid">
              <span />
              {TIER_IDS.map((id) => (
                <span key={id} style={{ color: TIER_ACCENT[id] }}>
                  {t.tiers.find((x) => x.id === id)?.name}
                </span>
              ))}
            </div>

            {t.matrix.map((group, gi) => {
              const isOpen = !!openGroups[gi];
              const panelId = `${baseId}-group-${gi}`;
              return (
                <div key={group.title} className={clsx(gi > 0 && "border-t border-line")}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenGroups((prev) => ({ ...prev, [gi]: !prev[gi] }))}
                    className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/30"
                  >
                    <span className="text-[14px] font-medium text-white">{group.title}</span>
                    <ChevronDown className={clsx("h-4 w-4 text-white/50 transition-transform duration-300", isOpen && "rotate-180")} strokeWidth={1.5} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={panelId}
                        initial={reducedMotion ? { height: "auto" } : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reducedMotion ? { height: "auto" } : { height: 0, opacity: 0 }}
                        transition={{ duration: reducedMotion ? 0 : 0.4, ease: BEZIER.inOut }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-line">
                          {group.rows.map((row, ri) => (
                            <div key={row.feature} className={clsx("grid gap-2 px-6 py-3 sm:grid-cols-[1.6fr_1fr_1fr_1fr] sm:gap-4", ri > 0 && "border-t border-line/60")}>
                              <span className="text-[13px] text-white/80">{row.feature}</span>
                              {TIER_IDS.map((id) => (
                                <div key={id} className="flex items-center gap-2 sm:block">
                                  <span className="w-24 font-mono text-[9px] uppercase tracking-[0.2em] text-white/35 sm:hidden" style={{ color: TIER_ACCENT[id] }}>
                                    {t.tiers.find((x) => x.id === id)?.name}
                                  </span>
                                  <MatrixCell value={row.values[id]} accent={TIER_ACCENT[id]} included={t.included} notIncluded={t.notIncluded} />
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function MatrixCell({ value, accent, included, notIncluded }: { value: MatrixValue; accent: string; included: string; notIncluded: string }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center gap-1.5 text-[12px] text-white/80">
        <Check className="h-3.5 w-3.5" strokeWidth={1.75} style={{ color: accent }} />
        <span className="sr-only">{included}</span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center text-white/25">
        <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
        <span className="sr-only">{notIncluded}</span>
      </span>
    );
  }
  return <span className="font-mono text-[11px] tracking-[0.04em] text-white/75">{value}</span>;
}
