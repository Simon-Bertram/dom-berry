import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import "../index.css";
import { Analytics } from "@vercel/analytics/next";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Providers from "@/components/providers";
import { BUSINESS_INFO } from "@/lib/business-info";
import {
  localBusinessSchema,
  organizationSchema,
  websiteSchema,
} from "@/lib/structured-data";

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  fallback: ["ui-serif", "Georgia", "serif"],
});

const sourceSansPro = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

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
    google: "your-google-verification-code", // Replace with actual verification code
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        {/* Structured Data */}
        <script suppressHydrationWarning type="application/ld+json">
          {JSON.stringify(websiteSchema(), null, 2)}
        </script>
        <script suppressHydrationWarning type="application/ld+json">
          {JSON.stringify(organizationSchema(), null, 2)}
        </script>
        <script suppressHydrationWarning type="application/ld+json">
          {JSON.stringify(localBusinessSchema(), null, 2)}
        </script>
      </head>
      <body
        className={`${playfairDisplay.variable} ${sourceSansPro.variable} antialiased`}
      >
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Providers>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
