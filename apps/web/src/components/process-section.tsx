type ProcessStep = {
  number: number;
  title: string;
  description: string;
};

const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: "Consultation",
    description:
      "We discuss your vision, requirements, and timeline to create a tailored approach.",
  },
  {
    number: 2,
    title: "Production",
    description:
      "Professional filming with high-quality equipment and experienced crew.",
  },
  {
    number: 3,
    title: "Delivery",
    description:
      "Final edited video delivered in your preferred formats with revisions included.",
  },
];

export function ProcessSection() {
  return (
    <div className="mb-16 rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 dark:border-gray-700 dark:from-slate-800 dark:to-indigo-900">
      <h2 className="mb-8 text-center font-bold font-display text-3xl text-gray-900 dark:text-white">
        Our Process
      </h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {processSteps.map((step) => (
          <div className="text-center" key={step.number}>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
              <span className="font-bold text-2xl text-indigo-600 dark:text-indigo-200">
                {step.number}
              </span>
            </div>
            <h3 className="mb-2 font-display font-semibold text-gray-900 text-lg dark:text-white">
              {step.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
