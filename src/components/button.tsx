import { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "flex items-center justify-center gap-2 rounded-lg px-5 py-2 font-medium",

  variants: {
    variant: {
      primary: "bg-pink-300 text-pink-900 hover:bg-pink-200",
      secondary: "bg-zinc-800 text-zinc-200 hover:bg-zinc-700",
      danger: "bg-red-500 text-white hover:bg-red-400",
    },

    size: {
      default: "py-2",
      full: "w-full h-11",
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
}

export function Button({ variant, size, children, ...rest }: ButtonProps) {
  return (
    <button className={buttonVariants({ variant, size })} {...rest}>
      {children}
    </button>
  );
}
