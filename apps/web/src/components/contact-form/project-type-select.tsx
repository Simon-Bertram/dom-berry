import { ChevronDown, PenTool } from "lucide-react";
import type { FormState } from "@/hooks/use-contact-form";
import { PROJECT_TYPES } from "@/hooks/use-contact-form";
import { FormField } from "./form-field";

type ProjectTypeSelectProps = {
  state: FormState;
};

export function ProjectTypeSelect({ state }: ProjectTypeSelectProps) {
  return (
    <FormField
      error={state.errors.projectType}
      htmlFor="projectType"
      icon={
        <PenTool className="mr-2 text-primary dark:text-primary" size={16} />
      }
      label="Project Type"
    >
      <div className="relative">
        <select
          aria-describedby={
            state.errors.projectType ? "projectType-error" : undefined
          }
          aria-invalid={!!state.errors.projectType}
          aria-required="true"
          className={`w-full appearance-none rounded-lg border bg-white p-3 pr-10 text-gray-900 transition duration-150 focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-gray-100 ${
            state.errors.projectType
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-primary dark:border-gray-600"
          }`}
          defaultValue=""
          id="projectType"
          name="projectType"
        >
          <option disabled value="">
            Select a Type
          </option>
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <ChevronDown className="-translate-y-1/2 pointer-events-none absolute top-1/2 right-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
      </div>
    </FormField>
  );
}
