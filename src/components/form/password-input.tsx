import { ReactNode, useState } from "react";

import { Eye, EyeOff } from "lucide-react";
import { Form } from ".";

interface PasswordInputProps {
  name: string;
  placeholder?: string;
  leftIcon?: ReactNode;
  className?: string;
}

export function PasswordInput({
  name,
  leftIcon,
  placeholder,
  className,
}: PasswordInputProps) {
  const [senhaVisivel, setSenhaVisivel] = useState(false);

  const EyeIcon = senhaVisivel ? Eye : EyeOff;

  return (
    <Form.Input
      name={name}
      size="full"
      type={senhaVisivel ? "text" : "password"}
      placeholder={placeholder}
      leftIcon={leftIcon}
      rightIcon={
        <EyeIcon
          size={20}
          className="cursor-pointer text-zinc-400"
          onClick={() => setSenhaVisivel((state) => !state)}
        />
      }
      className={className}
    />
  );
}
