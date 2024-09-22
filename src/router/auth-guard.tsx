import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@hooks/user-auth";

interface AuthGuardProps {
  isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const { isLoggedIn } = useAuth();

  if (isPrivate && !isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (!isPrivate && isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
