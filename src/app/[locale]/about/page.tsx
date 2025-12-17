import { locales, type Locale } from '@/lib/translations';
import AboutPageClient from './AboutPageClient';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <AboutPageClient locale={locale} />;
}
