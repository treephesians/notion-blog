import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: process.env.NODE_ENV === "development",
    domains: ["prod-files-secure.s3.us-west-2.amazonaws.com", "static.toss.im"],
  },
};

export default nextConfig;
