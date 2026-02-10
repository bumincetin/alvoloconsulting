import { type Locale } from '@/lib/translations';
import ItalyExpansionClient from './ItalyExpansionClient';

export const runtime = 'nodejs';

export default async function ItalyExpansionPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <ItalyExpansionClient locale={locale} />;
}
