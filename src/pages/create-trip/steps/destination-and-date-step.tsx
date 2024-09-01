import { format } from "date-fns";
import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { Button } from "../../../components/button";
import { Input } from "../../../components/input";

interface DestinationAndDateStepProps {
  isGuestsInputVisible: boolean;
  eventStartAndEndDates: DateRange | undefined;
  setDestination: (value: string) => void;
  setEventStartAndEndDates: (value: DateRange | undefined) => void;
  showGuestsInput: () => void;
  hideGuestsInput: () => void;
}

export function DestinationAndDateStep({
  isGuestsInputVisible,
  eventStartAndEndDates,
  setDestination,
  setEventStartAndEndDates,
  showGuestsInput,
  hideGuestsInput,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const displayedDate =
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
      ? `${format(eventStartAndEndDates.from, "d' de 'LLL")} até ${format(eventStartAndEndDates.to, "d' de 'LLL")}`
      : "Quando?";

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  return (
    <div className="flex h-16 items-center gap-3 rounded-xl bg-zinc-900 px-4 shadow-shape">
      <div className="flex flex-1 items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />

        <Input
          size="full"
          placeholder="Para onde você vai?"
          disabled={isGuestsInputVisible}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      <button
        onClick={openDatePicker}
        disabled={isGuestsInputVisible}
        className="flex w-[250px] items-center gap-2 text-left"
      >
        <Calendar className="size-5 text-zinc-400" />

        <span className="w-40 flex-1 text-lg text-zinc-400">
          {displayedDate}
        </span>
      </button>

      {isDatePickerOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60">
          <div className="space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione a data</h2>

                <button type="button" onClick={closeDatePicker}>
                  <X className="size-5 cursor-pointer text-zinc-400" />
                </button>
              </div>
            </div>

            <div className="h-px w-full bg-zinc-800" />

            <DayPicker
              mode="range"
              selected={eventStartAndEndDates}
              onSelect={setEventStartAndEndDates}
            />
          </div>
        </div>
      )}

      <div className="h-6 w-px bg-zinc-800" />

      {isGuestsInputVisible ? (
        <Button onClick={hideGuestsInput} variant="secondary">
          <span>Alterar local/data</span>

          <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button onClick={showGuestsInput}>
          <span>Continuar</span>

          <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  );
}
