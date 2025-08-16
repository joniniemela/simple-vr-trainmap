import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/graphql/:path*',
        destination: 'https://rata.digitraffic.fi/api/v2/graphql/:path*',
      },
    ];
  },
};

export default nextConfig;
