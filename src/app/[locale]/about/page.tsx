import { type Locale } from '@/lib/translations';
import AboutPageClient from './AboutPageClient';

export const runtime = 'edge';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <AboutPageClient locale={locale} />;
}
