"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import PageHeader from "@/components/UI/PageHeader";
import Eyebrow from "@/components/UI/Eyebrow";
import TeamSection from "@/components/sections/TeamSection";
import { getTranslation, locales, type Locale } from "@/lib/translations";

function resolveLocale(value: unknown): Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value) ? (value as Locale) : "en";
}

export default function AboutPageClient() {
  const params = useParams();
  const locale = resolveLocale(params?.locale);
  const { about } = getTranslation(locale);

  return (
    <main className="relative bg-obsidian text-white">
      <PageHeader eyebrow={about.label} title={about.title} sub={about.paragraph1} accent="gold" />

      {/* Philosophy */}
      <section className="pb-20 lg:pb-28">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow accent="azure">{about.philosophyTitle}</Eyebrow>
              <p className="mt-5 text-[15px] leading-relaxed text-white/70">{about.paragraph2}</p>
              <p className="mt-4 text-[15px] leading-relaxed text-white/60">{about.paragraph3}</p>
              <Link
                href={`/${locale}/methodology/`}
                data-cursor="magnetic"
                className="group mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-5 py-3 text-sm font-medium text-white/85 transition-colors hover:bg-white/[0.07]"
              >
                {about.philosophyCta}
                <ArrowUpRight className="h-4 w-4 text-white/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
              </Link>
            </div>
            <div className="lg:col-span-7">
              <ol className="grid gap-3 sm:grid-cols-3">
                {about.philosophyPoints.map((point, i) => (
                  <li key={point} className="relative overflow-hidden rounded-2xl border border-line bg-titanium/80 p-6 backdrop-blur">
                    <span className="font-mono text-[10px] tracking-[0.3em] text-azure">0{i + 1}</span>
                    <p className="mt-4 font-display text-xl font-normal leading-tight tracking-[-0.005em]">{point}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-3 rounded-2xl border border-line bg-titanium/60 p-6 backdrop-blur">
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">{about.valuesTitle}</div>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {about.values.map((v) => (
                    <li key={v} className="flex items-start gap-2.5 text-[13.5px] text-white/80">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.75} />
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TeamSection locale={locale} />
    </main>
  );
}
