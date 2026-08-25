import type { Metadata } from 'next';
import { type Locale } from '@/lib/translations';
import { pageMeta, resolveLocale } from '@/lib/seo';
import PricingPageClient from './PricingPageClient';

export const runtime = 'edge';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(resolveLocale(locale), 'pricing');
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <PricingPageClient locale={locale} />;
}
