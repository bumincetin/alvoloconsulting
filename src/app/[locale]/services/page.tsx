import { locales, type Locale } from '@/lib/translations';
import ServicesPageClient from './ServicesPageClient';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <ServicesPageClient locale={locale} />;
}
