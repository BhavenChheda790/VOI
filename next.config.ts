import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Avoid Turbopack bundling a stale Prisma engine — fixes "Unknown argument ticketUrl" after schema changes.
  serverExternalPackages: ["@prisma/client", "prisma"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
  async redirects() {
    return [
      // Homepage temporarily serves as About — redirect /about to home for the event.
      // To revert: remove this entry and re-add the About link in components/SiteHeader.tsx.
      { source: "/about", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
