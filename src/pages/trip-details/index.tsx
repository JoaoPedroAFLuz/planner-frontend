import {
  Calendar,
  CircleCheck,
  CircleDashed,
  Link2,
  MapPin,
  Plus,
  Settings2,
  UserCog,
} from "lucide-react";

export function TripDetailsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-6 py-10">
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

      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>

            <button className="flex items-center gap-2 rounded-lg bg-pink-300 px-5 py-2 font-medium text-pink-900 hover:bg-pink-200">
              <Plus className="size-5" />

              <span>Cadastrar atividade</span>
            </button>
          </div>

          <div className="space-y-8">
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-semibold text-zinc-300">
                  Dia 20
                </span>

                <span className="text-xs text-zinc-500">Sexta-feira</span>
              </div>

              <p className="text-sm text-zinc-500">
                Nenhuma atividade cadastrada nesta data.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-semibold text-zinc-300">
                  Dia 21
                </span>

                <span className="text-xs text-zinc-500">Sábado</span>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center gap-3 rounded-xl bg-zinc-900 px-4 py-2.5 shadow-shape">
                  <CircleCheck className="size-5 text-pink-300" />

                  <span className="text-zinc-100">Atividade 1</span>

                  <span className="ml-auto text-sm text-zinc-400">08:00h</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-80 space-y-6">
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
                    www.reservahotel.com/121841032131931481029310
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
                    www.reservahotel.com/121841032131931481029310
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

          <div className="h-px w-full bg-zinc-800"></div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Convidados</h2>

            <div className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="block font-medium text-zinc-100">
                    Mirella Nicole
                  </span>

                  <span className="block truncate text-sm text-zinc-400">
                    mirellanicolebatista@outlook.com
                  </span>
                </div>

                <CircleDashed className="size-5 shrink-0 text-zinc-400" />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="block font-medium text-zinc-100">
                    João Pedro Luz
                  </span>

                  <span className="block truncate text-sm text-zinc-400">
                    joao.pedro.luz@hotmail.com
                  </span>
                </div>

                <CircleDashed className="size-5 shrink-0 text-zinc-400" />
              </div>
            </div>

            <button className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-zinc-800 px-5 font-medium text-zinc-200 hover:bg-zinc-700">
              <UserCog className="size-5" />

              <span>Gerenciar convidados</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
