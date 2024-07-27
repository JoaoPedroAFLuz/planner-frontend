import { Calendar, MapPin, Settings2 } from "lucide-react";

export function DestinationAndDateHeader() {
  return (
    <div className="flex h-16 items-center justify-between rounded-xl bg-zinc-900 px-4 shadow-shape">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />

        <span className="text-zinc-100">Vitória da Conquista, Brasil</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />

          <span>23 a 28 de Dezembro</span>
        </div>

        <div className="h-6 w-px bg-zinc-800" />

        <button className="flex items-center gap-2 rounded-lg bg-zinc-800 px-5 py-2 font-medium text-zinc-200 hover:bg-zinc-700">
          <span className="text-zinc-100">Alterar local/data</span>

          <Settings2 className="size-5" />
        </button>
      </div>
    </div>
  );
}
