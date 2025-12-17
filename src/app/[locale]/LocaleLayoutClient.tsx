'use client';

import { type Locale, getTranslation } from '@/lib/translations';
import Navbar from '../components/Navbar';
import BackgroundMesh from '../components/BackgroundMesh';
import Footer from '../components/Footer';

export default function LocaleLayoutClient({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  const t = getTranslation(locale);

  return (
    <>
      <BackgroundMesh />
      <Navbar locale={locale} t={t} />
      <div className="relative z-10 min-h-screen">
        {children}
      </div>
      <Footer locale={locale} t={t} />
    </>
  );
}

