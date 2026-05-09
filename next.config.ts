import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Avoid Turbopack bundling a stale Prisma engine — fixes "Unknown argument ticketUrl" after schema changes.
  serverExternalPackages: ["@prisma/client", "prisma"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
