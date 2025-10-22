import { ExternalLink } from "lucide-react";
import { BUSINESS_INFO } from "@/lib/business-info";

const socialLinks = [
  {
    name: "Vimeo",
    href: BUSINESS_INFO.social.vimeo,
    icon: "🎬",
  },
  {
    name: "YouTube",
    href: BUSINESS_INFO.social.youtube,
    icon: "📺",
  },
  {
    name: "Instagram",
    href: BUSINESS_INFO.social.instagram,
    icon: "📸",
  },
  {
    name: "LinkedIn",
    href: BUSINESS_INFO.social.linkedin,
    icon: "💼",
  },
];

const sitemapLinks = [
  { href: "/portfolio", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

const MAX_SERVICE_AREAS_DISPLAYED = 6;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 border-gray-800 border-t bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Copyright and Brand */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 font-semibold text-lg">{BUSINESS_INFO.name}</h3>
            <p className="mb-4 text-gray-400 text-sm">
              {BUSINESS_INFO.description}
            </p>
            <div className="mb-4 text-gray-400 text-sm">
              <p className="font-medium text-gray-300">Contact Information:</p>
              <p>
                📍 {BUSINESS_INFO.address.street},{" "}
                {BUSINESS_INFO.address.county}
              </p>
              <p>📞 {BUSINESS_INFO.contact.phone}</p>
              <p>✉️ {BUSINESS_INFO.contact.email}</p>
            </div>
            <p className="text-gray-500 text-xs">
              © {currentYear} {BUSINESS_INFO.name}. All rights reserved.
            </p>
          </div>

          {/* Sitemap */}
          <div>
            <h4 className="mb-4 font-semibold text-sm uppercase tracking-wide">
              Quick Links
            </h4>
            <nav className="space-y-2">
              {sitemapLinks.map((link) => (
                <a
                  className="block text-gray-400 text-sm transition-colors hover:text-gray-100"
                  href={link.href}
                  key={link.href}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="mb-4 font-semibold text-sm uppercase tracking-wide">
              Service Areas
            </h4>
            <div className="space-y-1">
              {BUSINESS_INFO.serviceAreas
                .slice(0, MAX_SERVICE_AREAS_DISPLAYED)
                .map((area) => (
                  <p className="text-gray-400 text-sm" key={area}>
                    {area}
                  </p>
                ))}
              {BUSINESS_INFO.serviceAreas.length >
                MAX_SERVICE_AREAS_DISPLAYED && (
                <p className="text-gray-500 text-xs">
                  +
                  {BUSINESS_INFO.serviceAreas.length -
                    MAX_SERVICE_AREAS_DISPLAYED}{" "}
                  more areas
                </p>
              )}
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="mb-4 font-semibold text-sm uppercase tracking-wide">
              Follow Us
            </h4>
            <div className="space-y-2">
              {socialLinks.map((social) => (
                <a
                  className="flex items-center gap-2 text-gray-400 text-sm transition-colors hover:text-gray-100"
                  href={social.href}
                  key={social.name}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="text-base">{social.icon}</span>
                  <span>{social.name}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="mt-8 border-gray-800 border-t pt-8">
          <nav className="flex flex-wrap justify-center gap-6 md:justify-start">
            {legalLinks.map((link) => (
              <a
                className="text-gray-500 text-xs transition-colors hover:text-gray-300"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
