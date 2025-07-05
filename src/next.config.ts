import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  swcMinify: false, // Use the less memory-intensive Terser for minification
  typescript: {
    ignoreBuildErrors: true, // Don't run type checks during build
  },
  eslint: {
    ignoreDuringBuilds: true, // Don't run linting during build
  },
  productionBrowserSourceMaps: false, // Don't generate source maps, saves memory
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
