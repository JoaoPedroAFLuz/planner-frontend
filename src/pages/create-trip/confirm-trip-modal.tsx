import { AtSign, User, X } from "lucide-react";
import { FormEvent } from "react";

import { Button } from "@components/button";
import { Input } from "@components/input";
import { DateRange } from "react-day-picker";

interface ConfirmTripModalProps {
  destination: string;
  eventStartAndEndDates?: DateRange;
  setOwnerName: (value: string) => void;
  setOwnerEmail: (value: string) => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
  closeConfirmTripModal: () => void;
}

export function ConfirmTripModal({
  destination,
  eventStartAndEndDates,
  setOwnerName,
  setOwnerEmail,
  createTrip,
  closeConfirmTripModal,
}: ConfirmTripModalProps) {
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
              {eventStartAndEndDates!.from!.toLocaleDateString("pt-br", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}{" "}
              a{" "}
              {eventStartAndEndDates!.to!.toLocaleDateString("pt-br", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>{" "}
            <span>preencha seus dados abaixo:</span>
          </p>
        </div>

        <div className="h-px w-full bg-zinc-800" />

        <form onSubmit={createTrip} className="space-y-3">
          <div className="flex h-14 flex-1 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <User className="size-5 text-zinc-400" />

            <Input
              name="name"
              size="full"
              placeholder="Seu nome completo"
              onChange={(event) => setOwnerName(event.target.value)}
            />
          </div>

          <div className="flex h-14 flex-1 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <AtSign className="size-5 text-zinc-400" />

            <Input
              name="email"
              type="email"
              size="full"
              placeholder="Seu e-mail pessoal"
              onChange={(event) => setOwnerEmail(event.target.value)}
            />
          </div>

          <Button type="submit" size="full">
            Confirmar criação da viagem
          </Button>
        </form>
      </div>
    </div>
  );
}
