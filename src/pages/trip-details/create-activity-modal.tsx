import { Calendar, Tag, X } from "lucide-react";
import { FormEvent } from "react";

import { Button } from "../../components/button";
import { Input } from "../../components/input";

interface CreateActivityModalProps {
  createActivity: (event: FormEvent<HTMLFormElement>) => void;
  closeCreateActivityModal: () => void;
}

export function CreateActivityModal({
  createActivity,
  closeCreateActivityModal,
}: CreateActivityModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[540px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar atividade</h2>

            <button type="button" onClick={closeCreateActivityModal}>
              <X className="size-5 cursor-pointer text-zinc-400" />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar as atividades.
          </p>
        </div>

        <div className="h-px w-full bg-zinc-800" />

        <form onSubmit={createActivity} className="space-y-3">
          <div className="flex h-14 flex-1 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <Tag className="size-5 text-zinc-400" />

            <Input name="title" size="full" placeholder="Qual a atividade?" />
          </div>

          <div className="flex h-14 flex-1 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <Calendar className="size-5 text-zinc-400" />

            <Input
              name="occursAt"
              type="datetime-local"
              size="full"
              placeholder="Data"
            />
          </div>

          <Button type="submit" size="full">
            Salvar atividade
          </Button>
        </form>
      </div>
    </div>
  );
}
