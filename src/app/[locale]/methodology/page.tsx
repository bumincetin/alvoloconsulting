import type { Metadata } from 'next';
import { type Locale } from '@/lib/translations';
import { pageMeta, resolveLocale } from '@/lib/seo';
import MethodologyPageClient from './MethodologyPageClient';

export const runtime = 'edge';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(resolveLocale(locale), 'methodology');
}

export default async function MethodologyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <MethodologyPageClient locale={locale} />;
}
