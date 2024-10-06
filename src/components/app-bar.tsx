import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";

import { useAuth } from "@hooks/use-auth";

export function AppBar() {
  const { logout } = useAuth();

  return (
    <div className="flex h-14 w-full items-center justify-between px-2">
      <div className="w-11"></div>

      <Link to="/">
        <img src="/favicon.ico" alt="timely" className="h-8" />
      </Link>

      <button className="rounded-full p-3 hover:bg-zinc-800" onClick={logout}>
        <LogOut className="size-5 text-zinc-400" />
      </button>
    </div>
  );
}
