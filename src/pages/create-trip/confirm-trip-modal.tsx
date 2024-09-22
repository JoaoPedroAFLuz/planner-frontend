import { X } from "lucide-react";
import { DateRange } from "react-day-picker";

import { Button } from "@components/button";

interface ConfirmTripModalProps {
  destination: string;
  isPendingCreateTrip: boolean;
  eventStartAndEndDates: DateRange | undefined;
  onConfirmTrip: () => void;
  closeConfirmTripModal: () => void;
}

export function ConfirmTripModal({
  destination,
  isPendingCreateTrip,
  eventStartAndEndDates,
  onConfirmTrip,
  closeConfirmTripModal,
}: ConfirmTripModalProps) {
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
            <span>confirme abaixo:</span>
          </p>
        </div>

        <div className="h-px w-full bg-zinc-800" />

        <Button
          size="full"
          disabled={isPendingCreateTrip}
          onClick={onConfirmTrip}
        >
          {isPendingCreateTrip
            ? "Confirmando..."
            : "Confirmar criação da viagem"}
        </Button>
      </div>
    </div>
  );
}
