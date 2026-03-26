import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Skip ESLint during production builds to avoid fail-on-warn
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Keep TS type checking; flip to true only if you want to bypass TS errors
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '3-109-154-144.nip.io',
        port: '',
        pathname: '/uploads/**',
      },
    ],
    unoptimized: true,
  },
  output: 'export',
};

export default nextConfig;
