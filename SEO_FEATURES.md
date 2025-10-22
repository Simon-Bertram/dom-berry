# SEO Features Implementation Guide

## Overview

This document provides a detailed breakdown of all SEO features implemented for Dom Berry's video production website, including technical specifications, implementation details, and usage guidelines.

## Core SEO Features

### 1. Business Information Management

#### Centralized Configuration (`business-info.ts`)

```typescript
export const BUSINESS_INFO = {
  name: "Dom Berry",
  tagline: "Professional Video Production & Filmmaking Services",
  description:
    "Professional videography and filmmaking services based in Stroud, Gloucestershire...",

  // NAP Data
  address: {
    street: "Stroud, Gloucestershire",
    city: "Stroud",
    county: "Gloucestershire",
    postcode: "GL5",
    country: "United Kingdom",
    coordinates: { latitude: 51.75, longitude: -2.2167 },
  },

  contact: {
    phone: "+44 1453 123456",
    email: "hello@domberry.co.uk",
    website: "https://domberry.co.uk",
  },

  // Service Areas
  serviceAreas: [
    "Stroud",
    "Gloucestershire",
    "Bristol",
    "Bath",
    "Cheltenham",
    "Gloucester",
    "Swindon",
    "Cirencester",
    "Tewkesbury",
    "South West England",
    "Cotswolds",
  ],

  // Business Hours
  hours: {
    monday: "9:00 AM - 6:00 PM",
    tuesday: "9:00 AM - 6:00 PM",
    // ... other days
  },

  // Social Media
  social: {
    vimeo: "https://vimeo.com/domberry",
    youtube: "https://youtube.com/@domberry",
    instagram: "https://instagram.com/domberry",
    linkedin: "https://linkedin.com/in/domberry",
  },

  // SEO Keywords
  keywords: [
    "Stroud videographer",
    "Gloucestershire wedding videographer",
    "South West video production",
    // ... more keywords
  ],
};
```

**Benefits:**

- Single source of truth for business data
- Consistent NAP information across all pages
- Easy maintenance and updates
- Type-safe configuration

### 2. Structured Data Implementation

#### Schema.org Markup (`structured-data.ts`)

**LocalBusiness Schema**

```typescript
export const localBusinessSchema = (): StructuredData => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${BUSINESS_INFO.contact.website}/#business`,
  name: BUSINESS_INFO.name,
  description: BUSINESS_INFO.description,
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
  openingHoursSpecification: Object.entries(BUSINESS_INFO.hours)
    .map(([day, hours]) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: day.charAt(0).toUpperCase() + day.slice(1),
      opens: hours === "Closed" ? undefined : hours.split(" - ")[0],
      closes: hours === "Closed" ? undefined : hours.split(" - ")[1],
    }))
    .filter((spec) => spec.opens && spec.closes),
  sameAs: Object.values(BUSINESS_INFO.social),
});
```

**Service Schema**

```typescript
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
```

**Review Schema**

```typescript
export const reviewSchema = (review: {
  name: string;
  role: string;
  company: string;
  content: string;
  rating?: number;
}): StructuredData => ({
  "@context": "https://schema.org",
  "@type": "Review",
  "@id": `${BUSINESS_INFO.contact.website}/testimonials#${review.name
    .toLowerCase()
    .replace(/\s+/g, "-")}`,
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
```

**Benefits:**

- Rich snippets in search results
- Enhanced local search visibility
- Better understanding by search engines
- Improved click-through rates

### 3. Technical SEO Files

#### Dynamic Sitemap (`sitemap.ts`)

```typescript
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = BUSINESS_INFO.contact.website;
  const currentDate = new Date().toISOString();

  // Static pages with priorities and change frequencies
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // ... more pages
  ];

  // Dynamic portfolio and testimonial pages
  const portfolioPages: MetadataRoute.Sitemap = getAllPortfolioProjects().map(
    (project) => ({
      url: `${baseUrl}/portfolio/${project.slug}`,
      lastModified: new Date(project.date || currentDate).toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })
  );

  return [
    ...staticPages,
    ...portfolioPages,
    ...testimonialPages,
    ...servicePages,
  ];
}
```

#### Robots.txt (`robots.ts`)

```typescript
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
```

#### Web App Manifest (`manifest.ts`)

```typescript
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BUSINESS_INFO.name,
    short_name: "Dom Berry",
    description: BUSINESS_INFO.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#4f46e5", // Indigo-600
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable any",
      },
    ],
    categories: ["business", "photography", "video", "entertainment"],
    lang: "en-GB",
    dir: "ltr",
    scope: "/",
    prefer_related_applications: false,
  };
}
```

### 4. Metadata Configuration

#### Root Layout Metadata (`layout.tsx`)

```typescript
export const metadata: Metadata = {
  title: {
    default: `${BUSINESS_INFO.name} - ${BUSINESS_INFO.tagline}`,
    template: `%s | ${BUSINESS_INFO.name}`,
  },
  description: BUSINESS_INFO.description,
  keywords: [...BUSINESS_INFO.keywords],
  authors: [{ name: BUSINESS_INFO.name }],
  creator: BUSINESS_INFO.name,
  publisher: BUSINESS_INFO.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(BUSINESS_INFO.contact.website),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: BUSINESS_INFO.contact.website,
    title: `${BUSINESS_INFO.name} - ${BUSINESS_INFO.tagline}`,
    description: BUSINESS_INFO.description,
    siteName: BUSINESS_INFO.name,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${BUSINESS_INFO.name} - Professional Video Production Services`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BUSINESS_INFO.name} - ${BUSINESS_INFO.tagline}`,
    description: BUSINESS_INFO.description,
    images: ["/og-image.jpg"],
    creator: "@domberry",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};
