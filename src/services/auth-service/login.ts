import { LoginDTO, LoginProps } from "@dtos/login";
import { httpClient } from "@libs/axios";

export async function login({ username, password }: LoginProps) {
  const { data } = await httpClient.post<LoginDTO>("auth/login", {
    username,
    password,
  });

  return data;
}
