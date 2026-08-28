"use client";

import PageHeader from "@/components/UI/PageHeader";
import BriefWizard from "@/components/brief/BriefWizard";
import ExpansionCalculator from "@/components/sections/ExpansionCalculator";
import { briefContent } from "@/lib/content/brief";
import type { Locale } from "@/lib/translations";

interface BriefPageClientProps {
  locale: Locale;
}

/** /[locale]/brief/ — masthead in the chapter grammar, then the private intake wizard. */
export default function BriefPageClient({ locale }: BriefPageClientProps) {
  const c = briefContent[locale];
  return (
    <main className="relative bg-obsidian text-white">
      <PageHeader eyebrow={c.eyebrow} title={c.title} sub={c.sub} alt={c.alt} accent="gold" />
      <BriefWizard locale={locale} />
      {/* the expansion & tax planner — the quantitative companion to the brief */}
      <ExpansionCalculator locale={locale} />
    </main>
  );
}
