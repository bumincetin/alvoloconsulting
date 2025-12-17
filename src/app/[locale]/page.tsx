import { type Locale } from '@/lib/translations';
import HomePageClient from './HomePageClient';

export const runtime = 'edge';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <HomePageClient locale={locale} />;
}
