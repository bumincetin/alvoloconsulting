import { type Locale } from '@/lib/translations';
import ServicesPageClient from './ServicesPageClient';

export const runtime = 'nodejs';

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <ServicesPageClient locale={locale} />;
}
