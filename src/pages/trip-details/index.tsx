import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { api } from "../../lib/axios";
import { Activities } from "./activities";
import { CreateActivityModal } from "./create-activity-modal";
import { DestinationAndDateHeader } from "./destination-and-date-header";
import { Guests } from "./guests";
import { ImportantLinks } from "./important-links";

export interface Trip {
  id: number;
  code: string;
  ownerName: string;
  ownerEmail: string;
  destination: string;
  startsAt: Date;
  endsAt: Date;
  createdAt: Date;
}

export function TripDetailsPage() {
  const [trip, setTrip] = useState<Trip | undefined>();
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);

  const { tripCode } = useParams();

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true);
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false);
  }

  useEffect(() => {
    api.get(`/trips/${tripCode}`).then((response) => {
      setTrip(response.data);
    });
  }, [tripCode]);

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-6 py-10">
      <DestinationAndDateHeader trip={trip} />

      <main className="flex gap-16 px-4">
        <Activities openCreateActivityModal={openCreateActivityModal} />

        <div className="w-80 space-y-6">
          <ImportantLinks />

          <div className="h-px w-full bg-zinc-800"></div>

          <Guests />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal
          closeCreateActivityModal={closeCreateActivityModal}
        />
      )}
    </div>
  );
}
