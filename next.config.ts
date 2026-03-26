import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',   // VERY IMPORTANT

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: false,
  },

  images: {
    unoptimized: true,   // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '3-109-154-144.nip.io',
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;