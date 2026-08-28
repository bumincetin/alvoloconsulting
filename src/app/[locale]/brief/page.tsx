import type { Metadata } from 'next';
import { pageMeta, resolveLocale } from '@/lib/seo';
import BriefPageClient from './BriefPageClient';

export const runtime = 'edge';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(resolveLocale(locale), 'brief');
}

export default async function BriefPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <BriefPageClient locale={resolveLocale(locale)} />;
}
