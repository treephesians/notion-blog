import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Force notion-client's ky import to resolve to our shim
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      ky: require("path").resolve(__dirname, "src/lib/ky-shim.ts"),
    };
    return config;
  },
  images: {
    domains: [
      "prod-files-secure.s3.us-west-2.amazonaws.com",
      "static.toss.im",
      "3.35.11.18",
      "13.209.88.95",
      "localhost",
    ],
  },
};

export default nextConfig;
