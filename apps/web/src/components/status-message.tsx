type FormStatus = "idle" | "loading" | "success" | "error";

type StatusMessageProps = {
  status: FormStatus;
  isPending: boolean;
  message: string;
};

export function StatusMessage({
  status,
  isPending,
  message,
}: StatusMessageProps) {
  // Always render container to prevent CLS, but conditionally show content
  const renderContent = () => {
    if (status === "loading" || isPending) {
      return (
        <output
          aria-atomic="true"
          aria-live="polite"
          className="rounded-lg bg-indigo-50 p-3 text-center font-medium text-indigo-700 text-sm"
        >
          Sending brief...
        </output>
      );
    }

    if (status === "success") {
      return (
        <output
          aria-atomic="true"
          aria-live="polite"
          className="rounded-lg border border-green-200 bg-green-100 p-4 text-green-700 text-sm"
        >
          <span className="font-bold">Message Sent!</span> {message}
        </output>
      );
    }

    if (status === "error") {
      return (
        <div
          aria-atomic="true"
          aria-live="assertive"
          className="rounded-lg border border-red-200 bg-red-100 p-4 text-red-700 text-sm"
          role="alert"
        >
          <span className="font-bold">Error:</span> {message}
        </div>
      );
    }

    return null;
  };

  return <div className="min-h-[3rem]">{renderContent()}</div>;
}
