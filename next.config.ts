import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'], // Prefer modern formats
    deviceSizes: [640, 750, 828, 1080, 1200], // Optimize for common sizes
    minimumCacheTTL: 60 * 60 * 24 * 30, // Cache images for 30 days
  },
  experimental: {
    optimizeCss: true, // Enable CSS optimization
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Remove console.logs
  },
};

export default nextConfig;

