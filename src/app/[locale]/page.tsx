import HomePageClient from './HomePageClient';

export const runtime = 'edge';

export default async function HomePage() {
  return <HomePageClient />;
}
