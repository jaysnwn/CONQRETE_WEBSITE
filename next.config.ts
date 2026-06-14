import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fjqkoxccpjupxuzcaymb.supabase.co', // Your specific Supabase project
        port: '',
        pathname: '/storage/v1/object/public/**', // Allows any image from your public buckets
      },
    ],
  },
};

export default nextConfig;