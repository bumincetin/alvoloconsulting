import type { Metadata } from 'next';
import { pageMeta, resolveLocale } from '@/lib/seo';
import FAQPageClient from './FAQPageClient';

export const runtime = 'edge';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(resolveLocale(locale), 'faq');
}

export default function FAQPage() {
    return <FAQPageClient />;
}
