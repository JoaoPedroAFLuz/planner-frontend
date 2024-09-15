import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, User, X } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";

import { confirmTripSchema, ConfirmTripType } from "@dtos/confirm-trip";

import { Button } from "@components/button";
import { Form } from "@components/form";

interface ConfirmTripModalProps {
  confirmTrip: ConfirmTripType | null;
  destination: string;
  eventStartAndEndDates: DateRange | undefined;
  onConfirmTrip: (data: ConfirmTripType) => void;
  closeConfirmTripModal: () => void;
}

export function ConfirmTripModal({
  confirmTrip,
  destination,
  eventStartAndEndDates,
  onConfirmTrip,
  closeConfirmTripModal,
}: ConfirmTripModalProps) {
  const form = useForm<ConfirmTripType>({
    resolver: zodResolver(confirmTripSchema),
    defaultValues: {
      ownerName: confirmTrip?.ownerName || "",
      ownerEmail: confirmTrip?.ownerEmail || "",
    },
  });

  const initialDate = eventStartAndEndDates!.from!.toLocaleDateString("pt-br", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const endDate = eventStartAndEndDates!.to!.toLocaleDateString("pt-br", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  function handleConfirmTrip(data: ConfirmTripType) {
    onConfirmTrip(data);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[540px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Confirmar criação de viagem
            </h2>

            <button
              type="button"
              className="rounded-full p-1 hover:bg-zinc-800"
              onClick={closeConfirmTripModal}
            >
              <X className="size-5 cursor-pointer text-zinc-400" />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Para concluir a criação da viagem para{" "}
            <span className="font-semibold text-zinc-100">{destination}</span>{" "}
            nas datas de{" "}
            <span className="font-semibold text-zinc-100">
              {initialDate} a {endDate}
            </span>{" "}
            <span>preencha seus dados abaixo:</span>
          </p>
        </div>

        <div className="h-px w-full bg-zinc-800" />

        <Form.Root
          form={form}
          onSubmit={form.handleSubmit(handleConfirmTrip)}
          className="space-y-3"
        >
          <div className="flex h-14 flex-1 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <User className="size-5 text-zinc-400" />

            <Form.Input
              name="ownerName"
              size="full"
              placeholder="Seu nome completo"
            />
          </div>

          <div className="flex h-14 flex-1 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <AtSign className="size-5 text-zinc-400" />

            <Form.Input
              name="ownerEmail"
              type="email"
              size="full"
              placeholder="Seu e-mail pessoal"
            />
          </div>

          <Button type="submit" size="full">
            Confirmar criação da viagem
          </Button>
        </Form.Root>
      </div>
    </div>
  );
}
