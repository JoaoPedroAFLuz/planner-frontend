import { format } from "date-fns";
import { Calendar, MapPin, Settings2 } from "lucide-react";

import { Trip } from "@entities/trip";

import { Button } from "@components/button";

interface DestinationAndDateHeaderProps {
  trip?: Trip;
}

export function DestinationAndDateHeader({
  trip,
}: DestinationAndDateHeaderProps) {
  const displayedDate = trip
    ? `${format(trip.startsAt, "d' de 'LLL")} até ${format(trip.endsAt, "d' de 'LLL")}`
    : "";

  return (
    <div className="flex h-16 items-center justify-between rounded-xl bg-zinc-900 px-4 shadow-shape">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />

        <span className="text-zinc-100">{trip?.destination}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />

          <span>{displayedDate}</span>
        </div>

        <div className="h-6 w-px bg-zinc-800" />

        <Button variant="secondary">
          <span>Alterar local/data</span>

          <Settings2 className="size-5" />
        </Button>
      </div>
    </div>
  );
}
