import { type Locale } from '@/lib/translations';
import PricingPageClient from './PricingPageClient';

export const runtime = 'edge';

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <PricingPageClient locale={locale} />;
}
