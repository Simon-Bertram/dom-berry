import type { MetadataRoute } from "next";
import { BUSINESS_INFO } from "@/lib/business-info";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BUSINESS_INFO.name,
    short_name: "Dom Berry",
    description: BUSINESS_INFO.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#4f46e5", // Indigo-600 to match site theme
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
