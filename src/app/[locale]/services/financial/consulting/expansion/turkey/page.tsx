import { locales, type Locale } from '@/lib/translations';
import TurkeyExpansionClient from './TurkeyExpansionClient';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function TurkeyExpansionPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <TurkeyExpansionClient locale={locale} />;
}

