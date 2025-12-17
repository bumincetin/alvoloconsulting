import { locales, type Locale } from '@/lib/translations';
import PricingPageClient from './PricingPageClient';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <PricingPageClient locale={locale} />;
}
