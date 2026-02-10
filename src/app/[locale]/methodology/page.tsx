import { type Locale } from '@/lib/translations';
import MethodologyPageClient from './MethodologyPageClient';

export const runtime = 'edge';

export default async function MethodologyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <MethodologyPageClient locale={locale} />;
}
