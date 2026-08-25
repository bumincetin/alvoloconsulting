import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // There is no app/page.tsx (the root layout lives under [locale]); send the bare origin to the default locale.
  async redirects() {
    return [{ source: "/", destination: "/en/", permanent: false }];
  },
};

export default nextConfig;
