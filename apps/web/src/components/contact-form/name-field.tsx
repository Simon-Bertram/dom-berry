import { User } from "lucide-react";
import type { FormState } from "@/hooks/use-contact-form";
import { FormField } from "./form-field";

type NameFieldProps = {
  state: FormState;
};

export function NameField({ state }: NameFieldProps) {
  return (
    <FormField
      error={state.errors.name}
      htmlFor="name"
      icon={<User className="mr-2 text-primary dark:text-primary" size={16} />}
      label="Your Name"
    >
      <input
        aria-describedby={state.errors.name ? "name-error" : undefined}
        aria-invalid={!!state.errors.name}
        aria-required="true"
        className={`w-full rounded-lg border bg-white p-3 text-gray-900 transition duration-150 focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-gray-100 ${
          state.errors.name
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-primary dark:border-gray-600"
        }`}
        id="name"
        maxLength={100}
        name="name"
        required
        type="text"
      />
    </FormField>
  );
}
