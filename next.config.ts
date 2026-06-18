import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      // API propia — imágenes de los tours (http y https)
      {
        protocol: 'https',
        hostname: 'api-travel.agenteviajes.com',
      },
      {
        protocol: 'http',
        hostname: 'api-travel.agenteviajes.com',
      },
      // Unsplash — imagen hero + fallback
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // Logos de aliados (Clearbit Logo API)
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
      },
    ],
  },
  // Headers de seguridad y caché
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;
