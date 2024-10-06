import { format } from "date-fns";
import { Link } from "react-router-dom";

import { Button } from "@components/button";
import { useTrips } from "@hooks/use-trips";
import { Plus } from "lucide-react";

export function Trips() {
  const { trips } = useTrips();

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-3xl">Minhas Viagens</h2>

        <Link to="/create-trip">
          <Button>
            <Plus className="size-5" />
            Nova viagem
          </Button>
        </Link>
      </div>

      {trips.map((trip) => (
        <Link
          to={`trips/${trip.code}`}
          key={trip.code}
          className="flex flex-col items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 p-4 px-3 py-2 text-zinc-50 hover:ring-2 hover:ring-pink-400 hover:ring-offset-2 hover:ring-offset-black"
        >
          <div className="">
            <p>{trip.destination}</p>
          </div>

          <div className="">
            <p>
              {format(trip.startsAt, "d' de 'LLL")} até{" "}
              {format(trip.endsAt, "d' de 'LLL")}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
