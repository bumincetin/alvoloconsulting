import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // There is no app/page.tsx (the root layout lives under [locale]); send the bare origin to the default locale.
  async redirects() {
    return [
      { source: "/", destination: "/en/", permanent: false },
      // the pricing page became the tailored-mandate brief
      { source: "/:locale(en|tr|it)/pricing", destination: "/:locale/brief/", permanent: true },
      { source: "/:locale(en|tr|it)/pricing/", destination: "/:locale/brief/", permanent: true },
    ];
  },
};

export default nextConfig;
