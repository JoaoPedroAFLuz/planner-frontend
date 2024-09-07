import { X } from "lucide-react";

import { Activity } from "../../entities/activity";

import { Button } from "../../components/button";
import { Links } from "./important-links";

interface ActivityDetailsModalProps {
  activity: Activity;
  closeActivityDetailsModal: () => void;
}

export function ActivityDetailsModal({
  activity,
  closeActivityDetailsModal,
}: ActivityDetailsModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[540px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Detalhes da atividade</h1>

            <button type="button" onClick={closeActivityDetailsModal}>
              <X className="size-5 cursor-pointer text-zinc-400" />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Descrição</h2>

          <p className="text-sm text-zinc-400">
            {activity.description || "Não há uma descrição para esta atividade"}
          </p>
        </div>

        <div className="h-px w-full bg-zinc-800"></div>

        <Links activityCode={activity.code} />

        <div className="h-px w-full bg-zinc-800"></div>

        <Button variant="danger" size="full">
          Remover atividade
        </Button>
      </div>
    </div>
  );
}
