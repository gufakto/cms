import type { NextConfig } from "next";
import { config } from "process";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      minify: true,
    }
  },
  reactStrictMode: true,
  webpack: (config, context) => {
    config.watchOptions = {
      poll: 100,
      aggregateTimeout: 300,
    }
    return config;
  }
};

export default nextConfig;
