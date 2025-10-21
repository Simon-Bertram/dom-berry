import { CheckCircle, Clock, DollarSign, Film } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Service } from "../../content/services/services";

type ServicesGridProps = {
  services: Service[];
};

export function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <div className="relative mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service: Service) => (
        <Card
          className="h-full border-gray-200 bg-white transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
          key={service.id}
        >
          <CardHeader>
            <div className="mb-2 flex items-center gap-3">
              <div className="rounded-lg bg-indigo-100 p-2 dark:bg-indigo-900">
                <Film className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <CardTitle className="text-gray-900 text-xl dark:text-white">
                {service.title}
              </CardTitle>
            </div>
            <CardDescription className="text-base text-gray-600 dark:text-gray-300">
              {service.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-1 flex-col">
            <div className="mb-6">
              <h4 className="mb-3 font-semibold text-gray-900 dark:text-white">
                What's Included:
              </h4>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li className="flex items-start gap-2" key={feature}>
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500 dark:text-green-400" />
                    <span className="text-gray-600 text-sm dark:text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto space-y-3">
              <div className="flex items-center gap-2 text-gray-600 text-sm dark:text-gray-300">
                <DollarSign className="h-4 w-4" />
                <span>Starting from {service.startingPrice}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600 text-sm dark:text-gray-300">
                <Clock className="h-4 w-4" />
                <span>{service.duration}</span>
              </div>

              <div className="pt-3">
                <h5 className="mb-2 font-medium text-gray-900 dark:text-white">
                  Deliverables:
                </h5>
                <div className="flex flex-wrap gap-1">
                  {service.deliverables.map((deliverable) => (
                    <Badge
                      className="border-gray-300 text-gray-700 text-xs dark:border-gray-600 dark:text-gray-300"
                      key={deliverable}
                      variant="outline"
                    >
                      {deliverable}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
