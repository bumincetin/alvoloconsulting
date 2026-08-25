import type { Metadata } from 'next';
import { pageMeta, resolveLocale } from '@/lib/seo';
import StartupCorridorClient from './StartupCorridorClient';

export const runtime = 'edge';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(resolveLocale(locale), 'startup');
}

export default function StartupCorridorPage() {
    return <StartupCorridorClient />;
}
