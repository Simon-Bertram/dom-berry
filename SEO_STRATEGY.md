# SEO Strategy & Implementation Documentation

## Overview

This document outlines the comprehensive SEO strategy implemented for Dom Berry's professional video production business based in Stroud, Gloucestershire. The strategy focuses on local SEO optimization, technical SEO best practices, and structured data implementation to improve search visibility across the South West UK market.

## Business Context

- **Business Name**: Dom Berry
- **Industry**: Professional Video Production & Filmmaking
- **Primary Location**: Stroud, Gloucestershire
- **Service Area**: South West UK (Bristol, Bath, Cheltenham, Gloucester, Swindon, Cirencester, Cotswolds)
- **Target Market**: Wedding videography, corporate films, marketing content, live events

## SEO Strategy Components

### 1. Local SEO Foundation

#### Target Keywords

- **Primary**: "Stroud videographer", "Gloucestershire wedding videographer"
- **Secondary**: "South West video production", "Bristol area filmmaker"
- **Long-tail**: "Professional video production Stroud", "Wedding filmmaker Gloucestershire"
- **Service-specific**: "Corporate video Bristol", "Marketing video Bath", "Event videography Cheltenham"

#### Geographic Targeting

- **Primary Market**: Stroud, Gloucestershire
- **Secondary Markets**: Bristol, Bath, Cheltenham, Gloucester, Swindon, Cirencester
- **Regional Coverage**: South West England, Cotswolds
- **Postcode Areas**: GL5 (Stroud), BS (Bristol), BA (Bath), GL (Gloucester)

### 2. Technical SEO Implementation

#### Core Infrastructure

- **Sitemap**: Dynamic XML sitemap (`/sitemap.xml`) with all pages, portfolio items, and testimonials
- **Robots.txt**: Proper crawler directives with sitemap reference
- **Web App Manifest**: PWA capabilities with business branding
- **Canonical URLs**: Consistent URL structure across all pages

#### Metadata Strategy

- **Title Templates**: `%s | Dom Berry` for consistent branding
- **Meta Descriptions**: Location-optimized, service-specific descriptions (150-160 characters)
- **Open Graph**: Social media optimization with business-specific images
- **Twitter Cards**: Enhanced social sharing with large image cards
- **Language**: `en-GB` for UK market targeting

#### Performance Optimization

- **Font Loading**: `display: swap` for improved Core Web Vitals
- **Image Optimization**: Next.js Image component with proper sizing
- **Compression**: Enabled in Next.js configuration
- **Security Headers**: `poweredByHeader: false` for security

### 3. Structured Data (Schema.org)

#### Implemented Schema Types

**LocalBusiness Schema**

```json
{
  "@type": "LocalBusiness",
  "name": "Dom Berry",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Stroud, Gloucestershire",
    "addressLocality": "Stroud",
    "addressRegion": "Gloucestershire",
    "postalCode": "GL5",
    "addressCountry": "GB"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 51.75,
    "longitude": -2.2167
  },
  "areaServed": ["Stroud", "Gloucestershire", "Bristol", "Bath", "Cheltenham"],
  "serviceType": [
    "Wedding Videography",
    "Corporate Video Production",
    "Marketing Videos"
  ]
}
```

**Organization Schema**

- Business contact information
- Social media profiles
- Logo and branding elements
- Contact points for customer service

**Service Schema** (Per Service)

- Service-specific pricing and descriptions
- Geographic service areas
- Provider information linking to LocalBusiness

**Review Schema** (Testimonials)

- Client testimonials with ratings
- Author information (name, role, company)
- Review content and ratings

**Person Schema** (About Page)

- Individual professional information
- Job title and description
- Work affiliation with organization

**VideoObject Schema** (Portfolio)

- Video content metadata
- Creator and publisher information
- Upload dates and descriptions

### 4. Content Strategy

#### Page-Specific Optimization

**Homepage**

- H1: "Dom Berry" with location context
- Hero text: "Professional filmmaking services in Stroud, Gloucestershire"
- Local keyword integration in content
- Service area mentions

**About Page**

- Location-specific business story
- Service area coverage details
- Professional credentials and experience
- Local market expertise

**Services Page**

- Service-specific descriptions with location context
- Pricing transparency for local market
- Geographic service area coverage
- Industry-specific terminology

**Portfolio Page**

- Project location tags
- Client testimonials with local context
- Service type categorization
- Geographic project distribution

**Contact Page**

- Complete NAP (Name, Address, Phone) data
- Business hours and availability
- Service area coverage map
- Local contact methods

**Testimonials Page**

- Client location information
- Project type and location context
- Rating and review structured data
- Local client success stories

### 5. Local SEO Features

#### NAP Consistency

- **Name**: Dom Berry
- **Address**: Stroud, Gloucestershire, GL5, United Kingdom
- **Phone**: +44 1453 123456 (placeholder)
- **Email**: hello@domberry.co.uk (placeholder)
- **Website**: https://domberry.co.uk (placeholder)

#### Business Information

- **Hours**: Monday-Friday 9:00 AM - 6:00 PM, Saturday 10:00 AM - 4:00 PM, Sunday Closed
- **Service Areas**: 11 primary locations across South West UK
- **Social Profiles**: Vimeo, YouTube, Instagram, LinkedIn

#### Geographic Targeting

- **Coordinates**: 51.75, -2.2167 (Stroud center)
- **Service Radius**: South West England
- **Local Keywords**: Integrated throughout content
- **Location Pages**: Service area coverage in footer and contact page

### 6. Technical Implementation Details

#### File Structure

