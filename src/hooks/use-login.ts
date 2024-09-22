import { useMutation } from "@tanstack/react-query";

import { LoginProps } from "@dtos/login";
import { authService } from "@services/authService";

export function useLogin() {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: LoginProps) => authService.login(data),
  });

  return {
    isLoginPending: isPending,
    login: mutateAsync,
  };
}
