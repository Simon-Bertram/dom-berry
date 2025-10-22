import { generateJsonLd, personSchema } from "@/lib/structured-data";

export function BusinessSchema() {
  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data
      dangerouslySetInnerHTML={{
        __html: generateJsonLd(personSchema()),
      }}
      type="application/ld+json"
    />
  );
}
