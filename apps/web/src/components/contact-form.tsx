"use client";

import Form from "next/form";
import { useContactForm } from "@/hooks/use-contact-form";
import { ContactFormFields } from "./contact-form-fields";
import { StatusMessage } from "./status-message";

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

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 sm:p-8">
      <div className="w-full max-w-2xl rounded-xl border border-border bg-card p-6 shadow-2xl sm:p-10">
        <h1 className="mb-2 font-extrabold text-3xl text-card-foreground">
          Start Your Project
        </h1>
        <p className="mb-8 text-muted-foreground">
          Tell me about your video vision for the Southwest. I'll get back to
          you with a personalized quote and timeline.
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
            className="flex w-full justify-center rounded-lg border border-transparent bg-primary px-4 py-3 font-bold text-lg text-primary-foreground shadow-lg transition duration-300 ease-in-out hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50"
            disabled={state.status === "loading" || isPending}
            type="submit"
          >
            {state.status === "loading" || isPending
              ? "Sending..."
              : "SEND MY PROJECT BRIEF"}
          </button>
        </Form>
      </div>
    </div>
  );
}
