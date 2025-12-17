import { locales, type Locale } from '@/lib/translations';
import ContactPageClient from './ContactPageClient';
export const runtime = 'edge';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <ContactPageClient locale={locale} />;
}
