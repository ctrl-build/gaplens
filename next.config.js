const nextConfig = {
  output: 'export',
  trailingSlash: true,
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  typescript: {
    ignoreBuildErrors: true,
  },
  
  images: {
    unoptimized: true,
  },
  
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  
  compress: true,
  
  experimental: {
    optimizePackageImports: ['@/components'],
  },
  
  webpack: (config, { isServer }) => {
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
};

module.exports = nextConfig;
