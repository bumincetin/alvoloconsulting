import { type Locale } from '@/lib/translations';
import LocaleLayoutClient from './LocaleLayoutClient';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <LocaleLayoutClient locale={locale as Locale}>{children}</LocaleLayoutClient>;
}
