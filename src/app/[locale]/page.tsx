import HomePageClient from './HomePageClient';

// Edge runtime disabled for compatibility with client-side libraries
// export const runtime = 'edge';

export default async function HomePage() {
  return <HomePageClient />;
}
