import { MessageSquare } from "lucide-react";
import { FORM_VALIDATION_CONSTANTS } from "./constants";
import { useFormContext } from "./form-context";
import { FormField } from "./form-field";
import { useFieldA11y } from "./use-field-a11y";

export function VisionField() {
  const { state, visionLength, visionRef, onVisionChange } = useFormContext();
  const { ariaAttributes, hasError } = useFieldA11y(
    "vision",
    state.errors.vision
  );

  return (
    <FormField
      error={state.errors.vision}
      htmlFor="vision"
      icon={
        <MessageSquare
          className="mr-2 text-primary dark:text-primary"
          size={16}
        />
      }
      label="Tell me about your vision (Project brief)"
    >
      <div>
        <textarea
          {...ariaAttributes}
          className={`w-full rounded-lg border bg-white p-3 text-gray-900 transition duration-150 focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-gray-100 ${
            hasError
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-primary dark:border-gray-600"
          }`}
          id="vision"
          maxLength={FORM_VALIDATION_CONSTANTS.VISION_MAX_LENGTH}
          name="vision"
          onChange={onVisionChange}
          placeholder="What is the goal of the video? Who is the audience? Do you have any deadlines or preferred locations?"
          ref={visionRef}
          required
          rows={5}
        />
        <div
          aria-live="polite"
          className="mt-1 text-right text-gray-500 text-sm dark:text-gray-400"
        >
          {visionLength}/{FORM_VALIDATION_CONSTANTS.VISION_MAX_LENGTH}{" "}
          characters
        </div>
      </div>
    </FormField>
  );
}
