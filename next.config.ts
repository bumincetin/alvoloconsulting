import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@vercel/og': false,
    };
    return config;
  },
  trailingSlash: true,
};

export default nextConfig;
