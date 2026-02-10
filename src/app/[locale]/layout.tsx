import { type Locale } from '@/lib/translations';
import LocaleLayoutClient from './LocaleLayoutClient';

// export const runtime = 'edge';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <LocaleLayoutClient locale={locale}>{children}</LocaleLayoutClient>;
}
