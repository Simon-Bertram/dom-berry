/**
 * Type definitions for contact form components
 */

// Form field names as a union type for better type safety
export type FormFieldName =
  | "name"
  | "email"
  | "projectType"
  | "projectBudget"
  | "vision"
  | "formTimestamp"
  | "formToken";

// Typed error map for form fields
export type FieldErrors = Partial<Record<FormFieldName, string>>;

// Form status types
export type FormStatus = "idle" | "loading" | "success" | "error";

// Main form state type
export type FormState = {
  status: FormStatus;
  message: string;
  errors: FieldErrors;
};

// Field accessibility attributes
export type FieldA11yAttributes = {
  "aria-describedby"?: string | undefined;
  "aria-invalid": boolean;
  "aria-required": boolean;
};

// Field accessibility hook return type
export type FieldA11yReturn = {
  errorId: string;
  ariaAttributes: FieldA11yAttributes;
  hasError: boolean;
};
