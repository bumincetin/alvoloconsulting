import { locales, type Locale } from '@/lib/translations';
import ItalyExpansionClient from './ItalyExpansionClient';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function ItalyExpansionPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <ItalyExpansionClient locale={locale} />;
}

