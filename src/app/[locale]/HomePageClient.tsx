'use client';

import { useParams } from "next/navigation";
import HlsVideoBackground from "@/components/Hero/HlsVideoBackground";
import { getTranslation, type Locale } from "@/lib/translations";
import MagneticButton from "@/components/UI/MagneticButton";

export default function HomePageClient() {
  const params = useParams();
  const locale = (params?.locale as string || "en") as Locale;
  const t = getTranslation(locale);
  const { home } = t;

  return (
    <main className="relative bg-void-black text-electric-platinum">
      {/* ── Hero ── */}
      <section className="relative h-screen overflow-hidden">
        <HlsVideoBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-void-black/80 via-void-black/50 to-void-black/90" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, rgba(229,228,226,0.08), transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-30 mix-blend-soft-light"
          style={{
            backgroundImage:
              "linear-gradient(transparent 0%, rgba(229,228,226,0.05) 1px)",
            backgroundSize: "100% 3px",
          }}
        />
        <div className="relative z-10 flex h-full flex-col justify-between px-4 py-8 md:px-16 md:py-12">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between text-[10px] md:text-xs uppercase tracking-[0.4em] text-electric-platinum/60">
            <span>{home.heroBadge1}</span>
            <span className="hidden md:inline">•</span>
            <span>{home.heroBadge2}</span>
          </div>
          <div className="space-y-4 md:space-y-6">
            <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.5em] text-electric-platinum/60">
              {home.heroSubtitle}
            </p>
            <h1 className="text-[clamp(2.5rem,10vw,12rem)] font-serif leading-none text-electric-platinum">
              {home.heroTitle}
            </h1>
            <p className="max-w-xl text-[10px] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] text-electric-platinum/70 leading-relaxed">
              {home.heroSubtitle}
            </p>
          </div>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-electric-platinum/60 max-w-[80%]">
              {home.heroCta}
            </div>
            <MagneticButton />
          </div>
        </div>
      </section>
    </main>
  );
}
