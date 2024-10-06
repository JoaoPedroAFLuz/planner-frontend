import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setDefaultOptions } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "@contexts/auth-context";

import { Router } from "./router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});

setDefaultOptions({
  locale: ptBR,
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
      </AuthProvider>

      {/* <ReactQueryDevtools initialIsOpen={false}  /> */}

      <ToastContainer theme="dark" position="bottom-right" />
    </QueryClientProvider>
  );
}
