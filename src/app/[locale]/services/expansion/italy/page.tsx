import { type Locale } from '@/lib/translations';
import ItalyExpansionClient from './ItalyExpansionClient';

export const runtime = 'edge';

export default async function ItalyExpansionPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <ItalyExpansionClient locale={locale} />;
}
