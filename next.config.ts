import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Cloudflare Pages (same as vacademy.io, tutezy.ai and telleo.ai).
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  compiler: { removeConsole: process.env.NODE_ENV === "production" },
};

export default nextConfig;
