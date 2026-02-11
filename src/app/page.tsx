import { redirect } from 'next/navigation';

export const runtime = 'edge';

export default function RootPage() {
  // Redirect to default locale (English)
  redirect('/en/');
}
