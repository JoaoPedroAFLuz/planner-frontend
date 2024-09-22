import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type FieldProps = HTMLAttributes<HTMLDivElement>;

export function Field({ className, ...props }: FieldProps) {
  return (
    <div
      className={twMerge("flex w-full flex-col gap-1", className)}
      {...props}
    />
  );
}
