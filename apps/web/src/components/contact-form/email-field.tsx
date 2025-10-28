import { Mail } from "lucide-react";
import { FORM_VALIDATION_CONSTANTS } from "./constants";
import { useFormContext } from "./form-context";
import { FormField } from "./form-field";
import { useFieldA11y } from "./use-field-a11y";

export function EmailField() {
  const { state } = useFormContext();
  const { ariaAttributes, hasError } = useFieldA11y(
    "email",
    state.errors.email
  );

  return (
    <FormField
      error={state.errors.email}
      htmlFor="email"
      icon={<Mail className="mr-2 text-primary dark:text-primary" size={16} />}
      label="Email Address"
    >
      <input
        {...ariaAttributes}
        className={`w-full rounded-lg border bg-white p-3 text-gray-900 transition duration-150 focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-gray-100 ${
          hasError
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-primary dark:border-gray-600"
        }`}
        id="email"
        maxLength={FORM_VALIDATION_CONSTANTS.EMAIL_MAX_LENGTH}
        name="email"
        required
        type="email"
      />
    </FormField>
  );
}
