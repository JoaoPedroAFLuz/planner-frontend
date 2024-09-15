import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, NotepadText, Tag, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import {
  createActivitySchema,
  CreateActivityType,
} from "@dtos/create-activity";
import { useCreateDayActivity } from "@hooks/useCreateDayActivity";
import { useDayActivitiesByTripCode } from "@hooks/useDayActivitiesByTripCode";
import { useTrip } from "@hooks/useTrip";

import { Button } from "@components/button";
import { Form } from "@components/form";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void;
}

export function CreateActivityModal({
  closeCreateActivityModal,
}: CreateActivityModalProps) {
  const { tripCode } = useParams();
  const { isPendingCreateDayActivity, createDayActivity } =
    useCreateDayActivity();
  const { isFetchingDayActivities, refetchDayActivities } =
    useDayActivitiesByTripCode(tripCode!);
  const { trip } = useTrip(tripCode!);

  const form = useForm<CreateActivityType>({
    resolver: zodResolver(createActivitySchema),
  });

  const isButtonDisabled =
    isFetchingDayActivities || isPendingCreateDayActivity;

  async function createActivity(createActivityData: CreateActivityType) {
    try {
      await createDayActivity({
        tripCode: tripCode!,
        ...createActivityData,
      });

      await refetchDayActivities();

      toast.success("Atividade criada com sucesso");
      closeCreateActivityModal();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
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

        <Form.Root
          form={form}
          onSubmit={form.handleSubmit(createActivity)}
          className="space-y-3"
        >
          <div className="flex h-14 flex-1 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <Tag className="size-5 text-zinc-400" />

            <Form.Input
              name="title"
              size="full"
              placeholder="Qual a atividade?"
            />
          </div>

          <div className="flex h-14 flex-1 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <NotepadText className="size-5 text-zinc-400" />

            <Form.Input
              name="description"
              size="full"
              placeholder="Descrição"
            />
          </div>

          <div className="flex h-14 flex-1 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <Calendar className="size-5 text-zinc-400" />

            <Form.Input
              name="occursAt"
              type="datetime-local"
              size="full"
              placeholder="Data"
              min={trip!.startsAt}
              max={trip!.endsAt}
            />
          </div>

          <Button type="submit" size="full" disabled={isButtonDisabled}>
            {isButtonDisabled ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </Form.Root>
      </div>
    </div>
  );
}
