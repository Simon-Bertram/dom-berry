"use client";

import { createContext, useContext } from "react";
import type { FormState } from "./types";

// Form context type
type FormContextType = {
  state: FormState;
  visionLength: number;
  formLoadTime: number;
  visionRef: React.RefObject<HTMLTextAreaElement | null>;
  onVisionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

// Create the context
const FormContext = createContext<FormContextType | null>(null);

// Provider component
type FormProviderProps = {
  children: React.ReactNode;
  value: FormContextType;
};

export function FormProvider({ children, value }: FormProviderProps) {
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}

// Hook to use the form context
export function useFormContext(): FormContextType {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
}
