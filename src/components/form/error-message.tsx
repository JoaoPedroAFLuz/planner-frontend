import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { useApiFormErrors } from "@hooks/use-api-form-error";

interface ErrorMessageProps {
  field: string;
  className?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function get(obj: Record<any, any>, path: string) {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce(
        (res, key) => (res !== null && res !== undefined ? res[key] : res),
        obj,
      );

  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);

  return result;
}

export function ErrorMessage({ field, className }: ErrorMessageProps) {
  const {
    formState: { errors },
  } = useFormContext();

  const { errors: apiErrors } = useApiFormErrors();

  const message = apiErrors?.[field] || get(errors, field)?.message?.toString();

  if (!message) {
    return null;
  }

  return (
    <span className={twMerge("text-xs text-red-600", className)}>
      {message}
    </span>
  );
}
