import { BUSINESS_INFO } from "./business-info";

// Base structured data types
export type StructuredData = {
  "@context": string;
  "@type": string;
  [key: string]: unknown;
};

// LocalBusiness Schema
export const localBusinessSchema = (): StructuredData => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${BUSINESS_INFO.contact.website}/#business`,
  name: BUSINESS_INFO.name,
  description: BUSINESS_INFO.description,
  url: BUSINESS_INFO.contact.website,
  telephone: BUSINESS_INFO.contact.phone,
  email: BUSINESS_INFO.contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS_INFO.address.street,
    addressLocality: BUSINESS_INFO.address.city,
    addressRegion: BUSINESS_INFO.address.county,
    postalCode: BUSINESS_INFO.address.postcode,
    addressCountry: "GB",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: BUSINESS_INFO.address.coordinates.latitude,
    longitude: BUSINESS_INFO.address.coordinates.longitude,
  },
  areaServed: BUSINESS_INFO.serviceAreas.map((area) => ({
    "@type": "City",
    name: area,
  })),
  serviceType: BUSINESS_INFO.services,
  sameAs: Object.values(BUSINESS_INFO.social),
});

// Organization Schema
export const organizationSchema = (): StructuredData => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BUSINESS_INFO.contact.website}/#organization`,
  name: BUSINESS_INFO.name,
  description: BUSINESS_INFO.description,
  url: BUSINESS_INFO.contact.website,
  logo: `${BUSINESS_INFO.contact.website}/logo.png`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: BUSINESS_INFO.contact.phone,
    contactType: "customer service",
    email: BUSINESS_INFO.contact.email,
    availableLanguage: "English",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS_INFO.address.street,
    addressLocality: BUSINESS_INFO.address.city,
    addressRegion: BUSINESS_INFO.address.county,
    postalCode: BUSINESS_INFO.address.postcode,
    addressCountry: "GB",
  },
  sameAs: Object.values(BUSINESS_INFO.social),
});

// Service Schema
export const serviceSchema = (service: {
  id: string;
  title: string;
  description: string;
  startingPrice: string;
}): StructuredData => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${BUSINESS_INFO.contact.website}/services#${service.id}`,
  name: service.title,
  description: service.description,
  provider: {
    "@type": "LocalBusiness",
    "@id": `${BUSINESS_INFO.contact.website}/#business`,
    name: BUSINESS_INFO.name,
  },
  areaServed: BUSINESS_INFO.serviceAreas.map((area) => ({
    "@type": "City",
    name: area,
  })),
  offers: {
    "@type": "Offer",
    price: service.startingPrice,
    priceCurrency: "GBP",
    availability: "https://schema.org/InStock",
  },
});

// VideoObject Schema for Portfolio Items
export const videoObjectSchema = (video: {
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl?: string;
  uploadDate: string;
  duration?: string;
}): StructuredData => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "@id": `${BUSINESS_INFO.contact.website}/portfolio#${video.title.toLowerCase().replace(/\s+/g, "-")}`,
  name: video.title,
  description: video.description,
  thumbnailUrl: video.thumbnailUrl,
  uploadDate: video.uploadDate,
  duration: video.duration,
  contentUrl: video.videoUrl,
  embedUrl: video.videoUrl,
  creator: {
    "@type": "Organization",
    "@id": `${BUSINESS_INFO.contact.website}/#organization`,
    name: BUSINESS_INFO.name,
  },
  publisher: {
    "@type": "Organization",
    "@id": `${BUSINESS_INFO.contact.website}/#organization`,
    name: BUSINESS_INFO.name,
  },
});

// Review Schema for Testimonials
export const reviewSchema = (review: {
  name: string;
  role: string;
  company: string;
  content: string;
  rating?: number;
}): StructuredData => ({
  "@context": "https://schema.org",
  "@type": "Review",
  "@id": `${BUSINESS_INFO.contact.website}/testimonials#${review.name.toLowerCase().replace(/\s+/g, "-")}`,
  reviewBody: review.content,
  author: {
    "@type": "Person",
    name: review.name,
    jobTitle: review.role,
    worksFor: {
      "@type": "Organization",
      name: review.company,
    },
  },
  reviewRating: review.rating
    ? {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
      }
    : undefined,
  itemReviewed: {
    "@type": "LocalBusiness",
    "@id": `${BUSINESS_INFO.contact.website}/#business`,
    name: BUSINESS_INFO.name,
  },
});

// BreadcrumbList Schema
export const breadcrumbSchema = (
  items: Array<{ name: string; url: string }>
): StructuredData => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

// WebSite Schema with SearchAction
export const websiteSchema = (): StructuredData => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BUSINESS_INFO.contact.website}/#website`,
  name: BUSINESS_INFO.name,
  url: BUSINESS_INFO.contact.website,
  description: BUSINESS_INFO.description,
  publisher: {
    "@type": "Organization",
    "@id": `${BUSINESS_INFO.contact.website}/#organization`,
    name: BUSINESS_INFO.name,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BUSINESS_INFO.contact.website}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
});

// Person Schema for About page
export const personSchema = (): StructuredData => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${BUSINESS_INFO.contact.website}/about#person`,
  name: "Dom Berry",
  jobTitle: "Professional Filmmaker & Videographer",
  description:
    "Professional filmmaker and videographer based in Stroud, Gloucestershire, specializing in wedding videos, corporate films, and marketing content across the South West UK.",
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS_INFO.address.street,
    addressLocality: BUSINESS_INFO.address.city,
    addressRegion: BUSINESS_INFO.address.county,
    postalCode: BUSINESS_INFO.address.postcode,
    addressCountry: "GB",
  },
  worksFor: {
    "@type": "Organization",
    "@id": `${BUSINESS_INFO.contact.website}/#organization`,
    name: BUSINESS_INFO.name,
  },
  sameAs: Object.values(BUSINESS_INFO.social),
});

// Helper function to generate JSON-LD script tag
export const generateJsonLd = (schema: StructuredData): string =>
  JSON.stringify(schema, null, 2);
