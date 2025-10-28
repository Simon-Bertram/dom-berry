/**
 * FormSecurityFields component for additional bot detection
 * Includes timestamp and random token generation
 */

import { generateRandomToken } from "./constants";

type FormSecurityFieldsProps = {
  formLoadTime: number;
};

export function FormSecurityFields({ formLoadTime }: FormSecurityFieldsProps) {
  // Generate random token for additional bot detection using pure function
  const randomToken = generateRandomToken();

  return (
    <>
      {/* Timestamp field for bot detection */}
      <input name="formTimestamp" type="hidden" value={formLoadTime} />

      {/* Random token for additional bot detection */}
      <input name="formToken" type="hidden" value={randomToken} />
    </>
  );
}
