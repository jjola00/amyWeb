import type {NextConfig} from 'next';
import { withPayload } from '@payloadcms/next/withPayload';

// Bundle analyzer setup
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // Build optimizations
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  
  // Static generation and performance
  trailingSlash: false,
  generateEtags: false, // Disable ETags for better caching control
  
  // Bundle optimization
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{member}}',
    },
  },
  
  // External packages for server components - only essential packages
  serverExternalPackages: [
    'mongoose', 
    'payload', 
    '@payloadcms/db-mongodb',
    'sharp'
  ],
  
  // Experimental features for performance and bundle optimization
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    // optimizeCss: true, // Disabled due to critters module issue
  },
  
  // Turbopack configuration (moved from experimental)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  
  // Webpack configuration for Payload CMS compatibility
  webpack: (config, { isServer }) => {
    // Add support for Monaco editor in Payload CMS
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      }
    }
    
    return config
  },
  
  // Type checking and linting
  typescript: {
    ignoreBuildErrors: false, // Enable proper type checking now that errors are fixed
  },
  eslint: {
    ignoreDuringBuilds: false, // Enable linting for production builds
  },
  
  // Image optimization - optimized for performance
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days cache
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
    ],
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // Redirects
  async redirects() {
    return [
      {
        source: '/gallery',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default withPayload(withBundleAnalyzer(nextConfig));
