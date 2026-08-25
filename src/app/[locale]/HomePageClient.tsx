"use client";

import { useParams } from "next/navigation";
import Hero from "@/components/sections/Hero";
import CorridorSwitcher from "@/components/sections/CorridorSwitcher";
import MarketEntryProtocol from "@/components/sections/MarketEntryProtocol";
import ExpansionCalculator from "@/components/sections/ExpansionCalculator";
import PricingSection from "@/components/sections/PricingSection";
import TeamSection from "@/components/sections/TeamSection";
import { locales, type Locale } from "@/lib/translations";

function resolveLocale(value: unknown): Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value) ? (value as Locale) : "en";
}

export default function HomePageClient() {
  const params = useParams();
  const locale = resolveLocale(params?.locale);

  return (
    <main className="relative bg-obsidian text-white">
      <Hero locale={locale} />
      <CorridorSwitcher locale={locale} />
      <MarketEntryProtocol locale={locale} />
      <ExpansionCalculator locale={locale} />
      <PricingSection locale={locale} />
      <TeamSection locale={locale} />
    </main>
  );
}
