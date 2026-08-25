"use client";

import { ArrowUpRight, type LucideIcon } from "lucide-react";
import PageHeader from "@/components/UI/PageHeader";
import Eyebrow from "@/components/UI/Eyebrow";
import CorridorSwitcher from "@/components/sections/CorridorSwitcher";
import ExpansionCalculator from "@/components/sections/ExpansionCalculator";
import { useConsultation } from "@/components/providers/ConsultationProvider";
import { ACCENT_HEX } from "@/lib/geo/cities";
import type { CorridorMode } from "@/lib/content/corridors";
import type { Locale } from "@/lib/translations";

export interface ExpansionServiceCopy {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export interface ExpansionPageCopy {
  badge: string;
  title: string;
  subtitle: string;
  services: ExpansionServiceCopy[];
  ctaTitle: string;
  ctaDesc: string;
  ctaButton: string;
  backLink: string;
}

interface ExpansionPageProps {
  locale: Locale;
  mode: CorridorMode;
  copy: ExpansionPageCopy;
}

/** Shared layout for the Italy (inbound) and Türkiye (outbound) expansion dossiers. */
export default function ExpansionPage({ locale, mode, copy }: ExpansionPageProps) {
  const { open } = useConsultation();
  const accentKey = mode === "inbound" ? "azure" : "emerald";
  const accent = ACCENT_HEX[accentKey];

  return (
    <main className="relative bg-obsidian text-white">
      <PageHeader eyebrow={copy.badge} title={copy.title} sub={copy.subtitle} accent={accentKey} backHref={`/${locale}/services/`} backLabel={copy.backLink} />

      {/* Service grid */}
      <section className="pb-8 lg:pb-12">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {copy.services.map(({ icon: Icon, title, desc }) => (
              <article key={title} className="relative overflow-hidden rounded-2xl border border-line bg-titanium/80 p-6 backdrop-blur transition-colors hover:border-white/15">
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px opacity-70" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-obsidian/70" style={{ color: accent }}>
                  <Icon className="h-5 w-5" strokeWidth={1.25} />
                </span>
                <h3 className="mt-5 font-display text-lg font-normal tracking-[-0.005em]">{title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-white/60">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CorridorSwitcher locale={locale} defaultMode={mode} hideHeader />
      <ExpansionCalculator locale={locale} defaultJurisdiction={mode === "inbound" ? "italy" : "turkiye"} />

      {/* CTA */}
      <section className="pb-24 lg:pb-36">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="relative overflow-hidden rounded-3xl border border-line bg-glass p-8 backdrop-blur-xl lg:p-12">
            <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full blur-[120px]" style={{ backgroundColor: `${accent}26` }} />
            <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <Eyebrow accent={accentKey}>{copy.badge}</Eyebrow>
                <h2 className="mt-4 font-display text-[clamp(1.8rem,3.4vw,2.8rem)] font-normal uppercase leading-[1.08] tracking-[-0.012em]">{copy.ctaTitle}</h2>
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/60">{copy.ctaDesc}</p>
              </div>
              <div className="lg:col-span-4 lg:justify-self-end">
                <button
                  type="button"
                  data-cursor="magnetic"
                  onClick={() => open({ source: copy.badge, service: mode === "inbound" ? "expansion-italy" : "expansion-turkey" })}
                  className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-obsidian transition-colors hover:bg-emerald focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
                >
                  {copy.ctaButton}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
