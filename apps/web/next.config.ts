import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  output: "standalone", // Smaller Docker images for deployment
  experimental: {
    optimizePackageImports: ["lucide-react"], // Reduce bundle size
    optimizeCss: true, // Optimize CSS including font loading
  },
  images: {
    formats: ["image/avif", "image/webp"], // Smaller images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "", // Leave as empty string for standard HTTPS port (443)
        pathname: "/dulwhlyqt/**", // Crucial: This should be specific to your Cloudinary cloud name
      },
    ],
  },
  // Optimize for static generation
  compress: true,
  poweredByHeader: false,

  // Support PostHog rewrites
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,

  // Enable static optimization
  trailingSlash: false,
};

export default nextConfig;
