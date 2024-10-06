import { Outlet } from "react-router-dom";

import { AppBar } from "./app-bar";

export function PrivatePagesLayout() {
  return (
    <div className="mx-auto flex h-screen max-w-screen-lg flex-col gap-6">
      <AppBar />

      <main className="w-full flex-1">
        <Outlet />
      </main>
    </div>
  );
}
