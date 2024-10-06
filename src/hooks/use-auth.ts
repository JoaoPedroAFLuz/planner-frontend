import { LoginProps } from "@dtos/login";
import { createContext, useContext } from "react";

export interface AuthContextValue {
  isLoggedIn: boolean;
  login({ username, password }: LoginProps): Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextValue);

export function useAuth() {
  return useContext(AuthContext);
}
