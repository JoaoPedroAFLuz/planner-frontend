import { useLayoutEffect, useState } from "react";

import { storageKeys } from "@configs/storage-keys";
import { LoginProps } from "@dtos/login";
import { useLogin } from "@hooks/use-login";
import { AuthContext, AuthContextValue } from "@hooks/user-auth";
import { httpClient } from "@libs/axios";
import { authService } from "@services/authService";

interface AuthContextProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthContextProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("timely:accessToken");
  });

  let refreshRequest: Promise<void> | null = null;

  const { login } = useLogin();

  const value: AuthContextValue = {
    isLoggedIn,
    login: handleLogin,
    logout: handleLogout,
  };

  async function handleLogin(data: LoginProps) {
    const { accessToken, refreshToken } = await login(data);

    localStorage.setItem(storageKeys.accessToken, accessToken);
    localStorage.setItem(storageKeys.refreshToken, refreshToken);

    setIsLoggedIn(true);
  }

  async function handleRefreshToken() {
    try {
      const refreshToken = localStorage.getItem(storageKeys.refreshToken);

      if (!refreshToken) {
        return;
      }

      const { accessToken, refreshToken: newRefreshToken } =
        await authService.refresh(refreshToken);

      localStorage.setItem(storageKeys.accessToken, accessToken);
      localStorage.setItem(storageKeys.refreshToken, newRefreshToken);

      setIsLoggedIn(true);
    } catch (error) {
      setIsLoggedIn(false);
      localStorage.clear();
      throw error;
    }
  }

  async function handleLogout() {
    localStorage.clear();

    setIsLoggedIn(false);
  }

  useLayoutEffect(() => {
    const interceptorId = httpClient.interceptors.request.use(
      async (config) => {
        const accessToken = localStorage.getItem(storageKeys.accessToken);

        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
      },
    );

    () => {
      httpClient.interceptors.request.eject(interceptorId);
    };
  }, []);

  useLayoutEffect(() => {
    httpClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        const refreshToken = localStorage.getItem(storageKeys.refreshToken);

        if (originalRequest.url.includes("auth/refresh")) {
          localStorage.clear();
          return Promise.reject(error);
        }

        if (error.response?.status !== 401 || !refreshToken) {
          return Promise.reject(error);
        }

        localStorage.removeItem(storageKeys.accessToken);

        if (refreshRequest) {
          await refreshRequest;
          refreshRequest = null;

          originalRequest.headers.Authorization = `Bearer ${localStorage.getItem(
            storageKeys.accessToken,
          )}`;

          return httpClient(originalRequest);
        }

        refreshRequest = handleRefreshToken();
        await refreshRequest;
        refreshRequest = null;

        return httpClient(originalRequest);
      },
    );
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
