import { generateJsonLd, personSchema } from "@/lib/structured-data";

export function BusinessSchema() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: generateJsonLd(personSchema()),
      }}
      type="application/ld+json"
    />
  );
}
