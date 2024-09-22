import { z } from "zod";

export interface LoginDTO {
  accessToken: string;
  refreshToken: string;
}

export interface LoginProps {
  username: string;
  password: string;
}

export const loginSchema = z.object({
  username: z.string().email("Informe um e-mail válido"),
  password: z.string().min(1, "O campo de senha é obrigatório"),
});

export type LoginType = z.infer<typeof loginSchema>;
