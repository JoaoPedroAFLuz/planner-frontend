import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useTrip } from "@hooks/useTrip";

import { Activities } from "./activities";
import { CreateActivityModal } from "./activities/create-activity-modal";
import { DestinationAndDateHeader } from "./destination-and-date-header";
import { Participants } from "./participants";

export function TripDetailsPage() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);

  const navigate = useNavigate();
  const { tripCode } = useParams();
  const { trip, errorTrip } = useTrip(tripCode!);

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true);
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false);
  }

  if (errorTrip) {
    if (errorTrip instanceof AxiosError) {
      toast.error(errorTrip.response?.data.message || "Erro ao buscar viagem");
    }

    navigate("/");
    return null;
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-6 py-10">
      <DestinationAndDateHeader trip={trip} />

      <main className="flex gap-16 px-4">
        <Activities openCreateActivityModal={openCreateActivityModal} />

        <div className="w-80 space-y-6">
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
