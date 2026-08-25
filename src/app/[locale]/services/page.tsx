import type { Metadata } from 'next';
import { type Locale } from '@/lib/translations';
import { pageMeta, resolveLocale } from '@/lib/seo';
import ServicesPageClient from './ServicesPageClient';

export const runtime = 'edge';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(resolveLocale(locale), 'services');
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <ServicesPageClient locale={locale} />;
}
