import type { Metadata } from "next";
import type { Service } from "./services";
import { SERVICES } from "./services";

export default function ServicesPage() {
  return (
    <div>
      <h1>Services</h1>
      <ul>
        {SERVICES.map((service: Service) => (
          <li key={service.id}>{service.title}</li>
        ))}
      </ul>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Services",
  description: "Services",
};
