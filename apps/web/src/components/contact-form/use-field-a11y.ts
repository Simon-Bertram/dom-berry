import { useMemo } from "react";
import type { FieldA11yReturn, FormFieldName } from "./types";

/**
 * Custom hook for field accessibility attributes
 * Centralizes aria-* logic to avoid repetition across field components
 */
export function useFieldA11y(
  fieldId: FormFieldName,
  error?: string
): FieldA11yReturn {
  return useMemo(() => {
    const errorId = `${fieldId}-error`;
    const hasError = !!error;

    return {
      errorId,
      hasError,
      ariaAttributes: {
        "aria-describedby": hasError ? errorId : undefined,
        "aria-invalid": hasError,
        "aria-required": true,
      },
    };
  }, [fieldId, error]);
}
