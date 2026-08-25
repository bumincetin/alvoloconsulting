"use client";

import { useParams } from "next/navigation";
import { ArrowUpRight, Building2, Coins, Handshake, Rocket, Settings2, TrendingUp, type LucideIcon } from "lucide-react";
import clsx from "clsx";
import PageHeader from "@/components/UI/PageHeader";
import Eyebrow from "@/components/UI/Eyebrow";
import { useConsultation } from "@/components/providers/ConsultationProvider";
import { ACCENT_HEX } from "@/lib/geo/cities";
import { getTranslation, locales, type Locale } from "@/lib/translations";

function resolveLocale(value: unknown): Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value) ? (value as Locale) : "en";
}

const MODULE_ICONS: LucideIcon[] = [TrendingUp, Building2, Rocket, Handshake, Coins, Settings2];
const TIER_ACCENT = [ACCENT_HEX.azure, ACCENT_HEX.emerald, ACCENT_HEX.gold];

export default function StartupCorridorClient() {
  const params = useParams();
  const locale = resolveLocale(params?.locale);
  const p = getTranslation(locale).startupCorridorPage;
  const { open } = useConsultation();

  return (
    <main className="relative bg-obsidian text-white">
      <PageHeader eyebrow={p.badge} title={p.title} sub={p.subtitle} accent="gold" />

      {/* Mission */}
      <section className="pb-20 lg:pb-28">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="relative overflow-hidden rounded-3xl border border-line bg-glass p-8 backdrop-blur-xl lg:p-12">
            <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-azure/10 blur-[120px]" />
            <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <Eyebrow accent="azure">{p.missionTitle}</Eyebrow>
                <p className="mt-5 text-[15px] leading-relaxed text-white/75">{p.missionP1}</p>
                <p className="mt-4 text-[15px] leading-relaxed text-white/60">
                  {p.missionP2} <span className="font-medium text-white">{p.missionHighlight}</span>.
                </p>
              </div>
              <div className="flex justify-center lg:col-span-4">
                <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-line">
                  <div className="absolute inset-0 rounded-full border border-white/10 motion-safe:animate-[spin_14s_linear_infinite]" />
                  <div className="absolute inset-4 rounded-full border border-emerald/30 motion-safe:animate-[spin_20s_linear_infinite_reverse]" />
                  <Rocket className="h-8 w-8 text-white/80" strokeWidth={1.25} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6-module framework */}
      <section className="border-t border-line py-24 lg:py-32">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <Eyebrow index="01" accent="emerald">
              {p.frameworkTitle}
            </Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-normal uppercase leading-[1.08] tracking-[-0.012em]">{p.frameworkTitle}</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/60">{p.frameworkSubtitle}</p>
          </div>
          <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {p.modules.map((mod, i) => {
              const Icon = MODULE_ICONS[i % MODULE_ICONS.length];
              return (
                <li key={mod.title} className="relative overflow-hidden rounded-2xl border border-line bg-titanium/80 p-6 backdrop-blur transition-colors hover:border-white/15">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-obsidian/70 text-emerald">
                      <Icon className="h-5 w-5" strokeWidth={1.25} />
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.3em] text-white/35">0{i + 1}</span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-normal tracking-[-0.005em]">{mod.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-white/60">{mod.desc}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Tiers */}
      <section className="border-t border-line py-24 lg:py-32">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <Eyebrow index="02" accent="gold">
            {p.tiersTitle}
          </Eyebrow>
          <h2 className="mt-5 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-normal uppercase leading-[1.08] tracking-[-0.012em]">{p.tiersTitle}</h2>
          <div className="mt-10 grid gap-4 lg:grid-cols-3 lg:items-end">
            {p.tiers.map((tier, i) => {
              const accent = TIER_ACCENT[i % TIER_ACCENT.length];
              const featured = i === 1;
              return (
                <article
                  key={tier.name}
                  className={clsx(
                    "relative flex flex-col overflow-hidden rounded-3xl border p-7 backdrop-blur-xl",
                    featured ? "border-emerald/40 bg-glass lg:-translate-y-3" : "border-line bg-titanium/70",
                  )}
                >
                  <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
                  <div className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: accent }}>
                    {p.tierLabel} {i + 1}
                  </div>
                  <h3 className="mt-3 font-display text-3xl font-normal tracking-[-0.012em]">{tier.name}</h3>
                  <span className="mt-3 inline-flex w-fit rounded-full border border-line bg-obsidian/60 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-white/70">{tier.duration}</span>
                  <p className="mt-5 flex-1 text-[13.5px] leading-relaxed text-white/60">{tier.desc}</p>
                  <button
                    type="button"
                    data-cursor="magnetic"
                    onClick={() => open({ source: `${p.badge} · ${tier.name}`, service: "startup-corridor" })}
                    className={clsx(
                      "mt-7 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors",
                      featured ? "bg-white text-obsidian hover:bg-emerald" : "border border-line bg-white/[0.04] text-white hover:bg-white/[0.08]",
                    )}
                  >
                    {p.tierCta}
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="border-t border-line pb-24 pt-20 lg:pb-36 lg:pt-28">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="relative overflow-hidden rounded-3xl border border-line bg-glass p-8 backdrop-blur-xl lg:p-12">
            <div aria-hidden="true" className="pointer-events-none absolute -right-20 -bottom-24 h-80 w-80 rounded-full bg-gold/10 blur-[120px]" />
            <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <Eyebrow accent="gold">{p.whyTitle}</Eyebrow>
                <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-white/70">{p.whyBody}</p>
              </div>
              <div className="lg:col-span-4 lg:justify-self-end">
                <button
                  type="button"
                  data-cursor="magnetic"
                  onClick={() => open({ source: p.badge, service: "startup-corridor" })}
                  className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-obsidian transition-colors hover:bg-emerald"
                >
                  {p.whyCta}
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
