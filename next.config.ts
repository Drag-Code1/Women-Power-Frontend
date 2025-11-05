import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: '*.cloudflarestorage.com' },
      { protocol: 'https', hostname: '6030e27f467a2a8ec5f96bd95f16262b.r2.cloudflarestorage.com' },
    ],
  },
  eslint: {
    // Avoid failing builds on ESLint warnings in CI
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
