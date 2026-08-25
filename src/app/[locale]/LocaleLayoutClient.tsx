"use client";

import { type Locale } from "@/lib/translations";
import ShoreNav from "@/components/shore/ShoreNav";
import ShoreFooter from "@/components/shore/ShoreFooter";
import Grain from "@/components/shore/Grain";
import { ForegroundProvider } from "@/components/shore/Foreground";
import ConsultationProvider from "@/components/providers/ConsultationProvider";

export default function LocaleLayoutClient({ children, locale }: { children: React.ReactNode; locale: Locale }) {
  return (
    <ConsultationProvider locale={locale}>
      <ForegroundProvider>
        <ShoreNav locale={locale} />
        <div className="relative z-10 min-h-screen">{children}</div>
        <ShoreFooter locale={locale} />
        <Grain />
      </ForegroundProvider>
    </ConsultationProvider>
  );
}
