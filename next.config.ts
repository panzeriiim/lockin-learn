import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "https://supreme-space-cod-qpvj55wp95g3x77g-3000.app.github.dev/",
        "localhost:3000",
      ],
    },
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default nextConfig;
