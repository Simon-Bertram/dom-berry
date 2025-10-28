/**
 * FormHoneypots component for bot detection
 * These hidden fields are invisible to users but visible to bots
 * Bots often fill out all fields, including hidden ones
 */
export function FormHoneypots() {
  const honeypotStyle = {
    position: "absolute" as const,
    left: "-9999px",
    width: "1px",
    height: "1px",
    opacity: 0,
  };

  return (
    <>
      {/* Primary honeypot field */}
      <input
        aria-hidden="true"
        autoComplete="off"
        name="website"
        style={honeypotStyle}
        tabIndex={-1}
        type="text"
      />

      {/* Additional honeypot fields for better bot detection */}
      <input
        aria-hidden="true"
        autoComplete="off"
        name="phone"
        style={honeypotStyle}
        tabIndex={-1}
        type="text"
      />

      <input
        aria-hidden="true"
        autoComplete="off"
        name="company"
        style={honeypotStyle}
        tabIndex={-1}
        type="text"
      />
    </>
  );
}
