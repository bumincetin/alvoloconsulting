import type { Metadata } from 'next';
import { type Locale } from '@/lib/translations';
import { pageMeta, resolveLocale } from '@/lib/seo';
import TurkeyExpansionClient from './TurkeyExpansionClient';

export const runtime = 'edge';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(resolveLocale(locale), 'turkey');
}

export default async function TurkeyExpansionPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <TurkeyExpansionClient locale={locale} />;
}
