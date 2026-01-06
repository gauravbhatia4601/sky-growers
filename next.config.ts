import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Enable standalone output for Docker deployments
  output: 'standalone',
  // Trust host for NextAuth in production
  experimental: {
    serverActions: {
      allowedOrigins: process.env.NEXTAUTH_URL 
        ? [new URL(process.env.NEXTAUTH_URL).hostname]
        : ['localhost'],
    },
  },
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Compression
  compress: true,
  // Power by header
  poweredByHeader: false,
  // React strict mode
  reactStrictMode: true,
};

export default nextConfig;
