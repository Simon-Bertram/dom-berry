import type { NextConfig } from "next";

const cloudinaryCloudName =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "dulwhlyqt";

const nextConfig: NextConfig = {
  typedRoutes: true,
  output: "standalone", // Smaller Docker images for deployment
  experimental: {
    optimizePackageImports: ["lucide-react"], // Reduce bundle size
    optimizeCss: true, // Optimize CSS including font loading
  },
  env: {
    // Ensure next-cloudinary always receives a cloud name during build/prerender
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: cloudinaryCloudName,
  },
  images: {
    formats: ["image/avif", "image/webp"], // Smaller images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "", // Leave as empty string for standard HTTPS port (443)
        pathname: `/${cloudinaryCloudName}/**`, // Crucial: This should match your Cloudinary cloud name
      },
    ],
  },
  // Optimize for static generation
  compress: true,
  poweredByHeader: false,

  // Support PostHog rewrites
  rewrites() {
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
