import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    qualities: [75, 90],
  },
  // Note on canonical host: the apex (minzabynj.com) is canonical per
  // metadata.alternates.canonical in src/app/layout.tsx. The www→apex
  // (or apex→www) redirect is handled by Vercel's primary-domain setting,
  // NOT by Next.js — putting a redirect here while Vercel still treats www
  // as primary causes a loop.
};

export default nextConfig;
