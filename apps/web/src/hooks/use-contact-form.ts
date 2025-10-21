import { useActionState, useEffect, useRef, useState } from "react";
import { submitContactForm } from "@/lib/contact-actions";

// Constants moved to separate file for better organization
export const PROJECT_TYPES = [
  "Corporate Film",
  "Live Event Coverage",
  "Marketing Video (Social/Web)",
  "Commercial/Ad",
  "Wedding",
  "Other",
] as const;

export const BUDGET_RANGES = [
  "Under £500",
  "£500 - £2k",
  "£2k - £5k",
  "£5k+",
] as const;

export type FormStatus = "idle" | "loading" | "success" | "error";
export type FormErrors = Record<string, string>;

export type FormState = {
  status: FormStatus;
  message: string;
  errors: FormErrors;
};

const initialState: FormState = {
  status: "idle",
  message: "",
  errors: {},
};

export function useContactForm() {
  const [formState, formAction, isPending] = useActionState(
    async (_prevState: FormState, formData: FormData) =>
      submitContactForm(formData),
    initialState
  );
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

  // Handle form success - clear form when submission is successful
  useEffect(() => {
    if (formState.status === "success") {
      const form = document.getElementById("contact-form") as HTMLFormElement;
      if (form) {
        form.reset();
        setVisionLength(0);
      }
    }
  }, [formState.status]);

  const handleVisionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setVisionLength(e.target.value.length);
  };

  return {
    state: formState,
    formAction,
    isPending,
    visionLength,
    formLoadTime,
    visionRef,
    handleVisionChange,
  };
}
