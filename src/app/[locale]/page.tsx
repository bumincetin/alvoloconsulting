import { locales, type Locale } from '@/lib/translations';
import HomePageClient from './HomePageClient';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <HomePageClient locale={locale} />;
}
