"use client";

import Link from "next/link";
import { ArrowUpRight, Banknote, Briefcase, Building2, FileBadge, GraduationCap, Home, IdCard, Landmark, LineChart, Plane, Rocket, Scale, ShieldCheck, Users, type LucideIcon } from "lucide-react";
import PageHeader from "@/components/UI/PageHeader";
import Eyebrow from "@/components/UI/Eyebrow";
import CorridorSwitcher from "@/components/sections/CorridorSwitcher";
import MarketEntryProtocol from "@/components/sections/MarketEntryProtocol";
import { useConsultation } from "@/components/providers/ConsultationProvider";
import { ACCENT_HEX } from "@/lib/geo/cities";
import { consultationContent } from "@/lib/content/consultation";
import { getTranslation, type Locale } from "@/lib/translations";

interface ServicesPageClientProps {
  locale: Locale;
}

const INTEGRATION_ICONS: LucideIcon[] = [GraduationCap, IdCard, Home, Plane, Users, FileBadge, ShieldCheck];
const FINANCIAL_ICONS: LucideIcon[] = [Building2, LineChart, Scale, Landmark, Banknote, ShieldCheck, Briefcase];

function ServiceList({
  title,
  items,
  icons,
  accent,
  index,
}: {
  title: string;
  items: { title: string; description: string }[];
  icons: LucideIcon[];
  accent: string;
  index: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-display text-2xl font-semibold tracking-[-0.02em]">{title}</h2>
        <span className="font-mono text-[10px] tracking-[0.25em] text-white/35">{index}</span>
      </div>
      <ol className="mt-5 overflow-hidden rounded-2xl border border-line bg-titanium/60 backdrop-blur">
        {items.map((item, i) => {
          const Icon = icons[i % icons.length];
          return (
            <li key={item.title} className={i > 0 ? "border-t border-line" : undefined}>
              <div className="flex items-start gap-4 px-5 py-4">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-obsidian/70" style={{ color: accent }}>
                  <Icon className="h-4 w-4" strokeWidth={1.25} />
                </span>
                <div>
                  <div className="text-[14px] font-medium text-white">{item.title}</div>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-white/55">{item.description}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default function ServicesPageClient({ locale }: ServicesPageClientProps) {
  const t = getTranslation(locale);
  const s = t.services;
  const c = consultationContent[locale];
  const { open } = useConsultation();

  return (
    <main className="relative bg-obsidian text-white">
      <PageHeader eyebrow={s.label.replace(/^\d+\s*\/\/\s*/, "")} title={s.title} sub={s.subtitle} accent="azure" />

      <CorridorSwitcher locale={locale} hideHeader />

      {/* Service catalogue */}
      <section className="border-t border-line py-24 lg:py-32">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <Eyebrow accent="gold">{s.viewAll}</Eyebrow>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <ServiceList title={s.financialTitle} items={s.financialServices} icons={FINANCIAL_ICONS} accent={ACCENT_HEX.azure} index="F" />
            <ServiceList title={s.integrationTitle} items={s.integrationServices} icons={INTEGRATION_ICONS} accent={ACCENT_HEX.emerald} index="I" />
          </div>

          {/* Startup corridor promo */}
          <div className="relative mt-8 overflow-hidden rounded-3xl border border-line bg-glass p-8 backdrop-blur-xl lg:p-10">
            <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-gold/10 blur-[120px]" />
            <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-obsidian/70 text-gold">
                    <Rocket className="h-4 w-4" strokeWidth={1.25} />
                  </span>
                  <Eyebrow accent="gold">{s.startupCorridor.label}</Eyebrow>
                </div>
                <h2 className="mt-5 font-display text-[clamp(1.6rem,3vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">{s.startupCorridor.title}</h2>
                <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-white/60">{s.startupCorridor.description}</p>
              </div>
              <div className="flex flex-col gap-2 lg:col-span-4 lg:items-end">
                <Link
                  href={`/${locale}/services/startup-corridor/`}
                  data-cursor="magnetic"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-obsidian transition-colors hover:bg-emerald"
                >
                  {s.startupCorridor.button}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
                </Link>
                <button
                  type="button"
                  onClick={() => open({ source: s.title })}
                  className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/70 transition-colors hover:text-white"
                >
                  {c.title}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MarketEntryProtocol locale={locale} />
    </main>
  );
}
