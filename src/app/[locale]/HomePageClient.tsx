'use client';

import { getTranslation, type Locale } from '@/lib/translations';
import Hero from '../components/sections/Hero';
import Ticker from '../components/sections/Ticker';
import Services from '../components/sections/Services';
import Expansion from '../components/sections/Expansion';
import Methodology from '../components/sections/Methodology';
import About from '../components/sections/About';

export default function HomePageClient({ locale }: { locale: Locale }) {
  const t = getTranslation(locale);

  return (
    <main>
      <Hero t={t} locale={locale} />
      <Ticker t={t} />
      <Services t={t} locale={locale} />
      <Expansion t={t} locale={locale} />
      <Methodology t={t} locale={locale} />
      <About t={t} locale={locale} />
    </main>
  );
}

