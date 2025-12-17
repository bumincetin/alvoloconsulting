import { type Locale } from '@/lib/translations';
import TurkeyExpansionClient from './TurkeyExpansionClient';

export const runtime = 'edge';

export default async function TurkeyExpansionPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <TurkeyExpansionClient locale={locale} />;
}
