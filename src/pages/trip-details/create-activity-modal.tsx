import { Calendar, NotepadText, Tag, X } from "lucide-react";
import { FormEvent } from "react";
import { useParams } from "react-router-dom";

import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { useCreateDayActivity } from "../../hooks/useCreateDayActivity";
import { useDayActivitiesByTripCode } from "../../hooks/useDayActivitiesByTripCode";
import { useTrip } from "../../hooks/useTrip";
import { DateUtils } from "../../utils/time";

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void;
}

export function CreateActivityModal({
  closeCreateActivityModal,
}: CreateActivityModalProps) {
  const { tripCode } = useParams();
  const { isPending, mutateAsync } = useCreateDayActivity();
  const { refetch } = useDayActivitiesByTripCode(tripCode!);
  const { trip } = useTrip(tripCode!);

  const tripStart = DateUtils.toDateTimeLocalInput(trip!.startsAt);
  const tripEnd = DateUtils.toDateTimeLocalInput(trip!.endsAt);

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const title = data.get("title") as string;
    const description = data.get("description") as string;
    const occursAt = data.get("occursAt") as string;

    if (!title || !occursAt) {
      return;
    }

    await mutateAsync({
      tripCode: tripCode!,
      title,
      description,
      occursAt,
    });

    await refetch();

    closeCreateActivityModal();
  }

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
            <NotepadText className="size-5 text-zinc-400" />

            <Input name="description" size="full" placeholder="Descrição" />
          </div>

          <div className="flex h-14 flex-1 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <Calendar className="size-5 text-zinc-400" />

            <Input
              name="occursAt"
              type="datetime-local"
              size="full"
              placeholder="Data"
              min={tripStart}
              max={tripEnd}
            />
          </div>

          <Button type="submit" size="full" disabled={isPending}>
            {isPending ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </form>
      </div>
    </div>
  );
}
