import { CircleCheck, Plus } from "lucide-react";

import { Button } from "../../components/button";

interface ActivitiesProps {
  openCreateActivityModal: () => void;
}

export function Activities({ openCreateActivityModal }: ActivitiesProps) {
  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold">Atividades</h2>

        <Button onClick={openCreateActivityModal}>
          <Plus className="size-5" />

          <span>Cadastrar atividade</span>
        </Button>
      </div>

      <div className="space-y-8">
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-semibold text-zinc-300">Dia 20</span>

            <span className="text-xs text-zinc-500">Sexta-feira</span>
          </div>

          <p className="text-sm text-zinc-500">
            Nenhuma atividade cadastrada nesta data.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-semibold text-zinc-300">Dia 21</span>

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
  );
}
