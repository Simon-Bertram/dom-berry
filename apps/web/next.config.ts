import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  output: "standalone", // Smaller Docker images for deployment
  experimental: {
    optimizePackageImports: ["lucide-react"], // Reduce bundle size
  },
  images: {
    formats: ["image/avif", "image/webp"], // Smaller images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Optimize for static generation
  compress: true,
  poweredByHeader: false,
  // Enable static optimization
  trailingSlash: false,
  // Optimize bundle
  swcMinify: true,
};

export default nextConfig;
