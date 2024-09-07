import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { setDefaultOptions } from "date-fns";
import { ptBR } from "date-fns/locale";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { CreateTripPage } from "./pages/create-trip";
import { TripDetailsPage } from "./pages/trip-details";

const router = createBrowserRouter([
  { path: "/", element: <CreateTripPage /> },
  { path: "/trips/:tripCode", element: <TripDetailsPage /> },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: false,
    },
  },
});

setDefaultOptions({
  locale: ptBR,
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
