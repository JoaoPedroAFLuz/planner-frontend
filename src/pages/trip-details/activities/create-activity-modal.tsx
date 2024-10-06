import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, NotepadText, Tag, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import {
  CreateActivityType,
  createActivitySchema,
} from "@dtos/create-activity";
import { Activity } from "@entities/activity";
import { useTrip } from "@hooks/use-trip";

import { Button } from "@components/button";
import { Form } from "@components/form";

interface CreateActivityModalProps {
  activity?: Activity;
  isButtonDisabled: boolean;
  onSubmit: (createActivityData: CreateActivityType) => Promise<void>;
  closeCreateActivityModal: () => void;
}

export function CreateActivityModal({
  activity,
  isButtonDisabled,
  onSubmit,
  closeCreateActivityModal,
}: CreateActivityModalProps) {
  const { tripCode } = useParams();
  const { trip } = useTrip(tripCode!);

  const form = useForm<CreateActivityType>({
    resolver: zodResolver(createActivitySchema),
    defaultValues: {
      title: activity?.title,
      description: activity?.description,
      occursAt: activity?.occursAt,
    },
  });

  async function createActivity(createActivityData: CreateActivityType) {
    await onSubmit(createActivityData);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[540px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {`${!activity ? "Cadastrar" : "Editar"} atividade`}
            </h2>

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
          <Form.Field>
            <Form.Input
              name="title"
              size="full"
              placeholder="Qual a atividade?"
              leftIcon={<Tag className="size-5 text-zinc-400" />}
              containerClassName="bg-zinc-950 border-zinc-800"
            />
          </Form.Field>

          <Form.Field>
            <Form.Input
              name="description"
              size="full"
              placeholder="Descrição"
              leftIcon={<NotepadText className="size-5 text-zinc-400" />}
              containerClassName="bg-zinc-950 border-zinc-800"
            />
          </Form.Field>

          <Form.Field>
            <Form.Input
              name="occursAt"
              type="datetime-local"
              size="full"
              placeholder="Data"
              min={trip!.startsAt}
              max={trip!.endsAt}
              leftIcon={<Calendar className="size-5 text-zinc-400" />}
              containerClassName="bg-zinc-950 border-zinc-800"
            />
          </Form.Field>

          <Button type="submit" size="full" disabled={isButtonDisabled}>
            {!activity ? "Cadastrar" : "Editar"}
          </Button>
        </Form.Root>
      </div>
    </div>
  );
}
