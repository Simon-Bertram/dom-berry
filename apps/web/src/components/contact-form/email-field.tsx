import { Mail } from "lucide-react";
import type { FormState } from "@/hooks/use-contact-form";
import { FormField } from "./form-field";

type EmailFieldProps = {
  state: FormState;
};

export function EmailField({ state }: EmailFieldProps) {
  return (
    <FormField
      error={state.errors.email}
      htmlFor="email"
      icon={<Mail className="mr-2 text-primary dark:text-primary" size={16} />}
      label="Email Address"
    >
      <input
        aria-describedby={state.errors.email ? "email-error" : undefined}
        aria-invalid={!!state.errors.email}
        aria-required="true"
        className={`w-full rounded-lg border bg-white p-3 text-gray-900 transition duration-150 focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-gray-100 ${
          state.errors.email
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-primary dark:border-gray-600"
        }`}
        id="email"
        maxLength={254}
        name="email"
        required
        type="email"
      />
    </FormField>
  );
}
