export const BUSINESS_INFO = {
  name: "Dom Berry",
  tagline: "Professional Video Production & Filmmaking Services",
  description:
    "Professional videography and filmmaking services based in Stroud, Gloucestershire. Specializing in wedding videos, corporate films, and marketing content across the South West UK.",

  // NAP (Name, Address, Phone) Data
  address: {
    street: "Stroud, Gloucestershire",
    city: "Stroud",
    county: "Gloucestershire",
    postcode: "GL5", // Stroud postcode area
    country: "United Kingdom",
    coordinates: {
      latitude: 51.75,
      longitude: -2.2167,
    },
  },

  contact: {
    phone: "+44 1453 123456", // Placeholder - update with real number
    email: "hello@domberry.co.uk", // Placeholder - update with real email
    website: "https://domberry.co.uk", // Placeholder - update with real domain
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

  // Social Media
  social: {
    vimeo: "https://vimeo.com/domberry",
    youtube: "https://youtube.com/@domberry",
    instagram: "https://instagram.com/domberry",
    linkedin: "https://linkedin.com/in/domberry",
  },

  // Services
  services: [
    "Wedding Videography",
    "Corporate Video Production",
    "Marketing Videos",
    "Live Event Coverage",
    "Commercial Advertisements",
    "Documentary Filmmaking",
  ],

  // Keywords for SEO
  keywords: [
    "Stroud videographer",
    "Gloucestershire wedding videographer",
    "South West video production",
    "Bristol area filmmaker",
    "Cotswolds wedding videography",
    "Professional video production Stroud",
    "Wedding filmmaker Gloucestershire",
    "Corporate video Bristol",
    "Marketing video Bath",
    "Event videography Cheltenham",
  ],
};

export type BusinessInfo = typeof BUSINESS_INFO;
