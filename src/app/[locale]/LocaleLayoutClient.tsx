"use client";

import { type Locale, getTranslation } from "@/lib/translations";
import Navbar from "../components/Navbar";
import Footer from "@/components/sections/Footer";
import ConsultationProvider from "@/components/providers/ConsultationProvider";

export default function LocaleLayoutClient({ children, locale }: { children: React.ReactNode; locale: Locale }) {
  const t = getTranslation(locale);

  return (
    <ConsultationProvider locale={locale}>
      <Navbar locale={locale} t={t} />
      <div className="relative z-10 min-h-screen">{children}</div>
      <Footer locale={locale} />
    </ConsultationProvider>
  );
}
