import { AxiosError } from "axios";
import { format } from "date-fns";
import { SquarePen, X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

import { ActivityDTO } from "@dtos/activity";
import { CreateActivityType } from "@dtos/create-activity";
import { useDayActivitiesByTripCode } from "@hooks/use-day-activities-by-trip-code";
import { useRemoveActivity } from "@hooks/use-remove-activity";
import { useUpdateActivity } from "@hooks/use-update-trip";

import { Button } from "@components/button";
import { Links } from "../links";
import { CreateActivityModal } from "./create-activity-modal";

interface ActivityDetailsModalProps {
  activity: ActivityDTO;
  closeActivityDetailsModal: () => void;
}

export function ActivityDetailsModal({
  activity,
  closeActivityDetailsModal,
}: ActivityDetailsModalProps) {
  const [isEditActivityModalOpen, setIsEditActivityModalOpen] = useState(false);

  const { isPendingActivityUpdate, updateActivity } = useUpdateActivity();
  const { removeActivity } = useRemoveActivity();
  const { isFetchingDayActivities, refetchDayActivities } =
    useDayActivitiesByTripCode(activity.tripCode);

  const isButtonDisabled = isFetchingDayActivities || isPendingActivityUpdate;

  function openEditActivityModal() {
    setIsEditActivityModalOpen(true);
  }

  function closeEditActivityModal() {
    setIsEditActivityModalOpen(false);
  }

  async function handleRemoveActivity() {
    await removeActivity({
      tripCode: activity.tripCode,
      activityCode: activity.code,
    });

    await refetchDayActivities();

    closeActivityDetailsModal();
  }

  async function handleCreateActivity(updateActivityDTO: CreateActivityType) {
    try {
      await updateActivity({
        tripCode: activity.tripCode,
        activityCode: activity.code,
        ...updateActivityDTO,
      });

      await refetchDayActivities();

      toast.success("Atividade atualizada com sucesso");
      closeEditActivityModal();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[540px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Detalhes da atividade</h1>

            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-full p-2 hover:bg-zinc-800"
                onClick={openEditActivityModal}
              >
                <SquarePen className="size-4 cursor-pointer text-zinc-400" />
              </button>

              <button
                type="button"
                className="rounded-full p-1 hover:bg-zinc-800"
                onClick={closeActivityDetailsModal}
              >
                <X className="size-5 cursor-pointer text-zinc-400" />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{activity.title}</h2>

            <span className="text-sm text-zinc-400">{`${format(activity.occursAt, "HH'h'mm")}`}</span>
          </div>

          <p className="text-sm text-zinc-400">
            {activity.description || "Não há uma descrição para esta atividade"}
          </p>
        </div>

        <div className="h-px w-full bg-zinc-800"></div>

        <Links activityCode={activity.code} />

        <div className="h-px w-full bg-zinc-800"></div>

        <Button variant="danger" size="full" onClick={handleRemoveActivity}>
          Remover atividade
        </Button>
      </div>

      {isEditActivityModalOpen && (
        <CreateActivityModal
          activity={activity}
          isButtonDisabled={isButtonDisabled}
          onSubmit={handleCreateActivity}
          closeCreateActivityModal={closeEditActivityModal}
        />
      )}
    </div>
  );
}
