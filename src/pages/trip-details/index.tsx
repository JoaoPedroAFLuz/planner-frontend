import { useState } from "react";
import { useParams } from "react-router-dom";

import { useTrip } from "../../hooks/useTrip";
import { Activities } from "./activities";
import { CreateActivityModal } from "./create-activity-modal";
import { DestinationAndDateHeader } from "./destination-and-date-header";
import { ImportantLinks } from "./important-links";
import { Participants } from "./participants";

export function TripDetailsPage() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);

  const { tripCode } = useParams();
  const { trip } = useTrip(tripCode!);

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true);
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false);
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-6 py-10">
      <DestinationAndDateHeader trip={trip} />

      <main className="flex gap-16 px-4">
        <Activities openCreateActivityModal={openCreateActivityModal} />

        <div className="w-80 space-y-6">
          <ImportantLinks />

          <div className="h-px w-full bg-zinc-800"></div>

          <Participants />
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
