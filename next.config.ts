import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },

  async redirects() {
    return [
      { source: '/adapters', destination: '/products/chargers', permanent: true },
      { source: '/powerbanks', destination: '/products/power-banks', permanent: true },
      { source: '/cables', destination: '/products/cables', permanent: true },
      { source: '/faqs', destination: '/support/faqs', permanent: true },
      { source: '/contact', destination: '/support/contact', permanent: true },
      { source: '/warranty-policy', destination: '/support/warranty', permanent: true },
      { source: '/shipping-returns', destination: '/support/shipping-returns', permanent: true },
      { source: '/privacy-policy', destination: '/legal/privacy-policy', permanent: true },
      { source: '/terms-of-use', destination: '/legal/terms-of-use', permanent: true },
      { source: '/products.html', destination: '/products', permanent: true },
      { source: '/about.html', destination: '/about', permanent: true },
      { source: '/contact.html', destination: '/support/contact', permanent: true }
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fjqkoxccpjupxuzcaymb.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;