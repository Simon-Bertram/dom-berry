import type { MetadataRoute } from "next";
import { BUSINESS_INFO } from "@/lib/business-info";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = BUSINESS_INFO.contact.website;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/admin/",
        "/_next/",
        "/ingest/", // PostHog analytics
        "/private/",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
