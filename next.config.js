/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for Cloudflare Pages
  output: 'export',
  trailingSlash: true,
  
  // Disable ESLint during build for Cloudflare deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Disable TypeScript errors during build for Cloudflare deployment
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Asset prefix for Cloudflare Pages
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  
  // Enable compression
  compress: true,
  
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['@/components'],
  },
  
  // Webpack configuration for Cloudflare
  webpack: (config, { isServer }) => {
    // Optimize for Cloudflare Pages
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    return config;
  },
  
  // Note: Headers and redirects are handled by Cloudflare Pages _headers and _redirects files
};

module.exports = nextConfig;
