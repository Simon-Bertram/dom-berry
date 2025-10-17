import type { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  icon: ReactNode;
  error?: string;
  children: ReactNode;
  htmlFor?: string;
};

export function FormField({
  label,
  icon,
  error,
  children,
  htmlFor,
}: FormFieldProps) {
  const errorId = htmlFor ? `${htmlFor}-error` : undefined;

  return (
    <div>
      <label
        className="mb-1 flex items-center font-medium text-gray-700 text-sm"
        htmlFor={htmlFor}
      >
        {icon}
        {label}
      </label>
      {children}
      {error && (
        <p
          aria-live="polite"
          className="mt-1 text-red-600 text-sm"
          id={errorId}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
