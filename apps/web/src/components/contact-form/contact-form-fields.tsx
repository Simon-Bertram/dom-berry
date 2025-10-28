import { BudgetSelect } from "./budget-select";
import { EmailField } from "./email-field";
import { FormProvider } from "./form-context";
import { FormHoneypots } from "./form-honeypots";
import { FormSecurityFields } from "./form-security-fields";
import { NameField } from "./name-field";
import { ProjectTypeSelect } from "./project-type-select";
import type { FormState } from "./types";
import { VisionField } from "./vision-field";

type ContactFormFieldsProps = {
  state: FormState;
  visionLength: number;
  formLoadTime: number;
  visionRef: React.RefObject<HTMLTextAreaElement | null>;
  onVisionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export function ContactFormFields({
  state,
  visionLength,
  formLoadTime,
  visionRef,
  onVisionChange,
}: ContactFormFieldsProps) {
  const formContextValue = {
    state,
    visionLength,
    formLoadTime,
    visionRef,
    onVisionChange,
  };

  return (
    <FormProvider value={formContextValue}>
      {/* Bot detection fields */}
      <FormHoneypots />
      <FormSecurityFields formLoadTime={formLoadTime} />

      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <NameField />
        <EmailField />
        <ProjectTypeSelect />
        <BudgetSelect />
      </div>

      {/* Vision field spans full width */}
      <VisionField />
    </FormProvider>
  );
}
