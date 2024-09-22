import { FormHTMLAttributes } from "react";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";

import { DatePicker } from "./date-picker";
import { DatePickerButton } from "./date-picker-button";
import { ErrorMessage } from "./error-message";
import { Field } from "./field";
import { Input } from "./input";
import { PasswordInput } from "./password-input";

interface RootProps<T extends FieldValues>
  extends FormHTMLAttributes<HTMLFormElement> {
  form: UseFormReturn<T>;
}

function Root<T extends FieldValues>({ form, ...props }: RootProps<T>) {
  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col justify-center gap-4"
        noValidate
        autoComplete="off"
        {...props}
      />
    </FormProvider>
  );
}

export const Form = {
  Root,
  Field,
  Input,
  DatePicker,
  ErrorMessage,
  PasswordInput,
  DatePickerButton,
};
