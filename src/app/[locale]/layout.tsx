import { locales, type Locale } from '@/lib/translations';
import LocaleLayoutClient from './LocaleLayoutClient';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

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
