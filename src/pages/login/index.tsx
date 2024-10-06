import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { AtSign, Key } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { loginSchema, LoginType } from "@dtos/login";

import { Button } from "@components/button";
import { Form } from "@components/form";
import { useAuth } from "@hooks/use-auth";

export function Login() {
  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  const { login } = useAuth();

  const isLoginPending = form.formState.isSubmitting;

  async function handleLogin(data: LoginType) {
    try {
      await login(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-6 bg-pattern bg-center bg-no-repeat">
      <img src="/logo.svg" alt="timely" />

      <Form.Root
        form={form}
        onSubmit={form.handleSubmit(handleLogin)}
        className="flex w-80 flex-col items-center gap-6"
      >
        <div className="flex w-full flex-col gap-3">
          <Form.Field>
            <Form.Input
              name="username"
              type="email"
              size="full"
              placeholder="E-mail"
              leftIcon={<AtSign className="size-5 text-zinc-400" />}
              autoFocus
            />

            <Form.ErrorMessage field="username" />
          </Form.Field>

          <Form.Field>
            <Form.PasswordInput
              name="password"
              placeholder="Senha"
              leftIcon={<Key className="size-5 text-zinc-400" />}
            />

            <Form.ErrorMessage field="password" />
          </Form.Field>
        </div>

        <Button type="submit" size="full" disabled={isLoginPending}>
          {isLoginPending ? "Entrando..." : "Entrar"}
        </Button>
      </Form.Root>
    </div>
  );
}
