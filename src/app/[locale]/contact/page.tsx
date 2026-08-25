import type { Metadata } from 'next';
import { pageMeta, resolveLocale } from '@/lib/seo';
import ContactPageClient from './ContactPageClient';

export const runtime = 'edge';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(resolveLocale(locale), 'contact');
}

export default async function ContactPage() {
  return <ContactPageClient />;
}
