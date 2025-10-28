import {
  ChevronDown,
  Mail,
  MessageSquare,
  PenTool,
  PoundSterling,
  User,
} from "lucide-react";
import type { FormState } from "@/hooks/use-contact-form";
import { BUDGET_RANGES, PROJECT_TYPES } from "@/hooks/use-contact-form";
import { FormField } from "./form-field";

type ContactFormFieldsProps = {
  state: FormState;
  visionLength: number;
  formLoadTime: number;
  visionRef: React.RefObject<HTMLTextAreaElement | null>;
  onVisionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export function ContactFormFields({
  state,
  visionLength,
  formLoadTime,
  visionRef,
  onVisionChange,
}: ContactFormFieldsProps) {
  return (
    <>
      {/* Honeypot field - hidden from users but visible to bots */}
      <input
        aria-hidden="true"
        autoComplete="off"
        name="website"
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          opacity: 0,
        }}
        tabIndex={-1}
        type="text"
      />

      {/* Timestamp field for bot detection */}
      <input name="formTimestamp" type="hidden" value={formLoadTime} />

      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField
          error={state.errors.name}
          htmlFor="name"
          icon={
            <User
              className="mr-2 text-indigo-600 dark:text-indigo-400"
              size={16}
            />
          }
          label="Your Name"
        >
          <input
            aria-describedby={state.errors.name ? "name-error" : undefined}
            aria-invalid={!!state.errors.name}
            aria-required="true"
            className={`w-full rounded-lg border bg-white p-3 text-gray-900 transition duration-150 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100 ${
              state.errors.name
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-indigo-500 dark:border-gray-600"
            }`}
            id="name"
            maxLength={100}
            name="name"
            required
            type="text"
          />
        </FormField>

        <FormField
          error={state.errors.email}
          htmlFor="email"
          icon={
            <Mail
              className="mr-2 text-indigo-600 dark:text-indigo-400"
              size={16}
            />
          }
          label="Email Address"
        >
          <input
            aria-describedby={state.errors.email ? "email-error" : undefined}
            aria-invalid={!!state.errors.email}
            aria-required="true"
            className={`w-full rounded-lg border bg-white p-3 text-gray-900 transition duration-150 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100 ${
              state.errors.email
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-indigo-500 dark:border-gray-600"
            }`}
            id="email"
            maxLength={254}
            name="email"
            required
            type="email"
          />
        </FormField>

        <FormField
          error={state.errors.projectType}
          htmlFor="projectType"
          icon={
            <PenTool
              className="mr-2 text-indigo-600 dark:text-indigo-400"
              size={16}
            />
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
              className={`w-full appearance-none rounded-lg border bg-white p-3 pr-10 text-gray-900 transition duration-150 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100 ${
                state.errors.projectType
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-indigo-500 dark:border-gray-600"
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

        <FormField
          error={state.errors.projectBudget}
          htmlFor="projectBudget"
          icon={
            <PoundSterling
              className="mr-2 text-indigo-600 dark:text-indigo-400"
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
              className={`w-full appearance-none rounded-lg border bg-white p-3 pr-10 text-gray-900 transition duration-150 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100 ${
                state.errors.projectBudget
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-indigo-500 dark:border-gray-600"
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
      </div>

      <FormField
        error={state.errors.vision}
        htmlFor="vision"
        icon={
          <MessageSquare
            className="mr-2 text-indigo-600 dark:text-indigo-400"
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
            className={`w-full rounded-lg border bg-white p-3 text-gray-900 transition duration-150 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100 ${
              state.errors.vision
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-indigo-500 dark:border-gray-600"
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
    </>
  );
}
