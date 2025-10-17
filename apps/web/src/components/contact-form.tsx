"use client";

import {
  ChevronDown,
  Mail,
  MessageSquare,
  PenTool,
  PoundSterling,
  User,
} from "lucide-react";
import Form from "next/form";
import { useEffect, useRef, useState, useTransition } from "react";
import { submitContactForm } from "@/lib/contact-actions";
import { FormField } from "./form-field";
import { StatusMessage } from "./status-message";

// Define the options for the dropdowns
const PROJECT_TYPES = [
  "Corporate Film",
  "Live Event Coverage",
  "Marketing Video (Social/Web)",
  "Commercial/Ad",
  "Wedding",
  "Other",
];

const BUDGET_RANGES = ["Under £500", "£500 - £2k", "£2k - £5k", "£5k+"];

type FormStatus = "idle" | "loading" | "success" | "error";
type FormErrors = Record<string, string>;

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isPending, startTransition] = useTransition();
  const [visionLength, setVisionLength] = useState(0);
  const [formLoadTime] = useState(Date.now());
  const visionRef = useRef<HTMLTextAreaElement>(null);

  // Character count for vision field
  useEffect(() => {
    const textarea = visionRef.current;
    if (textarea) {
      setVisionLength(textarea.value.length);
    }
  }, []);

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      setStatus("loading");
      setMessage("");
      setErrors({});

      const result = await submitContactForm(formData);

      if (result.success) {
        setStatus("success");
        setMessage(result.message || "Success! Your brief has been sent.");
        // Clear form on success by resetting the form
        const form = document.getElementById("contact-form") as HTMLFormElement;
        if (form) {
          form.reset();
        }
      } else {
        setStatus("error");
        setMessage(result.message || "An error occurred. Please try again.");
        if (result.fieldErrors) {
          setErrors(result.fieldErrors);
        }
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 sm:p-8">
      <div className="w-full max-w-2xl rounded-xl border border-gray-100 bg-white p-6 shadow-2xl sm:p-10">
        <h1 className="mb-2 font-extrabold text-3xl text-gray-900">
          Start Your Project
        </h1>
        <p className="mb-8 text-gray-600">
          Tell me about your video vision for the Southwest. I'll get back to
          you with a personalized quote and timeline.
        </p>

        <Form
          action={handleSubmit}
          aria-busy={isPending}
          className="space-y-6"
          id="contact-form"
        >
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

          <StatusMessage
            isPending={isPending}
            message={message}
            status={status}
          />

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              error={errors.name}
              htmlFor="name"
              icon={<User className="mr-2 text-indigo-500" size={16} />}
              label="Your Name"
            >
              <input
                aria-describedby={errors.name ? "name-error" : undefined}
                aria-invalid={!!errors.name}
                aria-required="true"
                className={`w-full rounded-lg border p-3 transition duration-150 focus:ring-indigo-500 ${
                  errors.name
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-300 focus:border-indigo-500"
                }`}
                id="name"
                maxLength={100}
                name="name"
                required
                type="text"
              />
            </FormField>

            <FormField
              error={errors.email}
              htmlFor="email"
              icon={<Mail className="mr-2 text-indigo-500" size={16} />}
              label="Email Address"
            >
              <input
                aria-describedby={errors.email ? "email-error" : undefined}
                aria-invalid={!!errors.email}
                aria-required="true"
                className={`w-full rounded-lg border p-3 transition duration-150 focus:ring-indigo-500 ${
                  errors.email
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-300 focus:border-indigo-500"
                }`}
                id="email"
                maxLength={254}
                name="email"
                required
                type="email"
              />
            </FormField>

            <FormField
              error={errors.projectType}
              htmlFor="projectType"
              icon={<PenTool className="mr-2 text-indigo-500" size={16} />}
              label="Project Type"
            >
              <div className="relative">
                <select
                  aria-describedby={
                    errors.projectType ? "projectType-error" : undefined
                  }
                  aria-invalid={!!errors.projectType}
                  aria-required="true"
                  className={`w-full appearance-none rounded-lg border bg-white p-3 pr-10 transition duration-150 focus:ring-indigo-500 ${
                    errors.projectType
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-300 focus:border-indigo-500"
                  }`}
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
                <ChevronDown className="-translate-y-1/2 pointer-events-none absolute top-1/2 right-3 h-4 w-4 text-gray-400" />
              </div>
            </FormField>

            <FormField
              error={errors.projectBudget}
              htmlFor="projectBudget"
              icon={
                <PoundSterling className="mr-2 text-indigo-500" size={16} />
              }
              label="Estimated Budget Range"
            >
              <div className="relative">
                <select
                  aria-describedby={
                    errors.projectBudget ? "projectBudget-error" : undefined
                  }
                  aria-invalid={!!errors.projectBudget}
                  aria-required="true"
                  className={`w-full appearance-none rounded-lg border bg-white p-3 pr-10 transition duration-150 focus:ring-indigo-500 ${
                    errors.projectBudget
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-300 focus:border-indigo-500"
                  }`}
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
                <ChevronDown className="-translate-y-1/2 pointer-events-none absolute top-1/2 right-3 h-4 w-4 text-gray-400" />
              </div>
            </FormField>
          </div>

          <FormField
            error={errors.vision}
            htmlFor="vision"
            icon={<MessageSquare className="mr-2 text-indigo-500" size={16} />}
            label="Tell me about your vision (Project brief)"
          >
            <div>
              <textarea
                aria-describedby={errors.vision ? "vision-error" : undefined}
                aria-invalid={!!errors.vision}
                aria-required="true"
                className={`w-full rounded-lg border p-3 transition duration-150 focus:ring-indigo-500 ${
                  errors.vision
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-300 focus:border-indigo-500"
                }`}
                id="vision"
                maxLength={2000}
                name="vision"
                onChange={(e) => setVisionLength(e.target.value.length)}
                placeholder="What is the goal of the video? Who is the audience? Do you have any deadlines or preferred locations in the Southwest?"
                ref={visionRef}
                required
                rows={5}
              />
              <div
                aria-live="polite"
                className="mt-1 text-right text-gray-500 text-sm"
              >
                {visionLength}/2000 characters
              </div>
            </div>
          </FormField>

          {/* Submit Button */}
          <button
            className="flex w-full justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-3 font-bold text-lg text-white shadow-lg transition duration-300 ease-in-out hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
            disabled={status === "loading" || isPending}
            type="submit"
          >
            {status === "loading" || isPending
              ? "Sending..."
              : "SEND MY PROJECT BRIEF"}
          </button>
        </Form>
      </div>
    </div>
  );
}
