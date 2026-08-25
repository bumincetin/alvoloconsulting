"use client";

import { useId } from "react";
import Image from "next/image";
import { ArrowUpRight, Globe } from "lucide-react";
import Eyebrow from "@/components/UI/Eyebrow";
import { ACCENT_HEX } from "@/lib/geo/cities";
import { teamContent, type Partner } from "@/lib/content/team";
import type { Locale } from "@/lib/translations";

const PARTNER_ACCENT = [ACCENT_HEX.azure, ACCENT_HEX.emerald, ACCENT_HEX.gold];

interface TeamSectionProps {
  locale: Locale;
  /** Omit the section heading when the host page already provides one. */
  hideHeader?: boolean;
}

export default function TeamSection({ locale, hideHeader = false }: TeamSectionProps) {
  const t = teamContent[locale];
  const baseId = useId();

  return (
    <section id="partners" className="relative border-t border-line bg-obsidian py-24 text-white lg:py-36" aria-labelledby={`${baseId}-heading`}>
      <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            {!hideHeader ? (
              <>
                <Eyebrow index="05" accent="gold">
                  {t.eyebrow}
                </Eyebrow>
                <h2 id={`${baseId}-heading`} className="mt-5 font-display text-[clamp(2rem,4.2vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
                  {t.heading}
                </h2>
                <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/60">{t.sub}</p>
              </>
            ) : (
              <h2 id={`${baseId}-heading`} className="sr-only">
                {t.heading}
              </h2>
            )}
          </div>
          <div className="lg:col-span-4 lg:justify-self-end lg:text-right">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45">{t.desk}</div>
            <div className="mt-2 hidden font-mono text-[10px] uppercase tracking-[0.25em] text-white/30 lg:block">{t.revealHint}</div>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {t.partners.map((p, i) => (
            <PartnerCard key={p.id} partner={p} index={i} accent={PARTNER_ACCENT[i]} credentialsLabel={t.credentialsLabel} trackLabel={t.trackLabel} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnerCard({
  partner,
  index,
  accent,
  credentialsLabel,
  trackLabel,
}: {
  partner: Partner;
  index: number;
  accent: string;
  credentialsLabel: string;
  trackLabel: string;
}) {
  return (
    <article
      tabIndex={0}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-titanium/70 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-white/40"
      aria-label={`${partner.name} — ${partner.role}`}
    >
      {/* Portrait */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={partner.image}
          alt={partner.name}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover object-top grayscale transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0 group-focus-within:scale-[1.03] group-focus-within:grayscale-0"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
        <span className="absolute left-5 top-5 font-mono text-[11px] tracking-[0.3em] text-white/70">0{index + 1}</span>
        <span aria-hidden="true" className="absolute right-5 top-5 h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent, boxShadow: `0 0 12px ${accent}` }} />

        {/* Dossier reveal */}
        <div className="absolute inset-x-0 bottom-0 translate-y-[calc(100%-4.5rem)] p-5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-focus-within:translate-y-0">
          <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-white">{partner.name}</h3>
          <div className="mt-1 text-[12.5px] font-medium" style={{ color: accent }}>
            {partner.role}
          </div>
          <div className="mt-4 rounded-2xl border border-line bg-glass p-4 backdrop-blur-xl">
            <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">{credentialsLabel}</div>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {partner.credentials.map((c) => (
                <li key={c} className="rounded-md border border-line bg-obsidian/70 px-2 py-1 font-mono text-[10px] tracking-[0.04em] text-white/75">
                  {c}
                </li>
              ))}
            </ul>
            <div className="mt-3 font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">{trackLabel}</div>
            <dl className="mt-2 space-y-1">
              {partner.track.map((row) => (
                <div key={row.k} className="grid grid-cols-[5rem_1fr] gap-2 text-[11.5px]">
                  <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">{row.k}</dt>
                  <dd className="text-white/80">{row.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-start justify-between gap-4 border-t border-line px-5 py-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">{partner.affiliation}</div>
          <p className="mt-2 text-[12.5px] leading-relaxed text-white/60">{partner.bio}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-2">
          <a
            href={partner.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label={`${partner.name} — LinkedIn`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-white/60 transition-colors hover:border-white/30 hover:text-white"
          >
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
          </a>
          {partner.website ? (
            <a
              href={partner.website}
              target="_blank"
              rel="noreferrer"
              aria-label={`${partner.name} — website`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-white/60 transition-colors hover:border-white/30 hover:text-white"
            >
              <Globe className="h-4 w-4" strokeWidth={1.5} />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