```
apps/web/src/
├── app/
│   ├── layout.tsx          # Root metadata and structured data
│   ├── sitemap.ts          # Dynamic sitemap generation
│   ├── robots.ts           # Crawler directives
│   ├── manifest.ts         # PWA manifest
│   ├── page.tsx            # Homepage with local optimization
│   ├── about/page.tsx      # About page with person schema
│   ├── services/page.tsx   # Services with service schema
│   ├── portfolio/page.tsx  # Portfolio with video schema
│   ├── testimonials/page.tsx # Reviews with review schema
│   └── contact/page.tsx    # Contact with business info
├── lib/
│   ├── business-info.ts    # Centralized business data
│   └── structured-data.ts  # Schema.org implementations
└── components/
    ├── footer.tsx          # NAP data and service areas
    └── business-schema.tsx # Reusable schema component
```

#### Key Configuration Files

- **business-info.ts**: Centralized business data management
- **structured-data.ts**: Schema.org markup generation
- **layout.tsx**: Global metadata and structured data injection
- **next.config.ts**: Technical SEO configuration

### 7. Content Optimization Strategy

#### Keyword Integration

- **Primary Keywords**: Naturally integrated in headings and content
- **Location Keywords**: Consistent use of "Stroud", "Gloucestershire", "South West UK"
- **Service Keywords**: Service-specific terminology with local context
- **Long-tail Keywords**: Conversational phrases for voice search

#### Content Structure

- **H1 Tags**: Business name with location context
- **H2 Tags**: Service categories and page sections
- **H3 Tags**: Specific services and features
- **Meta Descriptions**: Compelling, location-specific descriptions
- **Alt Text**: Descriptive, keyword-rich image descriptions

#### Local Content Elements

- **Service Area Coverage**: Detailed geographic coverage information
- **Local Project Examples**: Portfolio items with location context
- **Client Testimonials**: Local client success stories
- **Business Hours**: Clear availability information
- **Contact Information**: Multiple contact methods

### 8. Performance & User Experience

#### Core Web Vitals Optimization

- **LCP**: Optimized font loading with `display: swap`
- **CLS**: Proper image sizing and layout stability
- **FID**: Efficient JavaScript execution
- **Image Optimization**: Next.js Image component with proper sizing

#### Accessibility Features

- **Skip Links**: Navigation accessibility
- **Alt Text**: Comprehensive image descriptions
- **Semantic HTML**: Proper heading hierarchy
- **ARIA Labels**: Screen reader compatibility

#### Mobile Optimization

- **Responsive Design**: Mobile-first approach
- **Touch Targets**: Appropriate button sizes
- **Loading Performance**: Optimized for mobile networks
- **PWA Features**: App-like experience

### 9. Analytics & Monitoring

#### Recommended Tracking

- **Google Analytics 4**: User behavior and conversion tracking
- **Google Search Console**: Search performance monitoring
- **Google My Business**: Local search optimization
- **PostHog**: Custom event tracking (already implemented)

#### Key Metrics to Monitor

- **Local Search Rankings**: Target keyword positions
- **Organic Traffic**: Geographic distribution
- **Conversion Rates**: Contact form submissions
- **Local Pack Visibility**: Google My Business performance
- **Page Load Speed**: Core Web Vitals scores

### 10. Future Optimization Opportunities

#### Content Marketing

- **Blog Section**: Location-based content marketing
- **Case Studies**: Detailed project showcases
- **Local Guides**: "Best wedding venues in Gloucestershire"
- **Industry Insights**: Video production tips and trends

#### Advanced Local SEO

- **Google My Business**: Complete profile optimization
- **Local Citations**: Directory submissions
- **Review Management**: Client review collection strategy
- **Local Link Building**: Community partnerships

#### Technical Enhancements

- **AMP Pages**: Accelerated Mobile Pages for blog content
- **Voice Search**: Conversational keyword optimization
- **Featured Snippets**: FAQ schema implementation
- **Video SEO**: YouTube optimization and embedding

## Implementation Status

✅ **Completed**

- Core metadata configuration
- Structured data implementation
- Local SEO optimization
- Technical SEO files (sitemap, robots, manifest)
- Content localization
- Image optimization
- Contact page enhancement
- Footer business information

🔄 **In Progress**

- Google My Business setup
- Local citation building
- Review collection strategy

📋 **Planned**

- Blog content creation
- Advanced analytics setup
- Local link building
- Voice search optimization

## Maintenance & Updates

### Regular Tasks

- **Monthly**: Review search rankings and traffic data
- **Quarterly**: Update business information and service areas
- **Annually**: Comprehensive SEO audit and strategy review

### Content Updates

- **Portfolio**: Add new projects with location context
- **Testimonials**: Collect and add client reviews
- **Services**: Update pricing and service descriptions
- **Contact**: Maintain accurate business information

### Technical Maintenance

- **Schema Validation**: Regular structured data testing
- **Performance Monitoring**: Core Web Vitals tracking
- **Security Updates**: Keep dependencies current
- **Backup Strategy**: Regular content and configuration backups

## Success Metrics

### Primary KPIs

- **Local Search Rankings**: Top 3 positions for target keywords
- **Organic Traffic Growth**: 25% increase in 6 months
- **Local Pack Visibility**: Consistent Google My Business presence
- **Conversion Rate**: Contact form submissions and inquiries

### Secondary Metrics

- **Page Load Speed**: < 3 seconds on mobile
- **Core Web Vitals**: All metrics in "Good" range
- **Social Sharing**: Open Graph engagement
- **User Experience**: Low bounce rate, high time on site

This SEO strategy provides a comprehensive foundation for Dom Berry's online presence, focusing on local market dominance in the South West UK video production industry.
