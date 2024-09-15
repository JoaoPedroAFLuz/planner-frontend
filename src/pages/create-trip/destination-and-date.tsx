import { format } from "date-fns";
import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { useState } from "react";
import "react-day-picker/dist/style.css";
import { useForm } from "react-hook-form";

import {
  destinationAndDateSchema,
  DestinationAndDateType,
} from "@dtos/destination-and-date";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@components/button";
import { Form } from "@components/form";

interface DestinationAnDateProps {
  isParticipantsInputVisible: boolean;
  hideParticipantsInput: () => void;
  onSelectDestinationAndDate: (data: DestinationAndDateType) => void;
}

export function DestinationAndDate({
  isParticipantsInputVisible,
  hideParticipantsInput,
  onSelectDestinationAndDate,
}: DestinationAnDateProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const form = useForm<DestinationAndDateType>({
    resolver: zodResolver(destinationAndDateSchema),
  });

  const initialDate = form.getValues("eventStartAndEndDates.from");
  const finalDate = form.getValues("eventStartAndEndDates.to");

  const displayedDate =
    initialDate && finalDate
      ? `${format(initialDate, "d' de 'LLL")} até ${format(finalDate, "d' de 'LLL")}`
      : "Quando?";

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  function handleSubmit(data: DestinationAndDateType) {
    onSelectDestinationAndDate(data);
  }

  return (
    <Form.Root
      form={form}
      onSubmit={form.handleSubmit(handleSubmit)}
      className="flex h-16 items-center gap-3 rounded-xl bg-zinc-900 px-4 shadow-shape"
    >
      <div className="flex flex-1 items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />

        <Form.Input
          name="destination"
          size="full"
          placeholder="Para onde você vai?"
          disabled={isParticipantsInputVisible}
          autoFocus
        />
      </div>

      <button
        onClick={openDatePicker}
        disabled={isParticipantsInputVisible}
        className="flex w-[250px] items-center gap-2 text-left"
      >
        <Calendar className="size-5 text-zinc-400" />

        <span className="w-40 flex-1 text-lg text-zinc-400">
          {displayedDate}
        </span>
      </button>

      {isDatePickerOpen && (
        <Form.DatePicker
          name="eventStartAndEndDates"
          onCloseDatePicker={closeDatePicker}
        />
      )}

      <div className="h-6 w-px bg-zinc-800" />

      {!isParticipantsInputVisible && (
        <Button type="submit">
          <span>Continuar</span>

          <ArrowRight className="size-5" />
        </Button>
      )}

      {isParticipantsInputVisible && (
        <Button
          type="button"
          variant="secondary"
          onClick={hideParticipantsInput}
        >
          <span>Alterar local/data</span>

          <Settings2 className="size-5" />
        </Button>
      )}
    </Form.Root>
  );
}
