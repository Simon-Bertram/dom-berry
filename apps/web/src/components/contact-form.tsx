"use client";

import {
  Mail,
  MessageSquare,
  PenTool,
  PoundSterling,
  User,
} from "lucide-react";
import Form from "next/form";
import { useState } from "react";
import { z } from "zod";

// Define the Zod schema for form validation
const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  projectType: z.string().min(1, {
    message: "Please select a project type.",
  }),
  projectBudget: z.string().min(1, {
    message: "Please select a budget range.",
  }),
  vision: z.string().min(10, {
    message: "Please provide at least 10 characters describing your vision.",
  }),
});

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

  const validateFormData = (formData: FormData) => {
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      projectType: formData.get("projectType") as string,
      projectBudget: formData.get("projectBudget") as string,
      vision: formData.get("vision") as string,
    };

    return contactFormSchema.safeParse(data);
  };

  const handleValidationErrors = (
    validationResult: z.ZodSafeParseError<z.infer<typeof contactFormSchema>>
  ) => {
    setStatus("error");
    const fieldErrors: FormErrors = {};
    for (const error of validationResult.error.issues) {
      if (error.path[0]) {
        fieldErrors[error.path[0] as string] = error.message;
      }
    }
    setErrors(fieldErrors);
    setMessage("Please fix the errors below.");
  };

  const handleSubmit = async (formData: FormData) => {
    setStatus("loading");
    setMessage("");
    setErrors({});

    const validationResult = validateFormData(formData);

    if (!validationResult.success) {
      handleValidationErrors(validationResult);
      return;
    }

    const data = validationResult.data;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(
          "Success! Your brief has been sent. I will review it and reply within 1 business day."
        );
        // Clear form on success by resetting the form
        const form = document.getElementById("contact-form") as HTMLFormElement;
        if (form) {
          form.reset();
        }
      } else {
        setStatus("error");
        setMessage(
          responseData.error ||
            "Oops! There was an issue sending your brief. Please try again or email directly."
        );
      }
    } catch {
      setStatus("error");
      setMessage(
        "A connection error occurred. Please check your network and try again."
      );
    }
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

        <Form action={handleSubmit} className="space-y-6" id="contact-form">
          {/* Status Message Display */}
          {status === "loading" && (
            <div className="rounded-lg bg-indigo-50 p-3 text-center font-medium text-indigo-700 text-sm">
              Sending brief...
            </div>
          )}
          {status === "success" && (
            <div
              className="rounded-lg border border-green-200 bg-green-100 p-4 text-green-700 text-sm"
              role="alert"
            >
              <span className="font-bold">Message Sent!</span> {message}
            </div>
          )}
          {status === "error" && (
            <div
              className="rounded-lg border border-red-200 bg-red-100 p-4 text-red-700 text-sm"
              role="alert"
            >
              <span className="font-bold">Error:</span> {message}
            </div>
          )}

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Name Field */}
            <div>
              <label
                className="mb-1 flex items-center font-medium text-gray-700 text-sm"
                htmlFor="name"
              >
                <User className="mr-2 text-indigo-500" size={16} />
                Your Name
              </label>
              <input
                className={`w-full rounded-lg border p-3 transition duration-150 focus:ring-indigo-500 ${
                  errors.name
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-300 focus:border-indigo-500"
                }`}
                id="name"
                name="name"
                required
                type="text"
              />
              {errors.name && (
                <p className="mt-1 text-red-600 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label
                className="mb-1 flex items-center font-medium text-gray-700 text-sm"
                htmlFor="email"
              >
                <Mail className="mr-2 text-indigo-500" size={16} />
                Email Address
              </label>
              <input
                className={`w-full rounded-lg border p-3 transition duration-150 focus:ring-indigo-500 ${
                  errors.email
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-300 focus:border-indigo-500"
                }`}
                id="email"
                name="email"
                required
                type="email"
              />
              {errors.email && (
                <p className="mt-1 text-red-600 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Project Type Dropdown */}
            <div>
              <label
                className="mb-1 flex items-center font-medium text-gray-700 text-sm"
                htmlFor="projectType"
              >
                <PenTool className="mr-2 text-indigo-500" size={16} />
                Project Type
              </label>
              <select
                className={`w-full rounded-lg border bg-white p-3 transition duration-150 focus:ring-indigo-500 ${
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
              {errors.projectType && (
                <p className="mt-1 text-red-600 text-sm">
                  {errors.projectType}
                </p>
              )}
            </div>

            {/* Project Budget Dropdown (Lead Qualifying) */}
            <div>
              <label
                className="mb-1 flex items-center font-medium text-gray-700 text-sm"
                htmlFor="projectBudget"
              >
                <PoundSterling className="mr-2 text-indigo-500" size={16} />
                Estimated Budget Range
              </label>
              <select
                className={`w-full rounded-lg border bg-white p-3 transition duration-150 focus:ring-indigo-500 ${
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
              {errors.projectBudget && (
                <p className="mt-1 text-red-600 text-sm">
                  {errors.projectBudget}
                </p>
              )}
            </div>
          </div>

          {/* Vision Text Area */}
          <div>
            <label
              className="mb-1 flex items-center font-medium text-gray-700 text-sm"
              htmlFor="vision"
            >
              <MessageSquare className="mr-2 text-indigo-500" size={16} />
              Tell me about your vision (Project brief)
            </label>
            <textarea
              className={`w-full rounded-lg border p-3 transition duration-150 focus:ring-indigo-500 ${
                errors.vision
                  ? "border-red-300 focus:border-red-500"
                  : "border-gray-300 focus:border-indigo-500"
              }`}
              id="vision"
              name="vision"
              placeholder="What is the goal of the video? Who is the audience? Do you have any deadlines or preferred locations in the Southwest?"
              required
              rows={5}
            />
            {errors.vision && (
              <p className="mt-1 text-red-600 text-sm">{errors.vision}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            className="flex w-full justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-3 font-bold text-lg text-white shadow-lg transition duration-300 ease-in-out hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
            disabled={status === "loading"}
            type="submit"
          >
            {status === "loading" ? "Sending..." : "SEND MY PROJECT BRIEF"}
          </button>
        </Form>
      </div>
    </div>
  );
}
