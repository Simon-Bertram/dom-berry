import { MessageSquare } from "lucide-react";
import type { FormState } from "@/hooks/use-contact-form";
import { FormField } from "./form-field";

type VisionFieldProps = {
  state: FormState;
  visionLength: number;
  visionRef: React.RefObject<HTMLTextAreaElement | null>;
  onVisionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export function VisionField({
  state,
  visionLength,
  visionRef,
  onVisionChange,
}: VisionFieldProps) {
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
          aria-describedby={state.errors.vision ? "vision-error" : undefined}
          aria-invalid={!!state.errors.vision}
          aria-required="true"
          className={`w-full rounded-lg border bg-white p-3 text-gray-900 transition duration-150 focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-gray-100 ${
            state.errors.vision
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-primary dark:border-gray-600"
          }`}
          id="vision"
          maxLength={2000}
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
          {visionLength}/2000 characters
        </div>
      </div>
    </FormField>
  );
}
