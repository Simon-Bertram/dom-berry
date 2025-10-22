import type { MetadataRoute } from "next";
import { BUSINESS_INFO } from "@/lib/business-info";
import { getAllPortfolioProjects, getAllTestimonials } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = BUSINESS_INFO.contact.website;
  const currentDate = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Portfolio project pages
  const portfolioPages: MetadataRoute.Sitemap = getAllPortfolioProjects().map(
    (project) => ({
      url: `${baseUrl}/portfolio/${project.slug}`,
      lastModified: new Date(project.year || currentDate).toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })
  );

  // Testimonial pages
  const testimonialPages: MetadataRoute.Sitemap = getAllTestimonials().map(
    (testimonial) => ({
      url: `${baseUrl}/testimonials/${testimonial.slug}`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })
  );

  // Service-specific pages (if they exist)
  const servicePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/services/wedding-videography`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/corporate-video`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/marketing-video`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/event-coverage`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/commercial-advertisement`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  return [
    ...staticPages,
    ...portfolioPages,
    ...testimonialPages,
    ...servicePages,
  ];
}
