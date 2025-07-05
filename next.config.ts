import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  swcMinify: false, // Added this line to fix build memory issues on cPanel
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
