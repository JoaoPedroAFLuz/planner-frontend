import { ComponentProps } from "react";
import { useFormContext } from "react-hook-form";
import { tv, VariantProps } from "tailwind-variants";

import { useApiFormError } from "@hooks/use-api-form-error";

const inputVariants = tv({
  base: "bg-transparent text-lg placeholder-zinc-400 outline-none",

  variants: {
    size: {
      small: "w-48",
      full: "w-full",
    },
  },

  defaultVariants: {
    size: "small",
  },
});

interface InputProps
  extends Omit<ComponentProps<"input">, "size" | "name">,
    VariantProps<typeof inputVariants> {
  name: string;
}

export function Input({ id, name, size, ...props }: InputProps) {
  const { register, getFieldState } = useFormContext();

  const fieldState = getFieldState(name);
  const apiError = useApiFormError();

  return (
    <div
      data-invalid={fieldState.invalid || apiError?.errors?.[name]}
      className="w-full"
    >
      <input
        id={id || name}
        className={inputVariants({ size })}
        {...register(name!)}
        {...props}
      />
    </div>
  );
}
