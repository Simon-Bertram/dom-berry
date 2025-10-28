import { ChevronDown, PoundSterling } from "lucide-react";
import type { FormState } from "@/hooks/use-contact-form";
import { BUDGET_RANGES } from "@/hooks/use-contact-form";
import { FormField } from "./form-field";

type BudgetSelectProps = {
  state: FormState;
};

export function BudgetSelect({ state }: BudgetSelectProps) {
  return (
    <FormField
      error={state.errors.projectBudget}
      htmlFor="projectBudget"
      icon={
        <PoundSterling
          className="mr-2 text-primary dark:text-primary"
          size={16}
        />
      }
      label="Estimated Budget Range"
    >
      <div className="relative">
        <select
          aria-describedby={
            state.errors.projectBudget ? "projectBudget-error" : undefined
          }
          aria-invalid={!!state.errors.projectBudget}
          aria-required="true"
          className={`w-full appearance-none rounded-lg border bg-white p-3 pr-10 text-gray-900 transition duration-150 focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-gray-100 ${
            state.errors.projectBudget
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-primary dark:border-gray-600"
          }`}
          defaultValue=""
          id="projectBudget"
          name="projectBudget"
          required
        >
          <option disabled value="">
            Select a Budget
          </option>
          {BUDGET_RANGES.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </select>
        <ChevronDown className="-translate-y-1/2 pointer-events-none absolute top-1/2 right-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
      </div>
    </FormField>
  );
}
