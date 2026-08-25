import type { Metadata } from 'next';
import { pageMeta, resolveLocale } from '@/lib/seo';
import HomePageClient from './HomePageClient';

export const runtime = 'edge';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(resolveLocale(locale), 'home');
}

export default async function HomePage() {
  return <HomePageClient />;
}
