import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { CreateActivityType } from "@dtos/create-activity";
import { useCreateActivity } from "@hooks/use-create-activity";
import { useDayActivitiesByTripCode } from "@hooks/use-day-activities-by-trip-code";
import { useTrip } from "@hooks/use-trip";

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

  const { isPendingCreateDayActivity, createDayActivity } = useCreateActivity();
  const { isFetchingDayActivities, refetchDayActivities } =
    useDayActivitiesByTripCode(tripCode!);

  const isButtonDisabled =
    isFetchingDayActivities || isPendingCreateDayActivity;

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true);
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false);
  }

  async function handleCreateActivity(createActivityData: CreateActivityType) {
    try {
      await createDayActivity({
        tripCode: tripCode!,
        ...createActivityData,
      });

      await refetchDayActivities();

      toast.success("Atividade criada com sucesso");
      closeCreateActivityModal();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  }

  if (errorTrip) {
    if (errorTrip instanceof AxiosError) {
      toast.error(errorTrip.response?.data.message || "Erro ao buscar viagem");
    }

    navigate("/");
    return null;
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-6">
      <DestinationAndDateHeader trip={trip} />

      <div className="flex gap-16 px-4 pb-8">
        <Activities openCreateActivityModal={openCreateActivityModal} />

        <div className="w-80 space-y-6">
          <Participants owner={trip?.owner} />
        </div>
      </div>

      {isCreateActivityModalOpen && (
        <CreateActivityModal
          isButtonDisabled={isButtonDisabled}
          onSubmit={handleCreateActivity}
          closeCreateActivityModal={closeCreateActivityModal}
        />
      )}
    </div>
  );
}
