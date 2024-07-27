import { Link2, Plus } from "lucide-react";

export function ImportantLinks() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Links Importantes</h2>

      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">
              Reserva do hotel
            </span>

            <a
              href="#"
              className="block truncate text-sm text-zinc-400 hover:text-zinc-200"
            >
              www.hotel.com/reserva/121841032131931481029310
            </a>
          </div>

          <Link2 className="size-5 shrink-0 text-zinc-400" />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">
              Reserva do hotel
            </span>

            <a
              href="#"
              className="block truncate text-sm text-zinc-400 hover:text-zinc-200"
            >
              www.hotel.com/reserva/121841032131931481029310
            </a>
          </div>

          <Link2 className="size-5 shrink-0 text-zinc-400" />
        </div>
      </div>

      <button className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-zinc-800 px-5 font-medium text-zinc-200 hover:bg-zinc-700">
        <Plus className="size-5" />

        <span>Cadastrar novo link</span>
      </button>
    </div>
  );
}
