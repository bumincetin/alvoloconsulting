"use client";

import PageHeader from "@/components/UI/PageHeader";
import PricingSection from "@/components/sections/PricingSection";
import ExpansionCalculator from "@/components/sections/ExpansionCalculator";
import { pricingContent } from "@/lib/content/pricing";
import type { Locale } from "@/lib/translations";

interface PricingPageClientProps {
  locale: Locale;
}

export default function PricingPageClient({ locale }: PricingPageClientProps) {
  const t = pricingContent[locale];
  return (
    <main className="relative bg-obsidian text-white">
      <PageHeader eyebrow={t.eyebrow} title={t.heading} sub={t.sub} accent="emerald" />
      <PricingSection locale={locale} hideHeader />
      <ExpansionCalculator locale={locale} />
    </main>
  );
}
