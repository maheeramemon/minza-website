import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    qualities: [75, 90],
  },
  async redirects() {
    return [
      {
        // Canonical host is the apex (minzabynj.com). Anything hitting the
        // www subdomain is 308'd to the same path on apex. Vercel's primary-
        // domain setting handles this at the edge too; this is a defense-in-
        // depth declaration that keeps Next.js authoritative.
        source: "/:path*",
        has: [{ type: "host", value: "www.minzabynj.com" }],
        destination: "https://minzabynj.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