```

#### Page-Specific Metadata Examples

**About Page**

```typescript
export const metadata: Metadata = {
  title: "About Dom Berry - Professional Filmmaker in Stroud, Gloucestershire",
  description:
    "Learn about Dom Berry, a professional filmmaker and videographer based in Stroud, Gloucestershire. Specializing in wedding videos, corporate films, and marketing content across the South West UK.",
  keywords: [
    "about Dom Berry",
    "Stroud filmmaker",
    "Gloucestershire videographer",
    "professional video production",
    "South West UK filmmaker",
    "wedding videographer Stroud",
    "corporate video Gloucestershire",
  ],
  openGraph: {
    title:
      "About Dom Berry - Professional Filmmaker in Stroud, Gloucestershire",
    description:
      "Learn about Dom Berry, a professional filmmaker and videographer based in Stroud, Gloucestershire...",
    type: "profile",
  },
};
```

**Services Page**

```typescript
export const metadata: Metadata = {
  title: "Professional Video Production Services in Stroud, Gloucestershire",
  description:
    "Professional videography services in Stroud, Gloucestershire and across the South West UK. Wedding videos, corporate films, marketing content, and live event coverage.",
  keywords: [
    "video production services Stroud",
    "wedding videography Gloucestershire",
    "corporate video production Bristol",
    "marketing video Bath",
    "event videography Cheltenham",
    "professional filmmaker South West UK",
    "video production Gloucestershire",
  ],
  openGraph: {
    title: "Professional Video Production Services in Stroud, Gloucestershire",
    description:
      "Professional videography services in Stroud, Gloucestershire and across the South West UK...",
    type: "website",
  },
};
```

### 5. Content Optimization Features

#### Location-Specific Content

- **Homepage Hero**: "Professional filmmaking services in Stroud, Gloucestershire"
- **About Page**: "Based in Stroud, Gloucestershire, we serve clients across the South West UK including Bristol, Bath, Cheltenham, and the Cotswolds"
- **Services Page**: "Professional videography services in Stroud, Gloucestershire and across the South West UK"
- **Portfolio Page**: "Explore our recent work across Stroud, Gloucestershire and the South West UK"

#### Enhanced Image Alt Text

```typescript
// Before
alt={`${project.title} thumbnail`}

// After
alt={`${project.title} - Professional video production project in ${project.location} by Dom Berry, Stroud videographer`}
```

#### Footer Business Information

```typescript
<div className="mb-4 text-gray-400 text-sm">
  <p className="font-medium text-gray-300">Contact Information:</p>
  <p>📍 {BUSINESS_INFO.address.street}, {BUSINESS_INFO.address.county}</p>
  <p>📞 {BUSINESS_INFO.contact.phone}</p>
  <p>✉️ {BUSINESS_INFO.contact.email}</p>
</div>

// Service Areas
<div className="space-y-1">
  {BUSINESS_INFO.serviceAreas.slice(0, 6).map((area) => (
    <p className="text-gray-400 text-sm" key={area}>
      {area}
    </p>
  ))}
  {BUSINESS_INFO.serviceAreas.length > 6 && (
    <p className="text-gray-500 text-xs">
      +{BUSINESS_INFO.serviceAreas.length - 6} more areas
    </p>
  )}
