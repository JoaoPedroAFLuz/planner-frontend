import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { PrivatePagesLayout } from "@components/private-pages-layout";
import { CreateTripPage } from "@pages/create-trip";
import { Login } from "@pages/login";
import { TripDetailsPage } from "@pages/trip-details";
import { Trips } from "@pages/trips";
import { AuthGuard } from "./auth-guard";

const router = createBrowserRouter([
  {
    id: "public-routes",
    element: <AuthGuard isPrivate={false} />,
    children: [{ path: "/login", element: <Login /> }],
  },
  {
    id: "private-routes",
    element: <AuthGuard isPrivate />,
    children: [
      {
        element: <PrivatePagesLayout />,
        children: [
          { path: "/", element: <Trips /> },
          { path: "/create-trip", element: <CreateTripPage /> },
          { path: "/trips/:tripCode", element: <TripDetailsPage /> },
        ],
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
