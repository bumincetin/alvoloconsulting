import type { Metadata } from 'next';
import { type Locale } from '@/lib/translations';
import { pageMeta, resolveLocale } from '@/lib/seo';
import PortalPageClient from './PortalPageClient';

export const runtime = 'edge';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(resolveLocale(locale), 'portal');
}

export default async function PortalPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <PortalPageClient locale={locale} />;
}
