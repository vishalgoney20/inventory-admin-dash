import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
      PRODUCT_DATASOURCE_URL: process.env.PRODUCT_DATASOURCE_URL, // ✅ Load from env
  },
};

export default nextConfig;
