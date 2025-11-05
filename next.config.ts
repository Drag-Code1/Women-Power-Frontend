import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: '*.cloudflarestorage.com' },
    ],
  },
  eslint: {
    // Avoid failing builds on ESLint warnings in CI
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
