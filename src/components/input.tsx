import { ComponentProps } from "react";
import { tv, VariantProps } from "tailwind-variants";

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
  extends Omit<ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {}

export function Input({ size, ...rest }: InputProps) {
  return <input type="text" className={inputVariants({ size })} {...rest} />;
}
