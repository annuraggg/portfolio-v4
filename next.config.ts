import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://cdn.discordapp.com/**"),
      {
        protocol: 'https',
        hostname: '**.r2.dev',
      },
      {
        protocol: 'https',
        hostname: '**.r2.cloudflarestorage.com',
      }
    ],
    formats: ['image/webp', 'image/avif'],
  },
  serverExternalPackages: ['@libsql/client'],
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
