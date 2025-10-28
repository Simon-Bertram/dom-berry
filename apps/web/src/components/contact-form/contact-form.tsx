"use client";

import Form from "next/form";
import { useEffect } from "react";
import { useContactForm } from "@/hooks/use-contact-form";
import { trackEvent, trackFormError, trackFormSubmit } from "@/lib/analytics";
import { StatusMessage } from "../status-message";
import { ContactFormFields } from "./contact-form-fields";

export default function ContactForm() {
  const {
    state,
    formAction,
    isPending,
    visionLength,
    formLoadTime,
    visionRef,
    handleVisionChange,
  } = useContactForm();

  // Track form interactions
  useEffect(() => {
    // Track form start when component mounts
    trackEvent("contact_form_start", {
      form_name: "contact_form",
      page: "/contact",
    });

    // Track form submission results
    if (state.status === "success") {
      trackFormSubmit("contact_form", true, {
        page: "/contact",
        form_load_time: formLoadTime,
        vision_length: visionLength,
      });
    } else if (state.status === "error") {
      trackFormError("contact_form", "submission_error", {
        page: "/contact",
        error_message: state.message,
        form_load_time: formLoadTime,
        vision_length: visionLength,
      });
    }
  }, [state.status, state.message, formLoadTime, visionLength]);

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-700 dark:bg-gray-800">
      <h1 className="mb-2 font-display font-extrabold text-3xl text-gray-900 dark:text-gray-100">
        Start Your Project
      </h1>
      <p className="mb-6 font-body text-gray-600 dark:text-gray-300">
        Tell me about your video vision, I&apos;ll get back to you with a
        personalized quote and timeline.
      </p>

      <Form
        action={formAction}
        aria-busy={isPending}
        className="space-y-6"
        id="contact-form"
      >
        <StatusMessage
          isPending={isPending}
          message={state.message}
          status={state.status}
        />

        <ContactFormFields
          formLoadTime={formLoadTime}
          onVisionChange={handleVisionChange}
          state={state}
          visionLength={visionLength}
          visionRef={visionRef}
        />

        {/* Submit Button */}
        <button
          className="flex w-full justify-center rounded-lg border border-transparent bg-primary px-4 py-3 font-bold text-black text-lg shadow-lg transition duration-300 ease-in-out hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 dark:bg-primary dark:hover:bg-primary/90"
          disabled={state.status === "loading" || isPending}
          type="submit"
        >
          {state.status === "loading" || isPending
            ? "Sending..."
            : "SEND MY PROJECT BRIEF"}
        </button>
      </Form>
    </div>
  );
}
