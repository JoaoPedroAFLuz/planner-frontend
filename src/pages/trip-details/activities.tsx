import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CircleCheck, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Button } from "../../components/button";
import { api } from "../../lib/axios";

interface Activities {
  date: string;
  activities: Activity[];
}

interface Activity {
  code: string;
  title: string;
  occursAt: string;
}

interface ActivitiesProps {
  openCreateActivityModal: () => void;
}

export function Activities({ openCreateActivityModal }: ActivitiesProps) {
  const [activities, setActivities] = useState<Activities[]>([]);

  const { tripCode } = useParams();

  useEffect(() => {
    api.get(`/trips/${tripCode}/activities`).then((response) => {
      setActivities(response.data);
    });
  }, [tripCode]);

  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold">Atividades</h2>

        <Button onClick={openCreateActivityModal}>
          <Plus className="size-5" />

          <span>Cadastrar atividade</span>
        </Button>
      </div>

      <div className="space-y-8">
        {activities.map((category) => (
          <div key={category.date} className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-semibold text-zinc-300">
                Dia {format(new Date(category.date), "d")}
              </span>

              <span className="text-xs text-zinc-500">
                {format(category.date, "EEEE", {
                  locale: ptBR,
                })}
              </span>
            </div>

            {category.activities.length === 0 ? (
              <p className="text-sm text-zinc-500">
                Nenhuma atividade cadastrada nesta data.
              </p>
            ) : (
              <div>
                {category.activities.map((activity) => (
                  <div key={activity.code} className="space-y-2.5">
                    <div className="flex items-center gap-3 rounded-xl bg-zinc-900 px-4 py-2.5 shadow-shape">
                      <CircleCheck className="size-5 text-pink-300" />

                      <span className="text-zinc-100">{activity.title}</span>

                      <span className="ml-auto text-sm text-zinc-400">
                        {`${format(activity.occursAt, "HH:mm")}h`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
