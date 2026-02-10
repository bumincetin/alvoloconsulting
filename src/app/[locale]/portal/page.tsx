import { type Locale } from '@/lib/translations';
import PortalPageClient from './PortalPageClient';

export const runtime = 'edge';

export default async function PortalPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <PortalPageClient locale={locale} />;
}

