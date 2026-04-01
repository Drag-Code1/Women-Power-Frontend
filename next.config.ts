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
  // If you need static export, you must remove all 'cache: no-store' from server-side fetches.
  // Otherwise, remove 'output: export' to build a dynamic server app.
  // output: 'export',
  // Disable font optimization to avoid fetch errors during build in offline/restricted environments
  optimizeFonts: false,
};

export default nextConfig;
