import { ComponentProps, ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { tv, VariantProps } from "tailwind-variants";

import { useApiFormErrors } from "@hooks/use-api-form-error";
import { twMerge } from "tailwind-merge";

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
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerClassName?: string;
}

export function Input({
  id,
  name,
  size,
  leftIcon,
  rightIcon,
  className,
  containerClassName,
  ...props
}: InputProps) {
  const { register, getFieldState } = useFormContext();

  const fieldState = getFieldState(name);
  const apiError = useApiFormErrors();

  return (
    <div
      data-invalid={fieldState.invalid || apiError?.errors?.[name]}
      className={twMerge(
        "flex h-12 w-full items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-zinc-50 focus-within:ring-2 focus-within:ring-pink-400 focus-within:ring-offset-2 focus-within:ring-offset-black data-[invalid=true]:ring-2 data-[invalid=true]:ring-red-600",
        containerClassName,
      )}
    >
      {leftIcon && (
        <label htmlFor={id || name} className="flex-shrink-0">
          {leftIcon}
        </label>
      )}

      <input
        id={id || name}
        className={twMerge(inputVariants({ size }), className)}
        {...register(name!)}
        {...props}
      />

      {rightIcon && <div className="flex-shrink-0">{rightIcon}</div>}
    </div>
  );
}
