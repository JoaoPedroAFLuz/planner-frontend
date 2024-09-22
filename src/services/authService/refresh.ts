import { LoginDTO } from "@dtos/login";
import { httpClient } from "@libs/axios";

export interface RefreshProps {
  refreshToken: string;
}

export async function refresh(refreshToken: string) {
  const { data } = await httpClient.post<LoginDTO>("auth/refresh", {
    refreshToken,
  });

  return data;
}