</div>
```

### 6. Contact Page Enhancement

#### Complete Business Information Display

```typescript
<div className="space-y-6">
  <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
    <h2 className="mb-4 font-semibold text-xl text-gray-900 dark:text-gray-100">
      Contact Information
    </h2>
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <span className="text-indigo-600 text-xl">📍</span>
        <div>
          <p className="font-medium text-gray-900 dark:text-gray-100">
            Address
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            {BUSINESS_INFO.address.street}
            <br />
            {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.county}
            <br />
            {BUSINESS_INFO.address.postcode}, United Kingdom
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-indigo-600 text-xl">📞</span>
        <div>
          <p className="font-medium text-gray-900 dark:text-gray-100">Phone</p>
          <a
            href={`tel:${BUSINESS_INFO.contact.phone}`}
            className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            {BUSINESS_INFO.contact.phone}
          </a>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-indigo-600 text-xl">✉️</span>
        <div>
          <p className="font-medium text-gray-900 dark:text-gray-100">Email</p>
          <a
            href={`mailto:${BUSINESS_INFO.contact.email}`}
            className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            {BUSINESS_INFO.contact.email}
          </a>
        </div>
      </div>
    </div>
  </div>

  {/* Business Hours */}
  <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
    <h2 className="mb-4 font-semibold text-xl text-gray-900 dark:text-gray-100">
      Business Hours
    </h2>
    <div className="space-y-2">
      {Object.entries(BUSINESS_INFO.hours).map(([day, hours]) => (
        <div key={day} className="flex justify-between">
          <span className="font-medium text-gray-900 dark:text-gray-100 capitalize">
            {day}
          </span>
          <span className="text-gray-600 dark:text-gray-300">{hours}</span>
        </div>
      ))}
    </div>
  </div>

  {/* Service Areas */}
  <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
    <h2 className="mb-4 font-semibold text-xl text-gray-900 dark:text-gray-100">
      Service Areas
    </h2>
    <p className="mb-3 text-gray-600 dark:text-gray-300">
      We proudly serve clients across the South West UK:
    </p>
    <div className="flex flex-wrap gap-2">
      {BUSINESS_INFO.serviceAreas.map((area) => (
        <span
          key={area}
          className="rounded-full bg-indigo-100 px-3 py-1 text-indigo-800 text-sm dark:bg-indigo-900 dark:text-indigo-200"
        >
          {area}
        </span>
      ))}
    </div>
  </div>
</div>
```

### 7. Structured Data Integration

#### Page-Level Schema Implementation

**Homepage (layout.tsx)**

```typescript
<head>
  {/* Structured Data */}
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: generateJsonLd(websiteSchema()),
    }}
  />
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: generateJsonLd(organizationSchema()),
    }}
  />
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: generateJsonLd(localBusinessSchema()),
    }}
  />
</head>
```

**Services Page**

```typescript
{
  /* Service Schema for each service */
}
{
  SERVICES.map((service) => (
    <script
      key={service.id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: generateJsonLd(serviceSchema(service)),
      }}
    />
  ));
}
```

**Testimonials Page**

```typescript
{
  /* Review Schema for each testimonial */
}
{
  testimonials.map((testimonial) => (
    <script
      key={testimonial.slug}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: generateJsonLd(
          reviewSchema({
            name: testimonial.name,
            role: testimonial.role,
            company: testimonial.company,
            content: testimonial.content,
            rating: testimonial.rating,
          })
        ),
      }}
    />
  ));
}
```

**About Page**

```typescript
<BusinessSchema />
```

### 8. Performance Optimization Features

#### Font Loading Strategy

```typescript
const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap", // Prevents layout shift
  fallback: ["ui-serif", "Georgia", "serif"],
});

const sourceSansPro = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap", // Prevents layout shift
  preload: true, // Critical font preloading
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});
```

#### Image Optimization

```typescript
// Next.js Image component with proper sizing
<Image
  alt={`${project.title} - Professional video production project in ${project.location} by Dom Berry, Stroud videographer`}
  className="object-cover"
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
  src={project.image}
/>
```

#### Next.js Configuration

```typescript
const nextConfig: NextConfig = {
  typedRoutes: true,
  output: "standalone",
  experimental: {
    optimizePackageImports: ["lucide-react"],
    optimizeCss: true,
  },
  images: {
    formats: ["image/avif", "image/webp"], // Modern image formats
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dulwhlyqt/**",
      },
    ],
  },
  compress: true,
  poweredByHeader: false, // Security enhancement
  // ... other optimizations
};
```

## Usage Guidelines

### 1. Updating Business Information

To update business information, modify the `BUSINESS_INFO` object in `business-info.ts`:

```typescript
// Update contact information
contact: {
  phone: "+44 1453 123456", // Update with real number
  email: "hello@domberry.co.uk", // Update with real email
  website: "https://domberry.co.uk" // Update with real domain
}
```

### 2. Adding New Services

Add new services to the `SERVICES` array in `content/services/services.ts`. The structured data will automatically include them.

### 3. Adding New Testimonials

Add new testimonials to the testimonials content. The review schema will automatically be generated.

### 4. Updating Service Areas

Modify the `serviceAreas` array in `business-info.ts` to add or remove coverage areas.

### 5. Schema Validation

Use Google's Rich Results Test to validate structured data:

- https://search.google.com/test/rich-results
- Test individual pages for schema validation

## Monitoring & Maintenance

### Regular Checks

1. **Schema Validation**: Monthly validation of structured data
2. **Performance Monitoring**: Core Web Vitals tracking
3. **Search Console**: Monitor search performance and errors
4. **Business Information**: Quarterly updates of contact details

### Tools for Monitoring

- **Google Search Console**: Search performance and indexing
- **Google Rich Results Test**: Schema validation
- **PageSpeed Insights**: Performance monitoring
- **Google My Business**: Local search optimization

This comprehensive SEO feature set provides Dom Berry with a strong foundation for local search visibility and technical SEO excellence in the South West UK video production market.
